"use client";

import { useEffect, useRef } from "react";

const mono = "JetBrains Mono, monospace";
const CHARS = "0123456789ABCDEF";

export default function GutterRain({ enabled = true }: { enabled?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(1);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const target = 0.8;
    const id = window.setInterval(() => {
      const diff = target - speedRef.current;
      if (Math.abs(diff) > 0.002) speedRef.current += diff * 0.008;
    }, 30);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let cols = Math.max(1, Math.floor(width / 18));
    let drops = Array.from({ length: cols }, () => Math.random() * -height);
    let acc = 0;

    const draw = () => {
      if (!enabled) {
        ctx.clearRect(0, 0, width, height);
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      acc += speedRef.current;
      if (acc >= 1) {
        acc = 0;
        ctx.fillStyle = "rgba(0,0,0,0.045)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = `14px ${mono}`;

        drops.forEach((y, i) => {
          const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
          const bright = Math.random() > 0.88;
          ctx.fillStyle = bright
            ? "#D6FFD6"
            : `rgba(0,${Math.floor(195 + Math.random() * 60)},${Math.floor(70 + Math.random() * 25)},${0.62 + Math.random() * 0.38})`;
          ctx.fillText(ch, i * 18, y);
          drops[i] = y > height + Math.random() * 200 ? -20 : y + 18;
        });
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      cols = Math.max(1, Math.floor(width / 18));
      drops = Array.from({ length: cols }, () => Math.random() * -height);
    });

    ro.observe(canvas);
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.78,
        pointerEvents: "none",
      }}
    />
  );
}
