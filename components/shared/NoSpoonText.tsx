"use client";

import { useRef, useState, useCallback } from "react";

interface NoSpoonTextProps {
  children: string;
  style?: React.CSSProperties;
}

export default function NoSpoonText({ children, style }: NoSpoonTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [transform, setTransform] = useState("none");
  const [opacity, setOpacity] = useState(1);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = Math.max(rect.width, rect.height) * 0.8;
    const strength = Math.max(0, 1 - dist / maxDist);

    const tx = -dx * strength * 0.35;
    const ty = -dy * strength * 0.35;
    const skewX = -dx * strength * 0.04;
    const skewY = dy * strength * 0.02;
    const scaleY = 1 - strength * 0.08;

    setTransform(
      `translate(${tx}px, ${ty}px) skewX(${skewX}deg) skewY(${skewY}deg) scaleY(${scaleY})`
    );
    setOpacity(1 - strength * 0.3);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("none");
    setOpacity(1);
  }, []);

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      title="There is no spoon."
      style={{
        display: "inline-block",
        transform,
        opacity,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        cursor: "default",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
