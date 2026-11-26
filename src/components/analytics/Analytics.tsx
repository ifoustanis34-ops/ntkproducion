"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { CONSENT_KEY, gaId } from "@/config/analytics";

type Consent = "accepte" | "refuse" | null;

const listeners = new Set<() => void>();
let memoryConsent: Consent = null;
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

function readConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepte" || v === "refuse" ? v : memoryConsent;
  } catch {
    return memoryConsent;
  }
}

function loadGa(id: string) {
  if (document.getElementById("ga4-src")) return;
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", id, { anonymize_ip: true });
  const s = document.createElement("script");
  s.id = "ga4-src";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

/** Mesure d'audience Google Analytics 4, chargée uniquement après accord du visiteur. */
export function Analytics() {
  // Côté serveur : "inconnu" → rien n'est rendu (le bandeau n'apparaît qu'après hydratation).
  const consent = useSyncExternalStore<Consent | "inconnu">(subscribe, readConsent, () => "inconnu");

  useEffect(() => {
    if (gaId && consent === "accepte") loadGa(gaId);
  }, [consent]);

  if (!gaId || consent !== null) return null;

  const choose = (c: "accepte" | "refuse") => {
    try {
      localStorage.setItem(CONSENT_KEY, c);
    } catch {
      /* stockage indisponible : le choix vaut pour cette visite */
    }
    memoryConsent = c;
    listeners.forEach((l) => l());
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Mesure d'audience"
      className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-xl rounded-2xl border border-steel-200 bg-white p-5 text-sm text-navy-900 shadow-2xl shadow-navy-950/20 sm:bottom-6 sm:left-6 sm:right-auto"
    >
      <p className="leading-relaxed">
        Nous souhaitons mesurer la fréquentation du site (Google Analytics) pour l&apos;améliorer. Aucune donnée n&apos;est utilisée à
        des fins publicitaires.{" "}
        <Link href="/politique-de-confidentialite" className="font-medium text-royal-600 underline underline-offset-4">
          En savoir plus
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose("accepte")}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-navy-900 px-4 font-semibold text-white hover:bg-navy-800"
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={() => choose("refuse")}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-steel-300 px-4 font-semibold text-navy-900 hover:bg-steel-50"
        >
          Refuser
        </button>
      </div>
    </div>
  );
}
