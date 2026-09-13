import { useEffect, useState } from "react";
import { projects, extras } from "../data";

function CircuitDiagram({ seed }: { seed: number }) {
  const rows = [0, 1, 2];
  return (
    <svg viewBox="0 0 300 150" className="h-full w-full">
      <defs>
        <linearGradient id="cflow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22e7ff" />
          <stop offset="55%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ff5a1f" />
        </linearGradient>
        <filter id="cglow">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {rows.map((r) => {
        const y = 40 + r * 35;
        return (
          <g key={r}>
            <path
              d={`M 12 ${y} h ${44 + r * 12} l 14 -14 h ${70 - r * 8} l 14 14 h 60`}
              fill="none"
              stroke="rgba(255,255,255,.09)"
              strokeWidth="2.4"
            />
            <path
              d={`M 12 ${y} h ${44 + r * 12} l 14 -14 h ${70 - r * 8} l 14 14 h 60`}
              fill="none"
              stroke="url(#cflow)"
              strokeWidth="1.5"
              filter="url(#cglow)"
              strokeDasharray="14 200"
              style={{ animation: `dash-flow ${3 + r * 0.7}s linear infinite` }}
            />
            <circle cx="12" cy={y} r="3" fill="#22e7ff" />
            <circle cx="288" cy={y} r="3" fill="#ff5a1f" />
          </g>
        );
      })}
      <g stroke="rgba(34,231,255,.4)" fill="none">
        <rect x="120" y="16" width="60" height="118" strokeDasharray="3 4" />
      </g>
      <text x="150" y="12" textAnchor="middle" fontSize="7" fill="rgba(168,231,255,.6)" fontFamily="monospace">
        CORE-{String(seed + 1).padStart(2, "0")}
      </text>
    </svg>
  );
}

export default function ProjectModal({
  id,
  onClose,
  onAsk,
}: {
  id: string | null;
  onClose: () => void;
  onAsk: (q: string) => void;
}) {
  const p = projects.find((x) => x.id === id);
  const idx = projects.findIndex((x) => x.id === id);
  const [tab, setTab] = useState<"OVERVIEW" | "CIRCUIT" | "SPEC">("OVERVIEW");

  useEffect(() => {
    setTab("OVERVIEW");
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (id) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", esc);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [id, onClose]);

  if (!p) return null;
  const x = extras[p.id];

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#02050a]/88 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto animate-rise">
        <div className="glass border-cyan-400/30 shadow-[0_60px_140px_-40px_rgba(34,231,255,.5)]">
          {/* header */}
          <div className="relative overflow-hidden border-b border-white/10 px-6 py-5">
            <div className="absolute inset-0 grid-matrix opacity-40" />
            <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="font-code text-[9px] tracking-[0.3em] text-fuchsia-300/70">
                  DOSSIER · {p.tag} · {x?.year}
                </div>
                <h3 className="mt-1.5 font-display text-2xl font-black chrome-text">{p.name}</h3>
                <div className="mt-1 font-code text-[10px] text-cyan-100/45">{x?.role}</div>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 h-8 w-8 grid place-items-center border border-white/15 text-cyan-100/60 hover:border-cyan-300/70 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="relative mt-4 flex gap-1">
              {(["OVERVIEW", "CIRCUIT", "SPEC"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 font-display text-[9px] tracking-[0.24em] border transition-all ${
                    tab === t
                      ? "border-cyan-300/70 text-cyan-100 bg-cyan-400/12"
                      : "border-white/10 text-cyan-100/40 hover:text-cyan-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {tab === "OVERVIEW" && (
              <div className="animate-rise space-y-5">
                <p className="text-sm leading-relaxed text-cyan-100/70">{p.desc}</p>
                <div className="border-l-2 border-orange-400/60 pl-4">
                  <div className="font-display text-[9px] tracking-[0.28em] text-orange-300/80">IMPACT</div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-orange-50/70">{x?.impact}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {x?.highlights.map((h, i) => (
                    <div
                      key={h}
                      style={{ animationDelay: `${i * 70}ms` }}
                      className="animate-rise flex gap-2.5 border border-white/8 bg-white/[.02] px-3 py-2.5 text-[11px] leading-relaxed text-cyan-100/60"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_8px_#22e7ff]" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "CIRCUIT" && (
              <div className="animate-rise">
                <div className="h-48 border border-cyan-400/20 bg-[#02070f]">
                  <CircuitDiagram seed={idx} />
                </div>
                <p className="mt-4 font-code text-[10px] leading-relaxed text-cyan-100/45">
                  Energy-circuit rendering of the module: three parallel execution lanes feeding a shared
                  core boundary. Pulses represent request flow from client edge (cyan) to persistence
                  (plasma).
                </p>
                <button
                  onClick={() => {
                    onAsk(`${p.name} — ${p.stack.join(" / ")}`);
                    onClose();
                  }}
                  className="mt-4 w-full py-2.5 font-display text-[9px] tracking-[0.28em] bg-gradient-to-r from-cyan-300 to-cyan-100 text-[#03060c] font-bold hover:from-white hover:to-cyan-200 transition-all"
                >
                  SEND TO AI ARCHITECT →
                </button>
              </div>
            )}

            {tab === "SPEC" && (
              <div className="animate-rise space-y-5">
                <div>
                  <div className="font-display text-[9px] tracking-[0.28em] text-cyan-300/70">STACK</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="font-code text-[9px] tracking-wider px-2 py-1 border border-cyan-400/25 bg-cyan-400/8 text-cyan-100/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-display text-[9px] tracking-[0.28em] text-cyan-300/70">SUBSYSTEMS</div>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {p.modules.map((m) => (
                      <div
                        key={m}
                        className="border border-white/8 bg-white/[.02] px-2 py-2 text-center font-code text-[9px] text-cyan-100/55"
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2.5">
                  {p.metrics.map((m, i) => (
                    <div key={m.label}>
                      <div className="flex justify-between font-code text-[10px] text-cyan-100/55">
                        <span>{m.label}</span>
                        <span className="tabular-nums text-orange-300">{m.value}%</span>
                      </div>
                      <div className="mt-1 h-1.5 bg-white/6 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-400"
                          style={{
                            width: `${m.value}%`,
                            transition: `width 1.2s cubic-bezier(.2,.8,.2,1) ${i * 120}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
            <span className="font-code text-[9px] text-cyan-100/30">ESC TO CLOSE</span>
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 font-display text-[9px] tracking-[0.26em] border border-orange-400/50 text-orange-200 hover:bg-orange-400/12 transition-all"
            >
              VIEW SOURCE ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
