import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("cursor-none-desktop");

    let x = window.innerWidth / 2,
      y = window.innerHeight / 2,
      rx = x,
      ry = y,
      raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      setHot(!!t.closest("a,button,input,textarea,[data-hot]"));
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px,${y - 3}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px,${ry - 18}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", d);
    window.addEventListener("mouseup", u);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", d);
      window.removeEventListener("mouseup", u);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden md:block">
      <div
        ref={dot}
        className="absolute h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_#22e7ff]"
      />
      <div
        ref={ring}
        className={`absolute h-9 w-9 rounded-full border transition-[width,height,border-color,opacity] duration-200 ${
          hot ? "border-fuchsia-300/90 scale-125" : "border-cyan-300/50"
        } ${down ? "opacity-40 scale-90" : "opacity-100"}`}
        style={{ transitionProperty: "border-color, opacity, transform" }}
      >
        <span
          className={`absolute inset-0 rounded-full border border-dashed ${
            hot ? "border-cyan-300/60 animate-spin-slow" : "border-transparent"
          }`}
        />
      </div>
    </div>
  );
}
