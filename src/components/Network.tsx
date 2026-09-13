import { appCollection, domains, lovableApps, gallery } from "../data";
import SectionTitle from "./SectionTitle";

function LinkGrid({
  title,
  items,
  more,
  tone,
}: {
  title: string;
  items: string[];
  more: string;
  tone: "fuchsia" | "cyan";
}) {
  const dot = tone === "fuchsia" ? "bg-fuchsia-400" : "bg-cyan-400";
  const glow = tone === "fuchsia" ? "group-hover:shadow-[0_0_10px_#e879f9]" : "group-hover:shadow-[0_0_10px_#22e7ff]";
  const brd = tone === "fuchsia" ? "hover:border-fuchsia-400/50" : "hover:border-cyan-400/50";
  const txt = tone === "fuchsia" ? "text-fuchsia-300" : "text-cyan-300";
  return (
    <div className="reveal glass p-5">
      <h3 className={`font-display text-[9px] tracking-[0.3em] ${txt}`}>{title}</h3>
      <div className="mt-4 grid gap-1.5 sm:grid-cols-2">
        {items.map((d) => (
          <a
            key={d}
            href={`https://${d}`}
            target="_blank"
            rel="noreferrer"
            className={`group flex items-center gap-2 border border-white/6 bg-white/[.015] px-2.5 py-2 font-code text-[9.5px] text-cyan-100/50 hover:text-white transition-all ${brd}`}
          >
            <span className={`h-1 w-1 shrink-0 rounded-full ${dot} ${glow}`} />
            <span className="truncate">{d}</span>
          </a>
        ))}
      </div>
      <p className="mt-3 font-code text-[8.5px] tracking-[0.2em] text-cyan-100/30">{more}</p>
    </div>
  );
}

export default function Network() {
  return (
    <section id="network" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          index="05"
          title="DISTRIBUTED NETWORK"
          subtitle="43+ live GitHub Pages domains, 30+ Lovable deployments and a 16-module app collection — one engineer, many endpoints."
          accent="violet"
        />

        <div className="reveal relative mt-12 overflow-hidden border-y border-fuchsia-400/15 py-3.5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#03060c] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#03060c] to-transparent" />
          <div className="flex w-max animate-marquee gap-8">
            {[...appCollection, ...appCollection].map((a, i) => (
              <span key={i} className="whitespace-nowrap font-code text-[11px] tracking-[0.18em] text-fuchsia-100/55">
                {a}
                <span className="mx-4 text-fuchsia-400/35">◆</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <LinkGrid title="GITHUB PAGES CLUSTER" items={domains} more="+ 31 MORE NODES ONLINE" tone="fuchsia" />
          <LinkGrid title="LOVABLE DEPLOYMENTS" items={lovableApps} more="+ 22 MORE APPS SHIPPED" tone="cyan" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {gallery.map((g, i) => (
            <div
              key={g}
              style={{ transitionDelay: `${i * 60}ms` }}
              className="reveal group relative aspect-square overflow-hidden border border-cyan-400/15"
            >
              <img
                src={g}
                alt={`visual ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[45%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03060c] via-transparent to-transparent" />
              <div className="absolute inset-0 border border-cyan-300/0 transition-colors group-hover:border-cyan-300/60" />
              <span className="absolute bottom-1.5 left-2 font-code text-[7.5px] tracking-[0.2em] text-cyan-200/70">
                FRG_{String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
