"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";
import {
  ChevronUp,
  Command,
  Download,
  FileText,
  Folder,
  Mail,
  Search,
  Terminal,
  User,
} from "lucide-react";
import { Button as HeroButton } from "@heroui/react";
import { Button } from "@/components/ui/button";

const tech = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
];

const name = "Ayman Nasir Uddin";
const photo = "/Assets/portfolio_pic.jpeg";
const resumeFile = "/Assets/Ayman_Nasir_Uddin_Resume.pdf";
const resumeName = "Ayman_Nasir_Uddin_Resume.pdf";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// Starts the PDF download without needing a link inside the button
function downloadResume() {
  const link = document.createElement("a");
  link.href = resumeFile;
  link.download = resumeName;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// iOS glass look: blur, thin bright border, inner highlight, soft shadow
const glassBase =
  "relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full border px-6 text-sm font-semibold backdrop-blur-xl transition-colors " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(255,255,255,0.1),0_8px_24px_rgba(0,0,0,0.35)]";

const glassBlue = `${glassBase} border-sky-300/40 bg-sky-500/40 text-white hover:bg-sky-500/55`;
const glassClear = `${glassBase} border-white/25 bg-white/15 text-white hover:bg-white/25`;

// The shiny top half of a glass button
function GlassShine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent"
    />
  );
}

// Notification cards slide in one after another
const stackContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const stackItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

// Fixed particle layout (no Math.random, so the server and browser always match)
const particles = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 17) % 100,
  size: 2 + (i % 3),
  rise: 80 + (i % 4) * 40,
  duration: 7 + (i % 5) * 1.6,
  delay: (i % 7) * 0.7,
  color: ["bg-sky-300", "bg-orange-300", "bg-white", "bg-fuchsia-300"][i % 4],
}));

// Animated hero background: drifting grid, rising particles, and a glow that follows the mouse.
// The site's colour ribbons (in layout.tsx) show through behind it.
function HeroBackground({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();

  // Springs make the glow trail the cursor smoothly
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const gridMask =
    "radial-gradient(ellipse at center, black 25%, transparent 72%)";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Grid that slowly drifts, faded out toward the edges */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
        }}
        animate={
          reduceMotion
            ? undefined
            : { backgroundPosition: ["0px 0px", "56px 56px"] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Glow that follows the mouse */}
      <motion.div
        className="absolute left-0 top-0 -ml-[260px] -mt-[260px] h-[520px] w-[520px] rounded-full bg-sky-500/25 blur-[110px]"
        style={{ x: glowX, y: glowY }}
      />

      {/* Particles floating up and fading out */}
      {!reduceMotion &&
        particles.map((p, i) => (
          <motion.span
            key={i}
            className={`absolute rounded-full ${p.color}`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{ y: [0, -p.rise], opacity: [0, 0.7, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}

// Dock icon with a label that appears on hover
function DockItem({
  label,
  gradient,
  onClick,
  href,
  children,
}: {
  label: string;
  gradient: string;
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}) {
  const className = `flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b ${gradient} text-white shadow-lg`;
  const motionProps = {
    whileHover: { scale: 1.2, y: -8 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  };

  return (
    <div className="group relative flex flex-col items-center">
      {href ? (
        <motion.a
          href={href}
          download={resumeName}
          aria-label={label}
          className={className}
          {...motionProps}
        >
          {children}
        </motion.a>
      ) : (
        <motion.button
          type="button"
          onClick={onClick}
          aria-label={label}
          className={className}
          {...motionProps}
        >
          {children}
        </motion.button>
      )}
      <span className="pointer-events-none absolute -top-11 w-max scale-0 rounded-md bg-black/80 px-2 py-1 text-xs text-white backdrop-blur transition-transform group-hover:scale-100">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const [time, setTime] = useState<string | null>(null);
  const [islandOpen, setIslandOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Mouse position inside the hero, used by the background glow
  const mouseX = useMotionValue(400);
  const mouseY = useMotionValue(300);

  // Clock for the Dynamic Island
  useEffect(() => {
    const updateTime = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );

    // Both run in callbacks, not in the effect body, so there's no cascading render
    const first = setTimeout(updateTime, 0);
    const clock = setInterval(updateTime, 1000);

    return () => {
      clearTimeout(first);
      clearInterval(clock);
    };
  }, []);

  // Spotlight typing effect, then the results appear
  useEffect(() => {
    const text = `${name}?`;
    let index = 0;
    let revealTimer: ReturnType<typeof setTimeout> | undefined;

    const typing = setInterval(() => {
      index++;
      setQuery(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(typing);
        revealTimer = setTimeout(() => setShowResults(true), 400);
      }
    }, 60);

    return () => {
      clearInterval(typing);
      if (revealTimer) clearTimeout(revealTimer);
    };
  }, []);

  return (
    <section
      id="home"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }}
      className="relative flex min-h-screen flex-col items-center justify-between gap-10 overflow-hidden px-4 pb-8 pt-28 selection:bg-blue-500/30"
    >
      <HeroBackground mouseX={mouseX} mouseY={mouseY} />

      {/* TOP: Dynamic Island. Hover or tap to expand */}
      <div className="relative z-10 flex w-full justify-center">
        <motion.div
          onMouseEnter={() => setIslandOpen(true)}
          onMouseLeave={() => setIslandOpen(false)}
          onClick={() => setIslandOpen((open) => !open)}
          className="relative cursor-pointer overflow-hidden bg-black text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.5)]"
          style={{ borderRadius: 36 }}
          initial={{ width: 120, height: 40, opacity: 0, y: -10 }}
          animate={{
            width: islandOpen ? 300 : 120,
            height: islandOpen ? 96 : 40,
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
            mass: 0.8,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {islandOpen ? (
              <motion.div
                key="open"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.2 }}
                className="flex h-full w-full items-center gap-3 px-4"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{name}</span>
                  <span className="flex items-center gap-1.5 text-xs text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Available for work
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="flex h-full w-full items-center justify-center gap-2"
              >
                <div className="relative h-6 w-6 overflow-hidden rounded-full ring-1 ring-white/20">
                  <Image
                    src={photo}
                    alt=""
                    fill
                    sizes="24px"
                    className="object-cover object-top"
                  />
                </div>
                <span className="text-sm font-semibold tracking-wide">
                  {time ?? "--:--"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* CENTER: Spotlight search with the results window */}
      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 shadow-2xl backdrop-blur-2xl sm:px-6 sm:py-5"
        >
          <Search className="h-6 w-6 shrink-0 text-white/50 sm:h-7 sm:w-7" />
          <div className="min-w-0 flex-1 truncate text-xl font-light tracking-wide text-white sm:text-3xl">
            {query}
            {!showResults && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 inline-block h-6 w-0.5 bg-blue-500 align-middle sm:h-8"
              />
            )}
          </div>
          <div className="hidden shrink-0 items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/40 sm:flex">
            <Command size={12} /> Space
          </div>
        </motion.div>

        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#1c1c1e]/60 shadow-2xl backdrop-blur-xl"
            >
              {/* macOS window header */}
              <div className="flex h-10 items-center border-b border-white/10 bg-white/5 px-4">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-auto pr-10 text-xs font-medium text-white/40">
                  Results for &ldquo;{name}&rdquo;
                </div>
              </div>

              <motion.div
                variants={stackContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-3 p-4"
              >
                {/* Card 1: you, with your photo */}
                <motion.div
                  variants={stackItem}
                  className="flex flex-col items-center gap-5 rounded-xl bg-white/10 p-5 text-center shadow-sm backdrop-blur-md sm:flex-row sm:text-left"
                >
                  <motion.div
                    whileHover={{ rotate: -5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[32px] ring-1 ring-white/25 shadow-[0_0_50px_rgba(10,132,255,0.35)]"
                  >
                    <Image
                      src={photo}
                      alt={name}
                      fill
                      priority
                      sizes="112px"
                      className="object-cover object-top"
                    />
                  </motion.div>

                  <div className="min-w-0">
                    <div className="flex items-center justify-center gap-2 sm:justify-start">
                      <User size={16} className="text-blue-400" />
                      <span className="text-sm font-medium text-blue-300">
                        Full-Stack Developer
                      </span>
                    </div>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {name}
                    </h1>
                    <p className="mt-2 text-sm text-white/70">
                      I build fast, modern web apps, from the database to the
                      interface. Welcome to my digital workspace.
                    </p>

                    {/* iOS glass buttons */}
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="button"
                          onClick={downloadResume}
                          className={`${glassBlue} w-full whitespace-nowrap`}
                        >
                          <GlassShine />
                          <span className="relative z-10 flex items-center gap-2">
                            <Download size={16} />
                            Download Resume
                          </span>
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <HeroButton
                          variant="primary"
                          onPress={() => scrollTo("projects")}
                          className={`${glassClear} w-full bg-white/15! text-white!`}
                        >
                          <GlassShine />
                          <span className="relative z-10">
                            View my projects
                          </span>
                        </HeroButton>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2: skills */}
                <motion.div
                  variants={stackItem}
                  className="flex gap-4 rounded-xl bg-white/10 p-4 shadow-sm backdrop-blur-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                    <Terminal size={20} />
                  </div>
                  <div className="w-full">
                    <h2 className="mb-2 text-sm font-semibold text-white">
                      Top Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {tech.map((item) => (
                        <span
                          key={item}
                          className="rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM: swipe hint and macOS Dock */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={() => scrollTo("projects")}
          className="flex flex-col items-center gap-1"
        >
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronUp size={20} className="text-white/60" />
          </motion.span>
          <span className="text-xs font-medium uppercase tracking-widest text-white/50">
            Swipe up to unlock
          </span>
        </motion.button>

        <div className="flex items-end gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 shadow-2xl backdrop-blur-xl">
          <DockItem
            label="Projects"
            gradient="from-blue-400 to-blue-600"
            onClick={() => scrollTo("projects")}
          >
            <Folder size={24} className="fill-blue-200" />
          </DockItem>

          <DockItem
            label="Contact"
            gradient="from-teal-400 to-emerald-500"
            onClick={() => scrollTo("contact")}
          >
            <Mail size={24} />
          </DockItem>

          <div className="mx-1 h-10 w-px self-center bg-white/20" />

          <DockItem
            label="Download Resume"
            gradient="from-red-400 to-red-600"
            href={resumeFile}
          >
            <FileText size={24} />
          </DockItem>
        </div>
      </div>
    </section>
  );
}
