import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "zoomIn";
  delay?: number;
  duration?: number;
}

/**
 * AnimatedSection Component
 * 
 * Déclenche des animations quand la section devient visible
 * Animations disponibles :
 * - fadeIn : Apparition progressive
 * - slideUp : Glissement vers le haut
 * - slideLeft : Glissement depuis la gauche
 * - slideRight : Glissement depuis la droite
 * - zoomIn : Zoom progressif
 */
export default function AnimatedSection({
  children,
  className,
  animation = "fadeIn",
  delay = 0,
  duration = 0.6,
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animationClasses = {
    fadeIn: "opacity-0 group-[.in-view]:opacity-100",
    slideUp: "translate-y-8 opacity-0 group-[.in-view]:translate-y-0 group-[.in-view]:opacity-100",
    slideLeft: "-translate-x-8 opacity-0 group-[.in-view]:translate-x-0 group-[.in-view]:opacity-100",
    slideRight: "translate-x-8 opacity-0 group-[.in-view]:translate-x-0 group-[.in-view]:opacity-100",
    zoomIn: "scale-95 opacity-0 group-[.in-view]:scale-100 group-[.in-view]:opacity-100",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "group transition-all ease-out",
        isInView && "in-view",
        className
      )}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      <div className={animationClasses[animation]}>
        {children}
      </div>
    </div>
  );
}
