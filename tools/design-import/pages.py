import json
GUIDES=json.load(open('guide_slugs.json'))
# design file base -> (handle, url, template, layout)
P={}
def add(f,h,url=None,tpl=None,layout='ba'):
    P[f]=dict(handle=h,url=url or f'/pages/{h}',template=tpl or f'page.{h}',layout=layout)
add('Home','home','/','index')
for f,h in [('About','about'),('Services','services'),('Service Quiz','service-quiz'),('Hair Replacement','hair-replacement'),
 ('Free Haircut','free-haircut'),('Team','team'),('Barber - Bryton','bryton'),('Barber - Connor','connor'),('Barber - Elise','elise'),
 ('Journal','journal'),('FAQ','faq'),('Careers','careers'),('Education','education'),('Apprenticeship','apprenticeship'),
 ('Apprenticeship Application','apprenticeship-application'),('Privacy Policy','privacy-policy'),('Terms of Service','terms-of-service'),
 ('Shipping','shipping'),('Returns','returns'),('Accessibility Statement','accessibility'),('Contact','contact'),
 ('Blog - Our Story','broken-arrow-barbershop-story'),('Blog - Barber in Orem Utah','barber-orem-utah-broken-arrow'),
 ('Blog - Best of Utah Valley 2026','best-barbershop-utah-valley-2026')]:
    add(f,h)
for f,h in [('Shop','shop'),('Learn','learn'),('Product Quiz','product-quiz'),('Wholesale','wholesale'),('Wholesale Shop','wholesale-shop'),('Grooming About','grooming-about')]:
    add(f,h,layout='ba-store')
add('Product - Matte Clay','matte-clay','/products/matte-clay','product.matte-clay','ba-store')
for f,slug in GUIDES.items(): add(f,slug,tpl='page.'+slug)
URL={f:v['url'] for f,v in P.items()}

P['Home']['mobile_bp']=640
