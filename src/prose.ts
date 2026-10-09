import type { SourceKey } from "./sources";

/**
 * Traditional paragraphs, set between the grids as the reference's guide sets
 * them: a measured column of running text with its own subheadings and check
 * lists, and a pale panel carrying one figure. A grid is for what a reader
 * scans; this is for what a reader reads.
 */
export type Block = string | { h: string } | { checks: [string, string][] };
export interface ProseSection {
  id: string;
  kicker?: string;
  title?: string;
  blocks: Block[];
  stat?: { line: string; text: string; cite?: string; source?: SourceKey };
}

export const PROSE: Record<string, ProseSection> = {
  homeWhy: {
    id: "why", kicker: "In plain words", title: "Why a young family starts with protection",
    blocks: [
      "A household with young children is rich in the future and short of the present. Most of what it will earn has not been earned yet, most of the mortgage has not been paid, and the schooling, the childcare and the cars are all still to come. If one earner is lost, the plan does not shrink; it stops.",
      "Life insurance is the one product built for that moment. It turns the years of earnings a family was counting on into a sum that arrives when it is needed, tax-free in most cases, and it can be bought for a fixed number of years at a price set while the buyer is young and healthy.",
      "That is why the usual first conversation is short and concrete: who depends on you, for how long, and what they would have to pay for in the meantime. The answers give a figure, and the figure gives a term.",
    ],
    stat: { line: "1 in 4", text: "of today's 20-year-olds will become disabled before 67, which is why income protection is discussed alongside life insurance.", cite: "Social Security Administration", source: "ssa" },
  },
  homeMeeting: {
    id: "meeting", kicker: "Working with an advisor", title: "What the first meeting covers",
    blocks: [
      "A first meeting with an advisor is a conversation, not a sale. It takes about thirty minutes, it costs nothing, and nothing is recommended until the questions have been asked.",
      { checks: [
        ["Who depends on you", "Partner, children, parents, a business partner or a co-signer: anyone who would be worse off if your income stopped."],
        ["What you owe", "The mortgage, student loans, cards and any loan someone else has guaranteed."],
        ["What you already have", "Savings, retirement accounts, cover through work and any policy bought earlier, with its term and its owner."],
        ["What you want to be true", "A house kept, schooling paid, a partner free to choose between working and staying home."],
      ] },
      "From the answers the advisor writes a one-page statement of goals, amounts and dates. That statement, not a product, is the first thing you take home.",
    ],
  },
  lifeWhat: {
    id: "plain", kicker: "How it works", title: "What a life insurance policy does",
    blocks: [
      "A life insurance policy is a contract between you and an insurance company. You pay a premium, monthly or yearly. In return the company promises that if you die while the policy is in force it will pay a stated sum, the death benefit, to the people you named.",
      "The sum is usually free of federal income tax for the people who receive it, and because they are named on the policy it passes to them directly rather than through the estate. That is why a policy can pay a mortgage or cover a funeral within weeks, while the rest of an estate may take months to settle.",
      { h: "Two kinds" },
      "Every policy is either temporary or permanent. Temporary cover, term insurance, lasts a stated number of years and pays only if you die within them. Permanent cover lasts for life and, because a death benefit must eventually be paid, it also builds a cash value you can use while you are alive.",
    ],
    stat: { line: "74M", text: "Americans say they need life insurance and have none; another 24 million say they need more than they have.", cite: "LIMRA & Life Happens, 2026", source: "baro26" },
  },
  lifeChoose: {
    id: "choose", kicker: "Choosing", title: "Term or permanent",
    blocks: [
      "The choice between the two is a question about time. If the need has an end date, such as a mortgage that will be paid in twenty-five years or children who will be independent in twenty, term cover is the economical answer: it buys the largest amount of protection for the shortest period of exposure.",
      "If the need has no end date, such as a dependent who will always need support, an estate that will be taxed or a wish to leave a specific sum, permanent cover is built for it. Its premiums are several times higher for the same death benefit, because the company must pay out eventually.",
      { checks: [
        ["Start with the amount", "Decide how much cover the household needs before deciding how to pay for it."],
        ["Match the term to the obligation", "A twenty-year term for a twenty-year need, with a few years' margin."],
        ["Keep the option to change", "Choose a term policy that can be converted to permanent cover without a new medical exam."],
      ] },
    ],
  },
  termWhy: {
    id: "years", kicker: "How term works", title: "A policy for the years of dependence",
    blocks: [
      "Term life insurance is protection you rent for a fixed number of years. You choose the length, the amount and, with most insurers, a level premium that does not change. If you die within the term the death benefit is paid; if you outlive it, the policy ends and the premiums have bought what they were meant to buy, which is peace of mind through the years your family most needed it.",
      "Because the insurer's risk is limited to the term, and because nothing accumulates, term is the least expensive way to insure a large sum. A healthy young adult can usually buy a six-figure policy for less than the cost of a streaming subscription and a few coffees a month, and that price is set once, at the start.",
      "The most common mistake is to assume it costs far more. Surveys that ask adults to name the price of a basic policy find that most guess several times too high, and that the people guessing highest are those least likely to have shopped.",
    ],
    stat: { line: "$192", text: "a year is the accepted median cost of a $250,000, 20-year level term policy for a healthy man under 31.", cite: "LIMRA & Life Happens, 2025", source: "baro25" },
  },
  termResult: {
    id: "result", kicker: "Using the calculator", title: "Reading the result",
    blocks: [
      "The figure above is arithmetic, not a forecast. It adds the income your household would need to replace for the years you choose, the mortgage and other debts, the cost of schooling and final expenses, and subtracts what is already saved or insured.",
      "Two assumptions deserve a second look. The first is the number of years of income: a common choice is the time until the youngest child is independent, but a surviving partner who has stepped back from work may need longer. The second is what counts as cover already in place: employer insurance usually ends with the job, so it is safer to count it only as a supplement.",
      "Once there is a figure, the next question is how to buy it. A single level term policy covers the whole amount for one length; two or three smaller policies of different lengths can follow the shape of the need, with the largest piece, the mortgage, ending first.",
    ],
  },
  termCheck: {
    id: "check", kicker: "Before you buy", title: "What to check in a term policy",
    blocks: [
      "Price is only one of the things that separate one term policy from another. Four features decide how the policy behaves when your circumstances change.",
      { checks: [
        ["Level or not", "A level premium is fixed for the whole term. An annually renewable premium rises every year as you age."],
        ["Conversion", "The right to exchange the policy for permanent cover without a new medical exam, and the date by which it must be used."],
        ["Riders", "Waiver of premium if you become disabled, an accelerated death benefit if you become terminally ill, and a child term rider are the usual ones."],
        ["The application", "Answer every question fully. For about the first two years the insurer may look back at the application if a claim is made."],
      ] },
      "Ask also how the insurer will decide: a full medical exam can produce the lowest premium, while a faster process that uses data in place of an exam may limit the amount you can buy.",
    ],
  },
  wholeWhat: {
    id: "permanent", kicker: "How whole life works", title: "Permanent protection, explained",
    blocks: [
      "Whole life is permanent insurance in its plainest form. You pay a fixed premium, usually for as long as you live or until a stated age, and the company promises a death benefit whenever you die. Nothing about the premium or the benefit changes unless you change it.",
      "Part of each premium pays for the protection and the company's costs; the rest goes into a cash value account that grows at a rate written into the contract. The growth is guaranteed, which is the feature that distinguishes whole life from universal and variable policies, and it is usually tax-deferred while it stays inside the policy.",
      "The cash value is yours to use. You can borrow against it, withdraw from it or surrender the policy for it, but each of these reduces the death benefit or ends the policy, so the decision to use it should be made with an advisor and with its cost in view.",
    ],
    stat: { line: "$6.4B", text: "of new whole life premium was sold in 2025, a record, up 7% on 2024.", cite: "LIMRA, 2025 sales", source: "limra25" },
  },
  wholeVsTerm: {
    id: "versus", kicker: "Side by side", title: "Whole life next to term",
    blocks: [
      "For most young families the two are not rivals but stages. Term cover answers the first and largest need, replacing an income while children are small and a mortgage is large, and does it at a price a household can carry. Whole life answers a different need, one with no end date, and it is usually added when income has grown and the first need has been met.",
      { checks: [
        ["Cost for the same benefit", "Whole life costs several times as much as term, because it never expires and builds cash value."],
        ["Length of cover", "Term ends when the term does. Whole life continues for life as long as premiums are paid."],
        ["What you can use", "Whole life's cash value can be borrowed against or withdrawn; term has none."],
      ] },
      "Many households hold both: a large term policy for the years of dependence and a smaller whole life policy for what must last.",
    ],
  },
  guideWhat: {
    id: "g1", blocks: [
      "At its most basic, life insurance is a contract between you and an insurance company. Under the terms of the contract, you make regular premium payments to the company in exchange for a certain dollar amount of cover. If you die while the cover is in place, the company pays a death benefit to the beneficiaries you designate.",
      "While the death benefit is the main reason people buy life insurance, some policies also accumulate cash value, money that grows in a tax-advantaged way and is available to you throughout your life. There are many kinds of policy, but they all fall into two categories:",
    ],
    stat: { line: "52%", text: "of U.S. adults say they own life insurance, through work or on their own.", cite: "LIMRA & Life Happens, 2026", source: "baro26" },
  },
  guideTypes: {
    id: "g2", blocks: [
      "Every life insurance policy is either term or permanent. Within those two categories there are a handful of kinds, and they differ in three ways: how long they last, whether the premium can change, and what happens to any money that builds up inside the policy. The grid below sets them out one at a time.",
      { h: "Converting" },
      "When you are young, term cover may be the attractive and affordable choice. As priorities change you may want permanent cover as well, and most term policies let you convert some or all of the term cover without another health exam. The premium reflects your age at conversion but not your health, which is a main reason to buy while still young. Some insurers also give conversion credits that offset the higher premium for the first year.",
    ],
  },
  guideHowMuch: {
    id: "g3", blocks: [
      "A general rule is to hold a death benefit of at least ten times your salary. It is a starting point rather than an answer, because the right amount depends on several things: your income; how many people depend on you; how long they will need support; whether you have a mortgage or other debts; any future costs you want to cover, such as a child's college; and the savings and other assets you already have.",
      "It is a good idea to buy at least some protection as soon as you can, because the cost is based chiefly on your age and health. The younger and healthier you are, the lower the premium, and many insurers let you add a benefit at a young age that gives you the right to buy more cover later without another health exam. Then, as your needs change, you can update the cover along with your financial plan.",
    ],
  },
  guideCash: {
    id: "g4", blocks: [
      "A key benefit of permanent insurance is the policy's cash value. It grows in a tax-advantaged way and becomes an asset you can use for almost anything: paying premiums, a child's tuition, an emergency, a down payment or collateral on a loan, a business, or retirement income.",
      "Using it has a price. When you borrow, the loan accrues interest and an unpaid balance reduces the death benefit. When you surrender part of the policy, the death benefit falls with it. When you surrender all of it, the cover ends, and any gain above what you paid in is taxed as ordinary income. For that reason total surrender is best kept for the time when your heirs no longer need the death benefit.",
    ],
  },
  guideDividends: {
    id: "g5", blocks: [
      "When a company makes a profit it can pay all or part of it to its owners. A public company pays dividends to its shareholders. A mutual life insurer has no shareholders; it is operated for its policyowners, and when it does better than it expected in a year it may choose to pay them a dividend.",
      "Each year the insurer forecasts how many claims it expects to pay, how much it will bring in from premiums and investments, and what it will cost to run. If results are better than the forecast, a dividend may follow. Dividends are not guaranteed, and a policy that earned one in one year may not in the next.",
      { h: "How a dividend can be used" },
      { checks: [["Take it as cash", "Spend it or save it."], ["Buy more cover", "Use it to increase permanent cover, which raises both the death benefit and the cash value."], ["Reduce the premium", "Apply it to the premium so you pay less out of pocket, or nothing."]] },
    ],
  },
  guideRevisit: {
    id: "g6", blocks: [
      "It is wise to review your plan and your cover at least once a year. But six events call for a review straight away, because each one adds a person who depends on you, a debt that must be paid, or an obligation that someone else has taken on.",
    ],
  },
  guideWhere: {
    id: "g7", blocks: [
      "Many employers offer life insurance as a group benefit. Basic cover is often free to the employee and is usually a fixed sum or one to two times salary; supplemental cover can be bought in addition, at group rates, in amounts from a few thousand dollars to several times salary. Both are worth having, and both have drawbacks: they are typically not portable, so leaving the job can mean losing the cover, and the cost of group cover can change over time.",
      "Because group cover is rarely enough, many people also buy an individual policy through a financial advisor, who can help work out which costs the cover must meet, how much is needed and which type of policy suits the household.",
    ],
  },
  advisorAbout: {
    id: "bio", kicker: "About me", title: "A short introduction",
    blocks: [
      "I am an invented advisor, so everything here is written to show how an advisor's page reads and none of it is a claim about a real person. The page describes a practice built around young families: couples with a first child, a first mortgage and a feeling that something ought to be put in place.",
      "A practice like this starts with a short list of questions and a written one-page plan, and returns to the plan once a year. The work is mostly arithmetic, and mostly explaining the arithmetic in words a household can act on.",
      "The practice's cover recommendations tend to be simple: enough term insurance, for long enough, with the right to convert; a disability policy where the household depends on one income; and a review each year.",
    ],
  },
};
