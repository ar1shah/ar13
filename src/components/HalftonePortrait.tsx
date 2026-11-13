"use client";

import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; r: number; dist: number };

const INK = "#1c1b19";
const COLS = 130; // dots across
const ASPECT = 1.2; // height / width of the portrait

/** Ease-out with a small overshoot, so each dot "pops" into place. */
function back(x: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const t = Math.max(0, Math.min(1, x));
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

/** Reads the grayscale portrait into one lightness value (0..1) per grid cell. */
function sample(img: HTMLImageElement, cols: number, rows: number) {
  const c = document.createElement("canvas");
  c.width = cols;
  c.height = rows;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, cols, rows);
  ctx.drawImage(img, 0, 0, cols, rows);
  const d = ctx.getImageData(0, 0, cols, rows).data;
  const out = new Float32Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) {
    out[i] = (0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]) / 255;
  }
  return out;
}

function buildDots(img: HTMLImageElement, W: number, H: number): Dot[] {
  const rows = Math.round(COLS * ASPECT);
  const light = sample(img, COLS, rows);
  const sx = W / COLS;
  const sy = H / rows;
  const base = Math.min(sx, sy) * 0.54;
  const cx = W / 2;
  const cy = H * 0.45;
  const maxd = Math.hypot(W, H) * 0.6;
  const dots: Dot[] = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < COLS; i++) {
      const dark = 1 - light[j * COLS + i];
      if (dark < 0.03) continue;
      const x = (i + 0.5) * sx;
      const y = (j + 0.5) * sy;
      // Dot area tracks darkness (like print halftone), so radius ~ sqrt.
      dots.push({ x, y, r: Math.max(0.3, Math.sqrt(dark) * base), dist: Math.hypot(x - cx, y - cy) / maxd });
    }
  }
  return dots;
}

export default function HalftonePortrait({
  src,
  label,
  className,
}: {
  src: string;
  label: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let img: HTMLImageElement | null = null;
    let dots: Dot[] = [];
    let W = 0;
    let H = 0;
    let start = 0;
    let raf = 0;
    let visible = true;

    const draw = (now: number) => {
      const t = now / 1000;
      const el = t - start;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = INK;
      ctx.beginPath();
      for (const d of dots) {
        const g = reduced ? 1 : back((el * 1.1 - d.dist * 1.4) * 2.2);
        if (g <= 0.01) continue;
        const wave = reduced ? 1 : 0.93 + 0.07 * Math.sin(t * 2 - d.dist * 26);
        const r = d.r * g * wave;
        ctx.moveTo(d.x + r, d.y);
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const loop = (now: number) => {
      draw(now);
      if (!reduced && visible) raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !img) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = buildDots(img, W, H);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => {
      if (img && Math.abs(canvas.getBoundingClientRect().width - W) > 2) resize();
    });
    ro.observe(canvas);

    // Pause the animation while the portrait is scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && img) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(canvas);

    const image = new Image();
    image.onload = () => {
      img = image;
      start = performance.now() / 1000;
      resize();
    };
    image.src = src;

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className={className}
      style={{ aspectRatio: `1 / ${ASPECT}` }}
    />
  );
}
