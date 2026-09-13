import { useEffect, useState } from "react";

const LINES = [
  "initializing quantum substrate …",
  "mounting matrix grid  [ok]",
  "calibrating blueprint plotter  [ok]",
  "priming plasma containment  [ok]",
  "entangling project nodes  ×8",
  "spinning reactor core  1.21 GW",
  "AI architect online",
];

export default function Boot({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let p = 0;
    const int = setInterval(() => {
      p += Math.random() * 11 + 4;
      setPct(Math.min(100, Math.round(p)));
      if (p >= 100) clearInterval(int);
    }, 110);

    LINES.forEach((l, i) => setTimeout(() => setLines((s) => [...s, l]), 180 + i * 190));

    const done = setTimeout(() => setExiting(true), 1900);
    const kill = setTimeout(onDone, 2600);
    return () => {
      clearInterval(int);
      clearTimeout(done);
      clearTimeout(kill);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#03060c] grid place-items-center transition-all duration-700 ${
        exiting ? "opacity-0 scale-[1.06] pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 grid-matrix opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,231,255,.14),transparent_60%)]" />

      <div className="relative w-[min(92vw,460px)] px-2">
        <div className="relative mx-auto h-32 w-32">
          <span className="absolute inset-0 rounded-full border border-cyan-300/60 animate-spin-slow" />
          <span className="absolute inset-3 rounded-full border border-dashed border-fuchsia-400/60 animate-spin-rev" />
          <span className="absolute inset-6 rounded-full border border-orange-400/50 animate-spin-slow" />
          <span className="absolute inset-0 rounded-full border border-cyan-200/40 animate-[pulse-ring_2.4s_ease-out_infinite]" />
          <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white via-cyan-200 to-fuchsia-400 animate-breathe" />
        </div>

        <div className="mt-8 flex items-baseline justify-between font-display text-[10px] tracking-[0.35em] text-cyan-300">
          <span>SYSTEM BOOT</span>
          <span className="tabular-nums text-white">{String(pct).padStart(3, "0")}%</span>
        </div>
        <div className="mt-2 h-[3px] w-full bg-white/8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-400 shadow-[0_0_16px_#22e7ff] transition-[width] duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="mt-5 h-[124px] overflow-hidden font-code text-[10px] leading-relaxed text-cyan-100/45">
          {lines.map((l, i) => (
            <div key={i} className="animate-rise">
              <span className="text-cyan-400">›</span> {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
