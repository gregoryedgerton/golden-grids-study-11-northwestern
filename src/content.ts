/**
 * Six pages of northwesternmutual.com — the home page, Life insurance, Term
 * life insurance, Whole life insurance, the Life Insurance Guide and an
 * advisor's profile site — rebuilt as stacked golden grids for GIFmutual, a
 * fictional mutual insurer, in the register of the reference's Life Insurance Guide.
 *
 * The words are this study's own. They are about the subject (how term and
 * whole life insurance work, what they cover and cost, who they suit), in the
 * order the reference takes them; none is Northwestern Mutual's copy, and
 * none of its ratings, rankings, dividends or prices is carried over:
 * GIFmutual has no rating to quote, so it quotes none. The advisor is
 * invented. Photographs are Unsplash's, credited in each page's footer.
 */
import type { IconName } from "./icons";
import type { SourceKey } from "./sources";

export type Tone = "paper" | "sun" | "sky" | "navy" | "mid" | "blush" | "white" | "open";
/** A fact that fits a square: a label, a fitted line, body copy and a longer passage behind More. */
export interface Fact {
  label?: string; labelClass?: string; line: string; fitClass?: string;
  body?: string; long?: string; icon?: IconName; tone?: Tone;
  href?: string; cta?: string;
  /** Where a statistic in the line comes from. */
  source?: SourceKey;
  btn?: { label: string; href: string; variant?: "gold" | "blue" | "line" };
}
/** A photograph that fills a square; choosing it opens the picture whole, with a passage beside it. */
/** The caption is marketing copy for a product, never a description of the picture (that is the alt text); `href` leads to the product. */
export interface Pic { photo: number; kicker?: string; caption?: string; long?: string; pos?: string; href?: string; cta?: string }
/** A short line that fills the strip a skipped range collapses into, or the smallest square when the range is not skipped. A link when it has an href. */
export interface Strip { label?: string; strip: string; sub?: string; href?: string; tone?: Tone; icon?: IconName; source?: SourceKey }
/** A cell that answers back: a small calculation the reader can change. */
export interface WidgetSq { widget: "runway" | "costGuess" | "termPicker" | "multiple"; tone?: Tone }
export type Sq = Fact | Pic | Strip | WidgetSq;
export const isWidget = (s: Sq): s is WidgetSq => "widget" in s;
export const isPic = (s: Sq): s is Pic => "photo" in s;
export const isStrip = (s: Sq): s is Strip => "strip" in s;

export const CAPTURED = "October 8, 2026";
export const SOURCE = {
  home: { label: "northwesternmutual.com", url: "https://www.northwesternmutual.com/" },
  life: { label: "Life insurance", url: "https://www.northwesternmutual.com/life-insurance/" },
  term: { label: "Term life insurance", url: "https://www.northwesternmutual.com/life-insurance/term-life-insurance/" },
  whole: { label: "Whole life insurance", url: "https://www.northwesternmutual.com/life-insurance/whole-life-insurance/" },
  guide: { label: "Life Insurance Guide", url: "https://www.northwesternmutual.com/life-and-money/life-insurance-guide/" },
  advisor: { label: "An advisor's profile site", url: "https://www.northwesternmutual.com/financial/advisor/mike-lutz/" },
  di: { label: "Disability insurance calculator", url: "https://www.northwesternmutual.com/disability-insurance/disability-insurance-calculator/" },
};

export const NAV: [string, string][] = [["About us", "#"], ["Financial planning", "#"], ["Insurance", "./life-insurance.html"], ["Calculator", "./disability-calculator.html"], ["Investments", "#"], ["Life & Money", "./guide.html"]];
export const UTILITY = ["Log in", "Claims"];
export const FOOTER: [string, [string, string][]][] = [
  ["Insurance", [["Life insurance", "./life-insurance.html"], ["Term life", "./term-life.html"], ["Whole life", "./whole-life.html"], ["Life Insurance Guide", "./guide.html"], ["Disability income calculator", "./disability-calculator.html"]]],
  ["Planning", [["Financial planning", "#"], ["Retirement", "#"], ["College savings", "#"], ["Estate planning", "#"], ["Long-term care", "#"]]],
  ["Working with us", [["Find a financial advisor", "./advisor.html"], ["Working with an advisor", "./advisor.html"], ["Claims", "#"], ["Careers", "#"], ["Contact us", "#"]]],
  ["About", [["Who we are", "#"], ["Newsroom", "#"], ["Security and privacy", "#"], ["Legal notice", "#"], ["Sitemap", "#"]]],
];

const H = "./index.html", L = "./life-insurance.html", T = "./term-life.html", W = "./whole-life.html", G = "./guide.html", A = "./advisor.html";
const D = "./disability-calculator.html";
export const PAGES = { H, L, T, W, G, A, D };

// --- The disability income calculator, as callouts and as a grid of its own ---------

/** Callout cells that lead to the calculator: a statistic as large type, a sentence and a button. */
export const CALLOUT = {
  group: { label: "Disability income calculator", line: "60%", fitClass: "fit--display fit--num", tone: "navy", icon: "briefcase",
    body: "of pay is what an employer's group plan usually replaces. Work out what you would need on top, in three steps.",
    btn: { label: "Calculate it", href: D, variant: "gold" as const } } as Fact,
  risk: { label: "Disability income calculator", line: "1 in 4", fitClass: "fit--display fit--num", tone: "sky", icon: "umbrella", source: "ssa",
    body: "of today's 20-year-olds will become disabled before 67. See how long your savings would carry your household.",
    btn: { label: "Calculate it", href: D, variant: "blue" as const } } as Fact,
};

export const DIBAND = {
  kicker: "Calculator",
  title: "How much of your income is protected?",
  lesson: "A death is not the likeliest way for a young family to lose an income. The disability income calculator takes three short steps and gives a figure you can change.",
  squares: [
    { label: "Disability income calculator", line: "1 in 4", fitClass: "fit--display fit--num", tone: "navy", icon: "umbrella", source: "ssa",
      body: "of today's 20-year-olds will become disabled and qualify for Social Security disabled-worker benefits before 67. Enter your age, your income and your expenses, and see what cover would keep the household running.",
      btn: { label: "Calculate it", href: D, variant: "gold" as const } },
    { photo: 53, kicker: "Disability income", caption: "Your paycheck called. It wants a bodyguard.", href: D, cta: "Calculate it",
      long: "Disability income insurance pays a monthly benefit while an illness or an injury keeps you from working. It protects the earnings still ahead, which for most young households are worth more than everything they own." },
    { label: "Usual group cover", line: "60%", fitClass: "fit--display fit--num", tone: "sky", icon: "briefcase",
      body: "of pay is what an employer's plan typically replaces, and it usually ends with the job.",
      long: "The benefit is generally taxable when the employer pays the premium, so the amount that arrives is smaller still. Individual cover is bought to close the gap.", href: D, cta: "See your gap" },
    { label: "Retirement age assumed", line: "67", fitClass: "fit--display fit--num", tone: "paper", icon: "calendar",
      body: "The calculator counts the working years, and the earnings, still ahead of you.", href: D, cta: "Count yours" },
  ] as Sq[],
  strip: { label: "Steps", strip: "3", sub: "then a result you can change", href: D, tone: "sun", icon: "check" } as Strip,
};

// --- Home ----------------------------------------------------------------------

export const HOME = {
  hero: [
    { label: "Welcome to", line: "A steadier way to protect what you've built", fitClass: "fit--display", tone: "navy",
      body: "See how the right advisor and the right policy fit a young family's life, from the first night at home to the last mortgage payment.",
      long: "A young family's money is mostly in the future: wages not yet earned, a mortgage not yet paid, schooling not yet bought. Life insurance is the one product that turns those years into a sum if the earner is gone. The conversation starts with what you want to protect, then works out how much and for how long.",
      btn: { label: "Let's get started", href: A, variant: "gold" as const } },
    { photo: 9, kicker: "Term life", caption: "Bedtime is non-negotiable. So is their future.", href: T, cta: "See term life",
      long: "Every figure in a plan starts with a household: who lives in it, who earns, who depends on whom. Cover is sized to that household, and it is revisited when it changes." },
    { photo: 7, kicker: "Term life", caption: "He thinks you're invincible. Have a backup plan.", href: T, cta: "See term life",
      long: "A child's needs are long and predictable: food, shelter, schooling, care. Term life insurance is priced for exactly that horizon, a fixed number of years in which the cost of losing an income is greatest." },
    { label: "One paycheck away", line: "47%", fitClass: "fit--display fit--num", tone: "sun", icon: "clock", source: "baro25",
        body: "of Americans say their household would feel a financial impact within six months if a primary wage earner died.",
        long: "Only about one in four say the household would be financially secure for more than two years. Term life insurance is priced for exactly that gap: a fixed sum for a fixed number of years.",
        href: T, cta: "About term life" },
  ] as Sq[],

  products: {
    title: "Planning, insurance and investing, in one conversation",
    lesson: "Three families of product, one way of working: each begins with the same questions, and insurance is the one that protects the others.",
    squares: [
      { label: "Insurance", line: "Insurance", fitClass: "fit--display", tone: "sky", icon: "shield",
        body: "Term, whole and universal life coverage, and income protection, so a family's earnings are insured while they are still being earned.",
        long: "Life insurance replaces income for the people who depended on it; disability income replaces it while the earner is alive but unable to work. For a young family the second risk is statistically the larger one, and the two are usually discussed together.",
        href: L, cta: "Explore life insurance" },
      { label: "Financial planning", line: "Financial planning", fitClass: "fit--display", tone: "sun", icon: "compass",
        body: "A plan built from your goals: the first home, the children's schooling, retirement, and the cover that holds all three up.",
        long: "A comprehensive plan lists goals, puts a date and a cost on each, and then asks what happens to each if income stops. Insurance is the answer to that last question; the rest of the plan is how the goals are funded in the ordinary case." },
      { label: "Investments", line: "Investments", fitClass: "fit--display", tone: "paper", icon: "chart",
        body: "Brokerage and advisory accounts for money that will not be needed for years, chosen to serve the goals the plan names.",
        long: "Money for a house in three years and money for retirement in thirty belong in different places. The plan assigns each goal a time horizon and an acceptable risk before any account is opened." },
    ] as Sq[],
  },

  advisor: {
    title: "Your advisor is here to guide you",
    lesson: "What a client can expect from an advisor: a range of solutions, a hearing without judgement, and a company that stands behind the advice.",
    squares: [
      { photo: 207, kicker: "Financial planning", caption: "Date night, but make it a spreadsheet.", href: A, cta: "Meet an advisor",
        long: "The first meeting is questions, not recommendations: what the household spends, what it owes, who depends on whom, and what would have to be true for the next twenty years to go well." },
      { label: "Expertise", line: "Every stage of life", tone: "sun", icon: "family",
        body: "A range of solutions for a first apartment, a first child, a promotion, a move and a retirement.",
        long: "Needs change with age more than with income. A single renter needs little life insurance; the same person with a mortgage and two children needs a great deal, for a limited time." },
      { label: "Listening", line: "Heard, not judged", tone: "paper", icon: "heart",
        body: "Your interests come first, and a plan starts from how you think about money, not from a template.",
        long: "People hold debt, skip insurance and under-save for reasons. An advisor who asks about the reason designs a plan the household will actually keep." },
      { label: "Backing", line: "A mutual behind the advice", tone: "sky", icon: "shield",
        body: "GIFmutual is imagined as a mutual company: owned by its policyowners, answerable to no shareholder.",
        long: "A mutual insurer's policyowners are its owners. Surplus is retained or returned to them as dividends, which are decided each year and are never guaranteed." },
    ] as Sq[],
  },

  means: {
    title: "What a steadier way means for you",
    lesson: "Better conversations lead to better solutions, and better solutions to better outcomes. Each step has its own argument.",
    squares: [
      { label: "One", line: "Better conversations", tone: "paper", icon: "mail",
        body: "Your advisor meets you where you are, asks deeper questions and listens closely to your goals, priorities and attitude to money.",
        long: "The blind spots are usually in what is not asked: the co-signed loan, the parent who may need help, the job benefit that ends when the job does. Good questions find them before a claim does." },
      { photo: 295, kicker: "Financial planning", caption: "A plan on paper beats a plan in the shower.", href: A, cta: "Meet an advisor",
        long: "Plans are written down because decisions made at a kitchen table are easy to forget. A one-page statement of goals, amounts and dates is what the review each year is measured against." },
      { label: "Two", line: "Better solutions", tone: "sun", icon: "key",
        body: "Each recommendation is fitted to your stage of life and names the gap it closes, from cover that is too small to a policy that expires too soon.",
        long: "A solution is not a product; it is a product sized to a gap. Cover for twenty years, in an amount equal to the mortgage and the schooling, is a solution. A policy bought because it was offered is not." },
      { label: "Three", line: "Better outcomes", tone: "sky", icon: "sprout",
        body: "A plan built around your needs and no one else's, with a yearly review to keep it true as the household changes.",
        long: "Outcomes are measured against goals that were stated: was the house paid, were the children schooled, was the retirement funded. A plan that keeps a record of those goals can say whether it is working." },
    ] as Sq[],
  },

  need: {
    kicker: "In numbers",
    title: "Why a young family needs it",
    lesson: "Findings from LIMRA and Life Happens' annual Insurance Barometer, with the costs a household carries while its children are young. Try the first yourself.",
    squares: [
      { widget: "runway", tone: "navy" },
      { label: "Need it, have none", line: "74M", fitClass: "fit--display fit--num", tone: "sun", icon: "family", source: "baro26",
        body: "Americans say they need life insurance and have none; another 24 million say they need more than they have.",
        long: "The gap is 29 percent of adults with no cover plus 9 percent with too little. It has run between about a third and two-fifths of adults for fifteen years." },
      { label: "Own a policy", line: "52%", fitClass: "fit--display fit--num", tone: "sky", icon: "shield", source: "baro26",
        body: "of U.S. adults say they have life insurance, through work or on their own.",
        long: "Ownership is about the same as the share who say life insurance is what a household would rely on if its main earner died, second only to savings." },
      { label: "Guess, not know", line: "49%", fitClass: "fit--display fit--num", tone: "paper", icon: "document", source: "baro25",
        body: "say their estimate of what cover would cost was a gut feeling or a wild guess." },
    ] as Sq[],
  },

  strength: {
    title: "A mutual company, by design",
    lesson: "How strong is the company that stands behind a policy? Four structural facts about a mutual life insurer bear on the question: who owns it, who supervises it, what protects a policyowner and what a dividend is.",
    squares: [
      { label: "Shareholders", line: "0", fitClass: "fit--display fit--num", tone: "sky", icon: "scale",
        body: "A mutual life insurer is owned by its policyowners. No outside shareholder takes a share of the surplus.",
        long: "In a stock company profit is owed to shareholders first. In a mutual, the owners are the people who buy the policies, so decisions about surplus are taken for them." },
      { label: "Supervision", line: "50", fitClass: "fit--display fit--num", tone: "sun", icon: "document",
        body: "Insurance is regulated state by state; each insurance department examines the insurers licensed in it.",
        long: "Reserves, investments and market conduct are reviewed by state regulators, who require an insurer to hold reserves against the policies it has written." },
      { label: "Protection", line: "$300K", fitClass: "fit--display fit--num", tone: "paper", icon: "lock",
        body: "In most states a guaranty association covers at least $300,000 of life insurance death benefits if an insurer fails.",
        long: "Limits differ by state and by type of benefit, and they apply to the policyowner, not the insurer. The state guaranty association's website states its own limits." },
      { label: "Cash values", line: "$100K", fitClass: "fit--display fit--num", tone: "navy", icon: "coins", source: "nolhga",
        body: "The protection most state guaranty associations give a policy's cash surrender value if its insurer fails.",
        long: "The same associations protect death benefits up to $300,000 in most states. Limits are per person, per company, and they do not cover dividends." },
    ] as Sq[],
  },

  faq: {
    title: "Questions about GIFmutual? We've got answers.",
    items: [
      ["How much can I expect to pay?", "It depends on the product. For life insurance the premium is set by the type of policy, the amount, your age and health, whether you use tobacco, and any riders. Younger, healthier buyers pay less, which is why the question is best asked early. A first meeting with an advisor carries no fee."],
      ["How is a mutual different from other insurers?", "A mutual insurer is owned by its policyowners rather than by shareholders. It can pay dividends from surplus, though they are not guaranteed. The structure does not change what a policy promises; it changes who benefits when the company does better than it expected."],
      ["What products and services are offered?", "Life insurance (term, whole and universal), disability income, and planning and investment advice. GIFmutual is a fictional company and none of them can be bought here."],
      ["How can a financial advisor help me?", "By asking questions you may not have asked yourself, writing down the goals and their costs, and recommending the specific products that close the gaps. A good plan is also revisited when your life changes: a marriage, a child, a house, a new job."],
      ["What is a financial plan, exactly?", "A written statement of goals with dates and amounts, what is already in place to fund them, what is missing, and the steps that close the gap. It covers saving, borrowing, investing and insurance together, because each one affects the others."],
    ] as [string, string][],
  },

  cta: {
    squares: [
      { label: "Ready?", line: "Ready to feel easier about the future?", fitClass: "fit--display", tone: "navy",
        body: "It's easy to get started: no commitment, just a better conversation.", btn: { label: "Find a financial advisor", href: A, variant: "gold" as const } },
      { photo: 20, kicker: "Term life", caption: "Up she goes. Down goes the worry.", href: T, cta: "See term life", long: "Term cover is the safety net under the fun part. Pick a length, pick an amount, and get back to the fun part." },
      { photo: 15, kicker: "Whole life", caption: "Sunny today. Covered for the rest.", href: W, cta: "See whole life", long: "Whole life cover does not expire, which is more than can be said for the weather. Lifelong protection, with a cash value that builds while you get on with things." },
    ] as Sq[],
  },
};

// --- Life insurance --------------------------------------------------------------

export const LIFE = {
  hero: [
    { label: "Life insurance", line: "Let's protect the ones you love", fitClass: "fit--display", tone: "navy",
      body: "You've worked to build a life with the people you love. Choosing the type and the amount of cover should be made plain, not left to guesswork.",
      long: "A life insurance policy is a contract: you pay a premium, and when you die the insurer pays a stated sum to the people you named. Everything else, the types, the riders, the cash value, is a variation on how long the contract lasts and what it does along the way.",
      btn: { label: "Get insurance", href: A, variant: "gold" as const } },
    { photo: 17, kicker: "Life insurance", caption: "New baby, new math. We'll do the math.", href: `${T}#calculator`, cta: "Calculate it",
      long: "Most first-time buyers come to life insurance within a year of a birth, a marriage or a mortgage. Those are the three events that create a person who depends on your income." },
    { photo: 82, kicker: "Term life", caption: "Twenty years go fast. Cover all of them.", href: T, cta: "See term life",
      long: "A family's financial life runs for decades. The policy is meant to cover the stretch in which the household could not manage on one income, and no more than that." },
  ] as Sq[],

  design: {
    title: "Your life insurance will be designed around your life",
    lesson: "Goals, priorities and what a household can spend differ from one family to the next, so the policy and the amount do too.",
    squares: [
      { label: "Design", line: "A safety net, or the foundation of a plan", fitClass: "fit--display", tone: "sky", icon: "umbrella",
        body: "Depending on need, a policy can simply protect loved ones from the unexpected, or it can also anchor a financial plan.",
        long: "The first is term insurance: inexpensive, temporary, and aimed at the years of greatest dependence. The second is permanent insurance, whose cash value can later help pay for college, grow a business or add to retirement income." },
      { label: "Calculator", line: "How much life insurance is right for you?", tone: "navy", icon: "chart",
        body: "Add up what your family would need to carry on, subtract what they already have.", btn: { label: "Calculate it", href: `${T}#calculator`, variant: "line" as const } },
      { photo: 126, kicker: "Life insurance calculator", caption: "Ten minutes now. Decades of not wondering.", href: `${T}#calculator`, cta: "Calculate it",
        long: "The calculator is arithmetic, not forecasting: debts, years of income, a mortgage and the cost of schooling, less savings and cover already in place." },
    ] as Sq[],
  },

  why: {
    title: "Why life insurance matters",
    lesson: "The five questions people ask first, answered one square at a time.",
    squares: [
      { label: "Why do I need a policy?", line: "47%", fitClass: "fit--display fit--num", tone: "sun", icon: "house", source: "baro25",
        body: "of Americans say their household would feel a financial impact within six months if a primary wage earner died.",
        long: "The policy pays the mortgage, the debts and the tuition, and replaces lost income when you are no longer there to earn it. The test is simple: if your income stopped tomorrow, could the household pay its bills for as long as it needs to?" },
      { label: "What is life insurance?", line: "37%", fitClass: "fit--display fit--num", tone: "paper", icon: "document", source: "baro26",
        body: "of consumers say they are only somewhat or not at all knowledgeable about it. You pay premiums; when you die, the insurer pays a set sum, generally free of income tax, to the people you name.",
        long: "The payment is the death benefit and the people are beneficiaries. Naming them on the policy means the money passes directly to them, without waiting for the estate to be settled." },
      { label: "How much does it cost?", line: "$192", fitClass: "fit--display fit--num", tone: "sky", icon: "coins", source: "baro25",
        body: "a year is the accepted median cost of a $250,000, 20-year level term policy for a healthy man under 31, about $16 a month.",
        long: "Adults under 31 guess about ten times that. Age, health, tobacco use, the amount and any riders set the price, and age and health matter most; the same cover costs less at thirty than at forty." },
      { label: "Isn't cover at work enough?", line: "1–2×", fitClass: "fit--display fit--num", tone: "blush", icon: "briefcase",
        body: "salary is the usual size of basic employer cover, and it usually ends when the job does.",
        long: "Group cover is a good benefit and a poor foundation: the amount is fixed by the employer, the cost can change, and the person whose health has changed is the one who most needs it to follow them." },
    ] as Sq[],
  },

  types: {
    title: "Four kinds of life insurance",
    lesson: "Term, whole, universal and variable universal life differ in how long they last, whether the premium can change, and what happens to the money inside them.",
    squares: [
      { label: "Temporary", line: "Term life insurance", fitClass: "fit--display", tone: "sun", icon: "calendar",
        body: "The simplest way to start. Cover for a fixed period such as ten or twenty years; when the term ends, so does the policy, though many can be converted.",
        long: "Term insurance has no savings component, which is why it is the least expensive way to buy a large amount of cover. Level terms keep the premium fixed for the whole period.", href: T, cta: "Term life" },
      { label: "Permanent", line: "Whole life insurance", fitClass: "fit--display", tone: "sky", icon: "heart",
        body: "Lifelong cover with fixed premiums and a cash value that is guaranteed to grow, plus dividends that are possible but not promised.",
        long: "Because it must pay a benefit whenever you die, whole life costs several times as much per dollar of cover as term, in return for permanence and a savings feature.", href: W, cta: "Whole life" },
      { label: "Permanent", line: "Universal life", tone: "paper", icon: "scale",
        body: "Lifelong cover with premiums and a death benefit you can change within limits, and a cash value that is credited interest.",
        long: "Flexibility has a cost: the cash value is not guaranteed to grow as in whole life, and a policy that is underfunded can lapse. It suits a buyer who expects income to vary." },
      { label: "Permanent", line: "Variable universal", tone: "blush", icon: "chart",
        body: "Lifelong cover whose cash value you invest in market subaccounts, with the chance of more growth and the risk of less.",
        long: "The cash value can fall as well as rise, and so can the cover it supports. It is for buyers who want the investment choice and accept the risk." },
      { photo: 150, kicker: "Whole life", caption: "Some things you keep forever. This is one.", href: W, cta: "See whole life",
        long: "Which kind is right depends on whether the need is temporary, as for a young family, or lasting, as for a dependent who will never be able to support themselves." },
      { photo: 53, kicker: "Term life", caption: "Big cover, small premium, zero drama.", href: T, cta: "See term life",
        long: "Most buyers under forty start with term cover sized to their obligations and revisit permanent cover when the household's finances are more settled." },
    ] as Sq[],
  },

  resources: {
    title: "Boost your life insurance knowledge",
    squares: [
      { label: "Guide", line: "Life Insurance Guide", fitClass: "fit--display", tone: "sky", icon: "book", body: "Eight sections on how life insurance works, from what it is to when to review it.", href: G, cta: "Read the guide" },
      { label: "Calculator", line: "Life Insurance Calculator", tone: "sun", icon: "chart", body: "Estimate how much cover a household needs from its debts, income and goals.", href: `${T}#calculator`, cta: "Calculate it" },
      { label: "Article", line: "Term life insurance vs. whole life insurance", tone: "paper", icon: "scale", body: "The two kinds side by side: duration, cost, cash value and who each suits.", href: `${W}#compare`, cta: "Compare" },
    ] as Sq[],
  },

  faq: {
    title: "Questions about life insurance? We've got answers.",
    items: [
      ["How much life insurance do you need?", "A common starting point is ten times annual income, but it is only that. A better method adds the debts, a mortgage, the years of income your family would need and the cost of schooling, then subtracts savings and cover you already have. The calculator on the term life page does this."],
      ["How do I get a quote?", "Provide your age, sex, height and weight, tobacco use, health history and the amount and term you want. An advisor or an online tool can produce an estimate in minutes; the final premium depends on underwriting, which may include a medical exam or a review of records."],
      ["Is life insurance taxable?", "The death benefit is generally not subject to federal income tax for the beneficiary. Cash value grows tax-deferred, and tax can be due on gains if a policy is surrendered. Very large estates can owe estate tax on the proceeds, so ownership is sometimes structured to avoid that."],
      ["Should I get term or permanent insurance?", "Choose term when the need has an end date, such as a mortgage or the years until children are independent. Choose permanent when the need has no end date, or when you want the cash value. Many households buy term first and add permanent cover later."],
      ["What are the best policies for young adults?", "Level term, usually twenty or thirty years, bought early while premiums are low, with a conversion option so cover can change as circumstances do. A young adult with no dependents may need little or nothing until a partner, child or mortgage appears."],
      ["How does life insurance work in retirement?", "Term policies have usually ended by then. Permanent policies continue, and their cash value can supplement retirement income, pay for long-term care or leave an inheritance. Dividends and loans reduce or change the benefit, so the effect should be checked before the money is used."],
    ] as [string, string][],
  },

  cta: {
    squares: [
      { label: "Quote", line: "Now you're ready for a life insurance quote", fitClass: "fit--display", tone: "navy",
        body: "Your advisor will ask deeper questions to find the right type, and amount, for your goals and budget.", btn: { label: "Let's talk", href: A, variant: "gold" as const } },
      { photo: 12, kicker: "Life insurance", caption: "She won't remember this. Your policy will.", href: A, cta: "Talk to an advisor", long: "The point of a policy is that the people you love never have to think about it. An advisor finds the type and the amount; you supply the reasons." },
      { photo: 1, kicker: "Term life", caption: "Carry them now. Cover them for later.", href: T, cta: "See term life", long: "Term cover is built for exactly these years, the ones with small shoes by the door: a level premium, a fixed term and a conversion option for when life changes." },
    ] as Sq[],
  },
};

// --- Term life insurance ---------------------------------------------------------

export const TERM = {
  hero: [
    { label: "Term life insurance", line: "Protection on your terms.", fitClass: "fit--display", tone: "navy",
      body: "One of the most affordable kinds of life insurance, built to protect your loved ones for a set number of years. Find out how much cover you will need.",
      long: "Term insurance is rented protection: you pay only for the years in which your family depends on you. That is why it costs far less than permanent cover for the same amount, and why it is the usual first policy for a household with a mortgage and young children.",
      btn: { label: "Get insurance", href: A, variant: "gold" as const } },
    { photo: 52, kicker: "Term life", caption: "She has plans for you. Cover the next twenty years of them.", href: "#calculator", cta: "Calculate it",
      long: "The years in which a young child depends on you are known in advance: roughly eighteen to twenty-two. A twenty-year term is chosen to span them." },
    { photo: 266, kicker: "Level term", caption: "Fixed premium. Unfixed children.", href: "#kinds", cta: "See the kinds", long: "A level term keeps the premium exactly where it started for the whole term. The children, meanwhile, will change shoe size every four months." },
  { label: "Cost of cover", line: "$192", fitClass: "fit--display fit--num", tone: "sun", icon: "cup", source: "baro25",
      body: "a year is the accepted median cost of a $250,000, 20-year level term policy for a healthy man under 31, about $16 a month.",
      long: "Young adults guess about ten times that. A level term keeps the premium the same for the whole term, so the price is set while you are young and healthy." },
  ] as Sq[],

  time: {
    title: "The right time in your life for term life",
    lesson: "Term insurance does three jobs for a household with young children: it pays the mortgage, it pays for college, and it covers everyday expenses while one parent's income is missing.",
    squares: [
      { label: "The mortgage gets paid", line: "40", fitClass: "fit--display fit--num", tone: "sun", icon: "house", source: "nar",
        body: "is the median age of a first-time homebuyer, a record. A thirty-year mortgage taken at 40 runs to age 70.",
        long: "A death benefit equal to the outstanding mortgage lets the surviving parent stay in the house. If the borrower with the larger income dies, the remaining income may not cover the payment; a term policy for the length of the mortgage closes the gap." },
      { photo: 139, kicker: "Term life", caption: "You got the keys. Now cover the mortgage.", href: "#calculator", cta: "Calculate it",
        long: "Buying a home is the most common reason to buy life insurance for the first time, and the lender often asks about it." },
      { label: "Children can still go to college", line: "$11,950", fitClass: "fit--display fit--num", tone: "paper", icon: "graduation", source: "collegeboard",
        body: "a year in tuition and fees at the average public four-year college for an in-state student in 2025–26, before room and board.",
        long: "A tuition fund that would have been built over eighteen years is replaced by a lump sum. Cover sized for it keeps that option open if the parent who was saving for it is gone." },
      { label: "Everyday expenses keep coming", line: "$13,184", fitClass: "fit--display fit--num", tone: "sky", icon: "family", source: "ccaoa",
        body: "is the national average annual price of child care in 2025, before groceries, utilities and the car.",
        long: "Household costs do not fall in proportion to the loss of one adult. Many families also pay more for childcare when the surviving parent must work longer hours, so the replaced income should include it." },
    ] as Sq[],
  },

  fits: {
    title: "Term life coverage that fits your life",
    lesson: "Three reasons households choose term cover: the price, the ownership and the flexibility.",
    squares: [
      { widget: "costGuess", tone: "sky" },
      { label: "It's yours", line: "It goes where you go", tone: "sky", icon: "lock",
        body: "A policy you own is not tied to an employer, so it stays when you change jobs, and you choose the amount.",
        long: "Work cover is usually a small multiple of salary and is lost on leaving. Individual cover is sized to the household's needs and is not affected by what happens to the job." },
      { label: "It's flexible", line: "It can change as you do", tone: "sun", icon: "person",
        body: "Most term policies can be converted, in whole or in part, to permanent insurance without a new medical exam.",
        long: "Conversion is a right to buy permanent cover at your original health class. It is valuable precisely when health has changed, and it usually has a deadline, so the policy should be checked for it." },
    ] as Sq[],
  },

  kinds: {
    title: "Three kinds of term life insurance",
    lesson: "Term policies differ in how the premium and the death benefit behave over the years. The guide describes each.",
    squares: [
      { widget: "termPicker", tone: "sun" },
      { label: "Level term", line: "Level term", fitClass: "fit--display", tone: "paper", icon: "lock",
        body: "Premium and death benefit stay the same for the term, usually ten, twenty or thirty years. It is the most common kind.",
        long: "At the end of the term cover stops. Some policies can be renewed, but the premium is then set at the attained age and is much higher." },
      { label: "Annually renewable", line: "Annually renewable term", tone: "sky", icon: "calendar",
        body: "Cover is renewed every year at a higher premium as you age. It is the cheapest when you are young and the dearest when you are old.",
        long: "It suits a short, uncertain need, such as bridging until another policy begins. Over twenty years it costs far more than a level term." },
      { label: "Decreasing term", line: "Decreasing term", tone: "paper", icon: "chart",
        body: "The death benefit falls over the term, typically in step with a mortgage that is being repaid.",
        long: "Because the cover shrinks, the premium is lower than for a level policy of the same starting amount. It does not help with needs that do not shrink, such as income replacement or schooling." },
    ] as Sq[],
  },

  numbers: {
    title: "Term life insurance in numbers",
    lesson: "Four figures behind the decision: what a child costs, how likely a disability is, how much cover to start from and how long an insurer may look back.",
    squares: [
      { label: "To raise a child to 17", line: "$310,605", fitClass: "fit--display fit--num", tone: "sky", icon: "baby", source: "brookings",
        body: "is Brookings' estimate for a middle-income, two-parent family, not counting college.",
        long: "It adjusts USDA's estimate for a child born in 2015 for inflation. A death benefit is sized in part to the years of spending still ahead." },
      { label: "Disabled before 67", line: "1 in 4", fitClass: "fit--display fit--num", tone: "sun", icon: "umbrella", source: "ssa",
        body: "of today's 20-year-olds will become disabled and qualify for Social Security disabled-worker benefits before reaching 67.",
        btn: { label: "Calculate it", href: D, variant: "blue" as const },
        long: "Disability, not death, is the likelier way for a young family to lose an income, which is why the two kinds of cover are usually discussed together." },
      { label: "Rule of thumb", line: "10×", fitClass: "fit--display fit--num", tone: "paper", icon: "chart",
        body: "annual income is the usual first estimate of the cover to buy. Add the mortgage, other debts and schooling for a better figure.",
        long: "The multiple is higher for a young family with a long way to go and lower for a household near retirement. The calculator above does the arithmetic." },
      { label: "Contestability", line: "2 years", fitClass: "fit--display fit--num", tone: "navy", icon: "document",
        body: "is the usual period in which an insurer may look back at the application and contest a claim if something material was misstated.",
        long: "The period is set by state law. After it ends the insurer generally cannot contest a claim on that basis, which is why the application should be answered fully." },
    ] as Sq[],
  },

  faq: {
    title: "Questions about term life insurance? We've got answers.",
    items: [
      ["What is term life insurance?", "A policy that pays a death benefit if you die during a stated number of years, the term. If you are alive when the term ends, the policy ends and nothing is paid. It has no cash value, which is why it is the least expensive way to buy a large amount of cover."],
      ["How long does it last?", "Whatever you choose when you buy it, commonly ten, fifteen, twenty, twenty-five or thirty years. Choose a term that runs until the obligation it covers, such as the mortgage or the youngest child's independence, has ended."],
      ["How much does it cost?", "The premium depends on the amount, the term, your age, sex, health, tobacco use and any riders. Younger and healthier applicants are charged less. A level term fixes the premium for its whole length, so it is worth buying while you are young."],
      ["Will my premiums stay the same or rise?", "On a level term they stay the same for the whole term. On an annually renewable term they rise every year. When a level term ends and the policy is renewed, the premium is reset at your new age and usually jumps sharply."],
      ["What happens if I outlive my term?", "The policy ends and no benefit is paid; you have had the protection, which was the purchase. You can renew for a higher premium, convert to permanent cover if the policy allows it, or buy a new policy if your health permits."],
      ["Isn't cover through work enough?", "Usually not. Employer cover is typically one or two times salary, is often lost on leaving the job and is not designed around your family's needs. It is a useful supplement to an individual policy, not a replacement for one."],
      ["What are the pros and cons compared with whole life?", "Term costs far less per dollar of cover and is simple, but it expires and builds no cash value. Whole life lasts for life and builds cash value, but costs several times as much. Many families buy term for the years of greatest need and add permanent cover later."],
      ["What does decreasing term mean?", "A term policy whose death benefit falls each year, usually to match a mortgage balance as it is repaid. It is cheaper than level term of the same starting amount, but the cover shrinks while some needs, such as income replacement, do not."],
      ["What does level term mean?", "A term policy whose premium and death benefit stay the same for the whole term. It is the most common kind because the cost is predictable, which makes it easy to budget for over twenty or thirty years."],
      ["Does term insurance have cash value?", "No. A term premium pays only for the protection and the insurer's costs, so there is nothing to withdraw or borrow against. If you want a savings feature, you are looking at a permanent policy such as whole or universal life."],
      ["Are there tax consequences?", "The death benefit is generally free of federal income tax for the beneficiary, and premiums are not deductible for an individual. If the policy is included in a large taxable estate, estate tax may apply; ownership can be arranged to avoid that."],
      ["What riders can be added to a term policy?", "Common ones include waiver of premium (premiums are paid if you become disabled), accelerated death benefit (part of the benefit is paid early on a terminal diagnosis), a child term rider and a guaranteed insurability option to buy more cover later without an exam."],
      ["What is term conversion?", "A right, written into most term policies, to exchange some or all of the term cover for permanent cover from the same insurer without a new medical exam. The premium reflects your age at conversion, not your current health, and the right usually expires at a stated date."],
    ] as [string, string][],
  },

  quiz: {
    title: "How much do you know about term life insurance?",
    items: [
      { q: "A level term policy keeps its premium the same for the whole term.", a: true, why: "That is what \"level\" means: the premium and the death benefit are fixed for the term, so the cost is predictable." },
      { q: "Term life insurance builds cash value that you can borrow against.", a: false, why: "It does not. Term premiums pay only for the cover and costs; cash value is a feature of permanent insurance." },
      { q: "The death benefit is generally free of federal income tax for the person who receives it.", a: true, why: "Yes, in most circumstances. Estate tax can apply to very large estates, which is a separate matter." },
      { q: "If you outlive the term, the insurer refunds the premiums you paid.", a: false, why: "Not in an ordinary term policy. A return-of-premium rider can be added, at a much higher price." },
    ],
  },

  cta: {
    squares: [
      { label: "Next step", line: "Ready to take the next step?", fitClass: "fit--display", tone: "navy",
        body: "Our advisors will help you find the right amount of term cover for your goals and budget.", btn: { label: "Let's talk", href: A, variant: "gold" as const } },
      { photo: 7, kicker: "Term life", caption: "This is the whole pitch.", href: A, cta: "Let's talk", long: "No chart explains it better. Term cover makes sure the mortgage, the schooling and the everyday bills are paid if you are not there to pay them." },
      { photo: 57, kicker: "Term conversion", caption: "Start with term. Trade up when you're ready.", href: W, cta: "See whole life", long: "Most term policies can be converted to permanent cover without a new medical exam. Start with what the household needs now and keep the door open." },
    ] as Sq[],
  },
};

// --- Whole life insurance --------------------------------------------------------

export const WHOLE = {
  hero: [
    { label: "Whole life insurance", line: "Let's protect your (whole) life.", fitClass: "fit--display", tone: "navy",
      body: "Do more of the things you love, with the people you love. This cover lasts your entire life and has benefits you can use along the way.",
      long: "Whole life is permanent insurance in its plainest form: a level premium, a guaranteed death benefit that is paid whenever you die, and a cash value that grows on a schedule written into the policy.",
      btn: { label: "Get insurance", href: A, variant: "gold" as const } },
    { photo: 127, kicker: "Whole life", caption: "Grandkids are expensive. Plan accordingly.", href: A, cta: "Talk to an advisor",
      long: "A policy that lasts for life is for needs that last for life: an estate, a dependent who will never be self-supporting, or a bequest that the owner wants to be certain of." },
    { photo: 75, kicker: "Whole life", caption: "No expiry date. Unlike the hiking boots.", href: "#compare", cta: "Compare with term", long: "Whole life cover lasts as long as you do, with a premium that never rises and a cash value that is guaranteed to grow. Everything else in the cupboard wears out." },
  ] as Sq[],

  what: {
    title: "What is whole life insurance?",
    lesson: "Permanent cover, a cash value that is guaranteed to grow and dividends that are possible: three properties that distinguish it from term.",
    squares: [
      { label: "Protection", line: "Lifelong cover", fitClass: "fit--display", tone: "sun", icon: "shield",
        body: "A guaranteed death benefit is paid to your beneficiaries whenever you die, provided the policy is in force.",
        long: "A term policy ends whether you need it or not. A whole life policy does not, which makes it the natural vehicle for needs that outlast working life." },
      { label: "Cash value", line: "A guaranteed asset", tone: "sky", icon: "sprout",
        body: "As premiums are paid, a pool of cash value builds. Its growth is guaranteed and typically tax-deferred, whatever the markets do.",
        long: "The cash value can be borrowed against or withdrawn, which reduces the death benefit by the same amount. It is not a bank account and early years add little, so the policy rewards patience." },
      { label: "Dividends", line: "Possibly more", tone: "paper", icon: "coins",
        body: "A participating policy may earn dividends, to take as cash, to reduce premiums or to buy more cover.",
        long: "Dividends are not guaranteed, and a policy that earned one in a year may not earn one in the next. They reflect the insurer's results against what it assumed when it set the premiums." },
    ] as Sq[],
  },

  highlights: {
    title: "Your whole life insurance policy highlights",
    lesson: "Three properties come first: a guaranteed benefit, a fixed cost and a cash value that builds.",
    squares: [
      { label: "Guaranteed payout", line: "Your family will be paid", fitClass: "fit--display", tone: "sky", icon: "shield",
        body: "The death benefit is guaranteed for life, so the people you named can count on it however long you live.",
        long: "That certainty is the product. It matters most to households that plan to leave something specific, a bequest, a business share or the care of a dependent." },
      { photo: 20, kicker: "Guaranteed payout", caption: "The one sure thing, besides nap resistance.", href: A, cta: "Talk to an advisor", long: "The death benefit is guaranteed for life, so the people you named can count on it however long you live. Certainty is the product." },
      { label: "Costs are set", line: "The premium never rises", tone: "sun", icon: "lock",
        body: "What you pay is set by your age, health and the amount at purchase, and does not increase for as long as you hold the policy.",
        long: "A fixed premium is higher than a term premium at the start and lower than any term premium you could buy at seventy, which is the trade the buyer is making." },
      { label: "Cash value", line: "Accumulates over time", tone: "paper", icon: "sprout",
        body: "Use the cash value for what you need: an emergency, tuition, a down payment or income in retirement.",
        long: "Because borrowing reduces the death benefit and interest accrues, a plan to use cash value should say how it will be repaid, and what the policy will be worth after." },
    ] as Sq[],
  },

  cost: {
    title: "How much will whole life insurance cost?",
    lesson: "Four things set the premium, which is why an advisor's first meeting is questions.",
    squares: [
      { label: "Your goals", line: "Goals and needs", fitClass: "fit--display", tone: "sun", icon: "compass",
        body: "What the policy is for decides its size and its shape: a bequest, a business, income replacement or cash value.",
        long: "A buyer who wants the death benefit alone will choose a different design than one who wants cash value, because the premium is spent on one or the other." },
      { label: "Coverage amount", line: "2×", fitClass: "fit--display fit--num", tone: "sky", icon: "coins",
        body: "Doubling the death benefit roughly doubles the premium.",
        long: "A smaller policy bought early is often better than a large one postponed." },
      { label: "Age and health", line: "Age and health", tone: "paper", icon: "heart",
        body: "The younger and healthier you are when you buy, the lower the premium for the rest of your life.",
        long: "Underwriting classes run from preferred to standard to rated, and tobacco use moves a buyer sharply up the scale. The class at purchase is fixed." },
      { label: "Riders", line: "Added riders", tone: "blush", icon: "document",
        body: "Riders such as waiver of premium or a child rider add features, and add to the premium.",
        long: "Each rider is priced separately and can usually be added at purchase only. Waiver of premium, which keeps the policy alive during disability, is among the most useful." },
    ] as Sq[],
  },

  numbers: {
    title: "Whole life in the market",
    lesson: "Where Americans' new life insurance premium went in 2025, from LIMRA's industry survey of individual life sales.",
    squares: [
      { label: "Whole life", line: "37%", fitClass: "fit--display fit--num", tone: "sun", icon: "heart", source: "limra25",
        body: "of new life insurance premium, a record $6.4 billion, up 7% on 2024.",
        long: "Whole life led every other product for the year. Its premiums are higher per dollar of cover than term's." },
      { label: "Indexed universal life", line: "25%", fitClass: "fit--display fit--num", tone: "sky", icon: "chart", source: "limra25",
        body: "of new premium went to indexed universal life, whose cash value is credited with interest linked to a market index.",
        long: "Variable universal life added $2.6 billion, up 17%; fixed universal life $985 million, down 4%." },
      { label: "Term life", line: "17%", fitClass: "fit--display fit--num", tone: "paper", icon: "calendar", source: "limra25",
        body: "of new premium, $3.1 billion, up 3%.",
        long: "A term policy costs far less per dollar of cover than a whole life policy, so each sale adds less premium." },
    ] as Sq[],
  },

  compare: {
    title: "Which type of life insurance is best for you? Compare them.",
    rows: [
      ["Guaranteed payout to loved ones", true, true],
      ["Lifelong protection", true, false],
      ["Accumulates cash value", true, false],
      ["Chance to receive dividends", true, false],
      ["Premiums that never increase", true, true],
      ["Optional riders available", true, true],
    ] as [string, boolean, boolean][],
    note: "A term premium never increases during the term of a level policy; it can rise sharply if the policy is renewed.",
  },

  families: {
    title: "Should families with young children consider whole life?",
    lesson: "For most young families the first need is the largest amount of cover for the least money; whole life answers a different need.",
    squares: [
      { label: "The usual order", line: "Term first, for most", fitClass: "fit--display", tone: "sky", icon: "calendar",
        body: "When income is modest and obligations are large, term cover buys the most protection for the money.",
        long: "The same premium that buys a large term policy buys a small whole life policy. For a family whose chief risk is losing an income during the next twenty years, the larger amount is usually the better protection." },
      { photo: 9, kicker: "Term first", caption: "Cover first. Clever later.", href: T, cta: "See term life",
        long: "A policy that is too small to replace an income does not protect the household, however long it lasts." },
      { label: "Later", line: "Permanent when needs are lasting", tone: "sun", icon: "house",
        body: "Whole life becomes a sound addition when the household has taken care of the near term and wants something that does not expire.",
        long: "That is usually a larger income, a settled home and a need that has no end date: an estate, a business, a dependent child." },
      { photo: 25, kicker: "Term conversion", caption: "Two under two? Start simple.", href: T, cta: "See term life",
        long: "Conversion rights in a term policy let a family move to permanent cover later at its original health class, so starting with term does not close the door." },
    ] as Sq[],
  },

  strength: {
    title: "What a mutual owes its owners",
    lesson: "A mutual insurer's strength rests on three things its structure implies: who owns it, how it is required to hold reserves, and how it treats surplus.",
    squares: [
      { label: "Guaranty protection", line: "$300K", fitClass: "fit--display fit--num", tone: "sky", icon: "lock", source: "nolhga", body: "of a death benefit is protected by the state guaranty association in most states if an insurer fails.", long: "Limits are per person, per company and differ by state; the state association's own site states them." },
      { label: "Cash values", line: "$100K", fitClass: "fit--display fit--num", tone: "sun", icon: "coins", source: "nolhga", body: "of net cash surrender or withdrawal value is protected under the same associations.", long: "Dividends are not covered." },
      { label: "Shareholders", line: "0", fitClass: "fit--display fit--num", tone: "paper", icon: "scale", body: "A mutual insurer is owned by its policyowners; no outside shareholder takes a share of the surplus.", long: "Decisions about surplus are decisions about the owners' money." },
    ] as Sq[],
  },

  faq: {
    title: "Questions about whole life insurance? We've got answers.",
    items: [
      ["What is the cash value of whole life insurance?", "The savings part of the policy. A portion of each premium goes into it, and the insurer guarantees that it will grow on a schedule printed in the policy. You can borrow against it or withdraw from it, which reduces the death benefit."],
      ["How does the cash value grow?", "By the guaranteed rate in the contract, and, if the policy is participating, by dividends the insurer may add. Early on, growth is slow because costs are front-loaded; in later years it accelerates. Cash value is tax-deferred while it stays in the policy."],
      ["How does whole life insurance work?", "You pay a fixed premium and the insurer promises a death benefit whenever you die. Part of the premium pays for the protection, part builds cash value, and the policy stays in force as long as premiums are paid, or as long as the cash value can support it."],
      ["Can you cash out a whole life policy?", "Yes, by surrendering it for its cash surrender value, which ends the cover. If the cash value exceeds what you paid in, the gain is taxed as ordinary income. A loan or partial withdrawal lets you keep the policy in force with a smaller benefit."],
      ["What are the benefits?", "A guaranteed benefit for life, a fixed premium, tax-deferred cash value that is yours to use, the possibility of dividends, and, for those who want it, a way to leave a specific amount to heirs without market risk."],
      ["Who should consider whole life?", "People with a need that does not end: lifelong dependants, an estate that will be taxed, a business interest to pass on, or a wish to use cash value as a stable asset. It is a poorer fit for a buyer who needs the largest cover for the lowest cost."],
      ["Should families with young children consider it?", "Most should start with term cover large enough to replace an income and pay the mortgage. Whole life may be a later addition, or a smaller second policy, once those needs are met and the household wants something permanent."],
      ["Is it a good investment?", "It is first an insurance contract. As a savings vehicle its returns are modest and its early years costly, but it offers a guaranteed rate, tax deferral and protection in one place. Comparing it with an investment account misses the death benefit it also provides."],
      ["Which is better: term or whole life?", "Neither, in general. Term suits a temporary need at low cost; whole life suits a permanent need at a higher one. The right question is what you are protecting and for how long, and many households end up with both."],
      ["Does whole life earn dividends?", "A participating policy from a mutual insurer may. Dividends are decided annually and never guaranteed. They can be taken as cash, used to reduce premiums, left to accumulate or used to buy additional paid-up cover."],
      ["Can whole life be converted to term?", "Not as such. Cover that ends is not the same as cover that stays, and most insurers do not convert downward. You can surrender the policy and buy term separately, but check the tax cost and whether you will still qualify for the new policy."],
      ["What are the tax implications?", "The death benefit is generally income-tax-free to the beneficiary. Cash value grows tax-deferred. A surrender above your premiums paid is taxable; loans are not taxed while the policy is in force, but a lapsed policy with an outstanding loan can create a tax bill."],
    ] as [string, string][],
  },

  cta: {
    squares: [
      { label: "Next step", line: "Now you're ready for the best life insurance option for you", fitClass: "fit--display", tone: "navy",
        body: "Your advisor will ask deeper questions to find the right amount of whole life cover for your goals and budget.", btn: { label: "Let's talk", href: A, variant: "gold" as const } },
      { photo: 76, kicker: "Whole life", caption: "A long walk deserves a long policy.", href: A, cta: "Let's talk", long: "Whole life is for the needs that do not end: a dependent, an estate, a promise. An advisor can size it to your budget." },
      { photo: 127, kicker: "Whole life", caption: "Leave more than the good china.", href: A, cta: "Let's talk", long: "A whole life policy leaves a stated sum to the people you choose, whatever the markets did that year." },
    ] as Sq[],
  },
};

// --- The Life Insurance Guide ------------------------------------------------------

export const GUIDE = {
  intro: "How life insurance works, the kinds of policy, how much you need, how cash value and dividends work, and when to look again: eight sections, each opening in place.",
  sections: [
    ["what", "What is life insurance?"], ["types", "Different types of life insurance"], ["how-much", "How much life insurance do I need?"], ["cash-value", "What is life insurance cash value?"],
    ["dividends", "How life insurance dividends work"], ["revisit", "When to revisit your cover"], ["where", "Where to get life insurance"], ["advisor", "Conversation starters with an advisor"],
  ] as [string, string][],

  what: [
    { label: "A contract", line: "52%", fitClass: "fit--display fit--num", tone: "sky", icon: "document", source: "baro26",
      body: "of U.S. adults say they own life insurance. At its simplest it is a contract: you pay premiums, and if you die while cover is in place the insurer pays a death benefit to the beneficiaries you named.",
      long: "Everything else in life insurance is a variation on three variables: how long the contract lasts, whether the premium can change, and what happens to any money that builds up inside it." },
    { photo: 157, kicker: "Life insurance", caption: "Seven pounds of reasons to read on.", href: "#types", cta: "See the types",
      long: "A birth is the most common reason to buy life insurance. A household that depended on two incomes now depends on them for a third person as well." },
    { label: "Term", line: "Term", fitClass: "fit--display", tone: "sun", icon: "calendar",
      body: "A death benefit for a set period. If you die within the term your beneficiaries are paid; after it ends there is no payout.",
      long: "Because the insurer's risk ends with the term and nothing accumulates, term cover is the least expensive way to insure a large sum." },
    { label: "Permanent", line: "Permanent", fitClass: "fit--display", tone: "paper", icon: "heart",
      body: "Cover for life: your beneficiaries are paid whenever you die, and the policy accumulates cash value you can use while alive.",
      long: "Taking cash value out reduces the death benefit, so permanent cover needs a plan for how the money will be used." },
  ] as Sq[],

  types: [
    { label: "Term", line: "Annually renewable term", tone: "sky", icon: "calendar",
      body: "Lasts until you cancel or reach an age such as eighty. The premium rises as you age; cheapest when young, dearest when old.",
      long: "Premiums are set by your age and health at purchase and grow with each year; it is a short-term tool." },
    { label: "Term", line: "Level term", fitClass: "fit--display", tone: "sun", icon: "lock",
      body: "The premium stays level for the term, typically ten or twenty years, after which cover ends and payments stop.",
      long: "The cost certainty makes it easy to budget, and it is the usual choice for a young family." },
    { label: "Permanent", line: "Whole life", tone: "paper", icon: "heart",
      body: "The most straightforward permanent policy: a fixed premium, a guaranteed benefit and a guaranteed cash value, with possible dividends.",
      long: "Cover lasts for your whole life, even after you stop paying premiums if the policy is structured that way.", href: W, cta: "Whole life" },
    { label: "Permanent", line: "Universal life", tone: "blush", icon: "scale",
      body: "Cash value with flexible premiums and death benefit. Cash value is credited interest and is not guaranteed to grow.",
      long: "More flexibility means more attention is needed: an underfunded policy can lapse." },
    { label: "Permanent", line: "Variable universal", tone: "white", icon: "chart",
      body: "You allocate cash value among market-driven subaccounts. More control and more growth potential, and the cash value can decline.",
      long: "Investment gains and losses are the owner's; the policy needs regular review." },
    { label: "Converting", line: "Term conversion", fitClass: "fit--display", tone: "navy", icon: "key",
      body: "Most term policies let you convert some or all of the cover to permanent cover without another medical exam, at a premium based on your age and not your current health.",
      long: "That is a key reason to buy life insurance while young: your health class is locked in. Some insurers also give conversion credits, which offset the higher premium for the first year." },
  ] as Sq[],

  howMuch: [
      { widget: "multiple", tone: "sun" },
    { photo: 207, kicker: "Life insurance calculator", caption: "Coffee, laptop, and a number you can act on.", href: `${T}#calculator`, cta: "Calculate it",
      long: "Work through the list: income, dependants, years of support, debts, future costs, and what is already saved or insured. The result is a number a household can act on.", pos: "50% 40%" },
    { label: "Factors in the calculation", line: "6", fitClass: "fit--display fit--num", tone: "sky", icon: "document",
      body: "Your income; how many people depend on you; how long they will need support; debts and a mortgage; costs ahead such as college; and assets you already have.",
      long: "Each is a line in the calculation. People often leave out the value of the unpaid work they do, such as childcare, which a surviving parent would have to buy." },
    { label: "Cost, overestimated", line: "10×", fitClass: "fit--display fit--num", tone: "paper", icon: "clock", source: "baro25",
      body: "is how far adults under 31 overestimate the yearly price of a basic term policy. Premiums are based chiefly on age and health, so the earlier you buy, the less each year costs.",
      long: "A guaranteed insurability option lets you buy more cover at later dates without another exam, for example after a birth." },
  ] as Sq[],

  cash: [
    { label: "Cash value", line: "An asset you can use", fitClass: "fit--display", tone: "sky", icon: "sprout",
      body: "Permanent policies build cash value that grows tax-deferred and can be used for almost anything: premiums, tuition, emergencies, a down payment, a business or retirement income.",
      long: "Taking money out reduces the death benefit, so each use has a cost that should be understood first." },
    { label: "Option one", line: "Loan", tone: "paper", icon: "key",
      body: "Borrow from the insurer with the cash value as collateral. No tax while repaid, but interest accrues.",
      long: "If the loan grows too large the insurer may end the policy, and the growth in it then becomes taxable." },
    { label: "Option two", line: "Partial surrender", tone: "sun", icon: "document",
      body: "Give up part of the policy and take part of the cash value. The death benefit is reduced.",
      long: "Withdrawals up to the premiums you have paid are generally tax-free; gains above that are taxed." },
    { label: "Option three", line: "Total surrender", tone: "blush", icon: "lock",
      body: "End the policy and take the whole cash value. Use it only when your heirs no longer need the death benefit.",
      long: "Gains above what you paid are taxed as ordinary income, and the cover is lost." },
    { photo: 337, kicker: "Whole life", caption: "A policy with a savings habit.", href: W, cta: "See whole life",
      long: "A first home, a child's tuition or a business share are the usual calls on cash value; each should be weighed against the death benefit the family would lose." },
  ] as Sq[],

  dividends: [
    { label: "How it works", line: "Each year, a forecast", fitClass: "fit--display", tone: "navy", icon: "chart",
      body: "A mutual insurer forecasts the claims it will pay, the income it will earn and the costs of running the company. If it does better, it may issue a dividend.",
      long: "A mutual has no shareholders, so the company is run for its policyowners, and dividends are how they share in good years. They are not guaranteed, though some insurers have paid them every year for well over a century." },
    { label: "Use one", line: "Take it in cash", tone: "sun", icon: "coins", body: "The simplest use: it arrives as money to spend or save." },
    { label: "Use two", line: "Buy more cover", tone: "sky", icon: "shield", body: "Use the dividend to increase permanent cover, which raises the death benefit and the cash value." },
    { label: "Use three", line: "Reduce premiums", tone: "paper", icon: "key", body: "Apply it to the premium, so you pay less out of pocket, or none." },
  ] as Sq[],

  revisit: [
    { photo: 137, kicker: "Getting married", caption: "You said \"I do.\" Now say \"we're covered.\"", href: A, cta: "Talk to an advisor", long: "Combining lives creates dependence, which is a reason for cover. Review beneficiary designations too." },
    { photo: 17, kicker: "Growing a family", caption: "One more plate at the table. One more reason.", href: A, cta: "Talk to an advisor", long: "Every child lengthens the period of dependence and increases the amount needed." },
    { label: "A house", line: "Buying a house", tone: "sun", icon: "house", body: "A mortgage is a large, long obligation that a surviving partner may not be able to carry alone." },
    { label: "A business", line: "Starting a business", tone: "sky", icon: "briefcase", body: "Partners often insure each other so a survivor can buy the share from the family." },
    { label: "Parents", line: "Supporting aging parents", tone: "paper", icon: "family", body: "If your parents depend on you, cover can help carry their costs." },
    { label: "Loans", line: "A co-signed student loan", tone: "blush", icon: "document", body: "A private loan with a co-signer can fall to the co-signer if you die; cover naming them protects them." },
  ] as Sq[],

  where: [
    { label: "At work", line: "Basic group cover", tone: "paper", icon: "briefcase",
      body: "Often free to you and fixed, or one to two times salary. It is helpful and rarely enough." },
    { label: "At work", line: "Supplemental cover", tone: "sky", icon: "coins",
      body: "Extra group cover you pay for at group rates, from a few thousand dollars to several times salary." },
    { label: "The catch", line: "Not portable", fitClass: "fit--display", tone: "sun", icon: "lock",
      body: "Leave the job and you may lose the cover, and the group rate can change over time. A policy you own does not depend on the employer." },
    { photo: 303, kicker: "Individual cover", caption: "Your policy should follow you, not your badge.", href: A, cta: "Find an advisor",
      long: "Many people buy individual cover through an advisor, who can help work out what costs must be covered and which type of policy fits." },
  ] as Sq[],

  starters: [
    { label: "Ask", line: "I have other assets I can leave. Why do I need life insurance?", tone: "sun", icon: "heart" },
    { label: "Ask", line: "What types of costs can life insurance cover?", tone: "sky", icon: "coins" },
    { label: "Ask", line: "Does it make sense for me to go with term or permanent?", tone: "paper", icon: "scale" },
    { label: "Ask", line: "What options do I have for changing my cover later?", tone: "blush", icon: "key" },
  ] as Sq[],

  quiz: {
    title: "Preparing for the unexpected: how much do you know about life insurance?",
    items: [
      { q: "The only benefit life insurance offers is a payout to loved ones if the insured dies.", a: false, why: "Permanent policies also build cash value that can be used during life, and some riders pay if you become ill or disabled." },
      { q: "Employer-provided life insurance usually stays with you if you change jobs.", a: false, why: "Group cover is usually not portable. It generally ends when employment does, unless a conversion option is exercised." },
      { q: "Premiums are based chiefly on your age and health.", a: true, why: "Along with the type and amount, age and health are the largest factors, which is why buying early costs less." },
      { q: "Dividends from a mutual insurer are guaranteed.", a: false, why: "They are decided each year from the insurer's results and are never guaranteed." },
      { q: "A term policy can often be converted to a permanent one without a medical exam.", a: true, why: "Most term policies include that right within a stated period, at a premium based on your age at conversion." },
      { q: "Cash value from a permanent policy can be borrowed against.", a: true, why: "A policy loan is allowed, but interest accrues and an unpaid loan reduces the death benefit." },
    ],
  },

  related: [
    { label: "Article", line: "Seven events that increase your need for life insurance", tone: "paper", icon: "calendar", body: "Marriage, a child, a house, a business, a parent, a loan: the same events as above, with more on each." },
    CALLOUT.group,
    { label: "Article", line: "Why buy life insurance for your kids?", tone: "sky", icon: "baby", body: "A small policy on a child locks in insurability and a premium for life." },
    { label: "Article", line: "Is whole life insurance a good investment?", tone: "sun", icon: "scale", body: "An honest look at what the cash value does and does not do.", href: W, cta: "Whole life" },
  ] as Sq[],
};

// --- An advisor's profile site ------------------------------------------------------

export const ADVISOR = {
  name: "Avery Lindqvist",
  role: "Financial Advisor",
  phone: "555-0142",
  address: "100 Example Avenue, Suite 400, Springfield",
  tabs: [["home", "Home"], ["about", "About me"], ["team", "My team"], ["planning", "Planning"], ["products", "Products & services"], ["resources", "Resources"]] as [string, string][],

  profile: [
    { label: "Financial Advisor", line: "Avery Lindqvist", fitClass: "fit--display", tone: "navy",
      body: "I work mostly with young families: couples with a first child, a first mortgage and a shared sense that something ought to be put in place.",
      long: "This profile is invented for the study. It follows the shape of an advisor's page: a name, a role, a way to connect, and tabs for the sections of a practice.",
      btn: { label: "Let's connect", href: "#contact", variant: "gold" as const } },
    { photo: 121, kicker: "Who I work with", caption: "Small humans, big plans. That's my specialty.", href: "#contact", cta: "Let's connect",
      long: "Most of my clients are between twenty-eight and forty-five, with children under ten. Their needs are simple to state and surprisingly easy to neglect." },
    { label: "Call", line: "555-0142", fitClass: "fit--display fit--num", tone: "sun", icon: "phone", body: "A number for the study; it does not ring." },
    { label: "Office", line: "Springfield", fitClass: "fit--display", tone: "sky", icon: "pin", body: "100 Example Avenue, Suite 400. An invented address." },
  ] as Sq[],

  difference: {
    title: "The GIFmutual difference",
    lesson: "Four commitments a client can hold an advisor to: a written plan, a yearly review, costs in plain words and the incentives of a mutual.",
    squares: [
      { label: "Plan on paper", line: "1", fitClass: "fit--display fit--num", tone: "sky", icon: "document", body: "Every client receives goals, amounts and dates in writing, and a record of what was recommended and why.", long: "A written plan can be checked against what happens. One that exists only in conversation cannot." },
      { label: "Review", line: "12", fitClass: "fit--display fit--num", tone: "sun", icon: "calendar", body: "months is the longest a plan goes without a review, and it is reviewed sooner when the household changes.", long: "A birth, a move or a new job changes the numbers; the review is where the change is made." },
      { label: "First meeting", line: "$0", fitClass: "fit--display fit--num", tone: "paper", icon: "coins", body: "Premiums, fees and commissions are stated before a decision, not after.", long: "A client who knows what an advisor is paid, and by whom, can weigh the advice accordingly." },
      { label: "Shareholders", line: "0", fitClass: "fit--display fit--num", tone: "navy", icon: "shield", body: "The company is owned by its policyowners and has no shareholders to satisfy." },
    ] as Sq[],
  },

  about: [
    { photo: 9, kicker: "About me", caption: "I ask the nosy questions so your family never has to.", href: "#planning", cta: "How planning works",
      long: "I came to this work after helping my own family through the loss of a parent whose cover had lapsed. It taught me that the policy is the least of it; what matters is the conversation that happens before." },
    { label: "About me", line: "I ask before I recommend", fitClass: "fit--display", tone: "sun", icon: "heart",
      body: "A first meeting is a list of questions: what you earn, what you owe, who depends on you and what you would want to be true in twenty years.",
      long: "I do not bring a product to a first meeting. People are usually surprised by how much they find they already know about what they want." },
    { label: "Approach", line: "Plain language", tone: "sky", icon: "book", body: "Insurance is full of terms that sound complicated and are not. I will explain every one the first time it comes up." },
    { label: "Credentials", line: "Invented", tone: "paper", icon: "document", body: "No credentials, licences or registrations are claimed. This page is a layout study; nothing on it can be relied on." },
  ] as Sq[],

  team: [
    { label: "Associate advisor", line: "Reese Okafor", fitClass: "fit--display", tone: "sky", icon: "person", body: "Works on first plans, and on term cover for new parents." },
    { label: "Planning specialist", line: "Noor Haddad", fitClass: "fit--display", tone: "sun", icon: "chart", body: "Builds the projections behind college and retirement goals." },
    { label: "Client service", line: "Jules Marchetti", fitClass: "fit--display", tone: "paper", icon: "mail", body: "Keeps the paperwork moving and answers the calls." },
  ] as Sq[],

  planning: [
    { label: "Step one", line: "Meet", fitClass: "fit--display", tone: "sky", icon: "family", body: "A first conversation about your household, goals and worries. No cost and no commitment.", long: "Bring whatever is to hand: pay stubs, a mortgage statement, the benefits summary from work." },
    { label: "Step two", line: "Map", fitClass: "fit--display", tone: "sun", icon: "compass", body: "Your goals and obligations are set out with their dates and amounts, and what is in place to meet them.", long: "The map shows gaps: the mortgage that is longer than the cover, the college fund that is not started." },
    { label: "Step three", line: "Recommend", fitClass: "fit--display", tone: "paper", icon: "shield", body: "Specific recommendations, each with its price and the gap it closes.", long: "You see the options and what each costs, including the option of doing nothing." },
    { label: "Step four", line: "Review", fitClass: "fit--display", tone: "blush", icon: "calendar", body: "A review each year, and whenever life changes, keeps the plan true.", long: "The plan is a living document; the review is the proof that someone is reading it." },
  ] as Sq[],

  products: [
    { label: "Insurance", line: "Life insurance", fitClass: "fit--display", tone: "sun", icon: "shield", body: "Term, whole and universal life for families and business owners.", href: L, cta: "Life insurance" },
    { label: "Insurance", line: "Term life", tone: "sky", icon: "calendar", body: "Protection for the years a family depends on one income.", href: T, cta: "Term life" },
    { label: "Insurance", line: "Whole life", tone: "paper", icon: "heart", body: "Lifelong cover with cash value, for needs that do not end.", href: W, cta: "Whole life" },
    { label: "Planning", line: "Financial planning", tone: "blush", icon: "compass", body: "College, retirement and estate planning, by appointment." },
    { photo: 82, kicker: "Term life", caption: "My most requested product. By a mile.", href: T, cta: "See term life", long: "For most of the families I see, the first recommendation is the same: enough term cover, for long enough, with the right to convert." },
  ] as Sq[],

  resources: [
    { label: "Guide", line: "Life Insurance Guide", fitClass: "fit--display", tone: "sky", icon: "book", body: "How life insurance works, in eight sections.", href: G, cta: "Read the guide" },
    CALLOUT.risk,
    { label: "Calculator", line: "How much cover do I need?", tone: "sun", icon: "chart", body: "A worksheet that adds up what your family would need.", href: `${T}#calculator`, cta: "Calculate it" },
    { label: "Article", line: "How to choose an advisor", tone: "paper", icon: "person", body: "Questions to ask of anyone who offers to manage your plan." },
  ] as Sq[],

  cta: [
    { label: "Ready to work together?", line: "Let's connect", fitClass: "fit--display", tone: "navy", body: "A call or a visit; either takes about thirty minutes.", btn: { label: "Let's connect", href: "#contact", variant: "gold" as const } },
    { photo: 25, kicker: "First meeting", caption: "Thirty minutes. Bring the babies.", href: "#contact", cta: "Let's connect", long: "A first meeting is free, short and tolerant of interruptions. Bring whatever paperwork is to hand." },
    { photo: 16, kicker: "Yearly review", caption: "Kids grow. Plans should too.", href: "#planning", cta: "How planning works", long: "The plan is reviewed once a year and whenever the household changes, which with small children is roughly always." },
  ] as Sq[],
};

// --- Strips: the content of a skipped range's placeholder ------------------------

export const STRIPS: Record<string, Strip> = {
  homeProducts: { label: "First meeting", strip: "$0", sub: "for a first meeting with an advisor", href: A, tone: "navy", icon: "person" },
  homeAdvisor: { label: "First meeting", strip: "30 min", sub: "A first meeting takes about half an hour.", href: A, tone: "navy", icon: "clock" },
  homeNeedStrip: { label: "A basic policy", strip: "$192", sub: "a year for a basic term policy at under 31", href: T, tone: "sun", icon: "cup", source: "baro25" },
  homeStrength: { label: "Guaranty cover", strip: "$300K", sub: "Typical death-benefit protection by state guaranty associations.", tone: "navy", icon: "lock", source: "nolhga" },
  lifeHero: { label: "Own a policy", strip: "52%", sub: "of adults own life insurance", href: `${G}#what`, tone: "sun", icon: "shield", source: "baro26" },
  lifeWhy: { label: "Need it, have none", strip: "74M", sub: "Americans need cover and have none", href: `${T}#calculator`, tone: "navy", icon: "chart", source: "baro26" },
  termTime: { label: "Rule of thumb", strip: "10×", sub: "income, to start from", href: "#calculator", tone: "navy", icon: "chart" },
  termFits: { label: "Whole life share", strip: "37%", sub: "of new life premium in 2025 was whole life; term was 17%.", href: `${W}#compare`, tone: "sky", icon: "scale", source: "limra25" },
  termNumbers: { label: "Term share", strip: "17%", sub: "of new life insurance premium in 2025 was term.", tone: "navy", icon: "calendar", source: "limra25" },
  wholeHero: { label: "Whole life, 2025", strip: "$6.4B", sub: "of new premium, a record, up 7%.", tone: "sun", icon: "heart", source: "limra25" },
  wholeNumbers: { label: "All new premium", strip: "$17.5B", sub: "a record, up 10% on 2024.", tone: "navy", icon: "coins", source: "limra25" },
  wholeHighlights: { label: "Cash values", strip: "$100K", sub: "Typical state guaranty limit for cash values.", tone: "navy", icon: "lock", source: "nolhga" },
  wholeFamilies: { label: "Price guessed", strip: "10×", sub: "Young adults overestimate term cover's price.", href: T, tone: "sky", icon: "calendar", source: "baro25" },
  wholeStrength: { label: "Own a policy", strip: "52%", sub: "of adults own life insurance.", tone: "navy", icon: "shield", source: "baro26" },
  guideHowMuch: { label: "A basic policy", strip: "$192", sub: "a year, a basic term policy at under 31", href: `${T}#calculator`, tone: "navy", icon: "chart", source: "baro25" },
  guideDividends: { label: "Whole life share", strip: "37%", sub: "of 2025 premium was whole life", href: W, tone: "navy", icon: "heart", source: "limra25" },
  guideWhere: { label: "First meeting", strip: "$0", sub: "A first meeting with an advisor", href: A, tone: "navy", icon: "person" },
  advDifference: { label: "On the team", strip: "3", sub: "people on the team", href: "#team", tone: "navy", icon: "family" },
  advTeam: { label: "Call", strip: "555-0142", sub: "Call", href: "#contact", tone: "navy", icon: "phone" },
};

// --- The disability income calculator ---------------------------------------------

export const DI = {
  hero: [
    { label: "Disability income calculator", line: "Protect the income everything else depends on", fitClass: "fit--display", tone: "navy",
      body: "Estimate how much cover you would need to keep paying the bills if an illness or an injury stopped you working. Three short steps, then a figure you can change.",
      btn: { label: "Calculate it", href: "#calculator", variant: "gold" as const } },
    { photo: 16, kicker: "Disability income", caption: "Your best asset walks to work every morning.", href: "#calculator", cta: "Calculate it",
      long: "A household's largest asset is usually not the house or the savings but the earnings still ahead. Disability income insurance protects those earnings while the earner is alive and unable to work." },
    { label: "Usual group cover", line: "60%", fitClass: "fit--display fit--num", tone: "open", icon: "briefcase",
      body: "of pay is what an employer's group plan typically replaces, and the benefit is usually taxable when the employer pays the premium.",
      long: "Individual cover is bought to close the gap between that figure and what the household needs. Its benefit is generally free of income tax when you pay the premium yourself." },
    { label: "Disabled before 67", line: "1 in 4", fitClass: "fit--display fit--num", tone: "open", icon: "umbrella", source: "ssa",
      body: "of today's 20-year-olds will become disabled and qualify for Social Security disabled-worker benefits before 67." },
  ] as Sq[],
  strip: { label: "Steps", strip: "3", sub: "then a figure you can change.", href: "#calculator", tone: "open", icon: "check" } as Strip,
};
