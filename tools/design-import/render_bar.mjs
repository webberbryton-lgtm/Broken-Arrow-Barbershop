import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
const ROOT = path.resolve('proj'); const NPM = path.resolve('node_modules');
const map = {
 'react@18.3.1/umd/react.production.min.js': NPM+'/react/umd/react.production.min.js',
 'react-dom@18.3.1/umd/react-dom.production.min.js': NPM+'/react-dom/umd/react-dom.production.min.js',
 '@babel/standalone@7.29.0/babel.min.js': NPM+'/@babel/standalone/babel.min.js'};
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.json':'application/json'};
const srv = http.createServer((q,r)=>{ let p = decodeURIComponent(q.url.split('?')[0]); let f = path.join(ROOT,p);
  if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); } r.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'}); fs.createReadStream(f).pipe(r); }).listen(8765);
const pages = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }).catch(()=>chromium.launch());
const ctx = await browser.newContext({ viewport:{width:390,height:800} });
await ctx.route('https://unpkg.com/**', (route)=>{ const u = route.request().url().replace('https://unpkg.com/',''); const f = map[u]; if (f) route.fulfill({ path:f, contentType:'text/javascript'}); else route.abort(); });
fs.mkdirSync('rendered',{recursive:true});
for (const p of pages) {
  const page = await ctx.newPage(); const errs=[];
  page.on('pageerror', e=>errs.push(String(e))); page.on("console", m=>{ if (m.type()==="error") errs.push(m.text()); }); page.on("requestfailed", q=>errs.push("RF "+q.url())); page.on("response", s=>{ if (s.status()>=400) errs.push("404 "+s.url()); });
  await page.goto('http://localhost:8765/'+encodeURI(p), { waitUntil:'networkidle' });
  await page.waitForTimeout(1500);
  const bar = await page.evaluate(()=>{ const h=document.querySelector('header[data-hdr]'); const b=[...document.querySelectorAll('div[style*="position: fixed"] a')].map(a=>[a.getAttribute('href'),a.textContent]); return {hdr:h&&h.dataset.hdr,bar:b}; });
  fs.writeFileSync('rendered/'+p.replace(/\.dc\.html$/,'')+'.bar.json', JSON.stringify(bar)); const html='';
  console.log(p, html.length, errs.slice(0,3).join(' | '));
  await page.close();
}
await browser.close(); srv.close();
