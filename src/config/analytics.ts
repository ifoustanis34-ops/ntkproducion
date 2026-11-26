/**
 * Google Analytics 4 — désactivé tant que NEXT_PUBLIC_GA_ID n'est pas renseigné (ex. "G-ABC123XYZ").
 * Même renseigné, rien n'est chargé avant l'accord explicite du visiteur (bandeau de consentement).
 */
const raw = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
export const gaId = /^G-[A-Z0-9]+$/.test(raw) ? raw : null;
export const CONSENT_KEY = "ntk-consent-mesure";
