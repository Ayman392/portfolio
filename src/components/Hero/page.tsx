"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button as HeroButton } from "@heroui/react";
import { Button } from "@/components/ui/button";

// Change these to your own skills
const tech = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
];

const name = "Ayman Nasir Uddin";

// Scroll smoothly to a section on the page
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// Fade up from below, one element after another
function fadeIn(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  };
}

export default function Hero() {
  const { scrollY } = useScroll();

  // As you scroll down, the glow drifts slowly and the text rises and fades
  const glowY = useTransform(scrollY, [0, 600], [0, 150]);
  const textY = useTransform(scrollY, [0, 450], [0, -60]);
  const textOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 text-center"
    >
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: glowY }}>
          <motion.div
            className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-blue-600/40 blur-[140px]"
            animate={{ x: [0, 50, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-orange-500/40 blur-[140px]"
            animate={{ x: [0, -50, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Everything above the glow */}
      <motion.div
        className="relative z-10 flex w-full flex-col items-center"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Badge */}
        <motion.div
          {...fadeIn(0)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur"
        >
          {/* Dot that gently pulses */}
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-orange-400"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          Full-Stack Developer
        </motion.div>

        {/* Name: each word fades up and sharpens, one after another */}
        <h1 className="flex max-w-4xl flex-wrap justify-center gap-x-[0.25em] text-6xl font-bold leading-[1.02] tracking-tighter md:text-8xl">
          {name.split(" ").map((word, index) => (
            <motion.span
              key={word}
              className="inline-block bg-gradient-to-b from-white to-white/50 bg-clip-text pb-2 text-transparent"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.12 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Intro line: change this to your own words */}
        <motion.p
          {...fadeIn(0.5)}
          className="mt-6 max-w-xl text-lg font-medium tracking-tight text-white/60 md:text-xl"
        >
          I build fast, modern web apps, from the database to the interface.
        </motion.p>

        {/* Two buttons */}
        <motion.div
          {...fadeIn(0.6)}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          {/* Each button grows a little on hover and shrinks when pressed */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <HeroButton
              variant="primary"
              size="lg"
              className="h-12 rounded-full bg-white! px-7 text-black!"
              onPress={() => scrollTo("projects")}
            >
              View my projects
            </HeroButton>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-white/20 bg-white/5 px-7 text-white backdrop-blur hover:bg-white/10"
              onClick={() => scrollTo("contact")}
            >
              Contact me
            </Button>
          </motion.div>
        </motion.div>

        {/* Tech row */}
        <motion.div
          {...fadeIn(0.7)}
          className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/40"
        >
          {tech.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </motion.div>

        {/* Window card peeking up from the bottom */}
        <motion.div {...fadeIn(0.8)} className="mt-14 w-full max-w-3xl">
          {/* The card floats gently up and down */}
          <motion.div
            className="overflow-hidden rounded-t-2xl border border-b-0 border-white/15 bg-white/5 backdrop-blur-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs text-white/40">portfolio.tsx</span>
            </div>
            <div className="space-y-3 p-6">
              <div className="h-3 w-2/3 rounded bg-white/15" />
              <div className="h-3 w-1/2 rounded bg-white/10" />
              <div className="h-3 w-3/4 rounded bg-white/10" />
              <div className="h-3 w-2/5 rounded bg-white/15" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
