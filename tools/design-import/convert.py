import re, os, json, sys, html
from urllib.parse import unquote
from bs4 import BeautifulSoup, NavigableString, Tag, Comment
from common import load_body
from pages import P, URL

OUT = 'theme'
INLINE = ('strong','em','b','i','br')
TEXT_TAGS = ['h1','h2','h3','p','li','figcaption','blockquote','summary','span','a','button','dt','dd','td','th']
MAX_TEXT = 130

def map_href(h):
    if not h: return h
    m = re.match(r'^([^#?]*\.dc\.html)(#.*)?$', h)
    if not m: return h
    f = unquote(m.group(1))[:-8]
    url = URL.get(f)
    if url is None:
        print('  !! unmapped link', h, file=sys.stderr); url = '/'
    return url + (m.group(2) or '')

def asset_name(path):
    base = os.path.splitext(path.split('/')[-1])[0]
    if path.startswith('assets/logos/'):
        return {'lockup-barbershop-offwhite':'ba-lockup-offwhite.svg','lockup-barbershop-black':'ba-lockup-black.svg',
                'lockup-grooming-offwhite':'ba-lockup-grooming-offwhite.svg','ba-mark-black':'ba-mark-black.svg'}[base]
    return 'ba-' + base + '.webp'

def parse_style(st):
    d = {}
    for part in re.split(r';(?![^(]*\))', st):
        if ':' in part:
            k, v = part.split(':', 1); d[k.strip()] = v.strip()
    return d

HOOKS = {}

def sid(s):
    return re.sub(r'[^a-z0-9]+','_',s.lower()).strip('_')

class Conv:
    def __init__(self, name, cfg):
        self.name, self.cfg = name, cfg
        self.settings = []        # schema settings
        self.assigns = []         # liquid assigns at top
        self.img_ids = {}
        self.ids = set()
        self.hdr = None
        self.js = []
    def uid(self, base):
        b = base[:40] or 'x'; i = b; n = 2
        while i in self.ids: i = f'{b}_{n}'; n += 1
        self.ids.add(i); return i
    def ctx(self, el):
        p = el
        while p is not None and isinstance(p, Tag):
            if p.get('data-screen-label'): return p['data-screen-label']
            p = p.parent
        return 'Page'
    def image(self, path, el):
        if path in self.img_ids: return self.img_ids[path]
        v = self.uid('img_' + sid(path.split('/')[-1].rsplit('.',1)[0]))
        self.img_ids[path] = v
        self.settings.append(('img', v, {"type":"image_picker","id":v,"label":f"{self.ctx(el)} — photo ({path.split('/')[-1]})",
            "info":"Leave empty to use the built-in photo."}))
        a = asset_name(path)
        self.assigns.append(f"if section.settings.{v} != blank\n  assign {v} = section.settings.{v} | image_url: width: 2400\nelse\n  assign {v} = '{a}' | asset_url\nendif")
        return v

    def run(self):
        soup, root = load_body(self.name)
        self.mcss = []
        bp = self.cfg.get('mobile_bp')
        if bp:
            _, mroot = load_body(self.name + '.m')
            for s in mroot.select('span.sc-interp'): s.unwrap()
            for s in root.select('span.sc-interp'): s.unwrap()
            A = root.find_all(True); B = mroot.find_all(True)
            if [t.name for t in A] != [t.name for t in B]:
                print('  !! mobile structure differs', self.name, len(A), len(B))
            else:
                n = 0
                for a, b in zip(A, B):
                    sa, sb = parse_style(a.get('style','')), parse_style(b.get('style',''))
                    diff = {k: v for k, v in sb.items() if sa.get(k) != v}
                    if diff:
                        n += 1; a['data-ba-m'] = str(n)
                        decl = '; '.join(f'{k}: {v} !important' for k, v in diff.items())
                        self.mcss.append(f':where([data-ba-page="{self.cfg["handle"]}"] [data-ba-m="{n}"]) {{ {decl}; }}')
                if self.mcss:
                    self.mcss = [f'@media (max-width: {bp - 1}px) {{'] + ['  ' + c for c in self.mcss] + ['}']
        hook = HOOKS.get(self.name)
        if hook: hook(root, self)
        out = self.process(root)
        self.css = self.mcss + self.css + getattr(self, 'extra_css', [])
        return out

    def process(self, root):
        for s in root.select('span.sc-interp'): s.unwrap()
        for c in root.find_all(string=lambda t: isinstance(t, Comment)): c.extract()
        # hover classes
        pseudo = json.load(open(f'rendered/{self.cfg.get("pseudo_from", self.name)}.pseudo.json'))
        key = self.cfg['handle']
        hkey = re.sub(r'[^a-z0-9]','',key)[:12]
        css_rules = []
        used = set()
        for t in root.find_all(class_=re.compile(r'^scp')):
            cl = []
            for c in t.get('class', []):
                if re.match(r'^scp[0-9a-z]+$', c):
                    used.add(c); cl.append(f'bah-{hkey}-{c[3:]}')
                else: cl.append(c)
            t['class'] = cl
        for r in pseudo:
            m = re.match(r'\.(scp[0-9a-z]+)(.*)', r)
            if m and m.group(1) in used:
                css_rules.append(f'.bah-{hkey}-{m.group(1)[3:]}{m.group(2)}')
        self.css = css_rules
        # links
        for a in root.find_all(href=True): a['href'] = map_href(a['href'])
        # images
        for t in root.find_all(True):
            st = t.get('style')
            if st and 'assets/' in st:
                def rep(m):
                    v = self.image(m.group(2), t)
                    return 'url("' + f'@@{v}@@' + '")'
                t['style'] = re.sub(r'url\((["\']?)(assets/(?:photos|logos)/[^"\')]+)\1\)', rep, st)
            if t.name == 'img' and t.get('src','').startswith('assets/'):
                v = self.image(t['src'], t); t['src'] = f'@@{v}@@'
                t['loading'] = t.get('loading','lazy')
        # editable text
        if self.cfg.get('text', True):
            self.texts(root)
        return root

    def texts(self, root):
        cands = []
        for t in root.find_all(TEXT_TAGS):
            if t.has_attr('data-ba-dynamic') or t.find_parent(attrs={'data-ba-dynamic': True}) or t.find_parent('form') or t.find_parent('button'): continue
            if any(isinstance(c, Tag) for c in t.contents): continue
            txt = t.get_text()
            if not txt.strip() or len(txt) > 1200 or '{{' in txt or '{%' in txt: continue
            if t.name in ('span','a','button','td','th','dt','dd') and len(txt.strip()) < 2: continue
            cands.append(t)
        prio = {'h1':0,'h2':1,'h3':2}
        order = sorted(range(len(cands)), key=lambda i: (prio.get(cands[i].name, 3), i))
        keep = set(order[:MAX_TEXT])
        for i, t in enumerate(cands):
            if i not in keep: continue
            txt = t.get_text().strip()
            lead = t.get_text()[:len(t.get_text())-len(t.get_text().lstrip())]
            v = self.uid('t_' + sid(txt)[:28])
            typ = 'text' if len(txt) <= 90 else 'textarea'
            what = {'h1':'Heading','h2':'Heading','h3':'Subheading','p':'Text','li':'List item','a':'Link text','span':'Text'}.get(t.name,'Text')
            self.settings.append(('text', v, {"type":typ,"id":v,"label":f"{self.ctx(t)} — {what}: {txt[:40]}","default":txt}))
            t.string = f'@@T:{v}@@'

def polish(body):
    body = re.sub(r'</(wbr|br|img|input|hr|source|meta|link)>', '', body)
    body = body.replace('href="/"', 'href="{{ routes.root_url }}"')
    body = body.replace('href="/account"', 'href="{{ routes.account_url }}"')
    body = body.replace('href="/cart"', 'href="{{ routes.cart_url }}"')
    return body

def short_label(x):
    # Shopify rejects setting labels over 70 characters.
    if len(x.get('label', '')) > 70: x['label'] = x['label'][:69].rstrip() + '…'
    return x

def grouped_settings(settings):
    # Photos first, then text grouped under a header per page area, so the theme editor stays readable.
    settings = [(a, b, short_label(c)) for a, b, c in settings]
    out, last = [], None
    imgs = [s for s in settings if s[0] == 'img']
    if imgs: out.append({"type": "header", "content": "Photos"})
    out += [s[2] for s in imgs]
    for s in settings:
        if s[0] == 'img': continue
        area = s[2]['label'].split(' — ')[0]
        if area != last:
            out.append({"type": "header", "content": ("Text: " + area)[:50]})
            last = area
        out.append(s[2])
    return out

def emit(name, cfg, root, conv, extra_html='', js=None):
    key = cfg['handle']
    body = ''.join(str(c) for c in root.contents)
    import base64
    body = re.sub(r'@@RAW:([A-Za-z0-9+/=]+)@@', lambda m: base64.b64decode(m.group(1)).decode(), body)
    body = re.sub(r'@@ASSET:([\w.-]+)@@', lambda m: "{{ '%s' | asset_url }}" % m.group(1), body)
    body = re.sub(r'@@T:(\w+)@@', lambda m: '{{ section.settings.%s | escape }}' % m.group(1), body)
    body = re.sub(r'@@(\w+)@@', lambda m: '{{ %s }}' % m.group(1), body)
    body = polish(body)
    margins = []
    out = []
    out.append('{%- comment -%} Generated from the Claude Design page "' + name + '". {%- endcomment -%}')
    if conv.assigns:
        out.append('{%- liquid\n' + '\n'.join(conv.assigns) + '\n-%}')
    css = list(conv.css)
    m = margin_extra(name)
    if m: css.insert(0, f'.ba-page[data-ba-page="{key}"] :is({m}) {{ margin: 0; }}')
    if css:
        out.append('<style>\n' + '\n'.join(css) + '\n</style>')
    attrs = page_attrs(name) + getattr(conv, 'root_attrs', '')
    out.append(f'<div class="ba-page" data-ba-page="{key}"{attrs}>')
    out.append(body)
    out.append('</div>')
    for j in jsonld(name): out.append(j)
    extra_html = extra_html + getattr(conv, 'extra_html', '')
    if extra_html: out.append(extra_html)
    js = (js or []) + conv.js
    if js:
        for j in js: out.append('<script src="{{ \'%s\' | asset_url }}" defer></script>' % j)
    title = cfg.get('title') or name
    schema = {"name": title[:25], "tag": "div", "class": "ba-page-section", "settings": grouped_settings(conv.settings)}
    out.append('{% schema %}\n' + json.dumps(schema, indent=2, ensure_ascii=False) + '\n{% endschema %}\n')
    os.makedirs(f'{OUT}/sections', exist_ok=True)
    open(f'{OUT}/sections/ba-{key}.liquid','w').write('\n'.join(out))
    tpl = {"layout": cfg['layout'], "sections": {"main": {"type": f"ba-{key}", "settings": {}}}, "order": ["main"]}
    os.makedirs(f'{OUT}/templates', exist_ok=True)
    open(f"{OUT}/templates/{cfg['template']}.json",'w').write(json.dumps(tpl, indent=2) + '\n')
    return len(conv.settings)

DEFAULT_BOOK = 'https://book.squareup.com/appointments/a9bstwwcb18jn4/location/LFBJAQ8MMHY0Z/services'
def src_file(name):
    s = open(f'proj/{name}.dc.html').read()
    m = re.search(r'<dc-import name="(Barber|Local Guide|Info Page)"', s)
    return m.group(1) if m and '<helmet>' not in s else name
def page_attrs(name):
    s = open(f'proj/{src_file(name)}.dc.html').read()
    m = re.search(r'<dc-import name="(?:Site|Store)Header"[^>]*?active="([^"]+)"', s)
    a = ''
    if m: a += f' data-ba-active="{m.group(1)}"'
    if re.search(r'<dc-import name="SiteFooter"[^>]*show-award="\{\{ false \}\}"', s): a += ' data-ba-hide-award'
    try: bar = json.load(open(f'rendered/{name}.bar.json'))['bar']
    except Exception: bar = []
    if bar:
        href, label = bar[0]
        if href != DEFAULT_BOOK: a += f' data-ba-book="{html.escape(href)}"'
        if label != 'BOOK NOW': a += f' data-ba-book-label="{html.escape(label)}"'
    return a
def margin_extra(name):
    s = open(f'proj/{src_file(name)}.dc.html').read()
    m = re.search(r'\n(h1,h2[^{]*)\{margin:0\}', s)
    if not m: return ''
    extra = [t for t in m.group(1).split(',') if t not in ('h1','h2','h3','p','figure')]
    return ', '.join(extra)
def jsonld(name):
    soup = BeautifulSoup(open(f'rendered/{name}.html').read(), 'lxml')
    out = []
    for sc in soup.head.find_all('script', type='application/ld+json'):
        t = sc.string or ''
        if t.strip():
            t = t.replace('https://www.orembarbershop.com/blog/', '{{ shop.url }}/pages/').replace('https://www.orembarbershop.com', '{{ shop.url }}')
            out.append('<script type="application/ld+json">' + t + '</script>')
    return out
