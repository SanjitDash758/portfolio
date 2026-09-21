"use client";
import { motion } from "framer-motion";
import { profile } from "@/lib/content";
import { Github, Linkedin, Twitter } from "./BrandIcons";
import { Mail, ExternalLink, ArrowUp } from "lucide-react";

const links = [
  { label: "GitHub", href: profile.socials.github, Icon: Github },
  { label: "LinkedIn", href: profile.socials.linkedin, Icon: Linkedin },
  { label: "X", href: profile.socials.x, Icon: Twitter },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      {/* Section heading */}
      <div className="mb-10">
        <div className="text-xs text-muted">
          <span className="text-accent">$</span> contact --now
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
          Have a problem worth solving?
        </h2>
        <p className="mt-2 max-w-xl text-sm text-fg/70">
          Backend systems, automation, or agentic software — if you're building
          something interesting, I'd like to hear about it.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* LEFT — primary email panel */}
        <motion.a
          href={`mailto:${profile.email}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/60 bg-panel/40 p-8 backdrop-blur-sm transition-colors hover:border-accent/40"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />

          <div className="relative">
            <div className="text-[10px] tracking-widest text-muted">
              START A CONVERSATION
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-accent">$</span>
              <span className="font-mono text-xl text-fg md:text-2xl">
                {profile.email}
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-fg/70">
              The fastest way to reach me. I usually reply within a day.
            </p>
          </div>

          <div className="relative mt-8 inline-flex items-center gap-2 text-xs text-accent">
            Send an email
            <ExternalLink
              size={12}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </motion.a>

        {/* RIGHT — three stacked link cards */}
        <div className="grid grid-cols-1 gap-3">
          {links.map(({ label, href, Icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: 0.05 + i * 0.05 }}
              className="group flex flex-1 items-center justify-between rounded-xl border border-border/60 bg-panel/40 px-5 py-4 backdrop-blur-sm transition-colors hover:border-accent/40"
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={16}
                  className="text-muted transition-colors group-hover:text-accent"
                />
                <span className="text-sm text-fg/80 group-hover:text-fg">
                  {label}
                </span>
              </div>
              <ExternalLink
                size={12}
                className="text-muted opacity-0 transition-opacity group-hover:opacity-100"
              />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-border/60 pt-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-accent">$</span>
            <span className="text-fg/80">{profile.name}</span>
            <span className="text-muted">· {profile.role}</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-muted">
            <span>© {new Date().getFullYear()}</span>
            {/* <span className="text-border">/</span>
            <span>{profile.stack.slice(0, 3).join(" · ")}</span> */}
            <span className="text-border">/</span>
            <a
              href="#top"
              className="inline-flex items-center gap-1 transition-colors hover:text-accent"
            >
              Back to top
              <ArrowUp size={10} />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
