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
      "TODO: write a real challenge you faced (e.g. map markers, auth, owner-only routes)",
      "TODO: second challenge",
    ],
    improvements: [
      "TODO: a real future plan (e.g. notifications, event chat)",
      "TODO: second improvement",
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
    challenges: ["TODO: write a real challenge", "TODO: second challenge"],
    improvements: ["TODO: a real future plan", "TODO: second improvement"],
  },
  {
    slug: "fitlog",
    name: "Fitlog",
    image: "/Assets/fitlog.png",
    summary: "A workout tracking app.",
    description:
      "TODO: expand this. Say what Fitlog lets users do (log workouts, track progress, etc.).",
    stack: ["Next.js", "TypeScript"],
    liveUrl: "https://fitlog-eosin-kappa.vercel.app",
    githubUrl: "https://github.com/Ayman392/Fitlog",
    challenges: ["TODO: write a real challenge", "TODO: second challenge"],
    improvements: ["TODO: a real future plan", "TODO: second improvement"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
