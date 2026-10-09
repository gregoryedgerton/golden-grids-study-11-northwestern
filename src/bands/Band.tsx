import type { ReactNode, Ref } from "react";

/**
 * A band is one small-range grid with one editorial job. Bands stack; they
 * do not nest. This wrapper adds the section landmark, the heading and the
 * standfirst, and the hidden props readout. The heading is the reference's
 * guide section header: a deep-blue bar across the page with a small label
 * ("Section 01") over a white title. A `quiet` band has no bar: its content
 * is the heading (a hero, a closing call to action), and the title is spoken.
 */
export function Band({
  id, kicker, title, lesson, note, aside, quiet, tone, wrapRef, before, children,
}: {
  /** Running text between the heading and the grid. */
  before?: ReactNode;
  /** The element whose width the grid takes, for a band that must choose a grid by the room it has. */
  wrapRef?: Ref<HTMLDivElement>;
  id: string;
  kicker?: string;
  title: string;
  lesson?: string;
  note?: string;
  aside?: { href: string; label: string };
  quiet?: boolean;
  /** `navy` makes the band a deep-blue panel (the closing call to action). */
  tone?: "sun" | "sky" | "navy";
  children: ReactNode;
}) {
  return (
    <section className={`band${tone === "navy" ? " band--navy" : ""}${quiet ? " band--quiet" : ""}`} id={id} aria-labelledby={`${id}-title`}>
      {quiet ? (
        <h2 id={`${id}-title`} className="visually-hidden">{title}</h2>
      ) : (
        <div className="band__bar">
          <div className="wrap band__barrow">
            <div>
              {kicker && <p className="band__kicker">{kicker}</p>}
              <h2 id={`${id}-title`} className="band__title">{title}</h2>
            </div>
            {aside && <a className="band__aside" href={aside.href}>{aside.label}</a>}
          </div>
        </div>
      )}
      <div className="wrap">
        {(lesson || note) && (
          <div className="band__intro">
            {lesson && <p className="band__lesson">{lesson}</p>}
            {note && <p className="band__note">{note}</p>}
          </div>
        )}
        {before}
        <div className="band__wrap" ref={wrapRef}>{children}</div>
      </div>
    </section>
  );
}
