import { useId, useState, type ReactNode } from "react";
import { Imprint, type IconName } from "../icons";
import { cited } from "../sources";

/**
 * Cells that answer back. Each is a small calculation a reader can change,
 * set in a square the way a figure would be: a label, a question, one or two
 * controls and a result that follows them. Nothing is sent anywhere, and no
 * price is quoted beyond the one accepted figure the guess is compared with.
 */
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function Shell({ tone, icon, label, children }: { tone: string; icon: IconName; label: string; children: ReactNode }) {
  return (
    <div className={`box box--widget box--${tone}`}>
      <Imprint name={icon} />
      <p className="box__label">{label}</p>
      {children}
    </div>
  );
}

function Num({ label, value, set, step, min = 0, max, hint }: { label: string; value: number; set: (n: number) => void; step: number; min?: number; max?: number; hint?: string }) {
  const id = useId();
  return (
    <div className="wfield">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="number" inputMode="numeric" min={min} max={max} step={step} value={value}
        onChange={(e) => { const n = Number(e.target.value); set(Math.min(max ?? Infinity, Math.max(min, Number.isFinite(n) ? n : 0))); }} />
      {hint && <span className="wfield__hint">{hint}</span>}
    </div>
  );
}

/** How many months a household's savings would carry its spending, and what a death benefit would add. */
export function Runway({ tone = "navy" }: { tone?: string }) {
  cited.add("baro25");
  const [spend, setSpend] = useState(4500);
  const [saved, setSaved] = useState(12000);
  const months = spend > 0 ? saved / spend : 0;
  const benefit = 500000;
  const years = spend > 0 ? benefit / (spend * 12) : 0;
  return (
    <Shell tone={tone} icon="clock" label="How long could you manage?">
      <h3 className="wq">If one income stopped, how many months could your household carry on?</h3>
      <div className="wgrid">
        <Num label="Monthly spending" value={spend} set={setSpend} step={100} />
        <Num label="Savings you could use" value={saved} set={setSaved} step={1000} />
      </div>
      <div className="wresult" role="status">
        <div className="wpair">
          <div><p className="wbig">{months.toFixed(1)} <span>months</span></p><p className="wcap">Savings alone</p></div>
          <div><p className="wbig">{(years + months / 12).toFixed(1)} <span>years</span></p><p className="wcap">With a {money(benefit)} death benefit</p></div>
        </div>
        <p>In the 2025 Barometer, 47% of Americans said their household would feel a financial impact within six months of losing a primary wage earner. The benefit is an illustration; it is not a quote.</p>
      </div>
    </Shell>
  );
}

/** Guess the yearly price of a basic term policy, then see the accepted median. */
export function CostGuess({ tone = "sky" }: { tone?: string }) {
  cited.add("baro25");
  const id = useId();
  const [guess, setGuess] = useState(1000);
  const [shown, setShown] = useState(false);
  const actual = 192;
  const ratio = guess / actual;
  return (
    <Shell tone={tone} icon="cup" label="Guess the price">
      <h3 className="wq">A healthy man of 30 wants $250,000 of cover for 20 years. What does it cost a year?</h3>
      <div className="wfield">
        <label htmlFor={id}>Your guess: <strong>{money(guess)}</strong> a year</label>
        <input id={id} type="range" min={0} max={3000} step={25} value={guess} onChange={(e) => { setGuess(Number(e.target.value)); setShown(false); }} />
        <span className="wfield__hint wrange"><span>$0</span><span>$3,000</span></span>
      </div>
      <button type="button" className="btn btn--line" onClick={() => setShown(true)}>Show the accepted price</button>
      <div className="wresult" role="status">
        <div className="wpair">
          <div><p className="wbig">{money(guess)}</p><p className="wcap">Your guess, a year</p></div>
          <div><p className="wbig">{shown ? money(actual) : "?"}</p><p className="wcap">Accepted median, a year</p></div>
        </div>
        <p>{shown ? `That is about $16 a month. ${ratio >= 1.1 ? `Your guess was ${ratio.toFixed(1)} times as much.` : ratio <= 0.9 ? "You guessed under it." : "You were close."} Adults under 31 in LIMRA's survey guessed about $2,000, ten to twelve times the accepted median.` : "Move the slider, then ask for the accepted figure."}</p>
      </div>
    </Shell>
  );
}

/** A term length from the longest obligation: the mortgage, or the years until a child is independent. */
export function TermPicker({ tone = "sun" }: { tone?: string }) {
  const [age, setAge] = useState(2);
  const [mortgage, setMortgage] = useState(27);
  const [college, setCollege] = useState(true);
  const childYears = Math.max(0, (college ? 22 : 18) - age);
  const longest = Math.max(childYears, mortgage);
  const steps = [10, 15, 20, 25, 30];
  const term = steps.find((s) => s >= longest) ?? 30;
  const cap = longest > 30;
  return (
    <Shell tone={tone} icon="calendar" label="How long a term?">
      <h3 className="wq">Choose a length from your longest obligation.</h3>
      <div className="wgrid">
        <Num label="Youngest child's age" value={age} set={setAge} step={1} max={25} />
        <Num label="Years left on the mortgage" value={mortgage} set={setMortgage} step={1} max={40} />
      </div>
      <label className="wcheck"><input type="checkbox" checked={college} onChange={(e) => setCollege(e.target.checked)} /> Cover four years of college</label>
      <div className="wresult" role="status">
        <ol className="wsteps" aria-label="Term lengths">{steps.map((st) => <li key={st} className={st === term ? "is-on" : undefined}><span>{st}</span> years</li>)}</ol>
        <p className="wbig">{term} <span>years</span></p>
        <p>The child is independent in {childYears} {childYears === 1 ? "year" : "years"}; the mortgage ends in {mortgage}. {longest === childYears && childYears > 0 ? "The child's years are the longer." : mortgage > 0 ? "The mortgage is the longer." : ""} Terms come in steps of ten, fifteen, twenty, twenty-five and thirty years, so the next step up is {term}{cap ? "; longer needs call for a second policy or a permanent one" : ""}.</p>
      </div>
    </Shell>
  );
}

/** The ten-times-income rule, with the multiple adjustable. */
export function Multiple({ tone = "sun" }: { tone?: string }) {
  const id = useId();
  const [income, setIncome] = useState(85000);
  const [m, setM] = useState(10);
  return (
    <Shell tone={tone} icon="chart" label="Rule of thumb">
      <h3 className="wq">What is the usual first estimate of the cover to buy?</h3>
      <Num label="Annual income" value={income} set={setIncome} step={5000} />
      <div className="wfield">
        <label htmlFor={id}>Multiple of income: <strong>{m}×</strong></label>
        <input id={id} type="range" min={5} max={15} step={1} value={m} onChange={(e) => setM(Number(e.target.value))} />
        <span className="wfield__hint wrange"><span>5×</span><span>15×</span></span>
      </div>
      <div className="wresult" role="status">
        <div className="wpair wpair--3">
          {[5, m, 15].map((x, i) => <div key={i} className={i === 1 ? "is-on" : undefined}><p className="wbig">{money(income * x)}</p><p className="wcap">{x}× income{i === 1 ? " (yours)" : ""}</p></div>)}
        </div>
        <p>The guide's general rule is at least ten times salary. Raise the multiple for young children and a long mortgage, lower it near retirement, then add debts and schooling for a better figure.</p>
      </div>
    </Shell>
  );
}

export const WIDGETS = { runway: Runway, costGuess: CostGuess, termPicker: TermPicker, multiple: Multiple } as const;
export type WidgetName = keyof typeof WIDGETS;
