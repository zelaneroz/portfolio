export type Post = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: string;
  tags: string[];
  image: string;
  content: string; // Markdown
  readingTime: string;
};

export const posts: Post[] = [
 {
    id: "1",
    title: "Manufactured Scarcity: Where I'm From, Nature is Free",
    date: "2026-02-28",
    category: "Society, Policy, & Economics",
    tags: ["Society, Policy, & Economics"],
    image: "https://images.nationalgeographic.org/image/upload/v1638886007/EducationHub/photos/city-lights.jpg",
    readingTime: "7 min",
    content: `I saw an Instagram reel the other day. A girl was teary eyed over her hotel view in Japan. Outside her window was a small spring and a perfectly kept garden. It was quiet, green, and cinematic.

I laughed.

Not in a cruel way. Just in that involuntary way you react when something feels strange.

I'm from Dinagat Islands, a small rural island in the Philippines where the Pacific Ocean is simply home. Food is caught by an uncle who disappears underwater or into the horizon and comes back with whatever the sea feels generous enough to offer. No plating. No garnish. Just salt, smoke, and hands.

Now I am 20. I have lived in Japan & the United States. I have travelled to New York, Iceland, and so many other countries. I have seen people spend hundreds, sometimes thousands, for what is marketed as raw nature. A geothermal spring in Reykjavik becomes a luxury spa. A quiet garden becomes a premium hotel view. Oceanfront becomes exclusive property.

And I laugh. I laugh at the irony of having to pay for things that, in their natural state, do not ask for payment. Somewhere along the way, we got convinced to work our ass off for so many hours in a day, weeks in a year, to have the end goal to retire and travel, or to have time off the weekend for a nature getaway.

## Capitalism, Urban Life, & Manufactured Scarcity

When you grow up surrounded by concrete, nature starts to feel rare. And when something feels rare, it becomes expensive. It's simple economics.

Cities compress space. Parks shrink. Shorelines are fenced off. Even quiet becomes something you have to look for. Time is monetized, productivity is rewarded, and rest becomes a purchase. **People work long hours and then spend money to feel grounded for a weekend**.

There is a strange loop here. We design environments that distance us from land, water, and green space. Then we create industries around helping people reconnect with what was removed. We industrialize fishing and then charge more for wild caught seafood. We damage coastlines and then market the few untouched beaches that remain. **We privatize springs and rename them resorts**.

Scarcity is produced, packaged, and sold back to us.

**Under capitalism, this pattern is not accidental**. Systems are structured around growth, extraction, and profit maximization. Land becomes an asset class. Water becomes infrastructure. Green space becomes real estate potential. What was once shared is enclosed, parceled, and priced. The logic is simple. If something can generate revenue, it will be converted into property. If something is freely accessible, it is seen as underutilized.

This process concentrates ownership. A small percentage of actors control land, waterfronts, and development rights. Public goods shrink while private amenities expand. The result is a cycle that keeps people working to afford temporary access to what was once embedded in everyday life. You work to pay rent in a dense city. You work more to afford an escape from that density. The system produces both the exhaustion and the paid solution to that exhaustion.

**Economic theory often frames this as efficient allocation of resources. But efficiency for whom matters**. When public space becomes a private commodity, value accrues upward. Access trickles downward at a price. Manufactured scarcity sustains demand. Demand sustains profit. Profit sustains the concentration of ownership. The loop reinforces itself.

If that is the pattern, then the solution cannot simply be better resorts or more exclusive escapes. It has to be better cities. Urban planning that protects public green spaces instead of shrinking them. Waterfronts that are accessible instead of privatized. Community gardens woven into neighborhoods. Walkable streets, shaded sidewalks, public parks that feel safe and alive. Zoning that requires developers to include public access. Policies that limit speculative land banking. Investment in public transit so nature is reachable without a car or a luxury hotel stay. Cities built not just for efficiency, but for belonging.

Nature should not be a luxury add on to urban life. It should be part of its foundation.

**I do not laugh at the girl anymore**. Her reaction makes sense in a system that withholds the ordinary and sells it back as extraordinary. The goal should not be to mock people for paying for beauty. The goal should be to build places where beauty does not require a booking confirmation. That means voting for leaders who prioritize public space. Supporting local policies that expand parks and protect coastlines. Showing up to community planning meetings. Questioning developments that fence off what used to be shared. Designing neighborhoods where children can see water, trees, and open sky without a ticket.

Access to nature should not depend on income bracket or travel budget. It should be a civic baseline. **Afterall, anything that is manufactured, even scarcity, can be dismantled.**`,
  },
];
