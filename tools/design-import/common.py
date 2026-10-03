import re, os, json
from bs4 import BeautifulSoup, NavigableString, Tag
SKIP_HOSTS={'SiteHeader','SiteFooter','StoreHeader','StoreFooter'}
_TPL=None
def _tpl(comp):
    global _TPL
    if _TPL is None:
        import html as H
        _TPL={}
        for name,ann in json.load(open('dctpl.json')).items():
            m={}
            for tm in re.finditer(r'<([\w-]+)((?:[^>"\']|"[^"]*"|\'[^\']*\')*)>',ann or ''):
                a=tm.group(2); n=re.search(r'data-dc-tpl="(\d+)"',a)
                if not n: continue
                st=re.search(r'\sstyle="([^"]*)"',a)
                m[int(n.group(1))]=(tm.group(1).lower(), H.unescape(st.group(1)) if st else None)
            _TPL[name]=m
    return _TPL.get(comp,{})
FIXLOG=[]
INFO={'Shipping','Terms of Service','Returns','Privacy Policy','Accessibility Statement','Contact'}
def fix_font_styles(root):
    # Chromium serializes `font:` shorthand containing var() plus a later font-* longhand
    # as empty longhands; recover the raw style from the design template.
    for t in root.find_all(style=re.compile(r': ;')):
        n=t.get('data-dc-tpl')
        comps=[h.get('data-sc-name') for h in t.find_parents(attrs={'data-sc-name':True})]
        top=comps[-1] if comps else ''
        comps+=[b for b in ('Barber','Local Guide','Info Page') if b!=top and top.startswith(b) or (b=='Info Page' and top in INFO)]
        src=None
        for comp in comps:
            c=_tpl(comp).get(int(n)) if n is not None else None
            if c and c[0]==t.name and c[1] and re.search(r'(^|;)\s*font\s*:',c[1]):
                src=c; break
        if src and '{{' not in src[1]:
            t['style']=src[1]
        else:
            FIXLOG.append((comps[0],n,t.name,src))
def load_body(name):
    h=open(f'rendered/{name}.html').read()
    soup=BeautifulSoup(h,'lxml')
    root=soup.select_one('#dc-root > .sc-host')
    for host in root.select('.sc-host'):
        if host.get('data-sc-name') in SKIP_HOSTS: host.decompose()
    for host in root.select('.sc-host, .sc-host-x'):
        host.unwrap()
    fix_font_styles(root)
    for t in root.find_all(True):
        for a in list(t.attrs):
            if a in ('data-dc-tpl','data-sc-name'): del t[a]
    return soup, root
