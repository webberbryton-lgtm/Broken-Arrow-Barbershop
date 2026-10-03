#!/usr/bin/env bash
# Rebuild the Shopify pages from the Claude Design files in proj/ and merge them into the repo's theme.
# Usage: ./build.sh            (writes into the repo)
#        ./build.sh --dry-run  (only lists what would change)
set -euo pipefail
cd "$(dirname "$0")"
[ -d node_modules ] || npm install --silent --no-audit --no-fund
python3 apply_overrides.py
mapfile -d '' PAGES < <(python3 -c "from pages import P; import sys; sys.stdout.write('\0'.join(n + '.dc.html' for n in P))")
mapfile -d '' MOBILE < <(python3 -c "from pages import P; import sys; sys.stdout.write('\0'.join(n + '.dc.html' for n, c in P.items() if c.get('mobile_bp')))")
mkdir -p rendered theme/sections theme/templates theme/assets
echo "== Reading design templates";   node dumptpl.mjs
echo "== Rendering ${#PAGES[@]} pages"; node render.mjs "${PAGES[@]}" > rendered/render.log
echo "== Rendering phone booking bar"; node render_bar.mjs "${PAGES[@]}" > rendered/render_bar.log
if [ ${#MOBILE[@]} -gt 0 ]; then echo "== Rendering phone layouts"; W=390 SUF=.m node render.mjs "${MOBILE[@]}" >> rendered/render.log; fi
echo "== Converting";                  python3 run_all.py > rendered/convert.log; python3 footers.py; python3 build_css.py
echo "== Photos";                      python3 photos.py
echo "== Merging into the theme";      python3 sync_theme.py "$@"
if [[ " $* " != *" --dry-run "* ]]; then echo "== Local preview"; python3 preview.py; fi
