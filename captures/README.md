# Captures

- `reference-*-{390,820,1440}.json` — each reference page's headed sections and measured boxes at the program's three widths (`capture.cjs`). The full-page screenshots were taken and then removed from the repo: they carry the reference's photography.
- `tokens-home.json`, `tokens-guide.json` — the register measured from the reference (`tokens.cjs`). The study follows the guide's.
- `icons-scan.cjs` — lists and saves the reference pages' SVG icons; the ones used are in `src/site-icons`.
- `unsplash.tsv` — provenance of every photograph.
- `study.cjs` — screenshots of the study at three widths; `study-*-1440.jpg` are the current ones.
- `scan.cjs` — overflow, fitted-line floor and axe, Chrome and WebKit, three widths, both schemes.
- `proof-calculator.png` — the calculator with its result open, at 1440.
- `measure.cjs` — the band table in the README.

```bash
NODE_PATH=<a node_modules with playwright> node captures/scan.cjs http://localhost:5185/ index life-insurance term-life whole-life guide advisor disability-calculator "disability-calculator?example"
```
