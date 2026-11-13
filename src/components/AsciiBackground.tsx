"use client";

import { useEffect, useRef } from "react";

/**
 * Drifting "cloud" field of ASCII characters behind the homepage.
 * Elements marked with `data-ascii-clear` (the portrait and the text column)
 * get a clear zone around them so the characters only fill the edges.
 */

const RAMP = " .·:^o08";
const CELL_W = 10;
const CELL_H = 15;
const OPACITY = 0.42;
const FRAME_MS = 45; // ~22fps is plenty for a slow drift

function hash(i: number, j: number) {
  const h = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return h - Math.floor(h);
}

function noise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x: number, y: number) {
  return (
    0.55 * noise(x, y) +
    0.3 * noise(x * 2.03 + 5.2, y * 2.03 + 1.3) +
    0.15 * noise(x * 4.1 + 9.1, y * 4.1 + 3.7)
  );
}

type Zone = { cx: number; cy: number; rx: number; ry: number };

export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains-mono").trim() ||
      "ui-monospace, monospace";

    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let zones: Zone[] = [];
    let mask = new Float32Array(0);
    let raf = 0;
    let last = 0;
    let running = true;

    // Clear zones are recomputed from the real layout, so they follow the
    // portrait and text wherever they end up (desktop or stacked on mobile).
    const measure = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / CELL_W) + 1;
      rows = Math.ceil(H / CELL_H) + 1;

      zones = Array.from(host.querySelectorAll<HTMLElement>("[data-ascii-clear]")).map((el) => {
        const r = el.getBoundingClientRect();
        return {
          cx: r.left - rect.left + r.width / 2,
          cy: r.top - rect.top + r.height / 2,
          rx: (r.width / 2) * 1.25 + 24,
          ry: (r.height / 2) * 1.12 + 24,
        };
      });

      // The mask only depends on layout, so build it once per resize.
      mask = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * CELL_W + CELL_W / 2;
          const y = j * CELL_H + CELL_H / 2;
          let d = Infinity;
          for (const z of zones) {
            const nx = (x - z.cx) / z.rx;
            const ny = (y - z.cy) / z.ry;
            d = Math.min(d, Math.sqrt(nx * nx + ny * ny));
          }
          const k = zones.length ? Math.max(0, Math.min(1, (d - 0.85) / 0.55)) : 1;
          mask[j * cols + i] = 0.04 + 0.96 * k * k * (3 - 2 * k);
        }
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.font = `500 11px ${mono}`;
      ctx.textBaseline = "top";
      const buckets: [string, number, number][][] = [[], [], [], []];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const m = mask[j * cols + i];
          if (m < 0.06) continue;
          const n = fbm(i * 0.07 + t * 0.06, j * 0.11 - t * 0.035);
          const v = Math.max(0, Math.min(1, (n - 0.38) / 0.4));
          if (v <= 0.05) continue;
          const a = (0.35 + 0.65 * v) * m;
          if (a < 0.06) continue;
          buckets[Math.min(3, Math.floor(a * 4))].push([
            RAMP[Math.ceil(v * (RAMP.length - 1))],
            i * CELL_W,
            j * CELL_H,
          ]);
        }
      }
      // Draw in four opacity steps to keep fillStyle changes cheap.
      buckets.forEach((cells, b) => {
        if (!cells.length) return;
        ctx.fillStyle = `rgba(28, 27, 25, ${((OPACITY * (b + 1)) / 4).toFixed(3)})`;
        for (const [ch, x, y] of cells) ctx.fillText(ch, x, y);
      });
    };

    const loop = (now: number) => {
      if (!running) return;
      if (now - last > FRAME_MS) {
        last = now;
        draw(now / 1000);
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      measure();
      if (reduced) {
        draw(12);
        return;
      }
      cancelAnimationFrame(raf);
      running = true;
      raf = requestAnimationFrame(loop);
    };

    // Pause while the tab is hidden.
    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const ro = new ResizeObserver(() => {
      measure();
      if (reduced) draw(12);
    });
    ro.observe(host);
    document.addEventListener("visibilitychange", onVisibility);
    document.fonts.ready.then(start);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
