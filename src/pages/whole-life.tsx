import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { useFontsReady } from "../lib/fonts";
import { Squares } from "../bands/bands";
import { Newsletter, Faq, CompareTable, Prose } from "../lib/modules";
import { WHOLE, SOURCE, STRIPS } from "../content";
import { PROSE } from "../prose";
import "../styles.css";

function App() {
  useFontsReady(["300 1em 'Source Sans 3'", "500 1em 'Source Sans 3'", "400 1em 'Source Sans 3'"]);
  return (
    <Page current="whole-life.html" crumbs={["Home", "Insurance", "Life insurance", "Whole life insurance"]} source={SOURCE.whole}>
      <h1 className="visually-hidden">Whole life insurance: let's protect your whole life</h1>
      <Squares id="hero" title="Whole life insurance" quiet squares={WHOLE.hero} variant={4} from={2} strip={STRIPS.wholeHero} />
      <Prose section={PROSE.wholeWhat} />
      <Squares id="what" title={WHOLE.what.title} lesson={WHOLE.what.lesson} squares={WHOLE.what.squares} variant={1} />
      <Squares id="highlights" title={WHOLE.highlights.title} lesson={WHOLE.highlights.lesson} squares={WHOLE.highlights.squares} variant={6} tone="sky" from={3} strip={STRIPS.wholeHighlights} />
      <Squares id="cost" title={WHOLE.cost.title} lesson={WHOLE.cost.lesson} squares={WHOLE.cost.squares} variant={3} />
      <Squares id="numbers" title={WHOLE.numbers.title} lesson={WHOLE.numbers.lesson} squares={WHOLE.numbers.squares} variant={1} from={3} strip={STRIPS.wholeNumbers} />
      <CompareTable title={WHOLE.compare.title} rows={WHOLE.compare.rows} note={WHOLE.compare.note} />
      <Prose section={PROSE.wholeVsTerm} />
      <Squares id="families" title={WHOLE.families.title} lesson={WHOLE.families.lesson} squares={WHOLE.families.squares} variant={2} tone="sun" from={2} strip={STRIPS.wholeFamilies} />
      <Faq id="faq" title={WHOLE.faq.title} items={WHOLE.faq.items} />
      <Newsletter />
      <Squares id="strength" title={WHOLE.strength.title} lesson={WHOLE.strength.lesson} squares={WHOLE.strength.squares} variant={5} tone="sky" from={3} strip={STRIPS.wholeStrength} />
      <Squares id="cta" title="Now you're ready for the best life insurance option for you" quiet squares={WHOLE.cta.squares} variant={7} tone="navy" />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
