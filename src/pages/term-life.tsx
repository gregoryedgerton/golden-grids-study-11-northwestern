import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { useFontsReady } from "../lib/fonts";
import { Squares } from "../bands/bands";
import { Calculator, Quiz, Faq, Prose } from "../lib/modules";
import { TERM, SOURCE, STRIPS } from "../content";
import { PROSE } from "../prose";
import "../styles.css";

function App() {
  useFontsReady(["300 1em 'Source Sans 3'", "500 1em 'Source Sans 3'", "400 1em 'Source Sans 3'"]);
  return (
    <Page current="term-life.html" crumbs={["Home", "Insurance", "Life insurance", "Term life insurance"]} source={SOURCE.term}>
      <h1 className="visually-hidden">Term life insurance: protection on your terms</h1>
      <Squares id="hero" title="Term life insurance" quiet squares={TERM.hero} variant={0} />
      <Prose section={PROSE.termWhy} />
      <Squares id="time" title={TERM.time.title} lesson={TERM.time.lesson} squares={TERM.time.squares} variant={3} from={3} strip={STRIPS.termTime} />
      <Squares id="fits" title={TERM.fits.title} lesson={TERM.fits.lesson} squares={TERM.fits.squares} variant={6} tone="sky" from={2} strip={STRIPS.termFits} />
      <Calculator />
      <Prose section={PROSE.termResult} />
      <Squares id="kinds" title={TERM.kinds.title} lesson={TERM.kinds.lesson} squares={TERM.kinds.squares} variant={1} />
      <Squares id="numbers" title={TERM.numbers.title} lesson={TERM.numbers.lesson} squares={TERM.numbers.squares} variant={4} tone="sun" from={4} strip={STRIPS.termNumbers} />
      <Prose section={PROSE.termCheck} />
      <Faq id="faq" title={TERM.faq.title} items={TERM.faq.items} />
      <Quiz title={TERM.quiz.title} items={TERM.quiz.items} />
      <Squares id="cta" title="Ready to take the next step?" quiet squares={TERM.cta.squares} variant={5} tone="navy" />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
