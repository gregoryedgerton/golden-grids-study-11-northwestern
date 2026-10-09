import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { useFontsReady } from "../lib/fonts";
import { Squares } from "../bands/bands";
import { Newsletter, Prose } from "../lib/modules";
import { ADVISOR, SOURCE, STRIPS } from "../content";
import { PROSE } from "../prose";
import "../styles.css";

function App() {
  useFontsReady(["300 1em 'Source Sans 3'", "500 1em 'Source Sans 3'", "400 1em 'Source Sans 3'"]);
  return (
    <Page current="advisor.html" source={SOURCE.advisor}>
      <h1 className="visually-hidden">{ADVISOR.name}, {ADVISOR.role}</h1>
      <Squares id="home" title="Profile" quiet squares={ADVISOR.profile} variant={0} />
      <nav className="subnav" aria-label="This advisor's site"><div className="wrap"><ul>{ADVISOR.tabs.map(([id, label], i) => <li key={id}><a href={`#${id === "home" ? "difference" : id}`} aria-current={i === 0 ? "true" : undefined}>{label}</a></li>)}</ul></div></nav>
      <Squares id="difference" title={ADVISOR.difference.title} lesson={ADVISOR.difference.lesson} squares={ADVISOR.difference.squares} variant={3} tone="sky" from={4} strip={STRIPS.advDifference} />
      <Prose section={PROSE.advisorAbout} />
      <Squares id="about" kicker="About me" title="Why I do this work" squares={ADVISOR.about} variant={1} />
      <Squares id="team" kicker="My team" title="The people you will work with" squares={ADVISOR.team} variant={6} tone="sun" from={3} strip={STRIPS.advTeam} />
      <Squares id="planning" kicker="Planning" title="How planning works" squares={ADVISOR.planning} variant={4} />
      <Squares id="products" kicker="Products & services" title="What I offer" squares={ADVISOR.products} variant={2} tone="sky" />
      <Squares id="resources" kicker="Resources" title="Let's boost your financial knowledge" squares={ADVISOR.resources} variant={5} />
      <Newsletter />
      <Squares id="contact" title="Ready to work together?" quiet squares={ADVISOR.cta} variant={7} tone="navy" />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
