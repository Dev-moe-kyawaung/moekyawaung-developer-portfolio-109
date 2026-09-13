const accents: Record<string, { grad: string; border: string; text: string }> = {
  cyan: { grad: "from-cyan-100 via-cyan-300 to-cyan-600", border: "border-cyan-400/40", text: "text-cyan-300" },
  blue: { grad: "from-sky-100 via-sky-300 to-blue-600", border: "border-sky-400/40", text: "text-sky-300" },
  orange: { grad: "from-amber-100 via-orange-300 to-orange-600", border: "border-orange-400/40", text: "text-orange-300" },
  violet: { grad: "from-fuchsia-100 via-fuchsia-300 to-violet-600", border: "border-fuchsia-400/40", text: "text-fuchsia-300" },
};

export default function SectionTitle({
  index,
  title,
  subtitle,
  accent = "cyan",
}: {
  index: string;
  title: string;
  subtitle: string;
  accent?: string;
}) {
  const a = accents[accent] ?? accents.cyan;
  return (
    <div className="reveal">
      <div className={`flex items-center gap-3 font-code text-[9px] tracking-[0.34em] ${a.text}`}>
        <span className={`border px-2 py-0.5 ${a.border}`}>{index}</span>
        <span className="h-px w-16 bg-gradient-to-r from-current to-transparent opacity-50" />
        <span className="opacity-45">SECTOR</span>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
      </div>
      <h2
        className={`mt-5 font-display font-black tracking-tight text-[clamp(1.8rem,5vw,3.4rem)] leading-[1.02] bg-gradient-to-br ${a.grad} bg-clip-text text-transparent`}
      >
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-cyan-100/45">{subtitle}</p>
    </div>
  );
}
