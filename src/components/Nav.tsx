import { useEffect, useState } from "react";

const links = [
  { id: "core", label: "CORE" },
  { id: "quantum", label: "QUANTUM" },
  { id: "blueprint", label: "BLUEPRINT" },
  { id: "reactor", label: "REACTOR" },
  { id: "protocol", label: "PROTOCOL" },
  { id: "network", label: "NETWORK" },
  { id: "contact", label: "UPLINK" },
];

export default function Nav({ progress, onCmd }: { progress: number; onCmd: () => void }) {
  const [active, setActive] = useState("core");
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setActive(x.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    const s = () => setSolid(window.scrollY > 40);
    s();
    window.addEventListener("scroll", s, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", s);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40">
        <div
          className={`transition-all duration-500 ${
            solid
              ? "backdrop-blur-2xl bg-[#03060c]/80 border-b border-cyan-400/15"
              : "bg-transparent border-b border-transparent"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
            <a href="#core" className="flex items-center gap-2.5 shrink-0 group">
              <span className="relative inline-flex h-8 w-8 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-cyan-300/60 animate-spin-slow" />
                <span className="absolute inset-1.5 rounded-full border border-fuchsia-400/50 animate-spin-rev" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_#22e7ff] group-hover:scale-150 transition-transform" />
              </span>
              <span className="font-display text-[11px] font-bold tracking-[0.26em] chrome-text">MKA</span>
            </a>

            <nav className="hidden lg:flex items-center gap-0.5">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={`relative px-3.5 py-2 font-display text-[9px] tracking-[0.22em] transition-colors ${
                    active === l.id ? "text-cyan-100" : "text-cyan-100/35 hover:text-cyan-100/80"
                  }`}
                >
                  {l.label}
                  {active === l.id && (
                    <span className="absolute inset-x-2.5 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_10px_#22e7ff]" />
                  )}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={onCmd}
                className="hidden sm:flex items-center gap-2 glass glass-hover px-3 py-1.5 font-code text-[9px] text-cyan-100/50 hover:text-cyan-100 transition-all"
              >
                <span>SEARCH</span>
                <kbd className="border border-white/15 px-1 text-[8px]">⌘K</kbd>
              </button>
              <span className="font-code text-[9px] tracking-[0.18em] text-orange-300/70 tabular-nums">
                {String(Math.round(progress * 100)).padStart(3, "0")}%
              </span>
            </div>
          </div>
          <div
            className="h-[2px] bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-400 shadow-[0_0_14px_#22e7ff] transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {/* side dot rail */}
      <div className="fixed right-5 top-1/2 z-40 hidden xl:flex -translate-y-1/2 flex-col items-center gap-3">
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} className="group relative flex items-center">
            <span
              className={`block h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                active === l.id
                  ? "bg-cyan-300 shadow-[0_0_12px_#22e7ff] scale-150"
                  : "bg-cyan-100/20 group-hover:bg-cyan-100/60"
              }`}
            />
            <span className="pointer-events-none absolute right-5 whitespace-nowrap font-code text-[8px] tracking-[0.2em] text-cyan-100/60 opacity-0 group-hover:opacity-100 transition-opacity">
              {l.label}
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
