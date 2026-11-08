"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";

// Add or edit your projects here
const projects = [
  {
    name: "Oikyo",
    slug: "oikyo",
    description:
      "A community platform where people create, discover and join social service events across Bangladesh, with an event map, calendar and list views, and an owner-only dashboard.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "HeroUI",
      "shadcn/ui",
      "Better Auth",
      "Leaflet",
    ],
    github:
      "https://github.com/Ayman392/Oikyo-Social-Development-Events-Platform-Client",
    live: "https://oikyo-psi.vercel.app",
    image: "/Assets/oikyo.png", // set to "" if you don't have a picture yet
    gradient: "from-sky-500 to-indigo-600",
  },
  {
    name: "Bazar Dor",
    slug: "bazar-dor",
    description:
      "A Bengali market-price app for exploring daily prices of essential products in Bangladesh. Browse by category, see the biggest price rises and falls, compare prices across markets, and sign in with email, Google or GitHub.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HeroUI",
      "Better Auth",
      "MongoDB",
    ],
    github: "https://github.com/Ayman392/Bazar-Dor",
    live: "https://bazar-dor-self.vercel.app",
    image: "/Assets/bazar-dor.png",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Fitlog",
    slug: "fitlog",
    description: "A workout tracking app.",
    tech: ["Next.js", "TypeScript"], // add more here when you know the full stack
    github: "https://github.com/Ayman392/Fitlog",
    live: "https://fitlog-eosin-kappa.vercel.app",
    image: "/Assets/fitlog.png",
    gradient: "from-orange-500 to-rose-600",
  },
];

// Wraps a card so it tilts in 3D toward the mouse
function TiltCard({ children }: { children: React.ReactNode }) {
  // Where the mouse is inside the card: -0.5 (left/top) to 0.5 (right/bottom)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Turn the mouse position into a small rotation in degrees
  const rotateXRaw = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateYRaw = useTransform(x, [-0.5, 0.5], [-6, 6]);

  // The spring makes the tilt smooth and a little bouncy
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 20 });

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - box.left) / box.width - 0.5);
    y.set((event.clientY - box.top) / box.height - 0.5);
  }

  // Go back to flat when the mouse leaves
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="h-full" style={{ perspective: 1000 }}>
      <motion.div
        className="h-full"
        style={{ rotateX, rotateY }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-28">
      <h2 className="text-4xl font-bold tracking-tighter text-white md:text-5xl">
        Projects
      </h2>
      <p className="mt-3 text-white/60">A few things I&apos;ve built.</p>

      <motion.ul
        variants={stagger()}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-12 grid gap-6 md:grid-cols-2"
      >
        {projects.map((project, index) => (
          <motion.li
            key={project.name}
            variants={fadeUp}
            className={index === 0 ? "md:col-span-2" : ""}
          >
            <TiltCard>
              <article className="group h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-white/20">
                {/* Banner: the project picture, or a gradient if there is none */}
                <div
                  className={`relative overflow-hidden bg-gradient-to-br ${project.gradient} ${
                    index === 0 ? "h-56 md:h-72" : "h-44 md:h-56"
                  }`}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.name} landing page`}
                      fill
                      sizes="(min-width: 1024px) 1024px, 100vw"
                      className="object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-white/20 text-3xl font-bold text-white shadow-lg backdrop-blur">
                        {project.name[0]}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {project.description}
                  </p>

                  {/* Tech tags (hidden when the list is empty) */}
                  {project.tech.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((name) => (
                        <span
                          key={name}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Card links */}
                  <div className="mt-5 flex flex-wrap items-center gap-5">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-white/50 transition hover:text-white"
                    >
                      View Details <ArrowRight size={14} />
                    </Link>

                    {project.live && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-white/50 transition hover:text-white"
                      >
                        Source code <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </TiltCard>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
