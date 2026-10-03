# Website

The site is built on Shopify so it can sell Broken Arrow Grooming later. Right now its main job is **booking appointments**.

## Booking

- The main call to action on every page is **BOOK NOW** (primary `Button`). It opens the Square booking page, which shows real-time availability.
- **Square booking links** (open in the same tab on phones):

| Button | Link |
| --- | --- |
| BOOK NOW (whole shop) | https://book.squareup.com/appointments/a9bstwwcb18jn4/location/LFBJAQ8MMHY0Z/services |
| BOOK WITH BRYTON | https://book.squareup.com/appointments/vmqe6cigusj6yl/location/LFBJAQ8MMHY0Z/services |
| BOOK WITH CONNOR | https://book.squareup.com/appointments/cnl05yngyr8vhx/location/LFBJAQ8MMHY0Z/services |
| BOOK WITH ELISE | https://book.squareup.com/appointments/wkoxhle5mmhzak/location/LFBJAQ8MMHY0Z/services |
| BOOK A FREE CONSULTATION (hair systems) | https://book.squareup.com/appointments/vmqe6cigusj6yl/location/LFBJAQ8MMHY0Z/services — Bryton's link; he does all hair system work |
- Per-service and per-barber buttons (each service's BOOK NOW, BOOK WITH BRYTON / CONNOR / ELISE, BOOK A FREE CONSULTATION) should use Square's direct link for that service or staff member when available, so people skip a step. Until then they use the main link.
- Online booking is the easiest and preferred way to book. Show the phone number as the second option ("Call the shop"), never as the main one.
- Walk-ins are welcome but not guaranteed. Say it plainly, with a little personality: "WALK-INS: BY APPOINTMENT OR LUCK." followed by: "Walk-ins are welcome when we have an opening, but we're usually booked. Booking online is the best way to get a spot."
- Never suggest we'll squeeze someone into a full schedule. The Square booking page shows our real availability.

## Visit

- **Address:** 375 E 800 S, Suite 12, Orem, UT 84097
- **Phone:** (801) 709-1280
- The shop is tough to find, so give directions and a clear "Get directions" link, and ask people to arrive 5–10 minutes early.

**Hours**

| Day | Hours |
| --- | --- |
| Tuesday | 10 AM – 6 PM |
| Wednesday | 10 AM – 7:30 PM |
| Thursday | 10 AM – 7:30 PM |
| Friday | 10 AM – 7:30 PM |
| Saturday | 10 AM – 5:30 PM |
| Sunday | Closed |
| Monday | Closed |

Under the hours: "These are our regular hours, and we keep to them. We're a small shop, so on holidays or when several of us are away, hours may change. The booking page always shows our real availability."

## Policies

Plain and polite. Say them on the booking/visit area and in the FAQ:

- **Arrive 5–10 minutes early.** The shop is tough to find the first time.
- **No cancellation or no-show fees.** We just ask that you let us know if you can't make it, so someone else can have the spot.
- **Repeated no-shows or late arrivals.** "If you regularly miss appointments or arrive late, we may not be able to take future bookings." Firm, not scolding.
- **Walk-ins** — see Booking.
- **Who we cut.** "We focus on men's haircuts." Don't list kids' cuts as a service.

## Services

- Show every service with its real **price** (`ServiceList`) and its own **BOOK NOW** that goes straight to that service's Square booking page.
- Don't show appointment times anywhere on the website.
- Core services and current prices: **Haircut — $40**, **Haircut + Beard — $65**, **Extended Service Haircut — $65**. Plain names only — no branded or luxury names.
- Each description says who the service is for, in one sentence.
- Hair replacement appears here as a link to its own page, not as a normal service card.

## The team

- A "The team" section on the home page shows all three barbers together: photo, first name, role, one line about what they like doing, and **SEE [NAME]'S WORK** linking to their page. One **BOOK NOW** for the shop sits under the section.
- Each barber also has their own page: `/barbers/bryton`, `/barbers/connor`, `/barbers/elise`.
- Use the specialties from the brand book and nothing grander. Bios are human and specific — no "master barber", no "passionate about the craft".

### Barber pages

Every barber page uses the same layout, so the three feel like one team:

1. **Hero** — a real photo of the barber working (not a posed headshot), then `label` "THE TEAM / [NAME]", the name in `display` ("CONNOR"), their role, and **BOOK WITH [NAME]** (their Square link).
2. **01 / ABOUT** — 3–4 sentences in **third person** ("Connor is…"), plain and specific: what they're known for, how they work, one real detail.
3. **02 / BOOK [NAME] FOR** — 2–3 short points, each a kind of client or haircut, not a skill buzzword ("Longer hair that needs shape without losing length").
4. **03 / THE WORK** — a grid of 6–12 photos of their actual cuts, square, no rounded corners, captioned with facts ("Grown-out cut, shaped and thinned").
5. **04 / SERVICES** — the same `ServiceList` with shop prices; every Book now uses this barber's link.
6. **Closing band** — black band, "BOOK WITH [NAME]" and "Or see the rest of the team" as a text link.

### Bios

All bios are third person, first names only, facts stated plainly. No "master barber", no "passionate about the craft", no claims we can't show.

**Bryton — Owner & Licensed Barber Instructor**

> Bryton owns Broken Arrow. He's a licensed barber instructor and educator, and splits his time between working behind the chair and training other barbers. Most of his clients come to him for haircuts, beard work and bigger changes — especially when they're not sure yet what they want. Before moving to Orem, he built Broken Arrow in Payson, where clients left him more than 230 five-star Google reviews.

- Book Bryton for: "Bigger changes, when you're not sure what you want yet." · "Haircut and beard together." · "Hair systems — he does all of our hair system work."
- Home-page line: "Owner and licensed barber instructor. Big changes, haircut and beard."
- Hair system block on his page: "Thinking about a hair system? Bryton does all of our hair system work. Start with a free consultation." → BOOK A FREE CONSULTATION.
- The instructor licence appears in the hero role line and once in the bio. Nowhere else on the page.
- Reviews: state the number as a fact, once, as written above. Don't use "one of the highest-rated barbers in the state" unless it can be linked to a source; if a source exists, it can go on the About page as a quiet `label` line, not in the bio. Better still, show 2–3 real Google reviews (quoted exactly, first name and last initial) on his page.

**Connor**

> Connor is a Utah County local, born and raised. Most of his work is medium to longer haircuts — keeping the length and giving it shape. He got into barbering because he likes helping people feel good about how they look. He takes his time, gets the details right, and makes sure you're comfortable in the chair.

- Book Connor for: "Medium-length cuts that still look good as they grow out." · "Longer hair that needs shape without losing length." · "Taking the time to get the details right."
- Home-page line: "Medium to longer hair. Utah County local."

**Elise**

> Elise specializes in medium-length styles and curly hair, and she likes flow cuts and longer, natural looks. Her cuts are clean and detailed. She takes the time to understand what you want and how you actually style your hair day to day, so the cut works with your routine. If you're not sure what you want, she'll help you figure it out.

- Book Elise for: "Curly hair." · "Medium-length and flow cuts." · "Help finding a style that fits your routine."
- Home-page line: "Curly hair, medium-length and flow cuts."

## Hair replacement page

Its own page, written for someone who knows nothing about hair systems. Calm, matter-of-fact, following the hair replacement tone rules in the brand book. Main CTA: **BOOK A FREE CONSULTATION**, linking to Bryton's booking page. Bryton does all hair system work; say so on the page ("All hair system work is done by Bryton.").

Explain the process as four numbered steps:

1. **01 / Free consultation and color match.** Start here — new clients must book this before any other hair replacement service. We talk through what you want, look at your hair and scalp, answer questions, explain options, pricing and maintenance, decide whether a hair system makes sense for you, and match the system, color and density. Free.
2. **02 / First installation.** The system is customized, installed, cut and blended into your existing hair. **$1,350.** A **$1,200** rate is available if you agree to have your transformation filmed and photographed for our content. This is optional, and saying no changes nothing about the service. After your consultation you send a request for this appointment; we review it and confirm once it's scheduled.
3. **03 / Maintenance.** Every 2–4 weeks the system is removed and cleaned, your scalp is prepared, fresh adhesive is applied, and the system is reinstalled and adjusted. **We recommend learning to do this yourself** — we'll teach you in person if you'd like. You can also book it with us for **$175**.
4. **04 / Replacing the system.** Hair systems aren't permanent. A system typically lasts **2–6 months**, depending on the system and how much wear and tear it gets. Explain why they wear, what affects how long they last, and how you'll know it's time for a new one. Never present one replacement schedule as a guarantee. Existing clients can buy one system at a time or several prepared at once (below).

### Hair system prices

| Service | Who it's for | Price |
| --- | --- | --- |
| Free consultation and color match | Everyone new — the required first step | Free |
| First installation | New clients, after the consultation | $1,350 |
| First installation — filmed | New clients who agree to be filmed and photographed | $1,200 |
| Re-application (maintenance) | Existing clients | $175 |
| 1 new hair system | Existing clients | $650 |
| 3 new hair systems | Existing clients | $1,500 ($500 each) |
| 4 new hair systems | Existing clients | $2,000 ($500 each) |
| 6 new hair systems — about a year's supply | Existing clients | $3,000 ($500 each) |

Every new system is customized, cut and blended to match your look. Buying several at once gives you backups ready to go and means fewer trips — useful if you travel or live farther away.

### What it costs over a year

Be open that it depends on how long your systems last and whether you do your own maintenance. Show the plan we recommend first, then the alternative:

- **Recommended: 6-system package + your own maintenance.** $3,000 for about a year of systems — roughly **$250 a month**.
- **Same package + maintenance with us every 2–4 weeks.** Add $175 a visit: about $2,300–$4,550 a year, so roughly **$440–$630 a month** in total.
- **Buying one system at a time.** $650 each instead of $500 — at 6 systems a year that's $3,900.

Your first year also includes the first installation ($1,350, or $1,200 filmed). Your own number depends on your hair and your schedule; we'll go through it at the free consultation.

### What it costs per day

Right under the yearly costs, a short block that turns the recommended plan into a daily number:

| Plan | Per year | Per month | Per day |
| --- | --- | --- | --- |
| 6-system package + your own maintenance | $3,000 | about $250 | **about $8.22** |
| 6-system package + maintenance with us | about $5,275–$7,550 | about $440–$630 | about $14.45–$20.68 |
| One system at a time + your own maintenance | $3,900 | about $325 | about $10.68 |

Headline and line for this block:

> **ABOUT $8 A DAY.**
> Skip the morning Starbucks. Keep the hair.

Under it, in `body-sm`: "Based on the 6-system package with maintenance done at home. Doesn't include your first installation or supplies. Your own number depends on how long your systems last."

This is the one place on the hair replacement page where a joke fits: it's about the money, not about anyone's hair loss. Keep it to this one line.

Answer the questions people may be embarrassed to ask, each in a few plain sentences:

- **Does it look real? Can people tell?** We match the color, density and texture to your hair and cut the system into your existing hair, so it looks like your own hair.
- **How is it attached?** With tape or glue, depending on you and your lifestyle. We'll decide which at your consultation.
- **Can I shower in it? Can I exercise in it?** Yes. Wait 48 hours after it's attached before getting it wet; after that, live normally.
- **What happens to my existing hair?** The hair where the system sits is shaved so it attaches securely. The rest of your hair stays and is blended into the system.
- **What kind of systems do you use?** Our own hair systems, not another brand's. We work with all base types and choose the right one for you.
- **How often do I come back?** Maintenance is every 2–4 weeks. We recommend learning to do it yourself — we'll teach you in person if you'd like — and coming in when you need new systems. You can also book maintenance with us.
- **How long does a system last?** Usually 2–6 months, depending on the system and how much wear it gets.
- **What does maintenance involve?** Removing and cleaning the system, prepping your scalp, applying fresh adhesive, and reattaching and adjusting it.
- **How much does it cost over time?** See "What it costs over a year" above.

Before-and-after photos only with permission, captioned with facts. Say clearly that clients who want privacy are just as welcome.

## Free haircut application

A dedicated page where people apply for a free haircut in exchange for letting us film the appointment and use the footage and photos on YouTube and social media. Main button: **APPLY**, never "Book".

### Before the form

Say these plainly, as a short list above the form:

- The haircut is free because the appointment is being filmed. It will be filmed and photographed at Broken Arrow Barbershop in Orem, Utah, and used on our YouTube and social media.
- This is an application, not a booking. We have a limited number of filming spots each month and can't take everyone.
- We'll only contact you if you're picked. If you're not picked this time, you're welcome to apply again next month.
- We're especially looking for people who are open to a big change, have longer or grown-out hair, have thinning hair or a receding hairline, have a hair problem they haven't been able to solve, or are willing to give the barber some creative freedom.
- Interested in a hair system? Book a free consultation instead. Filmed hair system installs are a separate option at a reduced price.

### The form

Required fields are marked *. Keep helper text short and plain.

1. **Name***
2. **Email***
3. **Phone number**
4. **Are you 18 or older?*** Yes / No
5. **Where do you live?*** City and state, so we know you can get to the shop in Orem.
6. **What do you want from your haircut?*** Give us as much as you can: the style you're after, anything you like or don't like about your hair now, how much time you spend on it in the morning.
7. **Reference photo** (optional) — a photo of a style you like.
8. **Photos of your hair right now*** — front, side and back, in normal light.
9. **Which of these describe your hair?** (tick any) Longer or grown out · Thinning or receding · Curly or textured · Cowlicks or difficult growth · Haven't had a good cut in a while · Ready for a big change · Other
10. **How much creative freedom are you willing to give the barber?*** Do whatever you think works · Some, within limits · I know exactly what I want
11. **When was your last haircut?*** Add anything we should know about it, like only the sides were cut or you have an undercut.
12. **Anything else we should know?** Why your haircut would make a good video, or anything else that's relevant.
13. **Days or times that work for you** — we can't promise them, but we'll try.
14. **How did you hear about us?**
15. **Filming agreement*** ☐ I understand the haircut is free because the appointment will be filmed and photographed, and that the footage and photos may be used on Broken Arrow's YouTube, social media and website.

### After submitting

"Thanks for applying. We'll be in touch if you're picked for a filming spot. If you don't hear from us this month, apply again next month."

## Content and outdoors

Content exists to show the work in the chair. Outdoor imagery can set the atmosphere, but the site is about the barbershop. Bryton's personal outdoor YouTube channel is separate and doesn't appear on the Broken Arrow site.

## Later: the shop

When Broken Arrow Grooming launches, products sit in the same Shopify store under the Broken Arrow Grooming name. Until then, don't show an empty store or "coming soon" product pages.
