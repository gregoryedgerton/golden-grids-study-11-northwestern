/**
 * The icons are the reference site's own: the duotone line drawings its
 * pages put over each product and promise (a shield with a heart, a family,
 * sliders, a gauge, a cup, a lock, a person with arrows, a stack of cash, a
 * plant in a pot), and its plain interface glyphs (a check, a telephone, a
 * pin, a user, a search glass). They are used at the study's request, copied
 * from the reference pages' own SVG (captures/icons-scan.cjs lists them) and
 * credited in the README. As imprints they sit large and faint behind a
 * square's text; the names are this study's, and several names share a drawing
 * where the reference has no closer one.
 */
import shieldHeart from "./site-icons/shield-heart.svg";
import family from "./site-icons/family.svg";
import sliders from "./site-icons/sliders.svg";
import gauge from "./site-icons/gauge.svg";
import shieldClockA from "./site-icons/shield-clock-a.svg";
import shieldGlobe from "./site-icons/shield-globe.svg";
import shieldGlobeArrows from "./site-icons/shield-globe-arrows.svg";
import shieldClock from "./site-icons/shield-clock.svg";
import cup from "./site-icons/cup.svg";
import lock from "./site-icons/lock.svg";
import personArrows from "./site-icons/person-arrows.svg";
import cash from "./site-icons/cash.svg";
import lockFixed from "./site-icons/lock-fixed.svg";
import plant from "./site-icons/plant.svg";
import check from "./site-icons/check.svg";
import phone from "./site-icons/phone.svg";
import pin from "./site-icons/pin.svg";
import user from "./site-icons/user.svg";

export type IconName =
  | "shield" | "family" | "house" | "baby" | "graduation" | "heart" | "calendar" | "lock" | "coins"
  | "umbrella" | "scale" | "document" | "clock" | "book" | "phone" | "pin" | "mail" | "compass"
  | "briefcase" | "cup" | "check" | "chart" | "key" | "rings" | "sprout" | "person";

const FILE: Record<IconName, string> = {
  shield: shieldHeart, heart: shieldHeart, rings: shieldHeart,
  family, baby: family,
  house: lock, lock, key: lockFixed,
  graduation: plant, sprout: plant, coins: cash,
  calendar: shieldClock, document: shieldClockA, clock: gauge, chart: gauge, compass: gauge,
  umbrella: shieldGlobe, book: shieldGlobeArrows, scale: sliders, briefcase: sliders,
  cup, check, phone, pin, mail: user, person: personArrows,
};

export function Imprint({ name }: { name: IconName }) {
  return <img className="box__imprint" src={FILE[name]} alt="" aria-hidden="true" />;
}

/** The same drawing at inline size, for lists and buttons. */
export function Icon({ name, size = 32 }: { name: IconName; size?: number }) {
  return <img className="icon" src={FILE[name]} alt="" aria-hidden="true" width={size} height={size} />;
}
