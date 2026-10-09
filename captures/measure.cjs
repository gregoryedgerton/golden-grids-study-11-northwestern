// Measures every band's grid at the program's three widths and prints the README's band table.
//   NODE_PATH=<node_modules with playwright> node captures/measure.cjs [base-url]
const { chromium } = require('playwright');
const PAGES = ['index', 'life-insurance', 'term-life', 'whole-life', 'guide', 'advisor'];
(async () => {
  const base = process.argv[2] || 'http://localhost:5185/';
  const b = await chromium.launch({ channel: 'chrome' });
  for (const page of PAGES) {
    const rows = {};
    for (const w of [390, 820, 1440]) {
      const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' })).newPage();
      await p.goto(`${base}${page}.html`, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
      const bands = await p.evaluate(() => [...document.querySelectorAll('section.band')].map((s) => ({
        id: s.id, title: (s.querySelector('h2')?.textContent || '').trim(),
        grids: [...s.querySelectorAll('.golden-grid')].filter((g) => !g.parentElement.closest('.golden-grid')).map((g) => { const r = g.getBoundingClientRect(); return `${Math.round(r.width)}×${Math.round(r.height)}`; }),
        note: (s.querySelector('.band__note')?.textContent || '').trim(), squares: s.querySelectorAll('.golden-grid__box').length,
      })));
      for (const x of bands) { rows[x.id] ??= { title: x.title, sizes: {}, notes: {} }; rows[x.id].sizes[w] = x.grids.join('+'); rows[x.id].notes[w] = x.note; rows[x.id].n = x.squares; }
      await p.context().close();
    }
    console.log(`\n### ${page}\n\n| Band | Squares | Desktop grid | Measured 390 / 820 / 1440 |\n| --- | --- | --- | --- |`);
    for (const [id, r] of Object.entries(rows)) console.log(`| ${r.title} (${id}) | ${r.n} | ${r.notes[1440].replace(/\|/g, '/')} | ${r.sizes[390]} / ${r.sizes[820]} / ${r.sizes[1440]} |`);
  }
  await b.close();
})();
