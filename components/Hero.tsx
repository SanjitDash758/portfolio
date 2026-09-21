"use client";
import { motion } from "framer-motion";
import { profile } from "@/lib/content";
import { Github, Linkedin, Twitter } from "./BrandIcons";

import HeroFlow from "./HeroFlow";

const socialIcons = [
  { href: profile.socials.github, Icon: Github, label: "GitHub" },
  { href: profile.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { href: profile.socials.x, Icon: Twitter, label: "X" },
];

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-20 pb-12">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        {/* LEFT — intro */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs text-muted">
            <span className="text-accent">$</span> whoami
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            {profile.name}
          </h1>
          <div className="mt-2 text-sm text-accent">{profile.role}</div>
          <div className="mt-1 text-xs text-muted">
            {profile.stack.join("  •  ")}
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-fg/80">
            {profile.thesis}
          </p>

          <div className="mt-8 flex items-center gap-3">
            {socialIcons.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={label}
                className="rounded-md border border-border bg-panel p-2 text-muted transition-colors hover:border-accent/40 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — animated flow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative h-[520px]"
        >
          <HeroFlow />
        </motion.div>
      </div>
    </section>
  );
}
