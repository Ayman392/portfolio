"use client";

import { motion, useScroll, useTransform } from "framer-motion";

// Each ribbon has two shapes ("from" and "to").
// The paths have the same structure, so framer-motion can smoothly morph one into the other
const ribbons = [
  {
    from: "M0,160 C260,40 520,300 820,170 C1060,70 1280,200 1440,120 L1440,300 C1280,380 1060,250 820,350 C520,470 260,220 0,330 Z",
    to: "M0,220 C260,330 520,90 820,230 C1060,340 1280,130 1440,230 L1440,390 C1280,260 1060,440 820,300 C520,160 260,420 0,280 Z",
    fill: "url(#ribbon-blue)",
    opacity: 0.55,
    duration: 18,
  },
  {
    from: "M0,430 C240,330 500,560 800,440 C1080,330 1300,500 1440,410 L1440,590 C1300,680 1080,500 800,620 C500,740 240,520 0,610 Z",
    to: "M0,380 C240,520 500,330 800,480 C1080,600 1300,360 1440,470 L1440,640 C1300,520 1080,740 800,580 C500,430 240,700 0,560 Z",
    fill: "url(#ribbon-pink)",
    opacity: 0.5,
    duration: 24,
  },
  {
    from: "M0,690 C260,590 540,810 840,690 C1100,590 1300,750 1440,670 L1440,860 C1300,940 1100,780 840,900 C540,1000 260,780 0,880 Z",
    to: "M0,740 C260,860 540,640 840,760 C1100,880 1300,620 1440,740 L1440,920 C1300,780 1100,1000 840,860 C540,720 260,960 0,840 Z",
    fill: "url(#ribbon-orange)",
    opacity: 0.45,
    duration: 30,
  },
];

export default function AnimatedBackground() {
  // 0 at the top of the page, 1 at the bottom
  const { scrollYProgress } = useScroll();

  // The ribbons slide up a little as you scroll
  const shift = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05060a]">
      {/* Taller than the screen, so the slide never shows an edge */}
      <motion.div
        className="absolute inset-x-0 -top-20 -bottom-20"
        style={{ y: shift }}
      >
        <svg
          className="h-full w-full blur-xl"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            {/* Blue to indigo */}
            <linearGradient id="ribbon-blue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0A84FF" />
              <stop offset="100%" stopColor="#5E5CE6" />
            </linearGradient>
            {/* Purple to pink */}
            <linearGradient id="ribbon-pink" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#BF5AF2" />
              <stop offset="100%" stopColor="#FF375F" />
            </linearGradient>
            {/* Orange to pink */}
            <linearGradient id="ribbon-orange" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF9F0A" />
              <stop offset="100%" stopColor="#FF375F" />
            </linearGradient>
          </defs>

          {ribbons.map((ribbon) => (
            <motion.path
              key={ribbon.fill}
              fill={ribbon.fill}
              fillOpacity={ribbon.opacity}
              initial={{ d: ribbon.from }}
              animate={{ d: [ribbon.from, ribbon.to, ribbon.from] }}
              transition={{
                duration: ribbon.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Dark layer so the text stays easy to read */}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
