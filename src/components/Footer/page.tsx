"use client";

import { useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { AlignLeft, ArrowUp, Mail } from "lucide-react";
import { viewport } from "@/lib/motion";

// The GitHub logo (the icon library has no brand logos, so it is drawn here)
function GithubIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

// Same sections as the navbar
const links = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

// The three round-cornered "app icons" on the right
const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Ayman392",
    icon: <GithubIcon />,
    color: "from-neutral-500 to-neutral-700",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aymannasir1/",
    icon: <span className="text-base font-bold">in</span>,
    color: "from-blue-600 to-sky-700",
  },
  {
    label: "Email",
    href: "mailto:ayman1nasir@gmail.com",
    icon: <Mail size={22} />,
    color: "from-sky-500 to-blue-600",
  },
];

// The frosted glass look (the corner radius is set where it is used)
const glass =
  "border border-white/15 bg-white/[0.06] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_20px_60px_rgba(0,0,0,0.35)]";

// A springy feel for hovers and presses
const spring = { type: "spring" as const, stiffness: 300, damping: 15 };

export default function Footer() {
  // The current year, read in the browser only
  // While the page is being prepared, the server uses 2026
  const year = useSyncExternalStore(
    () => () => {}, // nothing to watch, the year doesn't change while the page is open
    () => new Date().getFullYear(), // the value in the browser
    () => 2026, // the value on the server
  );

  // Which link the mouse is on (null when it is on none)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Scroll back to the very top of the page
  function backToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative z-10 mx-auto max-w-5xl px-6 pb-10 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`${glass} relative overflow-hidden rounded-[32px] p-6 md:p-8`}
      >
        {/* Soft light across the top of the glass */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />

        <div className="relative">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            {/* Left: logo and name */}
            <div className="flex items-center gap-3">
              <div className="rounded-[14px] bg-gradient-to-br from-blue-500 via-neutral-700 to-orange-500 p-px">
                <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-neutral-950">
                  <AlignLeft
                    size={20}
                    strokeWidth={2.5}
                    className="text-white"
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold tracking-tight text-white">
                  Ayman Nasir Uddin
                </p>
                <p className="text-sm text-white/50">Full-Stack Developer</p>
              </div>
            </div>

            {/* Middle: links in a pill, with the same sliding highlight as the navbar */}
            <nav>
              <ul
                className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-black/20 p-1"
                onMouseLeave={() => setHoveredLink(null)}
              >
                {links.map((link) => (
                  <li
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setHoveredLink(link.name)}
                  >
                    {/* The glass pill that slides between links */}
                    {hoveredLink === link.name && (
                      <motion.span
                        layoutId="footer-pill"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <a
                      href={link.href}
                      className="relative block rounded-full px-4 py-1.5 text-sm font-medium text-white/60 transition hover:text-white"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right: app-icon style social links */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -6, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={spring}
                  className={`flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br ${social.color} text-white shadow-lg`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Ayman Nasir Uddin. All rights reserved.</p>
            <p>Built with Next.js, Tailwind CSS and Framer Motion</p>

            <motion.button
              type="button"
              onClick={backToTop}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              transition={spring}
              className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 font-semibold text-sky-400 hover:bg-white/20"
            >
              Back to top
              <ArrowUp size={14} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
