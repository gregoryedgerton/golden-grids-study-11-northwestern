import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { useFontsReady } from "../lib/fonts";
import { Squares } from "../bands/bands";
import { Newsletter, Faq, Prose } from "../lib/modules";
import { LIFE, SOURCE, STRIPS } from "../content";
import { PROSE } from "../prose";
import "../styles.css";

function App() {
  useFontsReady(["300 1em 'Source Sans 3'", "500 1em 'Source Sans 3'", "400 1em 'Source Sans 3'"]);
  return (
    <Page current="life-insurance.html" crumbs={["Home", "Insurance", "Life insurance"]} source={SOURCE.life}>
      <h1 className="visually-hidden">Life insurance: let's protect the ones you love</h1>
      <Squares id="hero" title="Life insurance" quiet squares={LIFE.hero} variant={2} from={3} strip={STRIPS.lifeHero} />
      <Prose section={PROSE.lifeWhat} />
      <Squares id="design" title={LIFE.design.title} lesson={LIFE.design.lesson} squares={LIFE.design.squares} variant={1} tone="sky" />
      <Squares id="why" kicker="Let's talk about it" title={LIFE.why.title} lesson={LIFE.why.lesson} squares={LIFE.why.squares} variant={5} from={3} strip={STRIPS.lifeWhy} />
      <Squares id="types" title={LIFE.types.title} lesson={LIFE.types.lesson} squares={LIFE.types.squares} variant={0} aside={{ href: "./whole-life.html#compare", label: "Compare our types of insurance" }} />
      <Prose section={PROSE.lifeChoose} />
      <Newsletter />
      <Squares id="resources" title={LIFE.resources.title} squares={LIFE.resources.squares} variant={7} tone="sun" />
      <Faq id="faq" title={LIFE.faq.title} items={LIFE.faq.items} />
      <Squares id="cta" title="Now you're ready for a life insurance quote" quiet squares={LIFE.cta.squares} variant={3} tone="navy" />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
