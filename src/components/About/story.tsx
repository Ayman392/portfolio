"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code, Heart, Rocket, Smile } from "lucide-react";

// Edit the text here. Each tab has a title, paragraphs, and optional chips
const tabs = [
  {
    id: "journey",
    label: "Journey",
    icon: <Rocket size={14} />,
    title: "My programming journey",
    paragraphs: [
      "It all started with curiosity. I wanted to know how websites are made, so I tried building one myself: a landing page with nothing but raw HTML and CSS. It was simple, but seeing it work in the browser got me hooked.",
      "Since then I've picked up JavaScript, TypeScript, React and Next.js, and now I'm going deep on the full stack, including Express.js and MongoDB. I learn by practicing a lot and using AI as my study partner, and I care about really understanding how things work, not just copying code.",
    ],
    chips: undefined,
  },
  {
    id: "enjoy",
    label: "What I enjoy",
    icon: <Code size={14} />,
    title: "The work I enjoy",
    paragraphs: [
      "My favorite part is designing the interface and adding the animations that make a page feel alive. I use AI to speed up the design side, and I genuinely enjoy the detective work of hunting down and fixing bugs.",
      "Looking ahead, I want to work on complex, production-level projects that actually help businesses, the kind of apps that real people and real companies rely on every day.",
    ],
    chips: undefined,
  },
  {
    id: "beyond",
    label: "Beyond code",
    icon: <Heart size={14} />,
    title: "Outside programming",
    paragraphs: [
      "Away from the keyboard, you'll usually find me gaming, listening to music or watching movies. I love football, and hanging out with friends is always on the list.",
    ],
    chips: [
      "🎮 Gaming",
      "🎵 Music",
      "🎬 Movies",
      "⚽ Football",
      "🤝 Hanging out",
    ],
  },
  {
    id: "personality",
    label: "Personality",
    icon: <Smile size={14} />,
    title: "A bit about me",
    paragraphs: [
      'My friends would describe me as calm, a natural leader, and curious. I stay cool when things break, I like taking the lead and helping a team move forward, and I\'m always asking "how does this work?"',
    ],
    chips: ["😌 Calm", "🧭 Leader", "🔍 Curious"],
  },
];

export default function StoryTabs() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
        My story
      </h3>
      <p className="mt-2 text-white/60">The longer version.</p>

      {/* Tabs, like an iOS segmented control */}
      <div className="mt-6 max-w-full overflow-x-auto">
        <div className="inline-flex gap-1 rounded-full border border-white/10 bg-black/20 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveId(tab.id)}
              className="relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium"
            >
              {/* The glass pill that slides to the chosen tab */}
              {activeId === tab.id && (
                <motion.span
                  layoutId="story-pill"
                  className="absolute inset-0 rounded-full bg-white/15"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative flex items-center gap-2 transition-colors ${
                  activeId === tab.id
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Text card: the text fades when you change tabs */}
      <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h4 className="text-xl font-semibold tracking-tight text-white">
              {active.title}
            </h4>
            <div className="mt-4 space-y-4 leading-relaxed text-white/60">
              {active.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>

            {/* Chips pop in one after another (only on tabs that have them) */}
            {active.chips && (
              <div className="mt-6 flex flex-wrap gap-2">
                {active.chips.map((chip, index) => (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: 0.1 + index * 0.06,
                    }}
                    className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80"
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
