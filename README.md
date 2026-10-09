# Layout study — seven pages of Northwestern Mutual, as GIFcommit

**Live:** [`https://gregoryedgerton.github.io/golden-grids-study-11-northwestern/`](https://gregoryedgerton.github.io/golden-grids-study-11-northwestern/)

An unaffiliated layout study. It rebuilds the structure of seven pages of
[northwesternmutual.com](https://www.northwesternmutual.com/) as stacked
golden grids for GIFcommit, a fictional mutual insurer: the home page, [Life
insurance](https://www.northwesternmutual.com/life-insurance/), [Term life
insurance](https://www.northwesternmutual.com/life-insurance/term-life-insurance/),
[Whole life insurance](https://www.northwesternmutual.com/life-insurance/whole-life-insurance/),
the [Life Insurance Guide](https://www.northwesternmutual.com/life-and-money/life-insurance-guide/)
[an advisor's profile site](https://www.northwesternmutual.com/financial/advisor/mike-lutz/)
and the [disability insurance calculator](https://www.northwesternmutual.com/disability-insurance/disability-insurance-calculator/).
GIFcommit is not an insurer. Nothing on it is insurance, advice or an offer,
no form sends anything, and the advisor, team, address and telephone number
are invented. The words are the study's own; none of the reference's copy,
ratings, rankings or prices is carried over. Built with
[Golden Grids](https://github.com/gregoryedgerton/golden-grids) from the
[study template](https://github.com/gregoryedgerton/golden-grids-study-template).

## Reference

The six pages, captured 2026-10-08 at 390 / 820 / 1440 (measured boxes in
[`captures/reference-*.json`](captures/); the screenshots are not kept, they
carry the reference's photography). The home page is a deep-blue hero card over a
family photograph, three product tabs, a yellow advisor band, three columns, a
newsletter form, four strength figures and a FAQ list. The inner pages share
one pattern: a breadcrumb, a hero, a headed run of promises, a deep-blue
calculator band, an accordion of questions, three resource cards and a closing
call to action. The guide is the long form: eight sections, each under a
deep-blue bar with a small label ("Section 01") and a white title, in a narrow
column of light-weight text with check-list bullets and a pale panel carrying
one figure. The advisor's site is a profile card over a tab strip.

The register is the guide's, from measurement
([`captures/tokens-guide.json`](captures/tokens-guide.json)): white ground,
`#f8fafc` panels, the bar `#0e497b`, the label `#83d4f1`, links and buttons
`#1570bc`, gold `#ffb81c` for rules and the closing button, body at 19px/300 in
`#4a4a4a`, headings at 500, 2px corners, and numbers set thin. Source Sans 3
stands in for Guardian Sans. The reference has one scheme; the dark one is the
study's. (A first draft took the home page's serif-and-awning look and was
rejected.)

## The claim

A product page lists its facts at one size and lets the page's length carry
the hierarchy; here each module is one grid, the first square the hero, and
the grids are not all the same grid. About half skip a range: from 2, 3 or 4 the
library collapses the smaller squares into one strip, so a band is a run of
larger squares with a short wide figure at its corner, and the shape and the
side the lead sits on change from band to band.

## The pages

Seven Vite entries, plain relative links, no router. One component, `Squares`
([`src/bands/bands.tsx`](src/bands/bands.tsx)), draws every band: a fact, a
photograph, a strip or a widget per square. `lib/plan.ts` chooses the grid
from a table of the library's own geometry (`lib/spiral.ts`). Measured sizes
are the grid's width×height; below 1100px a skip grid falls back to a plain
one and a band of five or six is dealt into two stacked grids.

**Home** (`index.html`)

| Band | Grid at 1440 | Measured 390 / 820 / 1440 |
| --- | --- | --- |
| Welcome | from 1 to 4 · right · cw | 358×597 / 788×473 / 1140×684 |
| Planning, insurance and investing, in one conversation | from 3 to 5 · left · ccw · strip | 358×573 / 788×493 / 1140×713 |
| Your advisor is here to guide you | from 2 to 5 · top · cw · strip | 358×239+358×179 / 788×525+788×394 / 1140×713 |
| What a steadier way means for you | from 1 to 4 · right · ccw | 358×597 / 788×473 / 1140×684 |
| Why a young family needs it | from 3 to 6 · bottom · ccw · strip | 358×573 / 788×493 / 1140×702 |
| A mutual company, by design | from 4 to 7 · bottom · cw · strip | 358×239+358×179 / 788×488 / 1140×706 |
| Ready to feel easier about the future? | from 1 to 3 · bottom · cw | 358×537 / 788×525 / 1140×760 |

**Life insurance** (`life-insurance.html`)

| Band | Grid at 1440 | Measured 390 / 820 / 1440 |
| --- | --- | --- |
| Life insurance | from 3 to 5 · right · cw · strip | 358×573 / 788×493 / 1140×713 |
| Your life insurance will be designed around your life | from 1 to 3 · bottom · ccw | 358×537 / 788×525 / 1140×760 |
| Why life insurance matters | from 3 to 6 · bottom · ccw · strip | 358×239+358×179 / 788×525+788×394 / 1140×702 |
| Four kinds of life insurance | from 1 to 6 · right · cw | 358×239+358×239 / 788×525+788×525 / 1140×702 |
| Boost your life insurance knowledge | from 1 to 3 · top · ccw | 358×537 / 788×525 / 1140×760 |
| Now you're ready for a life insurance quote | from 1 to 3 · top · ccw | 358×537 / 788×525 / 1140×760 |

**Term life insurance** (`term-life.html`)

| Band | Grid at 1440 | Measured 390 / 820 / 1440 |
| --- | --- | --- |
| Term life insurance | from 1 to 4 · right · cw | 358×597 / 788×473 / 1140×684 |
| The right time in your life for term life | from 3 to 6 · top · ccw · strip | 358×239+358×179 / 788×525+788×394 / 1140×702 |
| Term life coverage that fits your life | from 2 to 4 · left · cw · strip | 358×537 / 788×525 / 1140×684 |
| Three kinds of term life insurance | from 1 to 4 · right · ccw | 358×537 / 788×525 / 1140×684 |
| Term life insurance in numbers | from 4 to 7 · bottom · cw · strip | 358×239+358×179 / 788×488 / 1140×706 |
| Ready to take the next step? | from 1 to 3 · top · ccw | 358×537 / 788×525 / 1140×760 |

**Whole life insurance** (`whole-life.html`)

| Band | Grid at 1440 | Measured 390 / 820 / 1440 |
| --- | --- | --- |
| Whole life insurance | from 2 to 4 · right · cw · strip | 358×597 / 788×473 / 1140×684 |
| What is whole life insurance? | from 1 to 3 · bottom · ccw | 358×537 / 788×525 / 1140×760 |
| Your whole life insurance policy highlights | from 3 to 6 · top · cw · strip | 358×239+358×179 / 788×525+788×394 / 1140×702 |
| How much will whole life insurance cost? | from 1 to 4 · left · ccw | 358×597 / 788×473 / 1140×684 |
| Whole life in the market | from 3 to 5 · right · ccw · strip | 358×573 / 788×493 / 1140×713 |
| Should families with young children consider whole life? | from 2 to 5 · top · cw · strip | 358×239+358×179 / 788×525+788×394 / 1140×713 |
| What a mutual owes its owners | from 3 to 5 · right · ccw · strip | 358×573 / 788×493 / 1140×713 |
| Now you're ready for the best life insurance option for you | from 1 to 3 · top · ccw | 358×537 / 788×525 / 1140×760 |

**Life Insurance Guide** (`guide.html`)

| Band | Grid at 1440 | Measured 390 / 820 / 1440 |
| --- | --- | --- |
| What is life insurance? | from 1 to 4 · right · cw | 358×597 / 788×473 / 1140×684 |
| Different types of life insurance | from 1 to 6 · left · ccw | 358×239+358×239 / 788×525+788×525 / 1140×702 |
| How much life insurance do I need? | from 3 to 6 · top · cw · strip | 358×573 / 788×493 / 1140×702 |
| What is life insurance cash value? | from 1 to 5 · bottom · ccw | 358×239+358×179 / 788×525+788×394 / 1140×713 |
| How life insurance dividends work | from 4 to 7 · bottom · cw · strip | 358×239+358×179 / 788×488 / 1140×706 |
| When to revisit your life insurance coverage | from 1 to 6 · right · ccw | 358×239+358×239 / 788×525+788×525 / 1140×702 |
| Where to get life insurance | from 2 to 5 · top · cw · strip | 358×239+358×179 / 788×525+788×394 / 1140×713 |
| Conversation starters with an advisor | from 1 to 4 · left · ccw | 358×597 / 788×473 / 1140×684 |
| Related articles | from 1 to 3 · bottom · cw | 358×537 / 788×525 / 1140×760 |
| See how life insurance fits into your financial plan | from 1 to 3 · top · ccw | 358×537 / 788×525 / 1140×760 |

**Advisor profile** (`advisor.html`)

| Band | Grid at 1440 | Measured 390 / 820 / 1440 |
| --- | --- | --- |
| Profile | from 1 to 4 · right · cw | 358×597 / 788×473 / 1140×684 |
| The GIFcommit difference | from 4 to 7 · top · ccw · strip | 358×239+358×179 / 788×488 / 1140×706 |
| Why I do this work | from 1 to 4 · right · ccw | 358×597 / 788×473 / 1140×684 |
| The people you will work with | from 3 to 5 · left · cw · strip | 358×573 / 788×493 / 1140×713 |
| How planning works | from 1 to 4 · right · cw | 358×597 / 788×473 / 1140×684 |
| What I offer | from 1 to 5 · top · cw | 358×239+358×179 / 788×525+788×394 / 1140×713 |
| Let's boost your financial knowledge | from 1 to 3 · bottom · ccw | 358×537 / 788×525 / 1140×760 |
| Ready to work together? | from 1 to 3 · top · ccw | 358×537 / 788×525 / 1140×760 |

**Disability income calculator** (`disability-calculator.html`)

| Band | Grid at 1440 | What it holds |
| --- | --- | --- |
| Protect your income | from 2 to 4 · strip | Headline and "Calculate it"; a photograph; 60% and 1 in 4 as figures; the strip is the number of steps |
| Disability income calculator | from 1 to 4 | The three steps as one form in the largest square; step, monthly income and working years to 67 fill in beside it as you type |
| The cover you may need | from 2 to 5 · strip | The monthly figure with its share slider; cover against expenses as bars; a sentence; group cover; the strip is monthly income |
| How long your savings would last | from 1 to 5 | Savings with and without individual cover as two lines, with a time slider; how long savings alone last; a note for the kind of work; earnings to 67; months |

On this page the cells have no outlines and no fills. Only the result card
keeps a ground and a rule, as the reference's does. Below 1100px the form, the
sliders and the sentences stand above their grids at full width and the grids
hold the figures and charts.

Flat modules: the section bars' running text (`Prose`, with check lists and a
figure panel), accordions of questions (original answers), the cover
calculator, a quiz on the term and guide pages, the whole-versus-term table,
the newsletter form, the guide's jump strip, the advisor's tab strip.

## The subject

Every square is about how life insurance works for a young family: term
lengths and conversion, level and renewable premiums, what a mortgage, a
child's schooling and childcare cost against a lost income, whole life's
guaranteed cash value, dividends of a mutual and the protection a state
guaranty association gives. Figures are cited to where they come from
([`src/sources.ts`](src/sources.ts)): LIMRA and Life Happens' 2025 and 2026
Insurance Barometer, LIMRA's 2025 sales results, the Social Security
Administration, Child Care Aware of America, the College Board, the National
Association of Realtors, Brookings and NOLHGA. Callouts are those figures as
large type.

Photographs are from [Unsplash](https://unsplash.com/) under the Unsplash
License, chosen for young families and the usual buyers of term cover
([`captures/unsplash.tsv`](captures/unsplash.tsv); credited in every footer).
It is a free licence, not a Creative Commons one. Contributors that are brands
were skipped. The icons are the reference's own, taken from its pages at the
request of the study's author.

## How it works

- `Fact` ([`src/lib/boxes.tsx`](src/lib/boxes.tsx)): a label, a line fitted to
  its square, body copy fitted to the room left (`fit--body`), a source, and
  More for a longer passage. Photographs open whole with their credit.
- Skip grids: a band lists its squares largest first and a `strip` last; the
  strip fills the placeholder. Where the room is short the strip becomes the
  smallest square.
- Four cells answer back: how long a household could manage, a guess at the
  price of a basic term policy, a term length from the longest obligation, and
  the ten-times-income rule with the multiple adjustable. Below desktop they
  stand above their grid at full width.
- Light and dark by device preference; reduced motion respected; every Close
  is the outlined blue button.
- [`captures/scan.cjs`](captures/scan.cjs), Chrome and WebKit, 390 / 820 /
  1440, light and dark, all seven pages (the calculator with and without a
  result): nothing overflows, no fitted line under
  12px, axe clean with a More open. No screen-reader user has tested it.

## The calculator

The reference's calculator was walked through once with test figures (age 32,
$85,000, $4,500 a month, $12,000 saved, professional, group cover) and its
closing contact form was left alone. It asks age and gender; income, monthly
expenses and savings; and the kind of job and whether there is group cover,
one step to a page, then shows a monthly figure, a bar chart of cover against
expenses and a chart of savings over a predicted length of disability, and
ends in a form that sends your details to an advisor.

The study keeps the three steps and the two charts and changes the rest. The
steps share one square and the figures beside it update as you type. Gender
is not asked, because nothing here uses it. The kind of work chooses a note on
what to look for in a policy, not a predicted length of disability: the
reference projects that from an actuarial table this study does not have, so
the length is a slider. Group cover is counted at 60% of monthly income, as
the reference states. The share of income to replace is a slider from 50% to
80%; it starts at 80% because the one run of the reference came to that with
group cover included. No premium is shown and there is no contact form:
nothing entered is stored or sent, and a scripted run through the steps at
three widths made no request other than a GET.

## What did not

- The icons are Northwestern Mutual's own drawings, used at the author's
  request; their licence for reuse is not known.
- The skip grids need about 1100px. At phone and tablet width the same content
  is a plain grid, so the irregularity is a desktop property.
- The SSA, NAR, Brookings, NOLHGA and LIMRA sales figures were confirmed from
  search summaries of those sources; the LIMRA Barometer, Child Care Aware and
  College Board figures were read from the sources. Recheck before relying on
  any of them.
- The reference's videos, quiz images and the calculator's own logic are not
  rebuilt; the calculator here is the standard arithmetic and shows its sums.
- The reference's FAQ answers were not read; the answers here are the
  study's own and should not be taken as theirs.
- A grid cell is not a place for a form: the four widgets are as large as the
  largest square in their band, and on a narrow window they leave the grid.

## Study tools

A floating panel (`?tools=1`) toggles grid outlines (`g`), band notes (`n`,
which carry each band's `from`, `to` and placement) and reduced motion (`m`).

## Running and deploying

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`; pushing to `main` deploys
to GitHub Pages. The library is consumed from npm at its published version,
never linked locally.
