import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Page } from "../lib/Page";
import { useFontsReady } from "../lib/fonts";
import { Squares } from "../bands/bands";
import { IncomeCalc } from "../lib/IncomeCalc";
import { DI, SOURCE } from "../content";
import "../styles.css";

function App() {
  useFontsReady(["300 1em 'Source Sans 3'", "500 1em 'Source Sans 3'", "400 1em 'Source Sans 3'"]);
  return (
    <Page current="disability-calculator.html" crumbs={["Home", "Insurance", "Disability income", "Calculator"]} source={SOURCE.di}>
      <h1 className="visually-hidden">Disability income calculator</h1>
      <Squares id="hero" title="Protect your income" quiet squares={DI.hero} variant={2} from={2} strip={DI.strip} />
      <IncomeCalc />
    </Page>
  );
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
