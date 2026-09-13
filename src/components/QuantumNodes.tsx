import { useEffect, useRef, useState } from "react";
import { projects } from "../data";
import SectionTitle from "./SectionTitle";
import { useTilt, useScramble } from "../hooks/premium";

type Pt = { x: number; y: number };

function NodeCard({
  p,
  i,
  hovered,
  setHover,
  onOpen,
  nodeRef,
}: {
  p: (typeof projects)[number];
  i: number;
  hovered: boolean;
  setHover: (v: number | null) => void;
  onOpen: () => void;
  nodeRef: (el: HTMLDivElement | null) => void;
}) {
  const tilt = useTilt(9);
  const name = useScramble(p.name, hovered);

  return (
    <div
      ref={(el) => {
        tilt.ref.current = el;
        nodeRef(el);
      }}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={() => setHover(i)}
      onMouseLeave={() => {
        tilt.onMouseLeave();
        setHover(null);
      }}
      onClick={onOpen}
      style={{ transitionDelay: `${i * 60}ms`, transformStyle: "preserve-3d" }}
      className="reveal group relative cursor-pointer glass glass-hover p-5 corner-frame text-cyan-400/50 transition-all duration-300 will-change-transform"
    >
      <div className="pointer-events-none absolute inset-0 spotlight opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="flex items-start justify-between">
          <span className="text-2xl drop-shadow-[0_0_14px_rgba(34,231,255,.4)]">{p.icon}</span>
          <span className="font-code text-[7.5px] tracking-[0.2em] text-fuchsia-300/70 border border-fuchsia-400/25 px-1.5 py-0.5">
            {p.tag}
          </span>
        </div>
        <h3 className="mt-4 font-display text-[13px] font-bold tracking-wide text-cyan-100 group-hover:text-white transition-colors">
          {name}
        </h3>
        <p className="mt-2 text-[11px] leading-relaxed text-cyan-100/45 line-clamp-3">{p.desc}</p>
        <div className="mt-4 flex flex-wrap gap-1">
          {p.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="font-code text-[7.5px] tracking-widest px-1.5 py-0.5 bg-cyan-400/8 text-cyan-200/65 border border-cyan-400/15"
            >
              {s.toUpperCase()}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between font-code text-[8.5px] tracking-[0.2em] text-cyan-300/70">
          <span>OPEN DOSSIER</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </div>
      </div>
      <span className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export default function QuantumNodes({ onOpen }: { onOpen: (id: string) => void }) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const [pts, setPts] = useState<Pt[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const box = wrap.current?.getBoundingClientRect();
      if (!box) return;
      setSize({ w: box.width, h: box.height });
      setPts(
        nodes.current.map((n) => {
          const r = n?.getBoundingClientRect();
          return r ? { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 } : { x: 0, y: 0 };
        })
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 700);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const edges: [number, number][] = [];
  for (let i = 0; i < projects.length; i++) {
    edges.push([i, (i + 1) % projects.length]);
    edges.push([i, (i + 3) % projects.length]);
  }

  return (
    <section id="quantum" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          index="01"
          title="QUANTUM NODE ARRAY"
          subtitle="Every project is an entangled node. Hover to collapse the waveform, click to open the full holographic dossier."
          accent="cyan"
        />

        <div ref={wrap} className="relative mt-14">
          <svg
            className="pointer-events-none absolute inset-0 z-0"
            width={size.w}
            height={size.h}
            viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
          >
            <defs>
              <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22e7ff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ff5a1f" />
              </linearGradient>
              <filter id="eglow">
                <feGaussianBlur stdDeviation="2.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {pts.length === projects.length &&
              edges.map(([a, b], i) => {
                const p1 = pts[a];
                const p2 = pts[b];
                const mx = (p1.x + p2.x) / 2 + (i % 2 ? 46 : -46);
                const my = (p1.y + p2.y) / 2 + (i % 3 ? -34 : 34);
                const active = hover === a || hover === b;
                return (
                  <path
                    key={i}
                    d={`M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`}
                    fill="none"
                    stroke="url(#edge)"
                    strokeWidth={active ? 1.7 : 0.65}
                    opacity={active ? 1 : 0.2}
                    filter={active ? "url(#eglow)" : undefined}
                    className="flow-line transition-all duration-300"
                  />
                );
              })}
            {pts.map((p, i) => (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hover === i ? 7 : 3}
                  fill="#22e7ff"
                  opacity={hover === i ? 0.7 : 0.4}
                  className="transition-all duration-300"
                />
                {hover === i && <circle cx={p.x} cy={p.y} r="18" fill="none" stroke="#22e7ff" strokeWidth="0.6" opacity="0.4" />}
              </g>
            ))}
          </svg>

          <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p, i) => (
              <NodeCard
                key={p.id}
                p={p}
                i={i}
                hovered={hover === i}
                setHover={setHover}
                onOpen={() => onOpen(p.id)}
                nodeRef={(el) => {
                  nodes.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
