"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  FolderOpen,
  GraduationCap,
  Languages,
  Layers,
  MapPin,
  Target,
} from "lucide-react";
import { stagger, viewport } from "@/lib/motion";

// The picture lives in public/Assets
// Set this to "" to show your initials instead
const photo = "/Assets/portfolio_pic.jpeg";

// Change these to your own stack
const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Express.js",
  "MongoDB",
  "Git & GitHub",
];

// Cards pop in with a little spring
const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

// Stack chips pop in one after another
const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

// A number that counts up from 0 when it scrolls into view
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => Math.round(value));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration: 1.5, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

// A small glass card with an icon and a label, used for every widget below
// "span" is the grid width, "className" is any extra look for the inner card
function Widget({
  icon,
  label,
  span = "",
  className = "",
  children,
}: {
  icon: React.ReactNode;
  label: string;
  span?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    // Outer box: sits in the grid and pops in
    <motion.div variants={popIn} className={span}>
      {/* Inner box: the glass look, and a springy lift on hover */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`h-full rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 ${className}`}
      >
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/40">
          {icon}
          {label}
        </div>
        <div className="mt-4">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-28">
      <h2 className="text-4xl font-bold tracking-tighter text-white md:text-5xl">
        About
      </h2>
      <p className="mt-3 text-white/60">A little about me.</p>

      <motion.div
        variants={stagger()}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-12 grid gap-4 md:grid-cols-4"
      >
        {/* Profile card (big) */}
        <motion.div
          variants={popIn}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:col-span-2 md:row-span-2"
        >
          {/* Soft glow in the corners, drifting slowly */}
          <motion.div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-[90px]"
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-orange-500/20 blur-[90px]"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative">
            {/* Photo, or initials if there is no photo. It tilts on hover */}
            <motion.div
              whileHover={{ rotate: -6, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-500 to-indigo-600 text-4xl font-bold text-white ring-1 ring-white/20"
            >
              {photo ? (
                <Image
                  src={photo}
                  alt="Ayman Nasir Uddin"
                  width={112}
                  height={112}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                "AN"
              )}
            </motion.div>

            <h3 className="mt-6 text-3xl font-semibold tracking-tight text-white">
              Ayman Nasir Uddin
            </h3>
            <p className="mt-2 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
              Full-Stack Developer
            </p>

            {/* Bio: change this to your own words */}
            <p className="mt-5 leading-relaxed text-white/60">
              I&apos;m a software engineering student at Daffodil International
              University who loves building websites with clean, beautiful
              interfaces. I work mostly with React, Next.js, TypeScript and
              Tailwind CSS, and I&apos;m growing into a full-stack developer who
              can build complex web apps from the database to the interface.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <motion.a
                href="https://github.com/Ayman392"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 hover:bg-white/20"
              >
                GitHub <ArrowUpRight size={14} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/aymannasir1/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 hover:bg-white/20"
              >
                LinkedIn <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <Widget
          icon={<GraduationCap size={14} />}
          label="Education"
          span="md:col-span-2"
        >
          <p className="text-xl font-semibold tracking-tight text-white">
            Daffodil International University
          </p>
          <p className="mt-1 text-sm text-white/60">
            B.Sc. in Software Engineering · 2023 – 2027
          </p>
          <p className="mt-3 inline-block rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
            Major in Data Science
          </p>
        </Widget>

        {/* Location */}
        <Widget icon={<MapPin size={14} />} label="Location">
          <p className="text-xl font-semibold tracking-tight text-white">
            Dhaka
          </p>
          <p className="mt-1 text-sm text-white/60">Bangladesh</p>
        </Widget>

        {/* Projects count: update the number when you add more projects */}
        <Widget icon={<FolderOpen size={14} />} label="Projects">
          <p className="text-5xl font-bold tracking-tighter text-white">
            <CountUp to={3} />
          </p>
          <p className="mt-1 text-sm text-white/60">projects built</p>
        </Widget>

        {/* Goal */}
        <Widget
          icon={<Target size={14} />}
          label="Goal"
          span="md:col-span-2"
          className="bg-gradient-to-br from-sky-500/25 to-indigo-600/25"
        >
          <p className="text-lg font-medium leading-snug text-white">
            Become a full-stack developer and build complex websites with
            beautiful UI.
          </p>
        </Widget>

        {/* Languages */}
        <Widget
          icon={<Languages size={14} />}
          label="Languages"
          span="md:col-span-2"
        >
          <ul className="divide-y divide-white/10">
            <li className="flex items-center justify-between py-2">
              <span className="text-white">Bangla</span>
              <span className="text-sm text-white/50">Native</span>
            </li>
            <li className="flex items-center justify-between py-2">
              <span className="text-white">English</span>
              <span className="text-sm text-white/50">Professional</span>
            </li>
          </ul>
        </Widget>

        {/* Stack: the chips pop in one after another */}
        <Widget
          icon={<Layers size={14} />}
          label="Main stack"
          span="md:col-span-4"
        >
          <motion.div variants={stagger()} className="flex flex-wrap gap-2">
            {stack.map((name) => (
              <motion.span
                key={name}
                variants={chipVariants}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80"
              >
                {name}
              </motion.span>
            ))}
          </motion.div>
        </Widget>
      </motion.div>
    </section>
  );
}
