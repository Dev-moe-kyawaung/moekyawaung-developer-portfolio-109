import { useEffect, useMemo, useRef, useState } from "react";
import { projects, profile, domains } from "../data";

type Cmd = { id: string; label: string; hint: string; group: string; run: () => void };

export default function CommandPalette({
  open,
  setOpen,
  onAsk,
  onOpenProject,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  onAsk: (q: string) => void;
  onOpenProject: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const cmds: Cmd[] = useMemo(() => {
    const nav = [
      ["core", "Jump to Core"],
      ["quantum", "Jump to Quantum Node Array"],
      ["blueprint", "Jump to Mecha Blueprint Deck"],
      ["reactor", "Jump to Plasma Reactor Bay"],
      ["protocol", "Jump to Build Protocol"],
      ["network", "Jump to Distributed Network"],
      ["contact", "Jump to Uplink"],
    ].map(([id, label]) => ({
      id: `nav-${id}`,
      label,
      hint: "SECTION",
      group: "Navigate",
      run: () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    }));

    const proj = projects.map((p) => ({
      id: `p-${p.id}`,
      label: `Open dossier — ${p.name}`,
      hint: p.tag,
      group: "Projects",
      run: () => onOpenProject(p.id),
    }));

    const ai = [
      "Offline-first POS sync",
      "Realtime analytics pipeline",
      "PWA app shell strategy",
      "Adaptive video streaming",
    ].map((s) => ({
      id: `ai-${s}`,
      label: `AI map — ${s}`,
      hint: "ARCHITECT",
      group: "AI Architect",
      run: () => onAsk(s),
    }));

    const links = [
      { id: "l-gh", label: "Open GitHub profile", hint: "EXTERNAL", url: profile.github },
      { id: "l-gr", label: "Open Gravatar", hint: "EXTERNAL", url: profile.gravatar },
      ...domains.slice(0, 5).map((d) => ({
        id: `l-${d}`,
        label: `Visit ${d}`,
        hint: "DOMAIN",
        url: `https://${d}`,
      })),
    ].map((l) => ({
      id: l.id,
      label: l.label,
      hint: l.hint,
      group: "Links",
      run: () => window.open(l.url, "_blank"),
    }));

    return [...nav, ...proj, ...ai, ...links];
  }, [onAsk, onOpenProject]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return cmds;
    return cmds.filter((c) => (c.label + c.group + c.hint).toLowerCase().includes(s));
  }, [q, cmds]);

  useEffect(() => setSel(0), [q]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSel((s) => Math.min(filtered.length - 1, s + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSel((s) => Math.max(0, s - 1));
      }
      if (e.key === "Enter") {
        filtered[sel]?.run();
        setOpen(false);
        setQ("");
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, filtered, sel, setOpen]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  if (!open) return null;

  let lastGroup = "";
  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center pt-[14vh] px-4">
      <div className="absolute inset-0 bg-[#02050a]/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl animate-rise">
        <div className="glass border-cyan-400/30 shadow-[0_40px_120px_-30px_rgba(34,231,255,.45)]">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <span className="font-display text-[10px] tracking-[0.3em] text-cyan-300">⌘K</span>
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sections, dossiers, AI maps…"
              className="flex-1 bg-transparent text-sm text-cyan-50 placeholder:text-cyan-100/25 outline-none font-tech"
            />
            <kbd className="font-code text-[9px] text-cyan-100/35 border border-white/10 px-1.5 py-0.5">ESC</kbd>
          </div>
          <div className="max-h-[52vh] overflow-y-auto py-2">
            {filtered.length === 0 && (
              <div className="px-4 py-8 text-center font-code text-[11px] text-cyan-100/35">
                no matching signal
              </div>
            )}
            {filtered.map((c, i) => {
              const head = c.group !== lastGroup ? ((lastGroup = c.group), c.group) : null;
              return (
                <div key={c.id}>
                  {head && (
                    <div className="px-4 pt-3 pb-1 font-display text-[8px] tracking-[0.3em] text-cyan-100/30">
                      {head.toUpperCase()}
                    </div>
                  )}
                  <button
                    onMouseEnter={() => setSel(i)}
                    onClick={() => {
                      c.run();
                      setOpen(false);
                      setQ("");
                    }}
                    className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-[12px] transition-colors ${
                      sel === i ? "bg-cyan-400/12 text-white" : "text-cyan-100/60 hover:text-cyan-50"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span
                        className={`h-1 w-1 rounded-full ${
                          sel === i ? "bg-cyan-300 shadow-[0_0_10px_#22e7ff]" : "bg-cyan-100/25"
                        }`}
                      />
                      {c.label}
                    </span>
                    <span className="font-code text-[8px] tracking-[0.18em] text-fuchsia-300/55 shrink-0">
                      {c.hint}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
