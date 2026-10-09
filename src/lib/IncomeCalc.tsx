import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { Fit } from "./fit";
import { useViewport } from "./viewport";
import { GridBand } from "../bands/bands";
import { Prose } from "./modules";
import { PAGES } from "../content";

/**
 * The disability income calculator, after the reference's: three short steps
 * (about you, your money, your cover) and a result. The reference keeps each
 * step on its own page and shows the result once, at the end; here the steps
 * share one square and the squares beside it fill in as the reader types, and
 * the result stays open to change.
 *
 * The method is this study's own and is stated on the page. It quotes no
 * premium, nothing is sent anywhere, and the reference's closing contact form
 * is not rebuilt. Cells on this page are drawn without outlines or fills: the
 * grid is carried by where things sit, not by lines.
 */
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const short = (n: number) => (n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M` : n >= 10_000 ? `$${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : money(n));
const digits = (s: string) => s.replace(/[^\d]/g, "").slice(0, 9);
const shown = (s: string) => (s === "" ? "" : Number(s).toLocaleString("en-US"));

type Job = "professional" | "manual" | "healthcare";
const JOBS: Record<Job, { name: string; examples: string; note: string }> = {
  professional: {
    name: "Professional", examples: "Accountant, attorney, architect, engineer, editor, teacher",
    note: "Most claims from desk-based work are illnesses, such as cancer, back and joint conditions and mental health, rather than accidents. Check how a policy defines disability: an own-occupation definition pays if you cannot do your own job, even if you could do another.",
  },
  manual: {
    name: "Manual", examples: "Retail, clerical, hospitality, manufacturing, delivery, construction, stay-at-home parent",
    note: "Where the work is physical an injury is more likely to stop it, so premiums are higher and benefit periods can be shorter. A stay-at-home parent has no salary to insure, but the work would have to be paid for.",
  },
  healthcare: {
    name: "Healthcare", examples: "Physician, surgeon, nurse, physical therapist, dentist",
    note: "Clinical work rests on specific skills: a surgeon who cannot operate may still be able to teach. A policy that defines disability by your own specialty is the feature to look for.",
  },
};

interface Answers { age: string; job: Job | ""; income: string; expenses: string; savings: string; group: "yes" | "no" | "" }
const EMPTY: Answers = { age: "", job: "", income: "", expenses: "", savings: "", group: "" };
const EXAMPLE: Answers = { age: "32", job: "professional", income: "85000", expenses: "4500", savings: "12000", group: "yes" };
const STEPS = ["About you", "Your money", "Your cover"];

function errorsFor(step: number, a: Answers): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 1) {
    const age = Number(a.age);
    if (a.age === "" || age < 18 || age > 66) e.age = "Enter an age from 18 to 66.";
    if (!a.job) e.job = "Choose the kind of work that is closest.";
  }
  if (step === 2) {
    if (a.income === "" || Number(a.income) <= 0) e.income = "Enter your yearly income before tax.";
    if (a.expenses === "" || Number(a.expenses) <= 0) e.expenses = "Enter what your household spends in a month.";
    if (a.savings === "") e.savings = "Enter your savings, or 0 if there are none.";
  }
  if (step === 3 && !a.group) e.group = "Choose yes or no.";
  return e;
}

// --- Cells --------------------------------------------------------------------------

/** A figure in a square, with no outline and no fill: a label, a fitted number, a sentence where there is room. */
function Figure({ label, value, children, className = "" }: { label: string; value: string; children?: ReactNode; className?: string }) {
  return (
    <div className={`box box--open ${className}`}>
      <p className="box__label">{label}</p>
      <div className="box__fit"><Fit as="p" className="fit--display fit--num" min={12} max={120}>{value}</Fit></div>
      {children && <div className="box__body"><Fit as="div" className="fit--body" min={12} max={22}>{children}</Fit></div>}
    </div>
  );
}

function Money({ id, label, hint, value, error, onChange }: { id: string; label: string; hint?: string; value: string; error?: string; onChange: (v: string) => void }) {
  return (
    <div className="ifield">
      <label htmlFor={id}>{label}</label>
      <div className="ifield__money"><span aria-hidden="true">$</span>
        <input id={id} type="text" inputMode="numeric" autoComplete="off" value={shown(value)} onChange={(e) => onChange(digits(e.target.value))}
          aria-invalid={error ? true : undefined} aria-describedby={`${id}-m`} />
      </div>
      <p id={`${id}-m`} className={error ? "ifield__error" : "ifield__hint"}>{error ?? hint ?? " "}</p>
    </div>
  );
}

function Range({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; format: (n: number) => string }) {
  const id = useId();
  return (
    <div className="irange">
      <label htmlFor={id}>{label}: <strong>{format(value)}</strong></label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} aria-valuetext={format(value)} />
      <span className="irange__ends" aria-hidden="true"><span>{format(min)}</span><span>{format(max)}</span></span>
    </div>
  );
}

// --- Charts ---------------------------------------------------------------------------

function Bars({ expenses, group, need, income }: { expenses: number; group: number; need: number; income: number }) {
  const W = 320, base = 204, top = 30;
  const max = Math.max(income, expenses, group + need, 1) * 1.06;
  const y = (v: number) => base - (v / max) * (base - top);
  const label = `Monthly expenses ${money(expenses)}. Monthly cover ${money(group + need)}: ${money(group)} from group cover and ${money(need)} from individual cover. Monthly income ${money(income)}.`;
  const tall = (v: number) => base - y(v) >= 22;
  return (
    <svg className="chart" viewBox={`0 0 ${W} 240`} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
      <line x1="16" x2={W - 8} y1={base} y2={base} className="chart__axis" />
      <line x1="16" x2={W - 8} y1={y(income)} y2={y(income)} className="chart__income" />
      <text x={W - 8} y={y(income) - 6} textAnchor="end" className="chart__t">{short(income)} income</text>
      <rect x="40" y={y(expenses)} width="104" height={base - y(expenses)} className="chart__exp" />
      {tall(expenses) && <text x="92" y={(y(expenses) + base) / 2 + 5} textAnchor="middle" className="chart__n chart__n--dark">{money(expenses)}</text>}
      <rect x="176" y={y(group)} width="104" height={base - y(group)} className="chart__group" />
      {tall(group) && <text x="228" y={(y(group) + base) / 2 + 5} textAnchor="middle" className="chart__n">{money(group)}</text>}
      <rect x="176.5" y={y(group + need)} width="103" height={Math.max(0, y(group) - y(group + need))} className="chart__need" />
      {y(group) - y(group + need) >= 22 && <text x="228" y={(y(group + need) + y(group)) / 2 + 5} textAnchor="middle" className="chart__n chart__n--dark">{money(need)}</text>}
      <text x="92" y="226" textAnchor="middle" className="chart__t chart__t--b">Monthly expenses</text>
      <text x="228" y="226" textAnchor="middle" className="chart__t chart__t--b">Monthly cover</text>
    </svg>
  );
}

function Lines({ savings, withCover, without, months }: { savings: number; withCover: number; without: number; months: number }) {
  const W = 360, left = 46, right = 350, top = 16, base = 186;
  const at = (rate: number, m: number) => Math.max(0, savings + rate * m);
  const raw = Math.max(savings, at(withCover, months), at(without, months), 1000);
  const pow = 10 ** Math.floor(Math.log10(raw));
  const max = [1, 2, 4, 5, 10].map((k) => k * pow).find((k) => k >= raw) ?? raw; // a round top for the axis
  const x = (m: number) => left + (m / months) * (right - left);
  const y = (v: number) => base - (v / max) * (base - top);
  const path = (rate: number) => Array.from({ length: months + 1 }, (_, m) => `${m === 0 ? "M" : "L"}${x(m).toFixed(1)} ${y(at(rate, m)).toFixed(1)}`).join(" ");
  const ticks = [0, 0.5, 1].map((f) => f * max);
  const years = Array.from({ length: Math.floor(months / 12) + 1 }, (_, i) => i * 12);
  const label = `Savings over ${months} months unable to work, starting at ${money(savings)}. With individual cover they end at ${money(at(withCover, months))}; without it, at ${money(at(without, months))}.`;
  return (
    <svg className="chart" viewBox={`0 0 ${W} 220`} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
      {ticks.map((t) => <g key={t}><line x1={left} x2={right} y1={y(t)} y2={y(t)} className="chart__grid" /><text x={left - 6} y={y(t) + 4} textAnchor="end" className="chart__t">{short(t)}</text></g>)}
      {years.map((m) => <text key={m} x={x(m)} y="206" textAnchor="middle" className="chart__t">{m / 12}y</text>)}
      <path d={path(without)} className="chart__line chart__line--without" />
      <path d={path(withCover)} className="chart__line chart__line--with" />
      <circle cx={x(0)} cy={y(savings)} r="4" className="chart__dot" />
    </svg>
  );
}

// --- The calculator -------------------------------------------------------------------

export function IncomeCalc() {
  const v = useViewport();
  const desktop = v === "desktop";
  const example = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("example");
  const [a, setA] = useState<Answers>(example ? EXAMPLE : EMPTY);
  const [step, setStep] = useState(example ? 3 : 1);
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState(example);
  const [share, setShare] = useState(80);
  const [months, setMonths] = useState(24);
  const headRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  const set = (k: keyof Answers) => (val: string) => setA((p) => ({ ...p, [k]: val }));

  // Moving between steps puts focus on the step's heading; opening the result, on the result.
  useEffect(() => { if (moved.current) headRef.current?.focus(); }, [step]);
  useEffect(() => { if (moved.current && done) resultRef.current?.focus(); }, [done]);

  const errs = errorsFor(step, a);
  const show = tried ? errs : {};
  const next = () => {
    if (Object.keys(errs).length) { setTried(true); return; }
    moved.current = true; setTried(false);
    if (step < 3) setStep(step + 1); else setDone(true);
  };
  const back = () => { moved.current = true; setTried(false); setStep(step - 1); };
  const restart = () => { moved.current = true; setA(EMPTY); setDone(false); setTried(false); setStep(1); setShare(80); setMonths(24); };

  const r = useMemo(() => {
    const income = Number(a.income) || 0, expenses = Number(a.expenses) || 0, savings = Number(a.savings) || 0, age = Number(a.age) || 0;
    const mi = income / 12;
    const group = a.group === "yes" ? mi * 0.6 : 0;
    const target = mi * (share / 100);
    const need = Math.max(0, target - group);
    const without = group - expenses, withCover = group + need - expenses;
    const lasts = without < 0 ? savings / -without : Infinity;
    const years = age ? Math.max(0, 67 - age) : 0;
    return { income, expenses, savings, age, mi, group, target, need, without, withCover, lasts, years, ahead: years * income };
  }, [a, share]);

  // --- The steps, one form in one square ---
  const form = (
    <form className="icalc" noValidate onSubmit={(e) => { e.preventDefault(); next(); }} aria-label="Disability income calculator">
      <ol className="icalc__steps" aria-label="Steps">
        {STEPS.map((s, i) => <li key={s} className={i + 1 === step ? "is-on" : i + 1 < step ? "is-done" : undefined} aria-current={i + 1 === step ? "step" : undefined}><span>{i + 1}</span>{s}</li>)}
      </ol>
      {step === 1 && (
        <>
          <h3 ref={headRef} tabIndex={-1} className="icalc__q">Tell us a bit about yourself.</h3>
          <p className="icalc__why">Your age sets how many working years are still ahead; the kind of work sets what to look for in a policy.</p>
          <div className="ifield ifield--short">
            <label htmlFor="ic-age">Age</label>
            <input id="ic-age" type="text" inputMode="numeric" autoComplete="off" maxLength={2} value={a.age} onChange={(e) => set("age")(digits(e.target.value).slice(0, 2))} aria-invalid={show.age ? true : undefined} aria-describedby="ic-age-m" />
            <p id="ic-age-m" className={show.age ? "ifield__error" : "ifield__hint"}>{show.age ?? " "}</p>
          </div>
          <fieldset className="ichoice" aria-describedby="ic-job-m">
            <legend>Which best describes your job?</legend>
            {(Object.keys(JOBS) as Job[]).map((k) => (
              <label key={k} className={a.job === k ? "is-on" : undefined}>
                <input type="radio" name="ic-job" value={k} checked={a.job === k} onChange={() => set("job")(k)} />
                <span><strong>{JOBS[k].name}</strong><em>{JOBS[k].examples}</em></span>
              </label>
            ))}
            <p id="ic-job-m" className={show.job ? "ifield__error" : "ifield__hint"}>{show.job ?? " "}</p>
          </fieldset>
        </>
      )}
      {step === 2 && (
        <>
          <h3 ref={headRef} tabIndex={-1} className="icalc__q">Let's get a snapshot of your finances.</h3>
          <p className="icalc__why">Only the basics: what comes in, what goes out, and what is set aside.</p>
          <Money id="ic-income" label="Your annual income" hint="Before tax, from work." value={a.income} error={show.income} onChange={set("income")} />
          <Money id="ic-expenses" label="Estimated monthly expenses" value={a.expenses} error={show.expenses} onChange={set("expenses")} />
          <Money id="ic-savings" label="Current savings, excluding retirement" hint="Money you could spend without penalty." value={a.savings} error={show.savings} onChange={set("savings")} />
        </>
      )}
      {step === 3 && (
        <>
          <h3 ref={headRef} tabIndex={-1} className="icalc__q">Tell us about the cover you have.</h3>
          <p className="icalc__why">Many employers provide group disability cover. Where they do, the estimate assumes it replaces 60% of your pay.</p>
          <fieldset className="ichoice ichoice--row" aria-describedby="ic-group-m">
            <legend>Do you have group cover through work?</legend>
            {(["yes", "no"] as const).map((k) => (
              <label key={k} className={a.group === k ? "is-on" : undefined}>
                <input type="radio" name="ic-group" value={k} checked={a.group === k} onChange={() => set("group")(k)} />
                <span><strong>{k === "yes" ? "Yes" : "No"}</strong><em>{k === "yes" ? "Counted at 60% of monthly income" : "Estimated with no other cover in force"}</em></span>
              </label>
            ))}
            <p id="ic-group-m" className={show.group ? "ifield__error" : "ifield__hint"}>{show.group ?? " "}</p>
          </fieldset>
        </>
      )}
      <div className="icalc__nav">
        {step > 1 && <button type="button" className="btn btn--line" onClick={back}>Back</button>}
        <button type="submit" className="btn btn--gold">{step < 3 ? "Next" : done ? "Update results" : "See results"}</button>
        {step === 1 && !done && <button type="button" className="icalc__eg" onClick={() => { setA(EXAMPLE); setTried(false); }}>Fill in an example</button>}
      </div>
      <p className="icalc__note">Nothing you enter leaves this page.</p>
    </form>
  );

  const stageCells = [
    <Figure key="step" label="Step" value={`${step} of 3`}>{STEPS[step - 1]}. {step === 1 ? "Two answers." : step === 2 ? "Three figures." : "One answer, then the result."}</Figure>,
    <Figure key="mi" label="Monthly income" value={r.mi ? short(r.mi) : "–"}>{r.mi ? "Your annual income divided by twelve." : "Appears when you enter your income."}</Figure>,
    <Figure key="yrs" label="Working years to 67" value={r.age ? String(r.years) : "–"}>{r.age && r.income ? `About ${short(r.ahead)} of earnings still ahead at today's pay.` : "Appears when you enter your age."}</Figure>,
  ];

  // --- The result ---
  const sentence = r.need === 0
    ? `Group cover of ${money(r.group)} a month already reaches ${share}% of your monthly income.`
    : a.group === "yes"
      ? `About what you would need each month on top of group cover of ${money(r.group)} to reach ${share}% of your income while you cannot work.`
      : `About what you would need each month, with no other cover in force, to reach ${share}% of your income while you cannot work.`;
  const know = a.group !== "yes"
    ? `Without cover through work, expenses of ${money(r.expenses)} a month fall on savings from the first month.`
    : r.group >= r.expenses
      ? "Group cover meets your monthly expenses on paper, but it is usually taxable when the employer pays the premium, and an illness brings medical costs of its own."
      : `Group cover falls ${money(r.expenses - r.group)} a month short of your expenses, before tax and before any medical costs.`;
  const lasts = r.lasts === Infinity ? "Hold" : r.lasts > 120 ? "10+ yrs" : r.lasts >= 24 ? `${(r.lasts / 12).toFixed(1)} yrs` : `${r.lasts.toFixed(1)} mo`;
  const lastsText = r.lasts === Infinity ? "With group cover alone your savings are not drawn down at these expenses." : `Without individual cover, savings of ${money(r.savings)} are gone in ${r.lasts >= 24 ? `${(r.lasts / 12).toFixed(1)} years` : `${r.lasts.toFixed(1)} months`} at ${money(-r.without)} a month.`;
  const shareRange = <Range label="Share of income to replace" value={share} min={50} max={80} step={5} onChange={setShare} format={(n) => `${n}%`} />;
  const monthsRange = <Range label="Time unable to work" value={months} min={6} max={60} step={6} onChange={setMonths} format={(n) => (n % 12 === 0 ? `${n / 12} ${n === 12 ? "year" : "years"}` : `${n} months`)} />;
  const job = a.job ? JOBS[a.job] : null;

  const resultCard = (
    <div className="box box--result">
      <p className="box__label">The cover you may need</p>
      <div className="box__fit"><Fit as="p" className="fit--display fit--num" min={14} max={120}>{`${money(r.need)}/mo`}</Fit></div>
      {desktop && <div className="box__body"><Fit as="p" className="fit--body" min={12} max={32}>{sentence}</Fit></div>}
      {desktop && <div className="box__foot box__foot--control">{shareRange}</div>}
    </div>
  );
  const barsCell = <div key="bars" className="box box--open box--chart"><p className="box__label">Cover against expenses</p><Bars expenses={r.expenses} group={r.group} need={r.need} income={r.mi} /><ul className="legend"><li className="legend--exp">Expenses</li><li className="legend--group">Group</li><li className="legend--need">Individual</li></ul></div>;
  const knowCell = <div key="know" className="box box--open box--text"><p className="box__label">Did you know</p><div className="box__body"><Fit as="p" className="fit--body" min={12} max={22}>{know}</Fit></div></div>;
  const linesCell = (
    <div key="lines" className="box box--open box--chart">
      <p className="box__label">How long your savings last</p>
      <Lines savings={r.savings} withCover={r.withCover} without={r.without} months={months} />
      <ul className="legend"><li className="legend--with">With individual cover</li><li className="legend--without">Without</li></ul>
      {desktop && <div className="box__foot box__foot--control">{monthsRange}</div>}
    </div>
  );
  const jobCell = job && <div key="job" className="box box--open box--text"><p className="box__label">{job.name} work</p><div className="box__body"><Fit as="p" className="fit--body" min={12} max={22}>{job.note}</Fit></div></div>;

  return (
    <>
      <GridBand id="calculator" kicker={done ? "Your answers" : "Three short steps"} title="Disability income calculator" tone="navy" variant={0} lead
        cells={desktop ? [<div key="form" className="box box--open box--form">{form}</div>, ...stageCells] : stageCells}
        flat={desktop ? undefined : <div className="iflat iflat--stage">{form}</div>} />

      <div ref={resultRef} tabIndex={-1} className="iresult" aria-live="polite">
        {done ? (
          <>
            <GridBand id="result" kicker="Your result" title="The cover you may need" variant={2} from={2}
              cells={desktop ? [resultCard, barsCell, knowCell, <Figure key="g" label="Group cover" value={r.group ? short(r.group) : "None"} />] : [barsCell, <Figure key="g" label="Group cover" value={r.group ? short(r.group) : "None"} />, <Figure key="e" label="Expenses" value={short(r.expenses)} />]}
              strip={<Figure label="Income" value={short(r.mi)} />}
              flat={desktop ? undefined : <div className="iflat"><div className="iflat__card">{resultCard}</div><p className="iflat__text">{sentence}</p>{shareRange}<p className="iflat__text"><strong>Did you know.</strong> {know}</p></div>} />

            <GridBand id="savings" kicker="If you could not work" title="How long your savings would last" variant={1}
              cells={desktop
                ? [linesCell, <Figure key="l" label="Savings alone" value={lasts}>{lastsText}</Figure>, jobCell ?? <Figure key="j" label="Savings" value={short(r.savings)} />, <Figure key="a" label="Earnings to 67" value={short(r.ahead)} />, <Figure key="m" label="Months" value={String(months)} />]
                : [linesCell, <Figure key="l" label="Savings alone" value={lasts} />, <Figure key="a" label="Earnings to 67" value={short(r.ahead)} />, <Figure key="m" label="Months" value={String(months)} />]}
              flat={desktop ? undefined : <div className="iflat">{monthsRange}<p className="iflat__text">{lastsText}</p>{job && <p className="iflat__text"><strong>{job.name} work.</strong> {job.note}</p>}</div>} />

            <Prose section={{
              id: "method", kicker: "About the calculation", title: "How the figures are reached",
              blocks: [
                "Monthly income is your annual income divided by twelve. If you have group cover through work it is counted at 60% of that figure, the usual size of an employer's plan; if you do not, the estimate assumes no other cover is in force.",
                "The cover you may need is the share of income you choose to replace, 80% unless you move it, less the group cover. The savings chart starts from the savings you entered and adds, each month, your cover less your expenses: once with individual cover and once without. The length of time is yours to set, because this study has no actuarial table to predict it from.",
                "It is an illustration of arithmetic, not advice and not a quotation. No premium is shown, a real policy has limits, waiting periods and exclusions that are not modelled here, and nothing you entered has been stored or sent.",
              ],
            }} />
            <div className="wrap iresult__end">
              <a className="btn btn--blue" href={PAGES.A}>Talk it through with an advisor</a>
              <button type="button" className="btn btn--line" onClick={restart}>Start again</button>
            </div>
          </>
        ) : (
          <div className="wrap iresult__wait"><p>Your result appears here after the third step.</p></div>
        )}
      </div>
    </>
  );
}
