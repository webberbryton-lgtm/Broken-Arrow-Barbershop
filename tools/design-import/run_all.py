import sys, os
from convert import *
import pagehooks
TITLES = {}
only = sys.argv[1:]
for name, cfg in P.items():
    if only and name not in only: continue
    if os.path.exists(f"manual/sections/ba-{cfg['handle']}.liquid"):
        import shutil, json as J
        shutil.copy(f"manual/sections/ba-{cfg['handle']}.liquid", f"theme/sections/ba-{cfg['handle']}.liquid")
        open(f"theme/templates/{cfg['template']}.json",'w').write(J.dumps({"layout": cfg['layout'], "sections": {"main": {"type": f"ba-{cfg['handle']}", "settings": {}}}, "order": ["main"]}, indent=2) + '\n')
        print(f'{name[:45]:45} manual'); continue
    c = Conv(name, cfg)
    root = c.run()
    n = emit(name, cfg, root, c)
    print(f'{name[:45]:45} settings={n}')
