import { useState } from "react";
import { projects, extras } from "../data";
import SectionTitle from "./SectionTitle";

function Schematic({ seed, exploded }: { seed: number; exploded: boolean }) {
  const o = exploded ? 1 : 0;
  const tr = "transform .65s cubic-bezier(.2,.8,.2,1)";
  return (
    <svg viewBox="0 0 220 140" className="h-full w-full">
      <g stroke="rgba(147,197,253,.85)" fill="none" strokeWidth=".8" strokeLinecap="round">
        <rect x="60" y="45" width="100" height="55" className="draw-line" />
        <rect x="72" y="30" width="76" height="14" className="draw-line" style={{ transform: `translateY(${-o * 17}px)`, transition: tr }} />
        <rect x="72" y="101" width="76" height="10" className="draw-line" style={{ transform: `translateY(${o * 17}px)`, transition: tr }} />
        <path d="M40 60 h16 v25 h-16 z" className="draw-line" style={{ transform: `translateX(${-o * 20}px)`, transition: tr }} />
        <path d="M164 60 h16 v25 h-16 z" className="draw-line" style={{ transform: `translateX(${o * 20}px)`, transition: tr }} />
        <circle cx="110" cy="72" r="16" className="draw-line" />
        <circle cx="110" cy="72" r="8" className="draw-line" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2 + seed;
          return (
            <line
              key={i}
              x1={110 + Math.cos(a) * 8}
              y1={72 + Math.sin(a) * 8}
              x2={110 + Math.cos(a) * 16}
              y2={72 + Math.sin(a) * 16}
            />
          );
        })}
        <line x1="18" y1="72" x2="40" y2="72" strokeDasharray="3 3" />
        <line x1="180" y1="72" x2="206" y2="72" strokeDasharray="3 3" />
        <line x1="110" y1="12" x2="110" y2="30" strokeDasharray="3 3" />
        {/* dimension line */}
        <g opacity={o} style={{ transition: "opacity .5s" }}>
          <line x1="60" y1="126" x2="160" y2="126" />
          <line x1="60" y1="122" x2="60" y2="130" />
          <line x1="160" y1="122" x2="160" y2="130" />
        </g>
      </g>
      <g className="animate-spin-slow" style={{ transformOrigin: "110px 72px" }} stroke="rgba(34,231,255,.75)" fill="none" strokeWidth=".7">
        <circle cx="110" cy="72" r="25" strokeDasharray="4 9" />
      </g>
      <g fill="rgba(147,197,253,.5)" fontSize="5" fontFamily="JetBrains Mono, monospace">
        <text x="16" y="66">IN</text>
        <text x="198" y="66">OUT</text>
        <text x="100" y="10">CTRL</text>
        <text x="92" y="135" opacity={o}>100.0 mm</text>
        <text x="6" y="136">SCALE 1:{20 + seed * 3}</text>
      </g>
    </svg>
  );
}

export default function BlueprintDeck() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="blueprint" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 grid-blueprint opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#03060c] via-[#04101f]/60 to-[#03060c]" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionTitle
          index="02"
          title="MECHA BLUEPRINT DECK"
          subtitle="Technical modules rendered as engineering schematics. Trigger EXPLODE to separate assemblies and read the internals."
          accent="blue"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.slice(0, 6).map((p, i) => {
            const exploded = open === p.id;
            const x = extras[p.id];
            return (
              <article
                key={p.id}
                style={{ transitionDelay: `${i * 70}ms` }}
                className={`reveal group relative glass p-5 transition-all duration-300 ${
                  exploded ? "border-amber-300/45 shadow-[0_0_50px_-12px_rgba(251,191,36,.35)]" : "hover:border-sky-300/45"
                }`}
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-sky-400/60 via-transparent to-transparent" />
                <header className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-code text-[8px] tracking-[0.26em] text-sky-300/65">
                      MOD-{String(i + 1).padStart(3, "0")} · {p.tag} · {x?.year}
                    </div>
                    <h3 className="mt-1.5 font-display text-[15px] font-bold text-sky-50">{p.name}</h3>
                  </div>
                  <button
                    onClick={() => setOpen(exploded ? null : p.id)}
                    className={`shrink-0 px-3 py-1.5 font-display text-[8px] tracking-[0.2em] border transition-all ${
                      exploded
                        ? "border-amber-300/70 text-amber-200 bg-amber-400/12"
                        : "border-sky-400/35 text-sky-200 hover:bg-sky-400/10"
                    }`}
                  >
                    {exploded ? "COLLAPSE ▚" : "EXPLODE ▚"}
                  </button>
                </header>

                <div className="mt-4 grid grid-cols-[1.05fr_1fr] gap-4 items-center">
                  <div className="relative h-40 border border-sky-400/15 bg-[#02070f] overflow-hidden">
                    <Schematic seed={i} exploded={exploded} />
                    <span className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-sky-300/12 to-transparent opacity-0 group-hover:opacity-100 animate-[scan-y_3s_linear_infinite]" />
                  </div>
                  <div>
                    <p className="text-[11px] leading-relaxed text-sky-100/50">{p.desc}</p>
                    <ul className="mt-3 space-y-1.5">
                      {p.modules.map((m, j) => (
                        <li
                          key={m}
                          className="flex items-center gap-2 font-code text-[9px] tracking-wider text-sky-200/70 transition-all duration-500"
                          style={{
                            transform: exploded ? `translateX(${j * 7}px)` : "none",
                            opacity: exploded ? 1 : 0.55,
                            transitionDelay: `${j * 60}ms`,
                          }}
                        >
                          <span className="h-px w-4 bg-sky-400/60" />
                          {m.toUpperCase()}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block font-code text-[8.5px] tracking-[0.2em] text-sky-300 hover:text-white border-b border-sky-400/40 hover:border-white transition-colors"
                    >
                      OPEN SOURCE FILE ↗
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
