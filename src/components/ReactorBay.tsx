import { useEffect, useRef, useState } from "react";
import { projects, skills } from "../data";
import SectionTitle from "./SectionTitle";

function Gauge({ value, label, delay }: { value: number; label: string; delay: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setTimeout(() => setV(value), delay);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, delay]);

  const c = 2 * Math.PI * 26;
  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative h-[68px] w-[68px]">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
          <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="4" />
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="url(#plasma)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c - (c * v) / 100}
            style={{ transition: "stroke-dashoffset 1.7s cubic-bezier(.2,.8,.2,1)" }}
          />
          <defs>
            <linearGradient id="plasma" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffd27a" />
              <stop offset="60%" stopColor="#ff5a1f" />
              <stop offset="100%" stopColor="#ff2d95" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-[11px] font-bold text-orange-100 tabular-nums">
          {v}
        </span>
      </div>
      <span className="mt-1.5 font-code text-[7.5px] tracking-[0.18em] text-orange-100/45">
        {label.toUpperCase()}
      </span>
    </div>
  );
}

export default function ReactorBay() {
  return (
    <section id="reactor" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-orange-500/8 animate-heat" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionTitle
          index="03"
          title="PLASMA REACTOR BAY"
          subtitle="Live modules under load. Rings spin with throughput, gauges report real performance envelopes."
          accent="orange"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.35fr] items-start">
          <div className="reveal relative aspect-square w-full max-w-[420px] mx-auto glass border-orange-400/20 grid place-items-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,90,31,.28),transparent_66%)] animate-heat" />
            <div className="absolute h-[62%] w-[62%] rounded-full border border-orange-300/35 animate-spin-slow" />
            <div className="absolute h-[46%] w-[46%] rounded-full border-2 border-dashed border-amber-300/35 animate-spin-rev" />
            <div className="absolute h-[78%] w-[78%] rounded-full border border-pink-400/20 animate-spin-rev" />
            <div className="absolute h-[26%] w-[26%] rounded-full bg-gradient-to-br from-amber-100 via-orange-500 to-pink-600 blur-[2px] animate-flicker shadow-[0_0_100px_rgba(255,90,31,.85)]" />
            <span className="absolute h-[30%] w-[30%] rounded-full border border-amber-200/50 animate-[pulse-ring_2.6s_ease-out_infinite]" />
            <span className="absolute h-[30%] w-[30%] rounded-full border border-pink-300/40 animate-[pulse-ring_2.6s_ease-out_infinite_1.3s]" />
            <div className="absolute bottom-3 left-4 font-code text-[8.5px] tracking-[0.2em] text-orange-200/70">
              CORE OUTPUT · 1.21 GW
            </div>
            <div className="absolute top-3 right-4 font-code text-[8.5px] tracking-[0.2em] text-emerald-300/80 animate-pulse">
              ● CONTAINMENT STABLE
            </div>
          </div>

          <div className="reveal space-y-4">
            {skills.map((s, i) => (
              <div key={s.name}>
                <div className="flex justify-between font-code text-[9.5px] tracking-[0.18em] text-orange-100/65">
                  <span>{s.name.toUpperCase()}</span>
                  <span className="tabular-nums text-orange-300">{s.level}</span>
                </div>
                <div className="mt-1.5 h-1.5 bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-200 via-orange-500 to-pink-500 shadow-[0_0_16px_rgba(255,90,31,.7)]"
                    style={{ width: `${s.level}%`, transition: `width 1.5s cubic-bezier(.2,.8,.2,1) ${i * 110}ms` }}
                  />
                </div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-3">
              {["UPTIME 99.98%", "BUILD Δ 1.4s", "ZERO-DOWNTIME DEPLOYS", "OFFLINE-FIRST BY DEFAULT"].map((x) => (
                <div
                  key={x}
                  className="glass border-orange-400/15 px-3 py-2.5 font-code text-[8.5px] tracking-[0.16em] text-orange-100/60"
                >
                  {x}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {projects.slice(2, 6).map((p, i) => (
            <div
              key={p.id}
              style={{ transitionDelay: `${i * 80}ms` }}
              className="reveal group relative glass border-orange-400/20 p-5 hover:border-orange-300/60 hover:shadow-[0_0_50px_-14px_rgba(255,90,31,.55)] transition-all"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />
              <div className="flex items-center gap-3">
                <span className="relative grid h-10 w-10 place-items-center rounded-full border border-orange-300/35">
                  <span className="absolute inset-0 rounded-full border-t border-amber-200/70 animate-spin-slow" />
                  <span className="text-sm">{p.icon}</span>
                </span>
                <div>
                  <h3 className="font-display text-[11px] font-bold tracking-wide text-orange-50">{p.name}</h3>
                  <div className="font-code text-[7.5px] tracking-[0.2em] text-orange-300/60">{p.tag}</div>
                </div>
              </div>
              <div className="mt-5 flex justify-between">
                {p.metrics.map((m, j) => (
                  <Gauge key={m.label} value={m.value} label={m.label} delay={j * 170} />
                ))}
              </div>
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="mt-5 block border border-orange-400/25 py-2.5 text-center font-display text-[8px] tracking-[0.24em] text-orange-200 hover:bg-orange-400/12 transition-colors"
              >
                ENGAGE MODULE ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
