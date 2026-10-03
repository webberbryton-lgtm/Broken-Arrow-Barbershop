"""Re-apply the changes made after the design was imported, for when a fresh copy of the design is downloaded.

Each change is skipped if the design already has it, so this is safe to run more than once.
  - Terms of Service: the full terms from content/terms.md (the design's copy stops mid-sentence),
    and Info Page accepts a list of intro paragraphs.
  - Matte clay: Subscribe and save is 20% off (the design says 15%).
If the design itself is updated to include these, delete the matching block below.
"""
import json, re

def terms():
    p = 'proj/Info Page.dc.html'; s = open(p).read()
    md = open('content/terms.md').read().replace('**', '')
    blocks = [b.strip() for b in re.split(r'\n\s*\n', md) if b.strip()]
    leads, sections, updated = [], [], None
    for b in blocks:
        if b.startswith('# '): continue
        m = re.match(r'Last updated (.+)$', b)
        if m: updated = m.group(1); continue
        if b.startswith('## '): sections.append([b[3:], []]); continue
        lines = [l.strip() for l in b.split('\n')]
        target = sections[-1][1] if sections else leads
        if len(lines) == 1: target.append(lines[0])
        else: target.extend(lines)
    js = ("  terms: { group: 'Legal', title: 'Terms of service', updated: " + json.dumps(updated, ensure_ascii=False) +
          ",\n    lead: " + json.dumps(leads, ensure_ascii=False) + ",\n    sections: [\n" +
          ''.join('      [' + json.dumps(h, ensure_ascii=False) + ', ' + json.dumps(ps, ensure_ascii=False) + '],\n' for h, ps in sections) +
          "    ] },\n")
    a = s.index("  terms: { group: 'Legal'"); b = s.index("  shipping: { group:")
    s = s[:a] + js + s[b:]
    s = s.replace('<p style="font-size:clamp(19px,1.9vw,22px);line-height:1.6;text-wrap:pretty">{{ p.lead }}</p>',
                  '<sc-for list="{{ p.leads }}" as="t" hint-placeholder-count="1">\n    <p style="font-size:clamp(19px,1.9vw,22px);line-height:1.6;text-wrap:pretty">{{ t }}</p>\n  </sc-for>')
    s = s.replace("return { p: { ...p, updated: U,", "return { p: { ...p, updated: p.updated || U, leads: Array.isArray(p.lead) ? p.lead : [p.lead],")
    open(p, 'w').write(s)

def matte_clay_20():
    p = 'proj/Product - Matte Clay.dc.html'; s = open(p).read()
    s = s.replace('Save 15% on every order', 'Save 20% on every order').replace('15% off every order', '20% off every order')
    s = s.replace('const SUB = 0.15,', 'const SUB = 0.20,')
    open(p, 'w').write(s)

terms(); matte_clay_20()
print('overrides applied')
