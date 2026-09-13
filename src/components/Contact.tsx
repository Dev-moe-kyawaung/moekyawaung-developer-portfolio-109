import { useState } from "react";
import { profile } from "../data";
import SectionTitle from "./SectionTitle";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const rows = [
    { icon: "◈", label: "github.com/Dev-moe-kyawaung", href: profile.github },
    { icon: "◉", label: "gravatar.com/moekyawaung2026", href: profile.gravatar },
  ];

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          index="06"
          title="OPEN AN UPLINK"
          subtitle="Available for senior front-end, PWA and product engineering work. Response window: under 24 hours."
          accent="cyan"
        />

        <div className="reveal mt-12 grid gap-6 lg:grid-cols-2">
          <div className="relative glass overflow-hidden p-7">
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-500/12 blur-3xl" />
            <div className="relative flex items-center gap-4">
              <div className="relative shrink-0">
                <span className="absolute -inset-1.5 rounded-full border border-dashed border-cyan-300/40 animate-spin-slow" />
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-16 w-16 rounded-full border border-cyan-300/50 object-cover shadow-[0_0_30px_rgba(34,231,255,.35)]"
                />
              </div>
              <div>
                <h3 className="font-display text-lg font-black chrome-text">{profile.name}</h3>
                <p className="font-code text-[9.5px] tracking-[0.2em] text-cyan-300/70">{profile.role}</p>
                <p className="font-code text-[9.5px] tracking-[0.16em] text-fuchsia-300/60">{profile.handle}</p>
              </div>
            </div>

            <div className="relative mt-6 space-y-2">
              {profile.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="group flex items-center justify-between border border-white/8 bg-white/[.015] px-4 py-3 font-code text-[11px] text-cyan-100/65 transition-all hover:border-cyan-300/50 hover:text-white"
                >
                  <span>☏ {p}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              ))}
              {rows.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between border border-white/8 bg-white/[.015] px-4 py-3 font-code text-[11px] text-cyan-100/65 transition-all hover:border-cyan-300/50 hover:text-white"
                >
                  <span className="truncate">
                    {r.icon} {r.label}
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">↗</span>
                </a>
              ))}
            </div>

            <div className="relative mt-6 grid grid-cols-3 gap-2">
              {[
                ["24H", "RESPONSE"],
                ["REMOTE", "WORLDWIDE"],
                ["EN / MY", "LANGUAGES"],
              ].map(([a, b]) => (
                <div key={b} className="border border-white/8 px-2 py-3 text-center">
                  <div className="font-display text-[11px] font-bold text-cyan-100">{a}</div>
                  <div className="mt-1 font-code text-[7.5px] tracking-[0.2em] text-cyan-100/35">{b}</div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              e.currentTarget.reset();
              setTimeout(() => setSent(false), 3200);
            }}
            className="glass border-orange-400/20 p-7 space-y-3"
          >
            <div className="font-display text-[9px] tracking-[0.3em] text-orange-300/80">TRANSMISSION FORM</div>
            {[
              { n: "name", p: "CALLSIGN / NAME", t: "text" },
              { n: "email", p: "RETURN FREQUENCY / EMAIL", t: "email" },
            ].map((f) => (
              <input
                key={f.n}
                required
                type={f.t}
                name={f.n}
                placeholder={f.p}
                className="w-full border border-orange-400/20 bg-[#060d16] px-3.5 py-3 font-code text-[10.5px] tracking-wider text-orange-50 outline-none transition-colors placeholder:text-orange-100/25 focus:border-orange-300/70"
              />
            ))}
            <textarea
              required
              name="msg"
              rows={6}
              placeholder="PAYLOAD / PROJECT BRIEF"
              className="w-full resize-none border border-orange-400/20 bg-[#060d16] px-3.5 py-3 font-code text-[10.5px] tracking-wider text-orange-50 outline-none transition-colors placeholder:text-orange-100/25 focus:border-orange-300/70"
            />
            <button
              className={`w-full py-3.5 font-display text-[9px] font-bold tracking-[0.3em] transition-all ${
                sent
                  ? "bg-emerald-300 text-[#03200f]"
                  : "bg-gradient-to-r from-amber-200 via-orange-400 to-pink-500 text-[#0a0604] hover:brightness-125 shadow-[0_0_34px_rgba(255,90,31,.4)]"
              }`}
            >
              {sent ? "SIGNAL TRANSMITTED ✓" : "TRANSMIT"}
            </button>
          </form>
        </div>
      </div>

      <footer className="mt-20 border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 font-code text-[8.5px] tracking-[0.24em] text-cyan-100/30 sm:flex-row">
          <span>© {new Date().getFullYear()} MOE KYAW AUNG · ALL SYSTEMS NOMINAL</span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
            QUANTUM · BLUEPRINT · REACTOR — PREMIUM BUILD v4.0
          </span>
        </div>
      </footer>
    </section>
  );
}
