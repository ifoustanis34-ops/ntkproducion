import { cn } from "@/lib/utils";

type RevealProps = React.HTMLAttributes<HTMLElement> & {
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Apparition progressive au défilement — sans JavaScript côté React.
 * Rendu serveur ; un IntersectionObserver unique (voir RevealScript) ajoute
 * l'attribut data-shown lorsque l'élément entre dans la fenêtre.
 * Animation : opacity + transform uniquement, désactivée si prefers-reduced-motion.
 */
export function Reveal({ delay = 0, as = "div", className, style, children, ...rest }: RevealProps) {
  const Comp = as;
  return (
    <Comp
      data-reveal=""
      suppressHydrationWarning
      className={cn(className)}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}s` } as React.CSSProperties) : style}
      {...rest}
    >
      {children}
    </Comp>
  );
}
