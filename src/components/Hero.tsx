import { useEffect, useState } from "react";
import { profile } from "../data";
import { useCountUp, useMagnetic } from "../hooks/premium";

const roles = [
  "SENIOR FULL-STACK ENGINEER",
  "PWA / OFFLINE-FIRST ARCHITECT",
  "POS SYSTEMS BUILDER",
  "UI MOTION ENGINEER",
];

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, val } = useCountUp(value);
  return (
    <div className="relative bg-[#050a12]/70 px-3 py-5 text-center corner-frame text-cyan-400/40">
      <div className="font-display text-2xl sm:text-3xl font-black chrome-text tabular-nums">
        <span ref={ref}>{val}</span>
        {suffix}
      </div>
      <div className="mt-1.5 font-code text-[8px] tracking-[0.26em] text-cyan-100/40">{label}</div>
    </div>
  );
}

export default function Hero() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const cta = useMagnetic(0.25);

  useEffect(() => {
    const full = roles[idx % roles.length];
    let i = 0;
    let del = false;
    const int = setInterval(() => {
      if (!del) {
        i++;
        setText(full.slice(0, i));
        if (i === full.length) setTimeout(() => (del = true), 1100);
      } else {
        i -= 2;
        setText(full.slice(0, Math.max(0, i)));
        if (i <= 0) {
          clearInterval(int);
          setIdx((v) => v + 1);
        }
      }
    }, 48);
    return () => clearInterval(int);
  }, [idx]);

  return (
    <section id="core" className="relative min-h-screen flex items-center pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-[1.12fr_.88fr] gap-16 items-center w-full">
        <div>
          <div className="inline-flex items-center gap-2.5 glass px-3.5 py-1.5 font-code text-[9px] tracking-[0.28em] text-cyan-200">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            AVAILABLE FOR SENIOR ENGAGEMENTS · YANGON / REMOTE
          </div>

          <h1 className="mt-7 font-display font-black leading-[0.88] tracking-tight text-[clamp(2.9rem,8.5vw,6.2rem)]">
            <span className="relative block chrome-text">
              MOE KYAW
              <span className="pointer-events-none absolute inset-0 shimmer bg-clip-text text-transparent select-none">
                MOE KYAW
              </span>
            </span>
            <span className="block plasma-text plasma-glow">AUNG</span>
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-10 hair-line" />
            <div className="font-code text-[11px] sm:text-sm tracking-[0.22em] text-cyan-300 min-h-[1.4em]">
              {text}
              <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyan-300 animate-pulse" />
            </div>
          </div>

          <p className="mt-7 max-w-xl text-[13px] sm:text-sm leading-relaxed text-cyan-100/55">
            {profile.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              ref={cta}
              href="#quantum"
              className="group relative overflow-hidden px-7 py-3.5 font-display text-[10px] tracking-[0.26em] font-bold text-[#03060c] bg-gradient-to-r from-cyan-200 to-cyan-400 transition-transform duration-200 shadow-[0_0_36px_rgba(34,231,255,.45)]"
            >
              <span className="relative z-10">ENTER THE MATRIX</span>
              <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-300 group-hover:translate-y-0" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="relative px-7 py-3.5 font-display text-[10px] tracking-[0.26em] glass glass-hover text-cyan-100 transition-all corner-frame text-cyan-400/50"
            >
              GITHUB ↗
            </a>
            <button
              onClick={() =>
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
              }
              className="flex items-center gap-2 px-4 py-3.5 font-code text-[10px] text-cyan-100/45 hover:text-cyan-100 transition-colors"
            >
              <kbd className="border border-white/15 px-1.5 py-0.5 text-[9px]">⌘K</kbd>
              command deck
            </button>
          </div>

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-cyan-400/12">
            <Stat value={43} suffix="+" label="LIVE DOMAINS" />
            <Stat value={30} suffix="+" label="SHIPPED APPS" />
            <Stat value={20} suffix="+" label="REPOSITORIES" />
            <Stat value={16} suffix="" label="APP MODULES" />
          </dl>
        </div>

        {/* Reactor core */}
        <div className="relative mx-auto w-[290px] h-[290px] sm:w-[400px] sm:h-[400px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/25 via-fuchsia-500/20 to-orange-500/30 animate-heat" />
          <div className="absolute inset-0 rounded-full border border-cyan-300/35 animate-spin-slow">
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_16px_#22e7ff]" />
            <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_14px_#e879f9]" />
          </div>
          <div className="absolute inset-5 rounded-full border border-dashed border-fuchsia-400/35 animate-spin-rev" />
          <div className="absolute inset-11 rounded-full border-2 border-orange-400/25 animate-spin-slow" />
          <span className="absolute inset-9 rounded-full border border-cyan-200/25 animate-[pulse-ring_3.4s_ease-out_infinite]" />
          <span className="absolute inset-9 rounded-full border border-orange-300/25 animate-[pulse-ring_3.4s_ease-out_infinite_1.7s]" />

          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(34,231,255,.5)" strokeWidth=".4" className="flow-line" />
            <circle cx="50" cy="50" r="43" fill="none" stroke="rgba(255,90,31,.35)" strokeWidth=".3" strokeDasharray="2 14" />
          </svg>

          <div className="absolute inset-[23%] rounded-full overflow-hidden border border-cyan-200/40 shadow-[0_0_70px_rgba(34,231,255,.35)] animate-float-y">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-full w-full object-cover contrast-110 saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/25 via-transparent to-fuchsia-500/10 mix-blend-screen" />
            <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan-200/25 to-transparent animate-[scan-y_3.4s_linear_infinite]" />
          </div>

          {["ARCH", "PWA", "UI/UX", "PERF"].map((tag, i) => (
            <div
              key={tag}
              className="absolute left-1/2 top-1/2 font-code text-[8px] tracking-[0.22em] text-cyan-200/80"
              style={{ transform: `rotate(${i * 90}deg) translate(0,-196px) rotate(${-i * 90}deg)` }}
            >
              <span className="glass px-2 py-1">{tag}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-code text-[8px] tracking-[0.3em] text-cyan-100/30">SCROLL</span>
        <span className="h-10 w-px bg-gradient-to-b from-cyan-300/70 to-transparent" />
      </div>
    </section>
  );
}
