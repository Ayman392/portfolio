export type Project = {
  slug: string;
  name: string;
  image: string;
  summary: string;
  description: string;
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  challenges: string[];
  improvements: string[];
};

export const projects: Project[] = [
  {
    slug: "oikyo",
    name: "Oikyo",
    image: "/Assets/oikyo.png",
    summary:
      "A community platform to create, discover and join social service events across Bangladesh.",
    description:
      "Oikyo lets people create, discover and join social service events across Bangladesh, with an event map, calendar and list views, and an owner-only dashboard.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "HeroUI",
      "shadcn/ui",
      "Better Auth",
      "Leaflet",
    ],
    liveUrl: "https://oikyo-psi.vercel.app",
    githubUrl:
      "https://github.com/Ayman392/Oikyo-Social-Development-Events-Platform-Client",
    challenges: [
      "Showing the event map: Leaflet needs the browser's window object, so it crashed when Next.js tried to render it on the server. I loaded the map as a client-only component so it only renders in the browser.",
      "Owner-only dashboard: only the person who created an event should be able to edit or delete it. Hiding buttons wasn't enough, so I check the logged-in user from the Better Auth session before allowing any change.",
    ],
    improvements: [
      "Email reminders before an event a volunteer joined, and notifications to organizers when someone joins, so people don't forget and organizers know who is coming.",
      "Optional seat limits, a leave-event button and a participant list for organizers, to make real events easier to manage.",
    ],
  },
  {
    slug: "bazar-dor",
    name: "Bazar Dor",
    image: "/Assets/bazar-dor.png",
    summary:
      "A Bengali market-price app for daily prices of essential products in Bangladesh.",
    description:
      "Bazar Dor helps people explore daily prices of essential products in Bangladesh. Browse by category, see the biggest price rises and falls, compare prices across markets, and sign in with email, Google or GitHub.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HeroUI",
      "Better Auth",
      "MongoDB",
    ],
    liveUrl: "https://bazar-dor-self.vercel.app",
    githubUrl: "https://github.com/Ayman392/Bazar-Dor",
    challenges: [
      "Google and GitHub sign-in worked locally but failed after deploying, because each environment needs its own callback URL and keys. I set up separate OAuth credentials and environment variables for local and production.",
      "Sorting prices: Bengali numerals can't be sorted as plain text, so the biggest rises and falls came out in the wrong order. I convert prices to real numbers for sorting and only format them as Bengali for display.",
    ],
    improvements: [
      "Save each day's prices and show 7-day and 30-day price history charts, so users can see how a product's price actually changes over time.",
      "Cache the price data and keep a daily snapshot in the database, so the site still works when the external price source is slow or unavailable.",
    ],
  },
  {
    slug: "fitlog",
    name: "Fitlog",
    image: "/Assets/fitlog.png",
    summary:
      "A dark, no-frills gym companion for browsing workouts and building a plan.",
    description:
      "A dark, no-frills gym companion. Browse a library of workouts with each one's muscle group, equipment, duration, calories and rating, open a workout for details, and build a personal plan.",
    stack: ["Next.js", "TypeScript"],
    liveUrl: "https://fitlog-eosin-kappa.vercel.app",
    githubUrl: "https://github.com/Ayman392/Fitlog",
    challenges: [
      "Keeping My Plan consistent across pages: adding a workout on one page had to show up everywhere else. I moved the plan into shared state instead of keeping a separate copy in each page.",
      "Loading the workout library: the list looked empty for a moment before the data arrived, which made the page feel broken. I added loading placeholders so users know content is on the way.",
    ],
    improvements: [
      "Log sets, reps and weight for each workout, with a history of past sessions, so the app tracks real progress and not only a plan.",
      "Progress charts for personal records, weekly volume and a streak counter, plus sign-in so My Plan saves to the cloud and follows the user across devices.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
