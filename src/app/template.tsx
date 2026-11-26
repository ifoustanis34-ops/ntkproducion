"use client";

import { useState } from "react";

let hasRendered = false;

/**
 * Transition d'entrée entre les pages (fondu CSS).
 * Pas d'animation au premier chargement : le contenu prérendu reste visible immédiatement (LCP).
 * Opacité seule : aucune transformation, pour ne pas perturber les éléments position: fixed.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => {
    if (typeof window === "undefined") return false;
    const a = hasRendered;
    hasRendered = true;
    return a;
  });
  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
