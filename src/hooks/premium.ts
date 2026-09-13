import { useCallback, useEffect, useRef, useState } from "react";

/** 3D tilt + spotlight follow for premium cards. */
export function useTilt(max = 8) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${
        (px - 0.5) * max
      }deg) translateY(-6px) scale(1.015)`;
    },
    [max]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)";
  }, []);

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$*<>/\\|";

/** Text scramble decode effect. */
export function useScramble(text: string, active: boolean, speed = 28) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!active) {
      setOut(text);
      return;
    }
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      setOut(
        text
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            if (i < frame / 2) return c;
            return GLYPHS[(Math.random() * GLYPHS.length) | 0];
          })
          .join("")
      );
      if (frame / 2 > text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return out;
}

/** Count-up when scrolled into view. */
export function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return { ref, val };
}

/** Magnetic pull for buttons. */
export function useMagnetic(strength = 0.32) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) < r.width) {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      } else {
        el.style.transform = "translate(0,0)";
      }
    };
    const leave = () => (el.style.transform = "translate(0,0)");
    window.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);
  return ref;
}
