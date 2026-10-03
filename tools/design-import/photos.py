"""Convert the design's photos (proj/assets/photos) to WebP theme assets named ba-<name>.webp.

Only new photos are converted unless --force is passed, so photos replaced by hand in assets/ are left alone.
Images uploaded in the Shopify theme editor live in Shopify, not here, and are never touched.
"""
import os, sys
from PIL import Image

SRC = 'proj/assets/photos'
DST = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'assets')
force = '--force' in sys.argv
if not os.path.isdir(SRC):
    print('no photos in', SRC, '- skipped'); sys.exit(0)
done = 0
for f in sorted(os.listdir(SRC)):
    name, ext = os.path.splitext(f)
    if ext.lower() not in ('.jpg', '.jpeg', '.png', '.webp'): continue
    out = os.path.join(DST, f'ba-{name}.webp')
    if os.path.exists(out) and not force: continue
    im = Image.open(os.path.join(SRC, f))
    im = im.convert('RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB')
    im.thumbnail((1800, 1800))
    im.save(out, 'WEBP', quality=80, method=6)
    print('  ', os.path.basename(out)); done += 1
print(done, 'photo(s) converted')
