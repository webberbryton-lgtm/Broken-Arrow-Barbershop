"""Copy the generated files from theme/ into the repo's theme, keeping changes made in the Shopify theme editor.

Generated files (the only ones this touches):
  sections/ba-<page>.liquid, sections/ba-site-footer.liquid, sections/ba-store-footer.liquid,
  templates/<page>.json and assets/ba-design.css.

Everything else in the repo (layouts, header sections, section groups, snippets, JS, photos, config)
is maintained by hand and is never overwritten.

Templates are merged rather than replaced: the Shopify theme editor saves text and photo changes into
templates/*.json. A saved value is kept when it differs from the old design default (someone edited it)
and its setting still exists. Values that still equal the old default are dropped, so new design text
shows through. Extra sections someone added to a template in the editor are kept as they are.
"""
import copy, json, os, re, shutil, sys
from pages import P

SRC = 'theme'
DST = os.environ.get('BA_THEME_DIR') or os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
dry = '--dry-run' in sys.argv

def load_json(p):
    return json.loads(re.sub(r'^\s*/\*.*?\*/', '', open(p).read(), flags=re.S))

def schema_defaults(path):
    if not os.path.exists(path): return None
    m = re.search(r'\{%-?\s*schema\s*-?%\}(.*?)\{%-?\s*endschema\s*-?%\}', open(path).read(), re.S)
    if not m: return None
    return {s['id']: s.get('default') for s in json.loads(m.group(1)).get('settings', []) if 'id' in s}

report = []
def write(rel, data, text=True):
    report.append(rel)
    if dry: return
    os.makedirs(os.path.dirname(os.path.join(DST, rel)), exist_ok=True)
    if text: open(os.path.join(DST, rel), 'w').write(data)
    else: shutil.copy(data, os.path.join(DST, rel))

kept = 0
sections = [f"sections/ba-{c['handle']}.liquid" for c in P.values()] + ['sections/ba-site-footer.liquid', 'sections/ba-store-footer.liquid']

# 1. Templates first, while the repo still has the old section schemas to compare against.
for cfg in P.values():
    rel = f"templates/{cfg['template']}.json"
    new = load_json(os.path.join(SRC, rel))
    dst = os.path.join(DST, rel)
    if not os.path.exists(dst):
        write(rel, json.dumps(new, indent=2) + '\n'); continue
    cur = load_json(dst)
    main_new = new['sections']['main']
    sec_rel = f"sections/{main_new['type']}.liquid"
    old_def = schema_defaults(os.path.join(DST, sec_rel)) or {}
    new_def = schema_defaults(os.path.join(SRC, sec_rel)) or {}
    main_cur = cur.get('sections', {}).get('main', {})
    settings = {}
    for k, v in (main_cur.get('settings') or {}).items():
        if k in new_def and (k not in old_def or v != old_def[k]):
            settings[k] = v; kept += 1
    merged = copy.deepcopy(cur)
    merged['layout'] = new.get('layout', cur.get('layout'))
    merged.setdefault('sections', {})['main'] = {**main_cur, 'type': main_new['type'], 'settings': settings}
    if 'main' not in merged.get('order', []): merged['order'] = ['main'] + merged.get('order', [])
    if merged != cur: write(rel, json.dumps(merged, indent=2) + '\n')

# 2. Generated sections and the stylesheet.
for rel in sections + ['assets/ba-design.css']:
    src = os.path.join(SRC, rel)
    dst = os.path.join(DST, rel)
    if not os.path.exists(dst) or open(src, 'rb').read() != open(dst, 'rb').read():
        write(rel, src, text=False)

print(('Would update' if dry else 'Updated'), len(report), 'files; kept', kept, 'theme editor value(s).')
for r in report: print('  ' + r)
