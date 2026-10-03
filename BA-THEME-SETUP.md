# Broken Arrow theme: setup in Shopify admin

This theme is the Claude Design project "Orem Barbershop Website Redesign" built on Horizon. Each design page is a
section (`sections/ba-*.liquid`) and a template (`templates/*.json`) that uses one of two layouts:

- `layout/ba.liquid` for the barbershop site, with the site header and footer.
- `layout/ba-store.liquid` for the grooming store, with the store header and footer.

The Horizon templates (cart, collection, search, blog, account and so on) still work as before.

## 1. Pages

All pages below already exist in **Online Store → Pages** with these handles and templates. They're hidden for now, so
when you publish this theme, set each page to *Visible*. The page body stays empty: the content comes from the theme. If
you ever recreate a page, set the handle under *Search engine listing* and pick the template under *Theme template*.

| Page | Handle | Template |
|---|---|---|
| About | `about` | `about` |
| Services | `services` | `services` |
| Service Quiz | `service-quiz` | `service-quiz` |
| Hair Replacement | `hair-replacement` | `hair-replacement` |
| Free Haircut | `free-haircut` | `free-haircut` |
| Team | `team` | `team` |
| Barber - Bryton | `bryton` | `bryton` |
| Barber - Connor | `connor` | `connor` |
| Barber - Elise | `elise` | `elise` |
| Journal | `journal` | `journal` |
| FAQ | `faq` | `faq` |
| Careers | `careers` | `careers` |
| Education | `education` | `education` |
| Apprenticeship | `apprenticeship` | `apprenticeship` |
| Apprenticeship Application | `apprenticeship-application` | `apprenticeship-application` |
| Privacy Policy | `privacy-policy` | `privacy-policy` |
| Terms of Service | `terms-of-service` | `terms-of-service` |
| Shipping | `shipping` | `shipping` |
| Returns | `returns` | `returns` |
| Accessibility Statement | `accessibility` | `accessibility` |
| Contact | `contact` | `contact` |
| Blog: Our Story | `broken-arrow-barbershop-story` | `broken-arrow-barbershop-story` |
| Blog: Barber in Orem Utah | `barber-orem-utah-broken-arrow` | `barber-orem-utah-broken-arrow` |
| Blog: Best of Utah Valley 2026 | `best-barbershop-utah-valley-2026` | `best-barbershop-utah-valley-2026` |
| Shop | `shop` | `shop` |
| Learn | `learn` | `learn` |
| Product Quiz | `product-quiz` | `product-quiz` |
| Wholesale | `wholesale` | `wholesale` |
| Wholesale Shop | `wholesale-shop` | `wholesale-shop` |
| Grooming About | `grooming-about` | `grooming-about` |
| Guide: Hair Falls Flat | `why-hair-falls-flat-after-styling` | `why-hair-falls-flat-after-styling` |
| Guide: Long Haircuts Orem | `mens-long-haircuts-orem` | `mens-long-haircuts-orem` |
| Guide: Thinning Hair | `haircuts-thinning-hair-utah-county` | `haircuts-thinning-hair-utah-county` |
| Guide: Haircut Names | `haircut-names-mean-different-things` | `haircut-names-mean-different-things` |
| Guide: Choose a Barbershop Orem | `how-to-choose-a-barbershop-orem` | `how-to-choose-a-barbershop-orem` |
| Guide: Wedding Haircut | `wedding-groom-haircut-orem` | `wedding-groom-haircut-orem` |
| Guide: Classic vs Signature | `classic-vs-signature-haircut` | `classic-vs-signature-haircut` |
| Guide: What to Tell Your Barber | `what-to-tell-your-barber` | `what-to-tell-your-barber` |
| Guide: Middle Part Orem | `middle-part-haircut-orem-utah` | `middle-part-haircut-orem-utah` |
| Guide: Bulky Haircut | `why-your-haircut-looks-bulky` | `why-your-haircut-looks-bulky` |
| Guide: Award Winning Barbershop | `award-winning-barbershop-orem` | `award-winning-barbershop-orem` |
| Guide: Curtains Middle Part | `curtains-middle-part-haircut-orem` | `curtains-middle-part-haircut-orem` |
| Guide: Signature Haircut | `signature-haircut-orem` | `signature-haircut-orem` |
| Guide: Toupee vs Hair System | `toupee-vs-hair-system` | `toupee-vs-hair-system` |
| Guide: Haircut for Your Routine | `haircut-for-your-daily-routine` | `haircut-for-your-daily-routine` |
| Guide: Time to Change Your Hairstyle | `signs-its-time-to-change-your-hairstyle` | `signs-its-time-to-change-your-hairstyle` |
| Guide: Fade Haircut Orem | `fade-haircut-orem` | `fade-haircut-orem` |
| Guide: Receding Hairline Haircuts | `receding-hairline-haircuts-orem` | `receding-hairline-haircuts-orem` |
| Guide: Hair System Utah | `hair-system-utah` | `hair-system-utah` |
| Guide: Find Your Hairstyle | `how-to-find-the-right-hairstyle-for-men` | `how-to-find-the-right-hairstyle-for-men` |
| Guide: Hair System Maintenance | `hair-system-maintenance-at-home` | `hair-system-maintenance-at-home` |
| Guide: Scissor Haircut Orem | `scissor-haircut-orem` | `scissor-haircut-orem` |
| Guide: New Hairstyle | `what-to-book-new-hairstyle` | `what-to-book-new-hairstyle` |
| Guide: Meet the Team | `new-barber-orem-meet-the-team` | `new-barber-orem-meet-the-team` |
| Guide: Textured Fringe Orem | `textured-fringe-haircut-orem` | `textured-fringe-haircut-orem` |
| Guide: Taper vs Fade | `taper-vs-fade-haircut` | `taper-vs-fade-haircut` |
| Guide: Low Taper Orem | `low-taper-haircut-orem-utah` | `low-taper-haircut-orem-utah` |
| Guide: Modern Mullet Orem | `modern-mullet-haircut-orem-utah` | `modern-mullet-haircut-orem-utah` |
| Guide: Matte Clay How To | `how-much-matte-clay-to-use` | `how-much-matte-clay-to-use` |
| Guide: Barber Near BYU and UVU | `barber-near-byu-uvu` | `barber-near-byu-uvu` |
| Guide: Scissor Cut | `what-is-a-scissor-cut` | `what-is-a-scissor-cut` |
| Guide: Longer Hair Haircuts | `longer-mens-hair-regular-haircuts` | `longer-mens-hair-regular-haircuts` |
| Guide: Same Barber Every Time | `small-barbershop-orem-same-barber` | `small-barbershop-orem-same-barber` |
| Guide: Why We Make Our Own Products | `why-broken-arrow-makes-its-own-products` | `why-broken-arrow-makes-its-own-products` |
| Guide: Mens Haircuts Orem | `mens-haircuts-orem-utah` | `mens-haircuts-orem-utah` |
| Guide: Toupee Queen Utah | `toupee-queen-utah-mens-hair-systems-orem` | `toupee-queen-utah-mens-hair-systems-orem` |
| Guide: What Is a Hair System | `what-is-a-hair-system` | `what-is-a-hair-system` |
| Guide: Growing Hair Out | `growing-hair-out-without-awkward-stage` | `growing-hair-out-without-awkward-stage` |
| Guide: Inside the Shop | `inside-broken-arrow-barbershop-orem` | `inside-broken-arrow-barbershop-orem` |

The home page uses `templates/index.json` automatically.

## 2. Matte clay product

The product `matte-clay` exists as a **draft**, with the `matte-clay` template and three variants: 1 jar $28, 2 jars
$50.40 (compare at $56) and The daily kit $71.40 (compare at $84). Inventory isn't tracked. To finish it:

- Add the product photos and set it to **Active** when you publish the theme.
- For "Subscribe and save", install Shopify's free **Shopify Subscriptions** app. Add a plan to this product that
  delivers every 30, 60 and 90 days, in that order, at 20% off. The theme picks up the first subscription plan group
  automatically. Until a plan exists, a subscriber is charged the one-time price.

## 3. Wholesale

- **Sign-in:** the wholesale page works with Shopify's new customer accounts. Stockists sign in with their email and a
  one-time code, then land on the wholesale shop.
- **Applications:** an application saves the applicant as a customer tagged `wholesale-pending` and emails the full
  answers to the shop. To approve someone, change the tag to `wholesale` in **Customers**.
- **Wholesale shop:** all products are in the `wholesale` collection and tagged `wholesale-live`. A product shows on
  the wholesale shop once it's **Active**. Products are sold only in packs of 6.
- **Wholesale price:** the discount code `WHOLESALE50` gives 50% off the `wholesale` collection with a minimum of
  6 items. The wholesale shop applies it automatically at checkout. In **Discounts**, it's limited to the customer
  segment **Wholesale accounts** (customers tagged `wholesale`), so retail customers can't use it. The pack size and
  the percentage shown are set on the Wholesale Shop section in the theme editor; keep the percentage in step with
  the discount.

## 4. Forms and outside services, kept from the design

- **Forms:** the Free Haircut, Careers, Apprenticeship and Wholesale forms are emailed through formsubmit.co
  (`assets/ba-send-form.js`, the design's `baSend`) to formsbrokenarrow@gmail.com. To change the address, go to
  **Theme settings → Broken Arrow → Form emails**. A new address gets a one-time "Activate Form" email on its first
  submission; click the link in it once.
- **Booking:** "Book" buttons link to the Square booking pages from the design.
- **Availability:** the home and barber pages read live openings from the Cloudflare worker
  `barberavalibility.webberbryton.workers.dev`.
- **Newsletter:** education updates sign up as Shopify customers tagged `newsletter`, `education-notify`.

## 5. Redirects (optional)

The design linked some pages under different paths. In **Online Store → Navigation → URL redirects**, add the paths
your old site used, for example `/barbers/bryton` → `/pages/bryton` and `/blog/<post>` → `/pages/<post>`.

## Editing in the theme editor

- **Text and photos:** open any page in **Online Store → Themes → Customize**. Each page section lists its photos
  first, then its text, grouped by page area. A photo left empty falls back to the built-in one.
- **Header and footer:** the logos, navigation links, booking link, address and phone are edited on the Header and
  Footer sections.

