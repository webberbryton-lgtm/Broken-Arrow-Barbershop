# Broken Arrow Barbershop theme

A Shopify theme: the Horizon base, plus the Broken Arrow pages generated from the Claude Design project.

- `main` is synced to the live store. Don't push to it unless asked.
- The design pages (`sections/ba-<page>.liquid`, `templates/<page>.json`, `assets/ba-design.css`) are generated.
  To update them after a design change, follow `tools/design-import/README.md`. Don't hand-edit generated sections;
  change the converter or the design instead.
- Setup in Shopify admin (pages, products, wholesale, forms) is described in `BA-THEME-SETUP.md`.
