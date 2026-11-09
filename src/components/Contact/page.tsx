"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import { stagger, viewport } from "@/lib/motion";

// Paste your free key from web3forms.com here
const ACCESS_KEY = (process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "").trim();

const email = "ayman1nasir@gmail.com";

// The GitHub logo (the icon library has no brand logos, so it is drawn here)
function GithubIcon({ size = 20 }: { size?: number }) {
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

// The four tiles. Change or remove any of them
const links = [
  {
    label: "Email",
    value: email,
    href: `mailto:${email}`,
    icon: <Mail size={20} />,
    color: "from-sky-500 to-blue-600",
  },
  {
    label: "Phone",
    value: "+880 1760-977865",
    href: "tel:+8801760977865",
    icon: <Phone size={20} />,
    color: "from-green-500 to-emerald-600",
  },
  {
    label: "GitHub",
    value: "Ayman392",
    href: "https://github.com/Ayman392",
    icon: <GithubIcon />,
    color: "from-neutral-500 to-neutral-700",
  },
  {
    label: "LinkedIn",
    value: "aymannasir1",
    href: "https://www.linkedin.com/in/aymannasir1/",
    icon: "in",
    color: "from-blue-600 to-sky-700",
  },
];

// The frosted glass look (the corner radius is set where it is used)
const glass =
  "border border-white/15 bg-white/[0.06] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_20px_60px_rgba(0,0,0,0.35)]";

// Style shared by the form inputs
const inputStyle =
  "w-full bg-transparent text-white placeholder:text-white/30 outline-none";

// A springy feel for hovers and presses
const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

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

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [copied, setCopied] = useState(false);

  // Copy the email address
  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Send the form to Web3Forms
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const result = await response.json();

      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative isolate overflow-hidden">
      {/* Glows behind the glass, drifting slowly */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-[8%] top-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/30 blur-[140px]"
          animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-[5%] h-[500px] w-[500px] rounded-full bg-orange-500/25 blur-[140px]"
          animate={{ x: [0, -60, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-28">
        <h2 className="bg-gradient-to-b from-white to-white/50 bg-clip-text pb-2 text-4xl font-bold tracking-tighter text-transparent md:text-6xl">
          Let&apos;s talk
        </h2>
        <p className="mt-3 text-white/60">
          Have a project or an opportunity in mind? Send me a message.
        </p>

        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-12 grid gap-6 md:grid-cols-5"
        >
          {/* Left: contact tiles, like iOS Control Center */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {links.map((link) => (
                <motion.div key={link.label} variants={popIn}>
                  <motion.a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.96 }}
                    transition={spring}
                    className={`${glass} group relative flex h-full min-h-[150px] flex-col justify-between gap-6 rounded-[28px] p-5`}
                  >
                    {/* Colored squircle with the icon */}
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-br ${link.color} text-base font-semibold text-white shadow-lg`}
                    >
                      {link.icon}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-xs text-white/40">
                        {link.label}
                      </span>
                      <span className="block truncate text-sm font-medium text-white">
                        {link.value}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={16}
                      className="absolute right-4 top-4 text-white/30 transition group-hover:text-white/70"
                    />
                  </motion.a>
                </motion.div>
              ))}
            </div>

            {/* Copy email pill */}
            <motion.div variants={popIn}>
              <motion.button
                type="button"
                onClick={copyEmail}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
                className={`${glass} flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-sky-400`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy email address"}
              </motion.button>
            </motion.div>
          </div>

          {/* Right: message sheet, like iOS Mail */}
          <motion.div variants={popIn} className="md:col-span-3">
            <div
              className={`${glass} relative overflow-hidden rounded-[32px] p-6 md:p-8`}
            >
              {/* Soft light across the top of the glass */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/10 to-transparent" />

              <div className="relative">
                {/* Grabber handle and title */}
                <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-white/20" />
                <p className="text-center font-semibold text-white">
                  New message
                </p>
                <p className="mb-6 mt-1 text-center text-xs text-white/40">
                  To: Ayman Nasir Uddin
                </p>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center py-10 text-center"
                    >
                      {/* Green check that springs in */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 15,
                          delay: 0.1,
                        }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-emerald-600/40"
                      >
                        <Check
                          size={36}
                          strokeWidth={3}
                          className="text-white"
                        />
                      </motion.div>
                      <h3 className="mt-6 text-xl font-semibold text-white">
                        Message sent
                      </h3>
                      <p className="mt-2 text-sm text-white/60">
                        Thank you, I&apos;ll reply soon.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-6 text-sm font-semibold text-sky-400 transition hover:text-sky-300"
                      >
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Fields in one grouped list, like iOS Settings */}
                      <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                        <label className="flex items-center gap-4 px-4 py-3.5 transition-colors focus-within:bg-white/5">
                          <span className="w-14 shrink-0 text-sm text-white/40">
                            Name
                          </span>
                          <input
                            name="name"
                            type="text"
                            required
                            placeholder="Your name"
                            className={inputStyle}
                          />
                        </label>

                        <label className="flex items-center gap-4 px-4 py-3.5 transition-colors focus-within:bg-white/5">
                          <span className="w-14 shrink-0 text-sm text-white/40">
                            Email
                          </span>
                          <input
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            className={inputStyle}
                          />
                        </label>

                        <textarea
                          name="message"
                          required
                          rows={6}
                          placeholder="Write your message..."
                          className={`${inputStyle} block resize-none px-4 py-3.5 transition-colors focus:bg-white/5`}
                        />
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-4">
                        {/* Error message, or empty space */}
                        {status === "error" ? (
                          <motion.p
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-sm text-rose-400"
                          >
                            Something went wrong. Try again or email me
                            directly.
                          </motion.p>
                        ) : (
                          <span />
                        )}

                        {/* Blue send button, like iMessage */}
                        <motion.button
                          type="submit"
                          disabled={status === "sending"}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.92 }}
                          transition={spring}
                          className="flex h-12 shrink-0 items-center gap-2 rounded-full bg-gradient-to-b from-sky-400 to-blue-600 pl-6 pr-4 font-semibold text-white shadow-lg shadow-blue-600/40 disabled:opacity-70"
                        >
                          {status === "sending" ? "Sending" : "Send"}
                          {status === "sending" ? (
                            <motion.span
                              className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                ease: "linear",
                              }}
                            />
                          ) : (
                            <ArrowUp size={20} strokeWidth={2.5} />
                          )}
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
