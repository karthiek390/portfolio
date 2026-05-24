import React from "react";

interface GlitchTextProps {
  children: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
  className?: string;
}

export default function GlitchText({ children, as: Tag = "span", style, className }: GlitchTextProps) {
  return (
    <Tag className={`glitch ${className ?? ""}`} data-text={children} style={style}>
      {children}
    </Tag>
  );
}
