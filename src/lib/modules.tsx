import { useEffect, useMemo, useState, type ReactNode } from "react";
import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import { Fact as FactBox } from "./boxes";
import { Imprint } from "../icons";
import { useViewport } from "./viewport";
import { seen, photo } from "../photos";
import checkUrl from "../site-icons/check.svg";
import { SOURCES, cited, type SourceKey } from "../sources";
import type { ProseSection } from "../prose";

/** Flat modules: lists, forms and tables. They are not grids because their content has no hierarchy to descend. */

/** Traditional paragraphs in a measured column, with check lists and a panel for one figure. */
export function Prose({ section, inline }: { section: ProseSection; inline?: boolean }) {
  const { id, kicker, title, blocks, stat } = section;
  if (stat?.source) cited.add(stat.source);
  return (
    <section className={`prose${inline ? " prose--inline" : ""}`} id={id} aria-labelledby={title ? `${id}-title` : undefined}>
      <div className={`${inline ? "" : "wrap "}prose__grid${stat ? " prose__grid--stat" : ""}`}>
        <div className="prose__text">
          {kicker && <p className="prose__kicker">{kicker}</p>}
          {title && <h2 id={`${id}-title`} className="prose__title">{title}</h2>}
          {blocks.map((b, i) => typeof b === "string" ? <p key={i}>{b}</p>
            : "h" in b ? <h3 key={i}>{b.h}</h3>
            : <ul key={i} className="checks">{b.checks.map(([t, d]) => <li key={t}><img src={checkUrl} alt="" aria-hidden="true" /><div><strong>{t}</strong><p>{d}</p></div></li>)}</ul>)}
        </div>
        {stat && (
          <div className="prose__stat" role="group" aria-label="A figure">
            <p className="prose__num">{stat.line}</p>
            <p>{stat.text}</p>
            {stat.cite && <p className="prose__cite">— {stat.source ? <a href={SOURCES[stat.source].url}>{stat.cite}</a> : stat.cite}</p>}
          </div>
        )}
      </div>
    </section>
  );
}

export function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <section className="news" aria-labelledby="news-title">
      <div className="wrap news__card">
        <h2 id="news-title" className="news__title">Get financial tips, tools and more with our monthly Life &amp; Money newsletter.</h2>
        <form className="news__form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <label>First name*<input name="first" required autoComplete="given-name" /></label>
          <label>Last name*<input name="last" required autoComplete="family-name" /></label>
          <label>Email*<input name="email" type="email" required autoComplete="email" /></label>
          <button className="btn btn--blue" type="submit">Sign me up</button>
        </form>
        <p className="note" role="status">{sent ? "Nothing was sent: this is a layout study and there is no newsletter." : "A form that sends nothing."}</p>
      </div>
    </section>
  );
}

export function Faq({ id, title, items }: { id: string; title: string; items: [string, string][] }) {
  return (
    <section className="faq" id={id} aria-labelledby={`${id}-title`}>
      <div className="wrap faq__wrap">
        <h2 id={`${id}-title`} className="section-title">{title}</h2>
        <div className="faq__list">
          {items.map(([q, a]) => (
            <details key={q}>
              <summary><span>{q}</span><i aria-hidden="true" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Quiz({ title, items }: { title: string; items: { q: string; a: boolean; why: string }[] }) {
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const done = i >= items.length;
  const cur = items[Math.min(i, items.length - 1)];
  return (
    <section className="quiz" aria-labelledby="quiz-title">
      <div className="wrap quiz__wrap">
        <p className="band__kicker">Quiz</p>
        <h2 id="quiz-title" className="section-title">{title}</h2>
        {done ? (
          <div className="quiz__card" role="status">
            <p className="quiz__score">You answered {score} of {items.length} correctly.</p>
            <button className="btn btn--line" type="button" onClick={() => { setI(0); setScore(0); setAnswer(null); }}>Take it again</button>
          </div>
        ) : (
          <div className="quiz__card">
            <p className="quiz__count">Question {i + 1} of {items.length}</p>
            <p className="quiz__q">True or false: {cur.q}</p>
            <div className="quiz__opts" role="group" aria-label="Your answer">
              {[true, false].map((v) => (
                <button key={String(v)} type="button" className={`btn btn--line${answer === v ? " is-picked" : ""}`} disabled={answer !== null} onClick={() => { setAnswer(v); if (v === cur.a) setScore((s) => s + 1); }}>{v ? "True" : "False"}</button>
              ))}
            </div>
            {answer !== null && (
              <div className="quiz__why" role="status">
                <p><strong>{answer === cur.a ? "Correct." : "Not quite."}</strong> {cur.why}</p>
                <button className="btn btn--blue" type="button" onClick={() => { setI(i + 1); setAnswer(null); }}>{i + 1 >= items.length ? "See your result" : "Next"}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function CompareTable({ title, rows, note }: { title: string; rows: [string, boolean, boolean][]; note?: string }) {
  const mark = (v: boolean) => v ? <span className="tick"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="visually-hidden">Yes</span></span> : <span className="dash" aria-label="No">–</span>;
  return (
    <section className="compare" id="compare" aria-labelledby="compare-title">
      <div className="wrap compare__wrap">
        <h2 id="compare-title" className="section-title">{title}</h2>
        <table>
          <thead><tr><th scope="col"><span className="visually-hidden">Benefit</span></th><th scope="col">Whole life</th><th scope="col">Term life</th></tr></thead>
          <tbody>{rows.map(([b, w, t]) => <tr key={b}><th scope="row">{b}</th><td>{mark(w)}</td><td>{mark(t)}</td></tr>)}</tbody>
        </table>
        {note && <p className="note">{note}</p>}
      </div>
    </section>
  );
}

export function Jump({ items }: { items: [string, string][] }) {
  return (
    <nav className="jump" aria-label="Jump to section">
      <div className="wrap jump__row">
        <p className="jump__label">Jump to section</p>
        <ul>{items.map(([id, label], i) => <li key={id}><a href={`#${id}`}><span>{String(i + 1).padStart(2, "0")}</span>{label}</a></li>)}</ul>
      </div>
    </nav>
  );
}

/** The photographers whose pictures are on this page, listed once they have been drawn. */
export function Credits() {
  const [key, setKey] = useState("");
  const [skey, setSkey] = useState("");
  useEffect(() => {
    const k = [...seen].sort((a, b) => a - b).join(","); setKey((prev) => (prev === k ? prev : k));
    const sk = [...cited].sort().join(","); setSkey((prev) => (prev === sk ? prev : sk));
  });
  const names = new Map<string, string>();
  key.split(",").filter(Boolean).map((n) => photo(Number(n))).forEach((p) => { if (!names.has(p.by)) names.set(p.by, p.page); });
  const sources = skey.split(",").filter(Boolean) as SourceKey[];
  return (
    <>
      {sources.length > 0 && (
        <p className="credits">
          Statistics: {sources.map((k, i) => <span key={k}>{i > 0 ? "; " : ""}<a href={SOURCES[k].url}>{SOURCES[k].full}</a></span>)}.
        </p>
      )}
      <p className="credits">
        Photographs from <a href="https://unsplash.com">Unsplash</a> under the Unsplash License: {[...names].map(([by, page], i) => <span key={by}>{i > 0 ? ", " : ""}<a href={page}>{by}</a></span>)}.
      </p>
    </>
  );
}

// --- The cover calculator ------------------------------------------------------------

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const short = (n: number) => (n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2).replace(/0$/, "")}M` : n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${Math.round(n)}`);

function NumberField({ id, label, hint, value, onChange, step = 1000 }: { id: string; label: string; hint?: string; value: number; onChange: (n: number) => void; step?: number }) {
  return (
    <div className="calc__field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="number" inputMode="numeric" min={0} step={step} value={value} onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))} aria-describedby={hint ? `${id}-h` : undefined} />
      {hint && <p id={`${id}-h`} className="note">{hint}</p>}
    </div>
  );
}

/**
 * The need for cover, by the method most guides give: the years of income
 * your family would need, plus debts, the mortgage and the cost of schooling
 * and final expenses, less what you already have. The arithmetic is shown,
 * nothing is sent and no price is quoted.
 */
export function Calculator() {
  const v = useViewport();
  const [income, setIncome] = useState(85000);
  const [years, setYears] = useState(15);
  const [debts, setDebts] = useState(18000);
  const [mortgage, setMortgage] = useState(310000);
  const [kids, setKids] = useState(2);
  const [perChild, setPerChild] = useState(80000);
  const [final, setFinal] = useState(15000);
  const [have, setHave] = useState(140000);

  const r = useMemo(() => {
    const replace = income * years, edu = kids * perChild;
    const gross = replace + debts + mortgage + edu + final;
    return { replace, edu, debtAll: debts + mortgage, final, gross, need: Math.max(0, gross - have) };
  }, [income, years, debts, mortgage, kids, perChild, final, have]);

  // Odd counts take top/bottom, even right/left, for a landscape grid; a phone takes the other.
  const placement = v === "mobile" ? "top" : "right";
  const squares: ReactNode[] = [
    <GoldenBox key="need"><FactBox label="Suggested cover" fitClass="fit--display fit--num" max={120} tone="navy" imprint={<Imprint name="shield" />}
      body={<p>{r.need === 0 ? "What you already have meets the total." : `The total of ${money(r.gross)} less ${money(have)} already in place.`}</p>}>{money(r.need)}</FactBox></GoldenBox>,
    <GoldenBox key="replace"><FactBox label={`${years} years of income`} fitClass="fit--display fit--num" max={120} tone="sun" imprint={<Imprint name="coins" />}
      body={<p>The income your family would need to replace, {money(income)} a year for {years} years.</p>}>{short(r.replace)}</FactBox></GoldenBox>,
    <GoldenBox key="debts"><FactBox label="Debts and mortgage" fitClass="fit--display fit--num" max={120} tone="sky" imprint={<Imprint name="house" />}
      body={<p>Paid off so the household's costs fall with the income.</p>}>{short(r.debtAll)}</FactBox></GoldenBox>,
    <GoldenBox key="edu"><FactBox label="Schooling" fitClass="fit--display fit--num" max={120} tone="paper" imprint={<Imprint name="graduation" />}
      body={<p>{kids} {kids === 1 ? "child" : "children"} at {money(perChild)}.</p>}>{short(r.edu)}</FactBox></GoldenBox>,
    <GoldenBox key="final"><FactBox label="Final expenses" fitClass="fit--display fit--num" max={120} tone="blush" imprint={<Imprint name="document" />}>{short(r.final)}</FactBox></GoldenBox>,
  ];
  const n = squares.length;
  const grids = v === "desktop" ? <GoldenGrid from={1} to={n} placement="top" clockwise>{squares}</GoldenGrid>
    : <div className="stack"><GoldenGrid from={1} to={3} placement="top" clockwise>{squares.slice(0, 3)}</GoldenGrid><GoldenGrid from={1} to={2} placement={placement} clockwise={false}>{squares.slice(3)}</GoldenGrid></div>;
  return (
    <section className="calc" id="calculator" aria-labelledby="calc-title">
      <div className="wrap">
        <p className="band__kicker">Life Insurance Calculator</p>
        <h2 id="calc-title" className="section-title">How much life insurance is right for you?</h2>
        <p className="band__lesson">Add up what your household would need to carry on without your income, and subtract what it already has. Change any figure; nothing is sent.</p>
        <form className="calc__form" onSubmit={(e) => e.preventDefault()} aria-label="Cover calculator">
          <NumberField id="c-income" label="Annual income" value={income} onChange={setIncome} step={5000} />
          <NumberField id="c-years" label="Years of income to replace" hint="Often until the youngest child is independent." value={years} onChange={setYears} step={1} />
          <NumberField id="c-debts" label="Debts other than the mortgage" value={debts} onChange={setDebts} />
          <NumberField id="c-mort" label="Mortgage balance" value={mortgage} onChange={setMortgage} step={5000} />
          <NumberField id="c-kids" label="Children to put through school" value={kids} onChange={setKids} step={1} />
          <NumberField id="c-per" label="Schooling per child" value={perChild} onChange={setPerChild} step={5000} />
          <NumberField id="c-final" label="Final expenses" value={final} onChange={setFinal} step={1000} />
          <NumberField id="c-have" label="Savings and cover already in place" hint="Savings, and any cover through work." value={have} onChange={setHave} step={5000} />
        </form>
        <p className="band__note">{v === "desktop" ? `from=1 to=${n} · placement="top" · clockwise=true` : `two grids: from=1 to=3 · placement="top" / from=1 to=2`}</p>
        <div className="band__wrap" role="group" aria-label="Result" aria-live="polite">{grids}</div>
        <p className="note">An illustration of the arithmetic, not advice. It quotes no price and nothing here can be bought.</p>
      </div>
    </section>
  );
}

