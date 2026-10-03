import os, sys
from PIL import Image, ImageChops
from pages import P
rows=[]
for name,cfg in P.items():
    k=cfg['handle']
    for w in (1280,390):
        a,b=f'shots/d-{k}-{w}.png',f'shots/t-{k}-{w}.png'
        if not (os.path.exists(a) and os.path.exists(b)): continue
        A=Image.open(a).convert('L'); B=Image.open(b).convert('L')
        h=min(A.height,B.height)
        d=ImageChops.difference(A.crop((0,0,A.width,h)),B.crop((0,0,B.width,h))).point(lambda x: 255 if x>40 else 0)
        frac=sum(d.histogram()[255:])/ (A.width*h)
        bbox=d.getbbox()
        rows.append((frac,k,w,A.height,B.height,bbox))
rows.sort(reverse=True)
for r in rows: print(f'{r[0]*100:6.2f}% {r[1][:40]:40} w={r[2]} h={r[3]}/{r[4]} bbox={r[5]}')
