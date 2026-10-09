import type { ReactNode } from "react";
import { Tools } from "./tools";
import { Credits } from "./modules";
import { NAV, UTILITY, FOOTER, SOURCE, CAPTURED, PAGES } from "../content";

/**
 * The shell, after the reference's: a utility strip, the wordmark and a row
 * of letter-spaced navigation, an optional breadcrumb, the page, and a
 * deep-blue footer of link columns. Where the reference says who
 * it is, this says what it is instead: a layout study, not an insurer.
 */
export function Page({ current, crumbs, source, children }: { current: string; crumbs?: string[]; source: { label: string; url: string }; children: ReactNode }) {
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <Tools />
      <aside className="notice" aria-label="About this site"><p>A layout study by GIFcommit of {SOURCE.home.label}. <strong>GIFcommit is not an insurer</strong>: nothing here is insurance, advice or an offer, and no form sends anything.</p></aside>
      <header className="top">
        <div className="top__util">
          <div className="wrap top__utilwrap"><div className="top__utilrow">
            <ul>{UTILITY.map((u) => <li key={u}><span>{u}</span></li>)}</ul>
            <a className="btn btn--gold btn--sm" href={PAGES.A}>Find a Financial Advisor</a>
          </div></div>
        </div>
        <div className="wrap top__bar">
          <a className="wordmark" href={PAGES.H}><span className="wordmark__mark" aria-hidden="true">G</span><span className="wordmark__name">GIFcommit</span></a>
          <nav className="nav" aria-label="Primary">
            <ul>{NAV.map(([label, href]) => (
              <li key={label}>{href === "#" ? <span className="nav__off" title="Not part of this study">{label}</span> : <a href={href} aria-current={href.endsWith(current) || (current === "term-life.html" || current === "whole-life.html" || current === "disability-calculator.html") && href.endsWith("life-insurance.html") ? "page" : undefined}>{label}</a>}</li>
            ))}</ul>
          </nav>
        </div>
      </header>
      {crumbs && (
        <nav className="wrap crumbs" aria-label="Breadcrumb"><ol>{crumbs.map((c, i) => <li key={c}>{i < crumbs.length - 1 ? <span>{c}</span> : <span aria-current="page">{c}</span>}</li>)}</ol></nav>
      )}
      <main id="content">{children}</main>
      <footer className="foot">
        <div className="wrap foot__cols">
          {FOOTER.map(([title, items]) => (
            <section key={title} aria-labelledby={`f-${title}`}>
              <h2 id={`f-${title}`}>{title}</h2>
              <ul>{items.map(([label, href]) => <li key={label}>{href === "#" ? <span>{label}</span> : <a href={href}>{label}</a>}</li>)}</ul>
            </section>
          ))}
        </div>
        <div className="wrap colophon">
          <p>
            A layout study of seven pages of <a href={SOURCE.home.url}>northwesternmutual.com</a>, captured {CAPTURED}: the <a href={SOURCE.home.url}>home page</a>,{" "}
            <a href={SOURCE.life.url}>Life insurance</a>, <a href={SOURCE.term.url}>Term life insurance</a>, <a href={SOURCE.whole.url}>Whole life insurance</a>,
            the <a href={SOURCE.guide.url}>Life Insurance Guide</a>, <a href={SOURCE.advisor.url}>an advisor's profile site</a> and the <a href={SOURCE.di.url}>disability insurance calculator</a>. This page is {source.label}.
            GIFcommit is a layout-study brand, not an insurer or a licensed advisor. The words are the study's own, written about how life insurance works;
            none of the reference's copy, ratings, rankings or prices is reproduced, and the advisor, team, address and telephone number are invented.
            Not affiliated with, or endorsed by, Northwestern Mutual. Built with <a href="https://github.com/gregoryedgerton/golden-grids">Golden Grids</a> ·{" "}
            <a href="https://www.npmjs.com/package/@gifcommit/golden-grids">npm</a> · <a href="https://gregoryedgerton.github.io/golden-grids/">generator</a>.
          </p>
          <Credits />
        </div>
      </footer>
    </>
  );
}
