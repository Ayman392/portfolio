import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Ayman392" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aymannasir1/" },
];

// Shared pill style for every link, like iOS glass buttons
const pill =
  "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.07] px-4 py-1.5 text-sm text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition duration-300 hover:border-white/25 hover:bg-white/15 hover:text-white active:scale-95";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-6 pb-10">
      <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-b from-white/[0.12] to-white/[0.04] px-6 py-8 shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(255,255,255,0.05)] backdrop-blur-3xl backdrop-saturate-150 md:px-8">
        {/* Soft light reflection across the top, like real glass */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-3/4 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Name and tagline */}
          <div className="max-w-xs">
            <Link
              href="/#home"
              className="text-lg font-semibold tracking-tight text-white"
            >
              Ayman Nasir Uddin
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Full-Stack Developer building fast, modern web apps from the
              database to the interface.
            </p>
          </div>

          {/* Page links */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-2 md:max-w-[220px]"
          >
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className={pill}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex flex-wrap gap-2 md:flex-col md:items-start">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={pill}
              >
                {link.label} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="relative mt-8 border-t border-white/10 pt-6 text-xs text-white/40">
          © 2026 Ayman Nasir Uddin. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
