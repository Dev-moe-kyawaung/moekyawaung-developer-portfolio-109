import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; h: number; z: number };

/** Layered canvas: depth-parallax particle sim + graph links + matrix data rain. */
export default function QuantumField() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const neb = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cvs = ref.current!;
    const ctx = cvs.getContext("2d", { alpha: true })!;
    let w = 0,
      h = 0,
      raf = 0,
      t = 0,
      scroll = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const glyphs = "01λΨΦ∑∆◆▲●⬡アカサタナヒ".split("");

    let particles: P[] = [];
    let columns: { x: number; y: number; speed: number; chars: string[] }[] = [];
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      cvs.style.width = w + "px";
      cvs.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(130, Math.floor((w * h) / 14000));
      particles = Array.from({ length: count }, () => {
        const z = Math.random() * 0.85 + 0.15;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.32 * z,
          vy: (Math.random() - 0.5) * 0.32 * z,
          r: z * 1.9 + 0.35,
          h: Math.random() * 90 + 165,
          z,
        };
      });

      const colW = 28;
      columns = Array.from({ length: Math.ceil(w / colW) }, (_, i) => ({
        x: i * colW + 7,
        y: Math.random() * -h,
        speed: 0.7 + Math.random() * 2.3,
        chars: Array.from({ length: 13 }, () => glyphs[(Math.random() * glyphs.length) | 0]),
      }));
    }

    function frame() {
      t += 0.006;
      mouse.x += (mouse.tx - mouse.x) * 0.09;
      mouse.y += (mouse.ty - mouse.y) * 0.09;
      ctx.clearRect(0, 0, w, h);

      // matrix rain (back layer)
      ctx.font = '13px "JetBrains Mono", monospace';
      for (const c of columns) {
        c.y += c.speed;
        if (c.y > h + 220) {
          c.y = -Math.random() * 420;
          c.speed = 0.7 + Math.random() * 2.3;
        }
        for (let i = 0; i < c.chars.length; i++) {
          const alpha = (1 - i / c.chars.length) * 0.3;
          ctx.fillStyle = i === 0 ? `rgba(200,255,255,${alpha + 0.45})` : `rgba(34,231,255,${alpha})`;
          ctx.fillText(c.chars[i], c.x, c.y - i * 17);
        }
        if (Math.random() < 0.045)
          c.chars[(Math.random() * c.chars.length) | 0] = glyphs[(Math.random() * glyphs.length) | 0];
      }

      // particles with depth parallax
      for (const p of particles) {
        p.x += p.vx + Math.sin(t + p.y * 0.01) * 0.15 * p.z;
        p.y += p.vy + Math.cos(t + p.x * 0.01) * 0.15 * p.z;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const md = Math.hypot(dx, dy);
        if (md < 170) {
          p.x += (dx / md) * 1.1 * p.z;
          p.y += (dy / md) * 1.1 * p.z;
        }

        const py = p.y - scroll * 28 * p.z;
        ctx.beginPath();
        ctx.arc(p.x, ((py % (h + 20)) + h + 20) % (h + 20), p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.h},100%,72%,${0.35 + p.z * 0.55})`;
        ctx.fill();
      }

      // graph links (only near-field particles)
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].z < 0.45) continue;
        for (let j = i + 1; j < particles.length; j++) {
          if (particles[j].z < 0.45) continue;
          const a = particles[i],
            b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 128) {
            ctx.strokeStyle = `rgba(130,205,255,${(1 - d / 128) * 0.2})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }

    const move = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      if (neb.current) {
        const nx = (e.clientX / window.innerWidth - 0.5) * 34;
        const ny = (e.clientY / window.innerHeight - 0.5) * 34;
        neb.current.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
      }
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      scroll = max > 0 ? window.scrollY / max : 0;
    };

    resize();
    frame();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#03060c]" />
      <div className="absolute inset-0 grid-matrix opacity-55" />
      <div
        ref={neb}
        className="absolute -inset-24 will-change-transform transition-transform duration-500 ease-out"
      >
        <div className="absolute left-[8%] top-[12%] h-[45vw] w-[45vw] rounded-full bg-cyan-500/12 blur-[130px] animate-heat" />
        <div className="absolute right-[6%] top-[40%] h-[38vw] w-[38vw] rounded-full bg-fuchsia-600/12 blur-[140px] animate-heat [animation-delay:2s]" />
        <div className="absolute left-[30%] bottom-[4%] h-[42vw] w-[42vw] rounded-full bg-orange-600/10 blur-[150px] animate-heat [animation-delay:4s]" />
      </div>
      <canvas ref={ref} className="absolute inset-0 opacity-80" />
      <div className="absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,.34)_0px,rgba(0,0,0,.34)_1px,transparent_1px,transparent_3px)] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,4,8,.92)_100%)]" />
    </div>
  );
}
