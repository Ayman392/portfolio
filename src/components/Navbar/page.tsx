"use client";

import { useState } from "react";
import { AlignLeft, FileText, Menu } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

// Change these to match your own sections
const links = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

// The iOS-style blue Resume button
// "className" sets the size, so the same button works in the bar and in the menu
function ResumeButton({
  onClick,
  className = "",
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-sky-400 to-blue-600 font-semibold text-white shadow-md shadow-blue-600/30 ${className}`}
    >
      <FileText size={14} />
      Resume
    </motion.button>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Which link the mouse is on (null when it is on none)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Open the resume PDF in a new tab
  function openResume() {
    window.open("/Assets/Ayman_Nasir_Uddin_Resume.pdf", "_blank");
    setMenuOpen(false);
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
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            {/* Tile with a thin blue-to-orange edge */}
            <div className="rounded-lg bg-gradient-to-br from-blue-500 via-neutral-700 to-orange-500 p-px">
              <div className="flex h-[28px] w-[28px] items-center justify-center rounded-[7px] bg-neutral-950">
                <AlignLeft size={16} strokeWidth={2.5} className="text-white" />
              </div>
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Ayman Nasir Uddin
            </span>
          </a>

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
                <a
                  href={link.href}
                  className="relative block px-3 py-1.5 text-sm font-medium tracking-tight text-white/55 transition hover:text-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Button + mobile menu button */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ResumeButton
                onClick={openResume}
                className="h-[34px] px-4 text-[13px]"
              />
            </div>

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
                  <a
                    href={link.href}
                    className="text-2xl font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Button pushed to the bottom of the drawer */}
            <div className="mt-auto px-4 pb-6">
              <ResumeButton
                onClick={openResume}
                className="h-11 w-full text-sm"
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
