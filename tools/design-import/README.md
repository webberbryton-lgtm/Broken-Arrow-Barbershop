# Design import

Turns the Claude Design project "Orem Barbershop Website Redesign" into the Shopify theme in this repo.
Run it whenever the design changes, then commit and push. The Shopify theme connected to this branch
updates on its own.

## Updating the theme after a design change

1. **Get the design.** The design files live in Google Drive in the folder `1VOY5Grfv7Yjw1iGaCI_chfaFTutNnp_S`
   (owner: brokenarrowbarbershoporem@gmail.com). Download the changed `.dc.html` files, `support.js`, `mobile.css`,
   `send-form.js`, `_ds/` and `components/` into `proj/`, keeping the same paths. Put new photos in
   `proj/assets/photos/`; existing photos only need downloading if they changed.
2. **Preview the changes.** Run `./build.sh --dry-run`. It renders every page and lists the theme files that would change.
3. **Build.** Run `./build.sh`. It writes into the repo's `sections/`, `templates/` and `assets/`, then renders a
   local preview into `preview/`.
4. **Check.** Run `node shot.mjs "$(cat jobs.json)"` and `python3 compare.py` to compare the design with the theme
   at 1280px and 390px, if you have job lists. Otherwise, open a few `preview/*.html` pages.
5. **Commit and push** to the theme branch.

## What the build changes, and what it keeps

**Overwritten by the build (generated):**
- `sections/ba-<page>.liquid` for every page in `pages.py`
- `sections/ba-site-footer.liquid` and `sections/ba-store-footer.liquid`
- `assets/ba-design.css`
- new photos as `assets/ba-<name>.webp`

**Merged:** `templates/<page>.json`. Text and photo changes made in the Shopify theme editor are saved in these
files and are kept:
- A saved value is kept when it differs from the old design default.
- A saved value that still matches the old default is dropped, so new design text shows through.
- Sections someone added to a page in the editor stay.

**Never touched (maintained by hand):** `layout/ba*.liquid`, `sections/ba-site-header.liquid`,
`sections/ba-store-header.liquid`, the `ba-*-group.json` section groups, `snippets/`, every `assets/ba-*.js` file,
`config/` and everything from the Horizon base theme. Change these directly.

## Adding or removing a page

1. **Register it.** Add the page to `P` in `pages.py`: its handle, URL, template and layout (`ba`, or `ba-store`
   for store pages). Local Guide stubs also need an entry in `guide_slugs.json`.
2. **Wire up any interactivity.** If the page has quizzes, forms or filters, add a hook in `pagehooks.py`.
3. **Create the page in Shopify.** Use the same handle and choose the template.

## Changes kept on top of the design

`apply_overrides.py` re-applies two changes after a fresh download:
- the full Terms of Service, from `content/terms.md`
- the 20% Subscribe and save discount on Matte clay

If the design itself gets those changes, remove them from the script.

## Files

- `render.mjs` renders design pages in Chromium. It uses the playwright install at `/opt/node-tools` and Chromium
  at `/opt/pw-browsers`; the npm packages it needs are listed in `package.json`.
- `render_bar.mjs` captures the phone booking bar.
- `dumptpl.mjs` reads the compiled design templates; `common.py` uses them to recover styles the browser drops.
- `convert.py` turns rendered pages into sections with editable text and photo settings.
- `pagehooks.py` adds per-page interactivity.
- `footers.py` builds the two footers.
- `build_css.py` and `base_extra.css` build the stylesheet.
- `sync_theme.py` merges the build into the repo.
- `preview.py` renders the theme locally with python-liquid.
- `manual/` holds hand-written section overrides (wholesale shop). `run_all.py` copies these instead of converting.
