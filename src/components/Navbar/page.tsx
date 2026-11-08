"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Start with "/" so the links also work from the project detail pages
const links = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Skills", href: "/#skills" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Which link the mouse is on (null when it is on none)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const pathname = usePathname();

  // On the home page, jump to the top instead of doing nothing
  function handleLogoClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return; // on other pages the link goes home as normal

    event.preventDefault();

    const startY = window.scrollY;
    if (startY === 0) return;

    const duration = 700; // milliseconds
    const startTime = performance.now();

    // Starts fast, then eases to a stop
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    function step(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo({
        top: startY * (1 - easeOutCubic(progress)),
        behavior: "instant",
      });
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  return (
    <motion.nav
      className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Full width on mobile, exactly 704px on desktop */}
      <div className="w-[calc(100vw-2rem)] rounded-[24px] border border-white/20 bg-black/30 shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-[28px] backdrop-saturate-150 md:w-[704px]">
        <header className="flex h-[50px] items-center justify-between pr-[9px] pl-[10px]">
          {/* Logo: goes to the top of the home page from anywhere */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5"
          >
            {/* Tile with a thin blue-to-orange edge */}
            <div className="rounded-lg bg-gradient-to-br from-blue-500 via-neutral-700 to-orange-500 p-px"></div>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Ayman Nasir Uddin
            </span>
          </Link>

          {/* Links (hidden on mobile) */}
          <ul
            className="hidden items-center gap-1 md:flex"
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
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Link
                  href={link.href}
                  className="relative block px-3 py-1.5 text-sm font-medium tracking-tight text-white/55 transition hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Button + mobile menu button */}
          <div className="flex items-center gap-2">
            <button
              className="rounded-lg p-2 text-white/80 md:hidden"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </header>

        {/* Mobile menu (slides in from the right) */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Ayman Nasir Uddin</SheetTitle>
            </SheetHeader>

            <ul className="flex flex-col gap-6 px-4">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-2xl font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
