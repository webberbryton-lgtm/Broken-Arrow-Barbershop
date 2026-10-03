import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
const ROOT = path.resolve('proj'); const NPM = path.resolve('node_modules');
const map = {
 'react@18.3.1/umd/react.production.min.js': NPM+'/react/umd/react.production.min.js',
 'react-dom@18.3.1/umd/react-dom.production.min.js': NPM+'/react-dom/umd/react-dom.production.min.js',
 '@babel/standalone@7.29.0/babel.min.js': NPM+'/@babel/standalone/babel.min.js'};
let sup = fs.readFileSync('proj/support.js','utf8');
const needle='r.tpl = compileTemplate(html, host);';
if(!sup.includes(needle)) throw 'no needle';
sup = sup.replace(needle, needle+' (window.__dcT=window.__dcT||{})[name]=r.tpl&&r.tpl.__annotated;');
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.json':'application/json'};
const srv = http.createServer((q,r)=>{ let p = decodeURIComponent(q.url.split('?')[0]);
  if (p==='/support.js'){ r.writeHead(200,{'content-type':'text/javascript'}); return r.end(sup); }
  let f = path.join(ROOT,p);
  if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); } r.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'}); fs.createReadStream(f).pipe(r); }).listen(8766);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport:{width:1280,height:900} });
await ctx.route('https://unpkg.com/**', (route)=>{ const u = route.request().url().replace('https://unpkg.com/',''); const f = map[u]; if (f) route.fulfill({ path:f, contentType:'text/javascript'}); else route.abort(); });
const all={};
for (const p of fs.readdirSync('proj').filter(f=>f.endsWith('.dc.html'))) {
  const page = await ctx.newPage();
  await page.goto('http://localhost:8766/'+encodeURI(p), { waitUntil:'networkidle' });
  await page.waitForTimeout(800);
  Object.assign(all, await page.evaluate(()=>window.__dcT||{}));
  await page.close();
}
fs.writeFileSync('dctpl.json', JSON.stringify(all));
console.log(Object.keys(all).length);
await browser.close(); srv.close();
