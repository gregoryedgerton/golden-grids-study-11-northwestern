import type { ReactNode } from "react";
import { Tools } from "./tools";
import { StudyBanner, StudyDisclosure } from "./study";
import { Credits } from "./modules";
import { NAV, UTILITY, FOOTER, PAGES } from "../content";

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
      <StudyBanner />
      <Tools />
      <header className="top">
        <div className="top__util">
          <div className="wrap top__utilwrap"><div className="top__utilrow">
            <ul>{UTILITY.map((u) => <li key={u}><span>{u}</span></li>)}</ul>
            <a className="btn btn--gold btn--sm" href={PAGES.A}>Find a Financial Advisor</a>
          </div></div>
        </div>
        <div className="wrap top__bar">
          <a className="wordmark" href={PAGES.H}><span className="wordmark__mark" aria-hidden="true">G</span><span className="wordmark__name">GIFmutual</span></a>
          <nav className="nav" aria-label="Primary">
            <ul>{NAV.map(([label, href]) => (
              <li key={label}>{href === "#" ? <span className="nav__off" title="Not part of this study">{label}</span> : <a href={href} aria-current={href.endsWith(current) || (current === "term-life.html" || current === "whole-life.html") && href.endsWith("life-insurance.html") ? "page" : undefined}>{label}</a>}</li>
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
      </footer>
      <StudyDisclosure>
        <p>This page follows <a href={source.url}>{source.label}</a> on the reference site.</p>
        <Credits />
      </StudyDisclosure>
    </>
  );
}
