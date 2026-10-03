import re, json
from bs4 import BeautifulSoup
from convert import polish, grouped_settings, Conv, map_href
def frag(page, host):
    soup = BeautifulSoup(open(f'rendered/{page}.html').read(), 'lxml')
    h = soup.select_one(f'[data-sc-name={host}]')
    for t in h.find_all(True):
        for a in ('data-dc-tpl','data-sc-name'):
            if a in t.attrs: del t[a]
    for s in h.select('span.sc-interp'): s.unwrap()
    return h
def build(page, host, key, name, logo_asset, extra_css=''):
    h = frag(page, host)
    for img in h.find_all('img'):
        if img.get('src','').startswith('data:'): img['src'] = f'@@LOGO@@'
    for p in h.find_all('p'):
        if 'Readers' in p.get_text(): p['data-ba-award'] = ''
    for d in h.find_all('div', style=True):
        if 'padding: 20px clamp(16px, 5vw, 64px)' in d['style']: d['data-ba-foot-bottom'] = ''
    c = Conv(page, {'handle': key, 'pseudo_from': page})
    root = c.process(h)
    body = ''.join(str(x) for x in root.contents)
    body = body.replace('href="#"', 'href="/account"')
    body = re.sub(r'@@T:(\w+)@@', lambda m: '{{ section.settings.%s | escape }}' % m.group(1), body)
    body = body.replace('@@LOGO@@', '{{ logo_src }}')
    body = re.sub(r'@@(\w+)@@', lambda m: '{{ %s }}' % m.group(1), body)
    body = polish(body)
    out = ['{%- comment -%} Ported from the Claude Design component "' + host + '". {%- endcomment -%}']
    lg = "{%- liquid\nif section.settings.logo != blank\n  assign logo_src = section.settings.logo | image_url: width: 400\nelse\n  assign logo_src = '" + logo_asset + "' | asset_url\nendif\n" + '\n'.join(c.assigns) + "\n-%}"
    if '{{ logo_src }}' in body: out.append(lg)
    elif c.assigns: out.append("{%- liquid\n" + '\n'.join(c.assigns) + "\n-%}")
    css = c.css + ([extra_css] if extra_css else [])
    if css: out.append('<style>\n' + '\n'.join(css) + '\n</style>')
    out.append(body)
    body2 = '\n'.join(out)
    settings = ([{"type":"image_picker","id":"logo","label":"Logo","info":"Leave empty to use the built-in lockup."}] if '{{ logo_src }}' in body2 else []) + grouped_settings(c.settings)
    out.append('{% schema %}\n' + json.dumps({"name": name, "tag": "div", "class": "ba-footer-section", "settings": settings}, indent=2, ensure_ascii=False) + '\n{% endschema %}\n')
    open(f'theme/sections/{key}.liquid','w').write('\n'.join(out))
    print(key, len(settings))
build('FAQ', 'SiteFooter', 'ba-site-footer', 'BA site footer', 'ba-lockup-offwhite.svg', '@media (max-width: 719px) { [data-ba-foot-bottom] { padding-bottom: 112px !important; } }\nbody:has([data-ba-hide-award]) [data-ba-award] { display: none; }')
build('Shop', 'StoreFooter', 'ba-store-footer', 'BA store footer', 'ba-lockup-grooming-offwhite.svg')
