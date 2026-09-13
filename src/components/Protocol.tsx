import { useState } from "react";
import { protocol } from "../data";
import SectionTitle from "./SectionTitle";

export default function Protocol() {
  const [active, setActive] = useState(0);

  return (
    <section id="protocol" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          index="04"
          title="BUILD PROTOCOL"
          subtitle="Five phases from raw signal to telemetry loop. This is how every module in this portfolio was assembled."
          accent="violet"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* rail */}
          <div className="relative">
            <span className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/50 via-fuchsia-400/40 to-orange-400/40" />
            {protocol.map((p, i) => (
              <button
                key={p.phase}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="reveal relative flex w-full items-center gap-4 py-3.5 text-left group"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span
                  className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border font-code text-[9px] transition-all duration-300 ${
                    active === i
                      ? "border-cyan-300 bg-cyan-300 text-[#03060c] shadow-[0_0_22px_rgba(34,231,255,.7)]"
                      : "border-white/20 bg-[#050a12] text-cyan-100/40 group-hover:border-cyan-300/60"
                  }`}
                >
                  {p.phase}
                </span>
                <span
                  className={`font-display text-[11px] tracking-[0.18em] transition-colors ${
                    active === i ? "text-white" : "text-cyan-100/40 group-hover:text-cyan-100/75"
                  }`}
                >
                  {p.title.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          {/* panel */}
          <div className="reveal relative glass p-7 sm:p-9 overflow-hidden min-h-[280px]">
            <div className="absolute inset-0 grid-blueprint opacity-20" />
            <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
            <div key={active} className="relative animate-rise">
              <div className="font-display text-[64px] sm:text-[92px] font-black leading-none text-white/[.05]">
                {protocol[active].phase}
              </div>
              <h3 className="-mt-8 sm:-mt-12 font-display text-xl sm:text-2xl font-black chrome-text">
                {protocol[active].title}
              </h3>
              <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-cyan-100/60">
                {protocol[active].desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {protocol[active].tags.map((t) => (
                  <span
                    key={t}
                    className="font-code text-[9px] tracking-[0.16em] px-2.5 py-1 border border-fuchsia-400/25 bg-fuchsia-400/8 text-fuchsia-100/70"
                  >
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10">
                  <div
                    className="h-px bg-gradient-to-r from-cyan-300 to-fuchsia-400 transition-[width] duration-500"
                    style={{ width: `${((active + 1) / protocol.length) * 100}%` }}
                  />
                </div>
                <span className="font-code text-[9px] text-cyan-100/35 tabular-nums">
                  {active + 1}/{protocol.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
