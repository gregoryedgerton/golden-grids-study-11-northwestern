import meta from "./photos.json";

/**
 * Photographs are from Unsplash, under the Unsplash License (free to use,
 * no attribution required; credited here anyway). `photos.json` records
 * each one's page and photographer from the search it was found in; the
 * descriptions below are this study's own, written from the picture.
 */
const ALT: Record<number, string> = {
  1: "A father with two young children on his shoulders beside a white picket fence",
  7: "A father kissing his smiling toddler on the cheek",
  8: "A family on a bed: a mother nursing her baby beside her husband and their toddler",
  9: "A mother on a sofa with a toddler and a baby, looking at a tablet together",
  12: "A mother kissing her laughing baby",
  14: "A family around a restaurant table raising glasses together",
  15: "A couple holding their baby up in a sunny park",
  16: "Two parents walking across a field holding their toddler's hands, seen from behind",
  17: "A mother and father with their newborn, foreheads touching",
  20: "A couple lifting their baby above them in a golden field",
  23: "Two parents sitting on a white floor, each with a baby",
  25: "A couple sitting in jeans on the floor with a baby on each lap",
  52: "A bearded father hugging his smiling young daughter in a field",
  53: "A father in a blue shirt holding his baby in the evening sun",
  57: "A father in an orange jacket holding his curly-haired child",
  59: "A mother and two children laughing together in a kitchen",
  62: "A couple cooking together in a bright kitchen",
  66: "Two children mixing ingredients in a kitchen",
  70: "A grandfather and children preparing food at a kitchen counter",
  73: "A family walking hand in hand through a meadow",
  75: "A father and two children walking down a forest path, one in a red coat",
  76: "A family of five walking along a boardwalk through reeds",
  82: "A family walking a tree-lined path at sunset, a father carrying their baby",
  84: "Three generations of a family sharing a meal around a table",
  88: "A family playing a board game together on a sofa",
  97: "A toddler pouring water at a water table in a backyard",
  111: "A newborn baby smiling in her sleep, wrapped in a blanket",
  116: "A mother holding her yawning newborn",
  118: "A couple kissing while holding up an ultrasound picture",
  120: "A father and child on a sofa sharing a snack with a laptop open beside them",
  121: "A couple on a green sofa with a young child and a baby",
  124: "A mother and child on a leather sofa in a bright living room",
  126: "A mother on a grey sofa with her two young sons",
  127: "Grandparents and parents holding a baby in front of a Christmas tree",
  134: "A family hanging a sign on the wall of their new home, boxes at their feet",
  137: "A couple sitting among moving boxes holding a small wooden house",
  139: "A couple laughing on the floor of their new home among cardboard boxes",
  150: "A couple on a window seat holding their baby",
  153: "A couple holding their newborn against a dark wall",
  154: "A mother and father looking at their newborn in a hospital room",
  157: "Two parents with their newborn on a bed",
  168: "A mother hugging her young son on a city street",
  174: "A father carrying a toddler on his shoulders in front of a teal door",
  185: "A family playing a board game on the sofa at home",
  207: "A couple lying on a bed with a laptop and a mug, planning together",
  211: "A couple on a staircase looking at a laptop together",
  215: "A couple on a sofa looking at a laptop",
  219: "A father reading a picture book to his baby",
  222: "A boy reading a picture book on his bed",
  223: "A mother and child reading together in a play tent",
  226: "A mother and her young son reading a book together",
  229: "A mother and daughter reading beside a lamp",
  232: "A family on a bed, parents reading and phoning while their son reads beside them",
  235: "A family sitting together on the steps of their front porch",
  249: "A toddler in a green coat blowing bubbles on the lawn",
  252: "A boy playing with toys at a low shelf",
  260: "A laughing toddler on a seesaw",
  263: "Two parents walking a child along a garden path",
  266: "A father with a child on his shoulders and two more children beside a lake path",
  267: "A family with two toddlers in an autumn wood",
  291: "Hands signing papers at a table",
  295: "A couple at a table going over a document together",
  299: "A couple reading a letter together in their kitchen",
  303: "A couple signing papers together in the evening",
  337: "An expecting couple sitting close on a sofa",
};

export interface Photo { n: number; src: string; alt: string; by: string; page: string }
const byN = new Map((meta as { n: number; file: string; by: string; page: string }[]).map((m) => [m.n, m]));

export function photo(n: number): Photo {
  const m = byN.get(n);
  if (!m) throw new Error(`photo ${n} is not in photos.json`);
  return { n, src: `${import.meta.env.BASE_URL}${m.file}`, alt: ALT[n] ?? "", by: m.by, page: m.page };
}

/** Photographs that have been drawn on this page, for the credits in the footer. */
export const seen = new Set<number>();
