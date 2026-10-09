// Lists the icon-sized images and inline SVGs on each reference page, saving the SVG sources.
//   NODE_PATH=<node_modules with playwright> node captures/icons-scan.cjs <outdir>
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const PAGES = { home: '', life: 'life-insurance/', term: 'life-insurance/term-life-insurance/', whole: 'life-insurance/whole-life-insurance/', guide: 'life-and-money/life-insurance-guide/', advisor: 'financial/advisor/mike-lutz/' };
(async () => {
  const out = process.argv[2] || '/tmp/ico'; fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ channel: 'chrome' });
  const seen = new Map();
  for (const [name, p] of Object.entries(PAGES)) {
    const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
    await page.goto('https://www.northwesternmutual.com/' + p, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(5000);
    await page.evaluate(async () => { const el = document.scrollingElement; for (let y = 0; y < el.scrollHeight; y += 500) { el.scrollTop = y; await new Promise(r => setTimeout(r, 120)); } el.scrollTop = 0; });
    await page.waitForTimeout(1500);
    const found = await page.evaluate(() => {
      const res = [];
      for (const e of document.querySelectorAll('img')) { const r = e.getBoundingClientRect(); if (r.width > 8 && r.width < 140 && r.height < 140 && /svg|icon/i.test(e.src)) res.push({ kind: 'img', src: e.currentSrc || e.src, alt: e.alt, w: Math.round(r.width), h: Math.round(r.height) }); }
      for (const e of document.querySelectorAll('svg')) { const r = e.getBoundingClientRect(); if (r.width > 8 && r.width < 200 && r.height > 8 && e.outerHTML.length < 20000 && e.offsetParent !== null) res.push({ kind: 'svg', html: e.outerHTML, w: Math.round(r.width), h: Math.round(r.height), near: (e.closest('h2,h3,li,button,a,div')?.textContent || '').trim().slice(0, 40) }); }
      return res;
    });
    for (const f of found) {
      const key = f.src || f.html;
      if (seen.has(key)) continue; seen.set(key, name);
      console.log(name, f.kind, f.w + 'x' + f.h, f.src || ('<svg ' + f.html.length + ' near "' + f.near + '">'));
    }
    let i = 0;
    for (const f of found.filter(f => f.kind === 'svg')) { fs.writeFileSync(path.join(out, `${name}-${i++}.svg`), f.html); }
    await page.context().close();
  }
  await b.close();
})();
