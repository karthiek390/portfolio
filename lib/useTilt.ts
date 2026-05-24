import { useRef, useCallback } from "react";

export function useTilt(intensity = 15) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const rotateX =  (dy / (rect.height / 2)) * -intensity;
    const rotateY = -(dx / (rect.width  / 2)) * -intensity;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.5s ease";
    cardRef.current.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "transform 0.1s ease";
  }, []);

  return { cardRef, handleMouseMove, handleMouseLeave, handleMouseEnter };
}
