import { useEffect, useRef, useState } from "react";
import { projects } from "../data";

type Mode = "BLUEPRINT" | "CIRCUIT" | "QUANTUM";
type Node = { id: string; x: number; y: number; label: string; col: number };

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const LAYERS = [
  ["Client Shell", "PWA Shell", "UI Kernel", "Edge Client"],
  ["State Core", "Router Bus", "Cache Layer", "Sync Engine"],
  ["API Gateway", "Service Mesh", "Auth Guard", "Queue Broker"],
  ["Data Store", "IndexedDB", "Object Cache", "Ledger DB"],
];

function buildGraph(query: string) {
  const h = hash(query || "system");
  const nodes: Node[] = [];
  for (let c = 0; c < 4; c++) {
    const rows = 1 + ((h >> (c * 3)) % 2) + (c === 1 || c === 2 ? 1 : 0);
    for (let r = 0; r < rows; r++) {
      nodes.push({
        id: `${c}-${r}`,
        x: 62 + c * 152,
        y: 62 + r * 66 + (rows === 1 ? 66 : rows === 2 ? 33 : 0),
        label: LAYERS[c][(h >> (c * 2 + r)) % LAYERS[c].length],
        col: c,
      });
    }
  }
  const edges: [number, number][] = [];
  nodes.forEach((n, i) =>
    nodes.forEach((m, j) => {
      if (m.col === n.col + 1) edges.push([i, j]);
    })
  );
  const notes = [
    `entropy seed · ${h % 99991}`,
    `${nodes.length} nodes / ${edges.length} links resolved`,
    `latency budget · ${40 + (h % 60)}ms p95`,
    `failure domains isolated · ${2 + (h % 3)}`,
    `recommended cache · ${["stale-while-revalidate", "network-first", "cache-first"][h % 3]}`,
  ];
  return { nodes, edges, notes };
}

function Burst({ trigger }: { trigger: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!trigger) return;
    const cvs = ref.current!;
    const ctx = cvs.getContext("2d")!;
    const S = 200;
    cvs.width = S;
    cvs.height = S;
    const parts = Array.from({ length: 90 }, () => {
      const a = Math.random() * Math.PI * 2;
      const sp = 0.6 + Math.random() * 4;
      return { x: S / 2, y: S / 2, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, h: 170 + Math.random() * 160 };
    });
    let raf = 0;
    const step = () => {
      ctx.clearRect(0, 0, S, S);
      let alive = false;
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.962;
        p.vy *= 0.962;
        p.life -= 0.015;
        if (p.life > 0) {
          alive = true;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.7 * p.life + 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.h},100%,70%,${p.life})`;
          ctx.fill();
        }
      }
      if (alive) raf = requestAnimationFrame(step);
    };
    step();
    return () => cancelAnimationFrame(raf);
  }, [trigger]);
  return <canvas ref={ref} className="pointer-events-none absolute -inset-[58px] h-[200px] w-[200px]" />;
}

const STYLE: Record<Mode, { stroke: string; fill: string; text: string; accent: string }> = {
  BLUEPRINT: { stroke: "#7dd3fc", fill: "rgba(9,32,60,.9)", text: "#bae6fd", accent: "sky" },
  CIRCUIT: { stroke: "#ff8a3d", fill: "rgba(48,16,4,.9)", text: "#fed7aa", accent: "orange" },
  QUANTUM: { stroke: "#c084fc", fill: "rgba(30,10,54,.9)", text: "#e9d5ff", accent: "fuchsia" },
};

export default function AIOrb({
  request,
  clearRequest,
}: {
  request: string | null;
  clearRequest: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("BLUEPRINT");
  const [query, setQuery] = useState("");
  const [graph, setGraph] = useState<ReturnType<typeof buildGraph> | null>(null);
  const [burst, setBurst] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [thinking, setThinking] = useState(false);
  const [drawKey, setDrawKey] = useState(0);
  const logRef = useRef<HTMLDivElement | null>(null);

  const run = (q: string) => {
    setQuery(q);
    setThinking(true);
    setBurst((b) => b + 1);
    setLog([]);
    const steps = [
      `parsing intent :: "${q}"`,
      "sampling architecture space …",
      "scoring 2^12 candidate topologies",
      "collapsing to lowest-entropy graph",
      "plotting diagram",
    ];
    steps.forEach((s, i) => setTimeout(() => setLog((l) => [...l, s]), i * 240));
    setTimeout(() => {
      setGraph(buildGraph(q));
      setDrawKey((k) => k + 1);
      setThinking(false);
      setBurst((b) => b + 1);
    }, steps.length * 240 + 200);
  };

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log, graph]);

  useEffect(() => {
    if (request) {
      setOpen(true);
      const p = projects.find((x) => x.id === request);
      run(p ? `${p.name} — ${p.stack.join(" / ")}` : request);
      clearRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  const st = STYLE[mode];

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="AI architect orb"
        className="fixed bottom-6 right-6 z-[70] h-16 w-16 rounded-full grid place-items-center group"
      >
        <Burst trigger={burst} />
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/40 via-fuchsia-500/30 to-orange-500/40 blur-md animate-heat" />
        <span className="absolute inset-0 rounded-full border border-cyan-300/60 animate-spin-slow" />
        <span className="absolute inset-2 rounded-full border border-dashed border-fuchsia-400/60 animate-spin-rev" />
        <span className="absolute inset-0 rounded-full border border-cyan-200/35 animate-[pulse-ring_2.8s_ease-out_infinite]" />
        <span className="relative h-6 w-6 rounded-full bg-gradient-to-br from-white via-cyan-200 to-fuchsia-400 animate-breathe" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap glass px-2.5 py-1 font-code text-[8px] tracking-[0.2em] text-cyan-100/80 opacity-0 group-hover:opacity-100 transition-opacity">
          AI ARCHITECT
        </span>
      </button>

      <div
        className={`fixed z-[70] bottom-24 right-4 left-4 sm:left-auto sm:w-[580px] origin-bottom-right transition-all duration-300 ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="glass border-cyan-400/30 shadow-[0_50px_130px_-30px_rgba(34,231,255,.5)]">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
            <div className="flex items-center gap-2 font-display text-[9px] tracking-[0.24em] text-cyan-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              MKA ARCHITECT AI
            </div>
            <div className="flex items-center gap-1">
              {(Object.keys(STYLE) as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setDrawKey((k) => k + 1);
                    setBurst((b) => b + 1);
                  }}
                  className={`px-2 py-1 font-code text-[7.5px] tracking-[0.18em] border transition-all ${
                    mode === m
                      ? "border-cyan-300/70 text-cyan-100 bg-cyan-400/15"
                      : "border-white/10 text-cyan-100/40 hover:text-cyan-200"
                  }`}
                >
                  {m}
                </button>
              ))}
              <button onClick={() => setOpen(false)} className="ml-1 px-2 py-1 text-[10px] text-cyan-100/40 hover:text-white">
                ✕
              </button>
            </div>
          </div>

          <div className="relative h-[250px] bg-[#02060b] overflow-hidden">
            <div className={`absolute inset-0 ${mode === "BLUEPRINT" ? "grid-blueprint opacity-45" : "grid-matrix opacity-35"}`} />
            {!graph && (
              <div className="absolute inset-0 grid place-items-center px-8 text-center">
                <div>
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full border border-cyan-300/40 grid place-items-center animate-spin-slow">
                    <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_#22e7ff]" />
                  </div>
                  <p className="font-code text-[10px] leading-relaxed tracking-[0.18em] text-cyan-100/40">
                    DESCRIBE A SYSTEM.
                    <br />I WILL SYNTHESIZE A {mode} MAP.
                  </p>
                </div>
              </div>
            )}
            {graph && (
              <svg key={drawKey} viewBox="0 0 630 250" className="absolute inset-0 h-full w-full">
                <defs>
                  <filter id="oglow">
                    <feGaussianBlur stdDeviation="1.8" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {graph.edges.map(([a, b], i) => {
                  const p = graph.nodes[a];
                  const q = graph.nodes[b];
                  return (
                    <path
                      key={i}
                      d={`M ${p.x + 47} ${p.y} C ${p.x + 102} ${p.y}, ${q.x - 102} ${q.y}, ${q.x - 47} ${q.y}`}
                      fill="none"
                      stroke={st.stroke}
                      strokeWidth={mode === "CIRCUIT" ? 1.4 : 0.9}
                      opacity="0.5"
                      filter={mode === "CIRCUIT" ? "url(#oglow)" : undefined}
                      className={mode === "QUANTUM" ? "flow-line" : "draw-line"}
                      style={{ animationDelay: `${i * 55}ms` }}
                    />
                  );
                })}
                {graph.nodes.map((n, i) => (
                  <g key={n.id} style={{ animation: `rise-in .55s ease ${i * 65}ms both` }}>
                    <rect
                      x={n.x - 47}
                      y={n.y - 15}
                      width="94"
                      height="30"
                      rx={mode === "CIRCUIT" ? 15 : 0}
                      fill={st.fill}
                      stroke={st.stroke}
                      strokeWidth="1"
                    />
                    <circle cx={n.x - 47} cy={n.y} r="2.4" fill={st.stroke} />
                    <circle cx={n.x + 47} cy={n.y} r="2.4" fill={st.stroke} />
                    <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fill={st.text}>
                      {n.label}
                    </text>
                  </g>
                ))}
                {["EDGE", "STATE", "SERVICE", "DATA"].map((l, i) => (
                  <text key={l} x={62 + i * 152} y="22" textAnchor="middle" fontSize="7" fontFamily="JetBrains Mono, monospace" fill="rgba(255,255,255,.28)" letterSpacing="2">
                    {l}
                  </text>
                ))}
              </svg>
            )}
            {thinking && (
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-400 animate-pulse" />
            )}
          </div>

          <div
            ref={logRef}
            className="max-h-[104px] overflow-y-auto border-t border-white/8 px-4 py-2.5 font-code text-[9.5px] leading-relaxed text-cyan-100/50 space-y-0.5"
          >
            {log.map((l, i) => (
              <div key={i} className="animate-rise">
                <span className="text-cyan-400">›</span> {l}
              </div>
            ))}
            {graph && !thinking && (
              <>
                <div className="text-emerald-300">✓ {mode} map synthesized — “{query}”</div>
                {graph.notes.map((n) => (
                  <div key={n} className="text-cyan-100/35">· {n}</div>
                ))}
              </>
            )}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {["Offline POS sync", "Realtime dashboard", "PWA app shell", "Video streaming", "Search index"].map((s) => (
                <button
                  key={s}
                  onClick={() => run(s)}
                  className="font-code text-[7.5px] tracking-[0.16em] px-2 py-1 border border-cyan-400/20 text-cyan-100/55 hover:border-cyan-300/60 hover:text-cyan-100 transition-colors"
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const v = (new FormData(e.currentTarget).get("q") as string)?.trim();
                if (v) run(v);
                e.currentTarget.reset();
              }}
              className="flex gap-2"
            >
              <input
                name="q"
                placeholder="describe a system to diagram…"
                className="flex-1 bg-[#060d16] border border-cyan-400/25 px-3 py-2.5 text-[11px] text-cyan-100 placeholder:text-cyan-100/25 outline-none focus:border-cyan-300/70 transition-colors"
              />
              <button className="px-5 py-2.5 font-display text-[8.5px] tracking-[0.2em] bg-gradient-to-r from-cyan-200 to-cyan-400 text-[#03060c] font-bold hover:from-white hover:to-cyan-200 transition-all">
                MAP IT
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
