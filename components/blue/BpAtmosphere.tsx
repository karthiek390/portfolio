"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function BpAtmosphere() {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReduced = useRef(false);
  const isMobile = useRef(false);

  const rawX = useMotionValue(600);
  const rawY = useMotionValue(300);

  const springX = useSpring(rawX, { stiffness: 40, damping: 25, restDelta: 0.5 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 25, restDelta: 0.5 });

  const background = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(ellipse 520px 420px at ${x}px ${y}px,
        rgba(245,158,11,0.07) 0%,
        rgba(0,80,189,0.05) 45%,
        transparent 70%)`
  );

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    isMobile.current = window.innerWidth < 768;
    setIsMounted(true);

    if (prefersReduced.current || isMobile.current) return;

    const handleMove = (e: MouseEvent) => {
      // offset X by 220px (rail width) since atmosphere starts after rail
      rawX.set(e.clientX - 220);
      rawY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY]);

  // Don't render on SSR or mobile or reduced-motion
  if (!isMounted || prefersReduced.current || isMobile.current) return null;

  return (
    <motion.div
      id="bp-atmosphere"
      aria-hidden="true"
      style={{ background, willChange: "background" }}
    />
  );
}
