import { useRef, useCallback } from "react";

export function useTilt(intensity = 15) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const ghost1   = useRef<HTMLDivElement>(null);
  const ghost2   = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width  / 2);
    const dy = e.clientY - (rect.top  + rect.height / 2);
    const rX =  (dy / (rect.height / 2)) * -intensity;
    const rY = -(dx / (rect.width  / 2)) * -intensity;

    const t = `perspective(700px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1.04)`;
    card.style.transform = t;

    // ghosts lag behind naturally via slower CSS transition
    if (ghost1.current) ghost1.current.style.transform = t;
    if (ghost2.current) ghost2.current.style.transform = t;
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    const reset = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
    [cardRef, ghost1, ghost2].forEach((r) => {
      if (!r.current) return;
      r.current.style.transition = "transform 0.55s ease";
      r.current.style.transform  = reset;
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transition = "transform 0.06s ease";
    if (ghost1.current)  ghost1.current.style.transition  = "transform 0.14s ease";
    if (ghost2.current)  ghost2.current.style.transition  = "transform 0.22s ease";
  }, []);

  return { cardRef, ghost1, ghost2, handleMouseMove, handleMouseLeave, handleMouseEnter };
}
