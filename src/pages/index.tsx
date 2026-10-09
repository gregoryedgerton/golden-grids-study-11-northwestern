import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { useFontsReady } from "../lib/fonts";
import { Squares } from "../bands/bands";
import { Newsletter, Faq, Prose } from "../lib/modules";
import { HOME, SOURCE, STRIPS } from "../content";
import { PROSE } from "../prose";
import "../styles.css";

function App() {
  useFontsReady(["300 1em 'Source Sans 3'", "500 1em 'Source Sans 3'", "400 1em 'Source Sans 3'"]);
  return (
    <Page current="index.html" source={SOURCE.home}>
      <h1 className="visually-hidden">A steadier way to protect what you've built</h1>
      <Squares id="hero" title="Welcome" quiet squares={HOME.hero} variant={0} />
      <Prose section={PROSE.homeWhy} />
      <Squares id="products" title={HOME.products.title} lesson={HOME.products.lesson} squares={HOME.products.squares} variant={3} from={3} strip={STRIPS.homeProducts} />
      <Squares id="advisor" kicker="Your advisor" title={HOME.advisor.title} lesson={HOME.advisor.lesson} squares={HOME.advisor.squares} variant={6} tone="sun" from={2} strip={STRIPS.homeAdvisor} />
      <Prose section={PROSE.homeMeeting} />
      <Squares id="means" title={HOME.means.title} lesson={HOME.means.lesson} squares={HOME.means.squares} variant={1} />
      <Squares id="need" kicker={HOME.need.kicker} title={HOME.need.title} lesson={HOME.need.lesson} squares={HOME.need.squares} variant={5} from={3} strip={STRIPS.homeNeedStrip} />
      <Newsletter />
      <Squares id="strength" title={HOME.strength.title} lesson={HOME.strength.lesson} squares={HOME.strength.squares} variant={4} tone="sky" from={4} strip={STRIPS.homeStrength} />
      <Faq id="faq" title={HOME.faq.title} items={HOME.faq.items} />
      <Squares id="cta" title="Ready to feel easier about the future?" quiet squares={HOME.cta.squares} variant={2} tone="navy" />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
