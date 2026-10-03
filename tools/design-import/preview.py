import re, json, os, sys, html as H
from liquid import Environment, DictLoader
T='../..'  # preview renders the repo's theme files (run sync_theme.py first)
def shopify_tags(s):
    s = re.sub(r"\{%-?\s*form\s+'[^']+'(?:,\s*[^%]*?id:\s*'([^']+)')?[^%]*-?%\}", lambda m: f'<form id="{m.group(1) or ""}" method="post">', s)
    s = re.sub(r"\{%-?\s*endform\s*-?%\}", '</form>', s)
    s = s.replace('{{ form.errors | default_errors }}', '')
    return s
def strip_schema(s): return shopify_tags(_strip(s))
def _strip(s): return re.sub(r'\{%-?\s*schema\s*-?%\}.*?\{%-?\s*endschema\s*-?%\}', '', s, flags=re.S)
def schema(s):
    m = re.search(r'\{%-?\s*schema\s*-?%\}(.*?)\{%-?\s*endschema\s*-?%\}', s, re.S); return json.loads(m.group(1)) if m else {}
def load_json(p):
    # Shopify prepends a /* ... */ notice to JSON files it saves.
    return json.loads(re.sub(r'^\s*/\*.*?\*/', '', open(p).read(), flags=re.S))
files={}
for d in ['sections','snippets','layout']:
    for f in os.listdir(f'{T}/{d}'):
        if f.endswith('.liquid'): files[f'{d}/{f}'] = open(f'{T}/{d}/{f}').read()
for d in ['snippets']:
    p=f'{T}/snippets'
    for f in os.listdir(p):
        files.setdefault(f'snippets/{f}', open(f'{p}/{f}').read())
env = Environment(loader=DictLoader({k.split('/',1)[1][:-7] if k.startswith('snippets/') else k: strip_schema(v) for k,v in files.items()}))
env.add_filter('asset_url', lambda v: '/assets/' + str(v))
env.add_filter('image_url', lambda v, **k: str(v))
env.add_filter('money', lambda v: '$%.2f' % (float(v or 0)/100))
env.add_filter('stylesheet_tag', lambda v: f'<link rel="stylesheet" href="{v}">')
env.add_filter('preload_tag', lambda v, **kw: f'<link rel="preload" href="{v}" as="font" type="font/woff2" crossorigin>')
class Img(str): pass
def sec_render(stype, cfg, ctx):
    src = files[f'sections/{stype}.liquid']; sch = schema(src)
    st = {s['id']: s.get('default', '' if s['type'] in ('image_picker','url','text') else None) for s in sch.get('settings',[]) if 'id' in s}
    st.update(cfg.get('settings',{})); st={k:v for k,v in st.items() if v is not None}
    blocks = []
    for bid in cfg.get('block_order', []):
        b = cfg['blocks'][bid]; bs = {}
        for bd in sch.get('blocks',[]):
            if bd['type']==b['type']: bs={s['id']:s.get('default') for s in bd['settings'] if 'id' in s}
        bs.update(b.get('settings',{})); bs={k:v for k,v in bs.items() if v is not None}; blocks.append({'settings':bs,'shopify_attributes':'', 'type': b['type']})
    t = env.from_string(strip_schema(src))
    return f'<div class="shopify-section">' + t.render(section={'settings':st,'blocks':blocks,'id':stype}, **ctx) + '</div>'
def page(template, path='/'):
    tj = load_json(f'{T}/templates/{template}.json')
    ctx = dict(request={'path':path,'locale':{'iso_code':'en'}}, shop={'name':'Broken Arrow Barbershop','url':'https://example.com'}, routes={'root_url':'/','cart_url':'/cart','account_url':'/account','account_login_url':'/account/login','account_logout_url':'/account/logout'}, collections={}, cart={'item_count':0}, template={'name':template.split('.')[0],'suffix':''}, page_title='Preview', settings={})
    content = ''.join(sec_render(tj['sections'][k]['type'], tj['sections'][k], ctx) for k in tj['order'])
    lay = files[f"layout/{tj.get('layout','theme')}.liquid"]
    def groups(m):
        g = load_json(f'{T}/sections/{m.group(1)}.json')
        return ''.join(sec_render(g['sections'][k]['type'], g['sections'][k], ctx) for k in g['order'])
    lay = re.sub(r"\{%\s*sections\s+'([^']+)'\s*%\}", lambda m: '@@G:'+m.group(1)+'@@', lay)
    lay = lay.replace('{{ content_for_layout }}', '@@CONTENT@@').replace('{{ content_for_header }}','')
    lay = re.sub(r"\{%-?\s*render 'meta-tags'\s*-?%\}", '', lay)
    lay = re.sub(r'preload_tag:[^}]*', 'preload_tag ', lay)
    out = env.from_string(lay).render(**ctx)
    out = re.sub(r'@@G:([^@]+)@@', groups, out).replace('@@CONTENT@@', content)
    return out.replace('<head>','<head><meta charset="utf-8">',1)
if __name__ == '__main__':
    os.makedirs('preview', exist_ok=True)
    from pages import P
    for tpl in sys.argv[1:] or [cfg['template'] for cfg in P.values()]:
        open(f'preview/{tpl}.html','w').write(page(tpl))
    print('ok')
