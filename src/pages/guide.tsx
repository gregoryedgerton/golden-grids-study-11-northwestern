import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { useFontsReady } from "../lib/fonts";
import { Squares } from "../bands/bands";
import { Newsletter, Quiz, Jump } from "../lib/modules";
import { GUIDE, SOURCE, STRIPS } from "../content";
import { PROSE } from "../prose";
import "../styles.css";

function App() {
  useFontsReady(["300 1em 'Source Sans 3'", "500 1em 'Source Sans 3'", "400 1em 'Source Sans 3'"]);
  return (
    <Page current="guide.html" crumbs={["Home", "Life & Money", "Life Insurance Guide"]} source={SOURCE.guide}>
      <div className="wrap guide__intro">
        <h1 className="title">Life Insurance Guide</h1>
        <p className="intro">{GUIDE.intro}</p>
      </div>
      <Jump items={GUIDE.sections} />
      <Squares id="what" prose={PROSE.guideWhat} kicker="Section 01" title="What is life insurance?" squares={GUIDE.what} variant={0} />
      <Squares id="types" prose={PROSE.guideTypes} kicker="Section 02" title="Different types of life insurance" squares={GUIDE.types} variant={3} tone="sky" />
      <Squares id="how-much" prose={PROSE.guideHowMuch} kicker="Section 03" title="How much life insurance do I need?" squares={GUIDE.howMuch} variant={6} from={3} strip={STRIPS.guideHowMuch} />
      <Squares id="cash-value" prose={PROSE.guideCash} kicker="Section 04" title="What is life insurance cash value?" squares={GUIDE.cash} variant={1} tone="sun" />
      <Squares id="dividends" prose={PROSE.guideDividends} kicker="Section 05" title="How life insurance dividends work" squares={GUIDE.dividends} variant={4} from={4} strip={STRIPS.guideDividends} />
      <Quiz title={GUIDE.quiz.title} items={GUIDE.quiz.items} />
      <Squares id="revisit" prose={PROSE.guideRevisit} kicker="Section 06" title="When to revisit your life insurance coverage" squares={GUIDE.revisit} variant={5} tone="sky" />
      <Squares id="where" prose={PROSE.guideWhere} kicker="Section 07" title="Where to get life insurance" squares={GUIDE.where} variant={2} from={2} strip={STRIPS.guideWhere} />
      <Squares id="advisor" kicker="Section 08" title="Conversation starters with an advisor" lesson="Four questions to bring to a first meeting. Also ask what cash value can be used for later, and how many beneficiaries a policy can name." squares={GUIDE.starters} variant={7} tone="sun" />
      <Squares id="related" title="Related articles" squares={GUIDE.related} variant={0} />
      <Newsletter />
      <Squares id="cta" title="See how life insurance fits into your financial plan" quiet squares={[
        { label: "Plan", line: "See how life insurance fits into your financial plan", fitClass: "fit--display", tone: "navy", body: "Our advisors look at your whole financial situation and show you how life insurance can help you reach your goals.", btn: { label: "Connect with an advisor", href: "./advisor.html", variant: "gold" } },
        { photo: 82, kicker: "Life insurance", caption: "This is the fine print that matters.", href: "./advisor.html", cta: "Talk to an advisor", long: "Everything in the guide comes down to this: the people you would want looked after, and a policy sized to look after them." },
        { photo: 75, kicker: "Term life", caption: "Twenty years of muddy boots, covered.", href: "./term-life.html", cta: "See term life", long: "Term cover runs for the years a family depends on you. Choose the length, fix the premium and stop thinking about it." },
      ]} variant={3} tone="navy" />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
