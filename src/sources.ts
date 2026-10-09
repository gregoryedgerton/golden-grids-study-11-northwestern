/**
 * Where each statistic comes from. A fact or strip names its source by key;
 * the square shows the short form, its expanded passage links the full one,
 * and the page's colophon lists every source the page drew on.
 */
export const SOURCES = {
  baro25: { short: "LIMRA & Life Happens, 2025", full: "LIMRA and Life Happens, 2025 Insurance Barometer Study (Report 1: Educating With Intent)", url: "https://www.limra.com/barometer/" },
  baro26: { short: "LIMRA & Life Happens, 2026", full: "LIMRA and Life Happens, 2026 Insurance Barometer Study", url: "https://www.limra.com/barometer/" },
  limra25: { short: "LIMRA, 2025 sales", full: "LIMRA, U.S. individual life insurance sales in 2025 (March 2026)", url: "https://www.limra.com/en/newsroom/news-releases/2026/limra-u.s.-individual-life-insurance-new-premium-tops-$17.5-billion-to-set-new-sales-record-in-2025/" },
  ssa: { short: "Social Security Administration", full: "Social Security Administration, Fact Sheet", url: "https://www.ssa.gov/news/assets/materials/press/factsheets/basicfact-alt.pdf" },
  ccaoa: { short: "Child Care Aware, 2025", full: "Child Care Aware of America, Child Care in America: 2025 Price & Supply", url: "https://info.childcareaware.org/price-and-supply-2025" },
  collegeboard: { short: "College Board, 2025–26", full: "College Board, Trends in College Pricing and Student Aid 2025", url: "https://research.collegeboard.org/trends/college-pricing/highlights" },
  nar: { short: "NAR, 2025", full: "National Association of Realtors, 2025 Profile of Home Buyers and Sellers", url: "https://www.nar.realtor/news/real-estate-news/nar-2025-profile-of-home-buyers-sellers-reveals-market-extremes" },
  brookings: { short: "Brookings, 2022", full: "Brookings Institution, The cost of raising a child (2022, inflation-adjusted from USDA's estimate)", url: "https://www.brookings.edu/wp-content/uploads/2022/08/Brookings_Cost-to-raise-a-child_inflation-adjusted-2.pdf" },
  nolhga: { short: "NOLHGA", full: "National Organization of Life and Health Insurance Guaranty Associations, How You're Protected", url: "https://nolhga.com/policyholders/how-youre-protected/" },
} as const;
export type SourceKey = keyof typeof SOURCES;

/** Sources drawn on by the squares rendered on this page, for the colophon. */
export const cited = new Set<SourceKey>();
