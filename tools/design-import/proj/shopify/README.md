# Broken Arrow Grooming — Wholesale on Shopify

Two theme sections plus admin setup. The design reference is `Wholesale.dc.html` and `Wholesale Shop.dc.html` in this project.

## 1. Add the code (Online Store > Themes > … > Edit code)
- Upload `sections/wholesale-apply.liquid` and `sections/wholesale-shop.liquid` into the theme's **sections** folder.
- Create two page templates: `page.wholesale` and `page.wholesale-shop`. Add the matching section to each in the theme editor.

## 2. Create the pages (Online Store > Pages)
- **Wholesale**: handle `wholesale`, template `page.wholesale`.
- **Wholesale shop**: handle `wholesale-shop`, template `page.wholesale-shop`. Set it to hidden from search (SEO: noindex app or `seo.hidden` metafield).

## 3. Turn on customer accounts
Settings > Customer accounts > use **classic customer accounts** (needed for the password sign-in form above). If your store uses the new one-time-code accounts, the sign-in box won't be used. Customers sign in with an emailed code instead, and the rest works the same.

## 4. Make the wholesale collection
Create a collection with the handle `wholesale` containing Clay, Cream, Sea Salt Spray, Shampoo, Conditioner and Refuge.
To make a product orderable, add the product tag `wholesale-live`. Without it, the card shows "Coming soon".

## 5. Approving accounts
Applications arrive in **Admin > Customers** tagged `wholesale-pending`. The customer's **Note** shows business name, phone, address, business type, credential type/number and license state.
To approve: remove `wholesale-pending`, add `wholesale`. They can then sign in and see the wholesale shop.
Tip: set up Shopify Flow ("Customer created" + tag contains wholesale-pending → email you) so you're told about new applications.

## 6. Charge the right price and enforce packs of 6
Theme code only controls what people *see*. The price charged at checkout has to be set by one of these:
- **Shopify B2B** (check if your plan includes it): make a company per approved customer, a catalog at 50% off, and quantity rules with min 6 / increment 6.
- **A wholesale app** (e.g. Wholesale Gorilla, SparkLayer): set a rule for customers tagged `wholesale`: 50% off, min 6, increments of 6.

## Not covered by Shopify's built-in form
- File uploads (license photo). Use a form app like Helium Customer Fields if you want uploads on the form, or ask applicants to reply by email.

---

# Free haircut application + email marketing

## Where the emails go
Shopify's contact form emails every submission to **Settings > Store details > Contact email** (the "sender email"). Set that to the inbox you want applications in, e.g. your YouTube/shop inbox. Each email lists every answer by field name.

## Add the application
- Upload `sections/free-haircut-apply.liquid` to **sections**.
- Create a page with handle `free-haircut`, template `page.free-haircut`, and add the "Free haircut application" section.
- Point the homepage "Apply now" and hero "Apply for a free haircut" links to `/pages/free-haircut`.

## What lands in Shopify's CRM (Admin > Customers)
- Every applicant is added as a customer tagged **free-haircut-applicant**.
- If they tick "Email me about…", they're also tagged **newsletter** and subscribed to email marketing. If they don't tick it, they're saved but **not** subscribed.
- Make a customer segment "tag = free-haircut-applicant" to see all applicants, and use it in **Shopify Email** for campaigns (only subscribed customers receive marketing emails).

## Other signups on the site
Use `snippets/email-signup.liquid` anywhere there's an email box:
- Shop page "More on the way": `{% render 'email-signup', tag: 'grooming-notify', button: 'Notify me' %}`
- Footer: `{% render 'email-signup', tag: 'newsletter', button: 'Sign up' %}`
These subscribe people to email marketing and tag them, so you can email "grooming-notify" when a product launches.

## Suggested Shopify Flow automations (free app)
- **Customer created + tag free-haircut-applicant** → send yourself an internal email (backup to the contact email).
- **Customer tag added "grooming-notify"** → add to a "Product launch" segment.
- **Wholesale**: Customer created + tag wholesale-pending → email you to review the credential.

## Spam
Shopify adds hCaptcha to contact and customer forms automatically (Online Store > Preferences > Spam protection). Keep it on.

---

# Schema (structured data for Google and AI search)

Upload the three files in `snippets/` whose names start with `schema-`. Then:

1. **Shop (homepage).** In `layout/theme.liquid`, just before `</head>`, add:
   `{%- if template == 'index' -%}{% render 'schema-barbershop' %}{%- endif -%}`
   Upload `shop-interior.jpg` and `ba-mark.png` to the theme's **assets** folder, since the snippet references them.
2. **Barber pages.** Create pages with the handles `bryton`, `connor` and `elise`. In the barber page template, add:
   `{% render 'schema-barber', handle: page.handle %}`
3. **Products.** Most themes, including Dawn, already output product schema. Search `main-product.liquid` for `application/ld+json`. Only if you don't find it, add `{% render 'schema-product', product: product %}`.

**Check it:** paste a live URL into https://search.google.com/test/rich-results and https://validator.schema.org. Both should show BarberShop or Person with no errors.

**Keep it up to date:** when hours, the phone number or an award year changes, edit `schema-barbershop.liquid` as well as the page.

Review stars are left out on purpose. Google ignores star ratings a business publishes about itself and can flag them as spam. Your Google Business Profile already shows the 5.0.


## Free pickup at the shop (checkout)

Checkout is Shopify's own page, so pickup is turned on in Shopify settings, not in the theme:

1. Settings → Shipping and delivery → Local pickup → click the Broken Arrow location (375 E 800 S, Suite 12, Orem).
2. Turn on "This location offers local pickup".
3. Expected pickup time: "Usually ready in 24 hours" (or "Ready at your next appointment").
4. Pickup instructions: "Pick up at the front desk during shop hours, or at your next appointment. Bring your order confirmation."
5. Save. At checkout, customers now see two options: Ship, or Pick up (free).

For wholesale orders, the same setting applies. B2B / wholesale apps respect it.
