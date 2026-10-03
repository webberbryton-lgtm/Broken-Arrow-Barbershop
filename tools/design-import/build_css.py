import glob,re
D=glob.glob('proj/_ds/*/tokens')[0]
fonts={'inter-tight-latin-700-normal':'ba-inter-tight-700','inter-tight-latin-800-normal':'ba-inter-tight-800','inter-latin-400-normal':'ba-inter-400','inter-latin-500-normal':'ba-inter-500','inter-latin-600-normal':'ba-inter-600','eb-garamond-latin-400-normal':'ba-eb-garamond-400','eb-garamond-latin-500-normal':'ba-eb-garamond-500','courier-prime-latin-400-normal':'ba-courier-prime-400','courier-prime-latin-700-normal':'ba-courier-prime-700'}
f=open(D+'/fonts.css').read()
f=re.sub(r'url\("\.\./fonts/([^"]+)\.woff2"\)', lambda m: f'url("{fonts[m.group(1)]}.woff2")', f)
parts=['/* Broken Arrow design system (from Claude Design). Fonts load relative to this file in assets/. */',f]
for n in ['colors','typography','spacing','components']: parts.append(open(f'{D}/{n}.css').read())
parts.append(open('base_extra.css').read())
parts.append('/* Phone overrides from the design (mobile.css) */')
parts.append(open('proj/mobile.css').read())
open('theme/assets/ba-design.css','w').write('\n'.join(parts))
