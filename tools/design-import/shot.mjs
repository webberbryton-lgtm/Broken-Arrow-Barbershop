import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import http from 'http'; import fs from 'fs'; import path from 'path';
const NPM = path.resolve('node_modules');
const map = {'react@18.3.1/umd/react.production.min.js': NPM+'/react/umd/react.production.min.js','react-dom@18.3.1/umd/react-dom.production.min.js': NPM+'/react-dom/umd/react-dom.production.min.js','@babel/standalone@7.29.0/babel.min.js': NPM+'/@babel/standalone/babel.min.js'};
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2'};
function serve(root, port, extra) { return http.createServer((q,r)=>{ let p = decodeURIComponent(q.url.split('?')[0]); let f = path.join(root,p);
  if (extra && p.startsWith('/assets/')) { f = path.join(extra, p.slice(8)); if (!fs.existsSync(f)) f = path.join(path.resolve('../../assets'), p.slice(8)); }
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'}); fs.createReadStream(f).pipe(r); }).listen(port); }
const s1 = serve(path.resolve('proj'), 8765); const s2 = serve(path.resolve('preview'), 8766, path.resolve('../../assets'));
const jobs = JSON.parse(process.argv[2]);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const j of jobs) {
  const ctx = await browser.newContext({ viewport:{width:j.w||1280,height:900} });
  await ctx.route('https://unpkg.com/**', (route)=>{ const u = route.request().url().replace('https://unpkg.com/',''); const f = map[u]; if (f) route.fulfill({ path:f, contentType:'text/javascript'}); else route.abort(); });
  const page = await ctx.newPage(); const errs=[];
  page.on('pageerror', e=>errs.push(String(e)));
  await page.goto(j.url, { waitUntil:'networkidle' }); await page.waitForTimeout(j.wait||800);
  if (j.scroll) { await page.evaluate(async()=>{ for (let y=0;y<document.body.scrollHeight;y+=600){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,60)); } window.scrollTo(0,0); }); await page.waitForTimeout(500); }
  if (j.js) await page.evaluate(j.js);
  await page.screenshot({ path: j.out, fullPage: !!j.full, clip: j.full ? undefined : undefined });
  console.log(j.out, errs.join(' | '));
  await ctx.close();
}
await browser.close(); s1.close(); s2.close();
