import re
from bs4 import Tag
from convert import HOOKS

def dyn(t, **attrs):
    t['data-ba-dynamic'] = ''
    for k, v in attrs.items(): t[k.replace('_', '-')] = v

def home(root, c):
    for p in root.find_all('p'):
        if re.match(r'(Open today|Closed today)', p.get_text()): dyn(p, data_ba_today='')
    days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    for sp in root.find_all('span'):
        if sp.get_text() in days and sp.parent.name == 'div':
            dyn(sp.parent, data_ba_day=str(days.index(sp.get_text())))
    hero = root.find('section', attrs={'data-screen-label': re.compile('Hero')})
    btn = hero.find('a', class_='ba-btn')
    btn.parent['data-ba-avail-slot'] = 'shop'
    for h3 in root.find_all('h3'):
        k = h3.get_text().strip().lower()
        if k in ('bryton', 'connor', 'elise'):
            h3.parent['data-ba-avail-after'] = k
    c.extra_css = ['.ba-avail-shop:hover { color: var(--on-band) !important; border-color: var(--on-band) !important; }',
                   '.ba-avail-barber:hover { color: var(--green) !important; }',
                   '@media (max-width: 639px) { .ba-avail-shop { margin-left: 0 !important; padding: 0 16px !important; } }']
    c.js = ['ba-home.js']
HOOKS['Home'] = home

def barber(key):
    def h(root, c):
        hero = root.find('section') or root
        btn = hero.find('a', class_='ba-btn')
        slot = btn.parent.parent
        slot['data-ba-avail-slot'] = key
        for p in root.find_all('p'):
            t = p.get_text()
            if re.search(r'has \d+ years of experience|has a year of experience', t):
                dyn(p, data_ba_years='byears' if key == 'bryton' else 'years')
        c.extra_css = ['.ba-avail-hero:hover { color: var(--on-band) !important; border-color: var(--on-band) !important; }']
        c.js = ['ba-barber.js']
        c.root_attrs = f' data-ba-barber="{key}"'
    return h
for k in ('bryton', 'connor', 'elise'):
    HOOKS['Barber - ' + k.title()] = barber(k)

SQ = [('first', ['yes','no']), ('length', ['short','mid']), ('want', ['keep','new']), ('beard', ['yes','no'])]
def service_quiz(variant):
    def h(root, c):
        QT = ['Is this your first visit?', 'How long do you wear your hair?', 'Keeping your style or changing it?', 'Beard too?']
        groups = [g for g in root.find_all('div', attrs={'role': 'group'}) if g.get('aria-label') in QT]
        assert len(groups) == 4, len(groups)
        box = groups[0].parent
        box['data-ba-service-quiz'] = variant
        for g, (k, vals) in zip(groups, SQ):
            for b, v in zip(g.find_all('button'), vals):
                b['data-ba-q'] = k; b['data-ba-v'] = v
        c.js = c.js + ['ba-service-quiz.js']
    return h
HOOKS['Services'] = service_quiz('page')
HOOKS['Service Quiz'] = service_quiz('band')

HR_FAQ = [
  ('Does it look real? Can people tell?', 'We match the color, density and texture to your hair and cut the system into your existing hair, so it looks like your own hair.'),
  ('How is it attached?', "With tape or glue, depending on you and your lifestyle. We'll decide which at your consultation."),
  ('Can I shower in it? Can I exercise in it?', "Yes. Wait 48 hours after it's attached before getting it wet; after that, live normally."),
  ('What happens to my existing hair?', 'The hair where the system sits is shaved so it attaches securely. The rest of your hair stays and is blended into the system.'),
  ('What kind of systems do you use?', "Our own hair systems, not another brand's. We work with all base types and choose the right one for you."),
  ('How often do I come back?', "Maintenance is every 2–4 weeks. We recommend learning to do it yourself (we'll teach you in person if you'd like) and coming in when you need new systems. You can also book maintenance with us."),
  ('How long does a system last?', 'Usually 2–6 months, depending on the system and how much wear it gets.'),
  ('What does maintenance involve?', 'Removing and cleaning the system, prepping your scalp, applying fresh adhesive, and reattaching and adjusting it.'),
]
def accordion(root, soup_new, items, ans_style, toggle_css):
    """Give every FAQ item its answer paragraph (the design only rendered the open one)."""
    btns = [b for b in root.find_all('button') if b.get('aria-expanded') is not None and b.find('span') and b.find('span').get_text().strip() in dict(items)]
    for b in btns:
        q = b.find('span').get_text().strip()
        wrap = b.parent
        wrap['data-ba-acc-item'] = ''
        b['data-ba-acc-btn'] = ''
        b.find_all('span')[1]['data-ba-acc-sign'] = ''
        p = wrap.find('p')
        if p is None:
            p = soup_new.new_tag('p'); p['style'] = ans_style; p.string = dict(items)[q]; p['hidden'] = ''
            wrap.append(p)
        p['data-ba-acc-panel'] = ''
    return btns

def hair(root, c):
    from bs4 import BeautifulSoup
    soup = BeautifulSoup('', 'lxml')
    sec = root.find('section', id='quiz')
    col = sec.find('div').find_all('div', recursive=False)[1]
    dyn(col, data_ba_hair_quiz='')
    btns = accordion(root, soup, HR_FAQ, 'padding: 0px 0px 24px; font-size: 17px; line-height: 28px; color: var(--ink-muted); max-width: 640px;', '')
    assert len(btns) == 8, len(btns)
    btns[0].parent.parent['data-ba-accordion'] = 'single'
    c.extra_css = ['.ba-hq-opt:hover { color: var(--green) !important; }']
    c.js = ['ba-accordion.js', 'ba-hair-quiz.js']
HOOKS['Hair Replacement'] = hair

from bs4 import BeautifulSoup as _BS
def frag(html):
    return _BS(html, 'html.parser')

def name_fields(form, labels):
    """labels: {label text prefix: key} for TextFields; returns nothing."""
    for f in form.select('.ba-field'):
        lab = f.find('label', class_='ba-field-label')
        txt = lab.get_text().replace('*', '').strip()
        for pre, key in labels.items():
            if txt.startswith(pre):
                el = f.find(['input', 'textarea'])
                el['name'] = key
                break
        else:
            print('   !! unnamed field', txt)

def name_checks(form, legend_prefix, key, radio=None):
    for fs in form.find_all('fieldset'):
        lg = fs.find('legend')
        if lg and lg.get_text().startswith(legend_prefix):
            for lab in fs.select('label.ba-check'):
                inp = lab.find('input'); inp['name'] = key
                inp['value'] = lab.find_all('span')[-1].get_text()
            return fs
    print('   !! no fieldset', legend_prefix)

def name_single(form, text_prefix, key):
    for lab in form.select('label.ba-check'):
        if lab.find_all('span')[-1].get_text().startswith(text_prefix):
            lab.find('input')['name'] = key; return
    print('   !! no checkbox', text_prefix)

def add_done(form, html):
    d = frag(html).find()
    d['data-ba-done'] = ''; d['hidden'] = ''
    form.insert_before(d)

def free_haircut(root, c):
    form = root.find('form')
    form['data-ba-form'] = 'free-haircut'
    name_fields(form, {'Name': 'name', 'Email': 'email', 'Phone': 'phone', 'Where do you live': 'city', 'What do you want': 'want', 'When was your last': 'last', 'Instagram or photo': 'photo'})
    name_checks(form, 'Are you 18', 'adult')
    name_checks(form, 'Which of these describe', 'hair')
    name_checks(form, 'How much creative freedom', 'freedom')
    name_single(form, 'I’m looking for a big', 'big')
    name_single(form, 'I understand the haircut is free', 'agree')
    add_done(form, '<div style="grid-column:span 2;display:flex;flex-direction:column;gap:24px;max-width:680px;border-top:2px solid var(--ink);padding-top:32px"><h2 class="ba-display" style="font-size:clamp(40px,5vw,64px)">Thanks for applying.</h2><p style="font-size:20px;line-height:34px;text-wrap:pretty">We’ll be in touch if you’re picked for a filming spot. If you don’t hear from us this month, apply again next month.</p><div><a class="ba-btn ba-btn-secondary" href="/">BACK TO THE HOME PAGE</a></div></div>')
    c.js = ['ba-form-kit.js', 'ba-free-haircut.js']
HOOKS['Free Haircut'] = free_haircut

def careers(root, c):
    form = root.find('form'); form['data-ba-form'] = 'careers'
    name_fields(form, {'Your name': 'name', 'Email': 'email', 'Phone': 'phone', 'Instagram or portfolio': 'ig', 'Anything else': 'note'})
    name_checks(form, 'Where are you at', 'stage')
    add_done(form, '<div style="display:flex;flex-direction:column;gap:12px;background:var(--canvas);padding:28px;border:1px solid var(--line)"><p class="ba-label">Application received</p><p style="font-size:17px;line-height:28px">Thanks, <span data-ba-first>there</span>. We’ll keep your details on file and reach out by email if a chair opens up.</p></div>')
    c.js = ['ba-form-kit.js', 'ba-careers.js']
HOOKS['Careers'] = careers

def appr_app(root, c):
    form = root.find('form'); form['data-ba-form'] = 'apprenticeship'
    name_fields(form, {'Full name': 'name', 'Phone': 'phone', 'Email': 'email', 'City': 'city', 'Why do you want': 'why', 'Instagram': 'ig'})
    name_single(form, 'I understand the goal', 'commit')
    add_done(form, '<div style="display:flex;flex-direction:column;gap:12px"><p class="ba-label">Application received</p><p style="font-size:17px;line-height:28px">Thanks, <span data-ba-first>there</span>. We’ll keep your application on file and reach out when an apprenticeship opens.</p></div>')
    c.js = ['ba-form-kit.js', 'ba-apprenticeship.js']
HOOKS['Apprenticeship Application'] = appr_app

def education(root, c):
    form = root.find('form'); form['data-ba-form'] = 'education-notify'
    form.find('input')['name'] = 'email'
    d = frag('<p class="ba-label" style="color:var(--on-band)">You’re on the list.</p>').find()
    d['data-ba-done'] = ''; d['hidden'] = ''
    form.insert_before(d)
    c.js = ['ba-email-notify.js']
HOOKS['Education'] = education

def filt(tabs_container, tab_ids, items, cats, style, hash_ids=None):
    tabs = tabs_container.find_all('button')
    assert len(tabs) == len(tab_ids), (len(tabs), tab_ids)
    tabs_container['data-ba-filter'] = style
    if hash_ids: tabs_container['data-ba-filter-hash'] = ','.join(hash_ids)
    for b, i in zip(tabs, tab_ids): b['data-ba-tab'] = i
    assert len(items) == len(cats), (len(items), len(cats))
    for it, cat in zip(items, cats): it['data-ba-cat'] = cat
    tabs_container['data-ba-filter-scope'] = ''

def journal(root, c):
    src = open('proj/Journal.dc.html').read()
    cats = re.findall(r"\n      \['(\w+)', '[^']*', '\d+ min'", src)
    tl = root.find('div', attrs={'role': 'tablist'})
    grid = tl.find_next_sibling('div')
    filt(tl, ['all', 'guides', 'systems', 'transformations', 'howto', 'news'], grid.find_all('a', recursive=False), cats, 'underline')
    c.js = ['ba-filter.js']
HOOKS['Journal'] = journal

def learn(root, c):
    tl = root.find('div', attrs={'role': 'tablist'})
    grid = root.find('section', attrs={'data-screen-label': 'Learn / Grid'}).find('div')
    filt(tl, ['all', 'howto'], grid.find_all('a', recursive=False), ['howto', 'howto'], 'pill')
    c.js = ['ba-filter.js']
HOOKS['Learn'] = learn

def shop(root, c):
    tl = root.find('div', attrs={'role': 'tablist'})
    grid = root.find('div', attrs={'data-grid': 'shop'})
    items = grid.find_all('article', recursive=False)
    filt(tl, ['all', 'grooming'], items, ['grooming'] * len(items), 'underline', ['grooming'])
    c.js = ['ba-filter.js']
HOOKS['Shop'] = shop

def product_quiz(root, c):
    sec = root.find('section')
    sec['data-ba-pq-start'] = ''
    sec.find('button')['data-ba-pq-begin'] = ''
    box = frag('<div data-ba-product-quiz="" data-img-clay="@@ASSET:ba-clay-card.webp@@" data-img-cream="@@ASSET:ba-cream-card.webp@@" data-img-salt="@@ASSET:ba-salt-card.webp@@"></div>').find()
    sec.insert_after(box)
    c.extra_css = ['.ba-pq-link:hover { color: var(--green) !important; }', '.ba-pq-opt:hover { border-color: var(--ink) !important; }']
    c.js = ['ba-product-quiz.js']
HOOKS['Product Quiz'] = product_quiz

def matte_clay(root, c):
    from bs4 import BeautifulSoup
    soup = BeautifulSoup('', 'lxml')
    sec = root.find('section')
    thumbs_grid = None
    for d in sec.find_all('div', style=True):
        if 'repeat(4, minmax(0px, 1fr))' in d['style']: thumbs_grid = d; break
    main = thumbs_grid.find_previous_sibling('div')
    main['data-mc-photo'] = ''
    main['data-mark'] = '@@ASSET:ba-mark-black.svg@@'
    for i, b in enumerate(thumbs_grid.find_all('button', recursive=False)): b['data-mc-thumb'] = str(i)
    for p in sec.find_all('p'):
        if re.match(r'^\$\d', p.get_text()) and 'font: 600 24px' in p.get('style',''): dyn(p, data_mc_head='')
    rg = sec.find('div', attrs={'role': 'radiogroup'})
    for i, b in enumerate(rg.find_all('button', recursive=False)): b['data-mc-set'] = str(i)
    once = None
    for b in sec.find_all('button', attrs={'role': 'radio'}):
        t = b.get_text()
        if 'One-time purchase' in t:
            b['data-mc-once'] = ''; once = b
            sp = b.find_all('span', recursive=False); sp[0]['data-mc-dot'] = 'once'; sp[-1]['data-mc-onceprice'] = ''
        if 'Subscribe and save' in t:
            b['data-mc-sub'] = ''; b.parent['data-mc-subbox'] = ''
            sp = b.find_all('span', recursive=False); sp[0]['data-mc-dot'] = 'sub'
            sp[-1].find('s')['data-mc-subwas'] = ''; sp[-1].find_all('span')[-1]['data-mc-subprice'] = ''
    grp = sec.find('div', attrs={'role': 'group', 'aria-label': 'Delivery frequency'})
    for i, b in enumerate(grp.find_all('button')): b['data-mc-freq'] = str(i)
    for b in sec.find_all('button', class_='ba-btn'):
        if 'ADD TO CART' in b.get_text(): dyn(b, data_mc_add='')
    # details accordion (Open / Close)
    det = [('What it does', 'Holds your style in place all day without shine or crunch. Washes out with shampoo.'),
           ('Ingredients', 'Full ingredient list goes here once the formula is final.'),
           ('Shipping and pickup', 'Orders ship within 2 business days. Local pickup is free at the shop in Orem during open hours.')]
    btns = accordion(sec, soup, det, 'padding: 0px 0px 20px; font-size: 17px; line-height: 28px; color: var(--ink-muted); max-width: 560px;', '')
    btns[0].parent.parent['data-ba-accordion'] = 'single'
    btns[0].parent.parent['data-acc-open'] = 'Close'; btns[0].parent.parent['data-acc-closed'] = 'Open'
    # ingredients
    ing = root.find('section', id='ingredients')
    grid = [d for d in ing.find_all('div', style=True) if 'repeat(auto-fit' in d['style']][0]
    grid['data-ba-accordion'] = 'single'
    for card in grid.find_all('div', recursive=False):
        card['data-ba-acc-item'] = ''
        b = card.find('button'); b['data-ba-acc-btn'] = ''
        arrow = b.find_all('span')[1]; arrow['data-ba-acc-sign'] = ''; arrow['data-rot-open'] = 'rotate(-135deg) translate(-2px,-2px)'; arrow['data-rot-closed'] = 'rotate(45deg) translate(-2px,-2px)'
        panel = frag('<div hidden="" data-ba-acc-panel="" style="display:flex;flex-direction:column;gap:10px;padding:0 18px 20px"><p class="ba-label" style="color:var(--ink-muted)">Why we use it</p><p style="font-size:15px;line-height:24px;text-wrap:pretty">Why we use it and what it does. Coming soon.</p></div>').find()
        card.append(panel)
    c.extra_html = '{%- if product -%}<script type="application/json" data-mc-product>{{ product | json }}</script>{%- endif -%}'
    c.js = ['ba-accordion.js', 'ba-matte-clay.js']
HOOKS['Product - Matte Clay'] = matte_clay

import base64
def RAW(liquid):
    from bs4 import NavigableString
    return NavigableString('@@RAW:' + base64.b64encode(liquid.encode()).decode() + '@@')

def liquid_form(form, open_tag, form_id):
    """Turn a design <form> into a Shopify {% form %} with the same layout."""
    style = form.get('style', '')
    form.insert_before(RAW(open_tag.replace('%ID%', form_id)))
    form.insert_after(RAW('{%- endform -%}'))
    form.name = 'div'; form.attrs = {'data-ba-form-body': form_id, 'style': style}
    return form

def wholesale(root, c):
    access = root.find('section', attrs={'data-screen-label': 'Wholesale / Access'})
    cols = access.find_all('div', recursive=False)
    login_col, apply_col = cols[0], cols[1]
    # Signed-in panel (from the design's shopify/wholesale-apply.liquid), shown instead of the forms.
    access.insert(0, RAW('''{%- if customer -%}
  <div style="flex:1 1 340px;min-width:0;max-width:720px;display:flex;flex-direction:column;gap:20px;border-top:2px solid var(--ink);padding-top:28px">
    <p class="ba-label">Signed in as {{ customer.email }}</p>
    {%- if customer.tags contains 'wholesale' -%}
      <h2 class="ba-display" style="font-size:clamp(32px,3.6vw,44px)">Your wholesale account is ready.</h2>
      <div><a class="ba-btn ba-btn-primary" href="/pages/wholesale-shop">GO TO THE WHOLESALE SHOP</a></div>
    {%- else -%}
      <h2 class="ba-display" style="font-size:clamp(32px,3.6vw,44px)">Your application is being reviewed.</h2>
      <p style="font-size:17px;line-height:28px">We’ll email you when your account is approved.</p>
    {%- endif -%}
    <p style="font-size:15px;line-height:24px"><a href="{{ routes.account_logout_url }}">Sign out</a></p>
  </div>
{%- else -%}'''))
    access.append(RAW('{%- endif -%}'))
    # Sign in -> Shopify customer accounts (one-time code by email; no passwords with new customer accounts).
    lf = login_col.find('form')
    btn = lf.find('button')
    signin = frag('<div style="display:flex;flex-direction:column;gap:24px"><p style="font-size:17px;line-height:28px;text-wrap:pretty">Sign in with the email you applied with. We’ll email you a one-time code.</p><div></div></div>').find()
    link = frag('<a class="ba-btn ba-btn-primary" href="{{ routes.account_login_url }}?return_url=%2Fpages%2Fwholesale-shop"></a>').find()
    link.string = btn.get_text()
    signin.find_all('div')[-1].append(link)
    lf.replace_with(signin)
    # Application -> Shopify customer form (works with new customer accounts), tagged wholesale-pending.
    af = apply_col.find('form')
    name_fields(af, {'Business name': 'customer[note][Business name]', 'Your name': 'ba_name', 'Email': 'customer[email]', 'Phone': 'customer[note][Phone]',
                     'Business address': 'customer[note][Business address]', 'Barber license number': 'customer[note][Credential number]',
                     'Issuing state': 'customer[note][License state]', 'Password': 'customer[password]', 'Confirm password': 'ba_confirm', 'Upload a copy': 'ba_file'})
    fs = name_checks(af, 'What kind of business', 'customer[note][Business type]')
    for fs2 in af.find_all('fieldset'):
        if 'Professional credential' in fs2.get_text():
            for lab, val in zip(fs2.select('label.ba-check'), ['ein', 'barber', 'cosmo']):
                inp = lab.find('input'); inp['name'] = 'customer[note][Credential type]'; inp['value'] = lab.find_all('span')[-1].get_text(); inp['data-cred'] = val
            fs2['data-ba-cred'] = ''
            for f in fs2.select('.ba-field'):
                if f.find('input', attrs={'name': 'customer[note][Credential number]'}): f['data-ba-credfield'] = ''
                if f.find('input', attrs={'name': 'customer[note][License state]'}): f['data-ba-statefield'] = ''
                fi = f.find('input', attrs={'type': 'file'})
                if fi:
                    del fi['name']
                    hint = f.find('p', class_='ba-field-hint')
                    hint.string = 'A photo or PDF of your license or EIN letter speeds up approval. Reply to the email we send you with the file attached.'
    pf = name_checks(af, 'Which products', 'customer[note][Interested in]')
    for i, inp in enumerate(pf.find_all('input')): inp['name'] = f'customer[note][Interested in {i + 1}]'
    name_single(af, 'I understand wholesale orders', 'customer[note][Agreed to packs of 6]')
    for i in af.find_all('input', attrs={'name': 'customer[note][Agreed to packs of 6]'}): i['value'] = 'Yes'
    for lab in af.find_all('p', class_='ba-label'):
        if 'Create your sign' in lab.get_text(): lab.parent.decompose()
    af.insert(0, frag('<input type="hidden" name="customer[tags]" value="wholesale-pending"><input type="hidden" name="customer[first_name]" value=""><input type="hidden" name="customer[last_name]" value="">'))
    for i in af.find_all(attrs={'name': True}):
        if i['name'].startswith('customer['): i['name'] = 'contact[' + i['name'][9:]
    done = frag('<div data-ba-done="" hidden="" style="display:flex;flex-direction:column;gap:16px;background:var(--canvas-sunk);padding:28px"><p class="ba-label">Application received</p><p style="font:800 clamp(24px,2.6vw,32px)/1.1 var(--font-display);letter-spacing:-.02em;text-transform:uppercase">Thanks, <span data-ba-first>there</span>.</p><p style="font-size:17px;line-height:28px;text-wrap:pretty">We’ll check your <span data-ba-cred-name>license</span> and email <span data-ba-applied-email>you</span> when your account is approved. Once it is, sign in with this email and we’ll send you a one-time code.</p></div>').find()
    af.insert_before(done)
    liquid_form(af, "{%- form 'customer', id: '%ID%' -%}{{ form.errors | default_errors }}", 'BaWholesaleApply')
    c.extra_css = ['#BaWholesaleApply { display: block; }']
    c.js = ['ba-form-kit.js', 'ba-wholesale.js']
HOOKS['Wholesale'] = wholesale
