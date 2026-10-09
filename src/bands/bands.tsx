import { useLayoutEffect, useRef, useState } from "react";
import type React from "react";
import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import { useViewport, type Viewport } from "../lib/viewport";
import { useExpandGroup, ExpandedCell, type ExpandGroup } from "../lib/expand";
import { Fact as FactBox } from "../lib/boxes";
import { Band } from "./Band";
import { Imprint } from "../icons";
import { photo, seen } from "../photos";
import { isPic, isStrip, isWidget, type Fact, type Pic, type Strip, type Sq } from "../content";
import { Fit } from "../lib/fit";
import { Prose } from "../lib/modules";
import type { ProseSection } from "../prose";
import { plan } from "../lib/plan";
import { SOURCES, cited } from "../sources";
import { WIDGETS } from "../lib/widgets";

/**
 * The bands. Every module on the reference is a row or a column of equal
 * cards; here each is one grid, the first square the hero and the rest in
 * descending squares, a mix of type and photograph.
 *
 * A band may skip the smallest squares (`from` above 1): the library then
 * collapses them into one strip, filled by the band's last child, so the
 * grid is irregular, a run of larger squares with a wide short strip at its
 * corner. That needs room (the smallest visible square must be at least
 * 104px), so below the width where it fits the same children fall back into
 * a plain grid in which the strip's content is simply the smallest square.
 * Landscape or portrait, and which side the largest square takes, are looked
 * up in `lib/spiral.ts`; `variant` turns through the qualifying placements so
 * neighbouring bands differ.
 */
function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const read = () => setW(Math.round(el.getBoundingClientRect().width));
    read();
    const ro = new ResizeObserver(read); ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function Grids({ boxes, placement, cw, split }: { boxes: React.ReactNode[]; placement: PlacementValue; cw: boolean; split: boolean }) {
  if (!split || boxes.length < 5) return <GoldenGrid from={1} to={boxes.length} placement={placement} clockwise={cw}>{boxes}</GoldenGrid>;
  const first = 3, rest = boxes.length - first;
  return (
    <div className="stack">
      <GoldenGrid from={1} to={first} placement="top" clockwise={cw}>{boxes.slice(0, first)}</GoldenGrid>
      <GoldenGrid from={1} to={rest} placement={rest % 2 ? "bottom" : "right"} clockwise={!cw}>{boxes.slice(first)}</GoldenGrid>
    </div>
  );
}
const noteFor = (v: Viewport, n: number, placement: PlacementValue, cw: boolean) => v !== "desktop" && n >= 5 ? `two grids: from=1 to=3 · placement="top" / from=1 to=${n - 3}` : `from=1 to=${n} · placement="${placement}" · clockwise=${cw}`;

/** A fact in a square: label, fitted line, body, a More where there is a longer passage, a link or button where the reference has one. */
function FactCard({ fact, x, slotKey, hero }: { fact: Fact; x: ExpandGroup; slotKey: string; hero: boolean }) {
  const title = fact.source ? `${fact.line.replace(/\n/g, " ")}: ${fact.label ?? ""}`.replace(/: $/, "") : fact.line.replace(/\n/g, " ");
  const src = fact.source ? SOURCES[fact.source] : undefined;
  if (fact.source) cited.add(fact.source);
  return (
    <FactBox
      imprint={fact.icon ? <Imprint name={fact.icon} /> : undefined}
      label={fact.label}
      labelClass={fact.labelClass}
      fitClass={fact.fitClass ?? (hero ? "fit--head" : "fit--title")}
      max={120}
      tone={fact.tone ?? "paper"}
      btn={fact.btn}
      source={src?.short}
      body={fact.body ? <><p className="box__body--short">{fact.body}</p><p className="box__body--long">{fact.body}{fact.long ? ` ${fact.long}` : ""}</p></> : undefined}
      link={fact.href && !fact.btn ? { href: fact.href, label: fact.cta ?? "Read more", aria: `${fact.cta ?? "Read more"}: ${title}` } : undefined}
      expand={fact.long ? {
        group: x, slotKey, title,
        full: <div className="cell__body"><p>{fact.body}</p><p>{fact.long}</p></div>,
        related: [...(fact.href ? [{ href: fact.href, label: fact.cta ?? "Read more" }] : []), ...(src ? [{ href: src.url, label: `Source: ${src.full}` }] : [])],
      } : undefined}
    >
      {fact.line}
    </FactBox>
  );
}

/** A photograph filling its square; the picture is the control that opens it whole. */
function PicCard({ pic, x, slotKey }: { pic: Pic; x: ExpandGroup; slotKey: string }) {
  const p = photo(pic.photo);
  seen.add(pic.photo);
  const title = pic.caption ?? p.alt;
  return (
    <>
      <figure className="media">
        <img src={p.src} alt={p.alt} loading="lazy" style={pic.pos ? { objectPosition: pic.pos } : undefined} />
        <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">Open the photograph: {p.alt}</span></button>
        {(pic.kicker || pic.caption) && (
          <figcaption className="media__caption">
            {pic.kicker && <span className="media__kicker">{pic.kicker}</span>}
            {pic.caption && <span className="media__name">{pic.caption}</span>}
          </figcaption>
        )}
      </figure>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={title} onClose={x.close} closeRef={x.closeRef}>
          <div className="cell__split">
            <figure className="cell__photo">
              <img src={p.src} alt={p.alt} />
              <figcaption className="note">Photograph: {p.by}, <a href={p.page}>Unsplash</a>, under the Unsplash License.</figcaption>
            </figure>
            <div className="cell__body">{pic.long ? <p>{pic.long}</p> : <p>{p.alt}.</p>}</div>
          </div>
        </ExpandedCell>
      )}
    </>
  );
}

/** The strip, or the smallest square: a short line, a link when it has somewhere to go. */
function StripCard({ strip }: { strip: Strip }) {
  if (strip.source) cited.add(strip.source);
  const body = (
    <>
      {strip.icon && <Imprint name={strip.icon} />}
      {strip.label && <p className="box__label">{strip.label}</p>}
      <div className="box__fit"><Fit as="span" className="fit--display fit--num" min={8} max={120}>{strip.strip}</Fit></div>
      {strip.sub && <div className="box__body"><Fit as="p" className="fit--body" min={12} max={20}>{strip.sub}</Fit></div>}
    </>
  );
  const cls = `box box--strip box--${strip.tone ?? "navy"}`;
  return strip.href ? <a className={cls} href={strip.href}>{body}</a> : <div className={cls}>{body}</div>;
}

/**
 * A band of squares. `from` above 1 skips the smallest squares and the
 * `strip` fills the collapsed placeholder; `quiet` bands put the largest
 * square first in reading order.
 */
export function Squares({ id, kicker, title, lesson, squares, variant = 0, quiet, tone, aside, from = 1, strip, prose }: {
  /** Running text between the section bar and its grid. */
  prose?: ProseSection;
  id: string; kicker?: string; title: string; lesson?: string; squares: Sq[]; variant?: number; quiet?: boolean; tone?: "sun" | "sky" | "navy"; aside?: { href: string; label: string };
  /** Skip the smallest squares: the library collapses them into a strip, filled by `strip`. */
  from?: number; strip?: Strip;
}) {
  const v = useViewport();
  const x = useExpandGroup();
  const [ref, width] = useWidth();
  // A cell that answers back needs more room than a narrow golden grid gives it, so below desktop it stands above the grid at full width.
  const flat = v !== "desktop" ? squares.filter(isWidget) : [];
  const gridSquares = v !== "desktop" ? squares.filter((s) => !isWidget(s)) : squares;
  const all: Sq[] = strip ? [...gridSquares, strip] : gridSquares;
  const landscape = v !== "mobile";
  const skipPlan = strip && from > 1 && width > 0 ? plan(width, from, gridSquares.length, landscape, variant, quiet) : null;
  const regular = skipPlan ? null : plan(width || 1000, 1, all.length, landscape, variant, quiet);
  const p = skipPlan ?? regular ?? { from: 1, to: all.length, placement: "right" as PlacementValue, cw: true };
  const boxes = all.map((s, i) => {
    const key = `${id}-${i}`;
    return <GoldenBox key={key} {...x.boxProps(key)}>{isWidget(s) ? (() => { const W = WIDGETS[s.widget]; return <W tone={s.tone} />; })() : isStrip(s) ? <StripCard strip={s} /> : isPic(s) ? <PicCard pic={s} x={x} slotKey={key} /> : <FactCard fact={s} x={x} slotKey={key} hero={i === 0} />}</GoldenBox>;
  });
  const note = skipPlan ? `from=${p.from} to=${p.to} · placement="${p.placement}" · clockwise=${p.cw} · strip = last child` : noteFor(v, all.length, p.placement, p.cw);
  return (
    <Band id={id} kicker={kicker} title={title} lesson={lesson} quiet={quiet} tone={tone} aside={aside} note={note} wrapRef={ref} before={prose && <Prose section={prose} inline />}>
      {flat.map((s, i) => { const W = WIDGETS[(s as { widget: keyof typeof WIDGETS }).widget]; return <div key={i} className="widget-flat"><W tone={(s as { tone?: string }).tone} /></div>; })}
      {skipPlan
        ? <GoldenGrid from={p.from} to={p.to} placement={p.placement} clockwise={p.cw}>{boxes}</GoldenGrid>
        : <Grids placement={p.placement} cw={p.cw} split={v !== "desktop"} boxes={boxes} />}
    </Band>
  );
}
