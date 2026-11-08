"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

// Fixed particle layout (no Math.random, so the server and browser always match)
const particles = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 17) % 100,
  size: 2 + (i % 3),
  rise: 80 + (i % 4) * 40,
  duration: 7 + (i % 5) * 1.6,
  delay: (i % 7) * 0.7,
  color: ["bg-sky-300", "bg-orange-300", "bg-white", "bg-fuchsia-300"][i % 4],
}));

// Page-wide effects: drifting grid, rising particles, and a glow that follows the mouse.
// It is fixed to the screen, so it stays behind every section while you scroll.
export default function PageEffects() {
  const reduceMotion = useReducedMotion();

  // Mouse position on the screen
  const mouseX = useMotionValue(400);
  const mouseY = useMotionValue(300);

  // Springs make the glow trail the cursor smoothly
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    function handleMove(event: PointerEvent) {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mouseX, mouseY]);

  const gridMask =
    "radial-gradient(ellipse at center, black 30%, transparent 85%)";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
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
