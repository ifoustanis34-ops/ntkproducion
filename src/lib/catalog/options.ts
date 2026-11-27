/**
 * Règles communes (serveur et navigateur) des options de produits.
 * Aucune dépendance serveur : utilisable dans les composants clients.
 */
import type { CatalogPhoto, CatalogProduct, OptionGroup, RangeId } from "./types";

/** Options affichées pour un produit : celles de sa gamme (sauf désactivées), puis les siennes. */
export function effectiveOptions(product: Pick<CatalogProduct, "range" | "options" | "disabledRangeOptions">, rangeOptions: Record<RangeId, OptionGroup[]>) {
  const disabled = new Set(product.disabledRangeOptions);
  return [...(rangeOptions[product.range] ?? []).filter((g) => !disabled.has(g.id)), ...product.options];
}

/**
 * Photos correspondant aux valeurs choisies : une photo s'affiche si toutes ses valeurs sont choisies.
 * Les plus spécifiques passent en premier ; à défaut, les photos générales ; à défaut, toutes.
 */
export function photosFor(photos: CatalogPhoto[], selected: Set<string>) {
  const matching = photos.filter((p) => p.valueIds.every((v) => selected.has(v)));
  const list = matching.length ? matching : photos.filter((p) => p.valueIds.length === 0);
  return [...(list.length ? list : photos)].sort((a, b) => b.valueIds.length - a.valueIds.length);
}

/** Choix du client pour une option. */
export type Selection = { valueId: string | null; custom: string };
export type Selections = Record<string, Selection>;

export const CUSTOM_VALUE = "__sur-mesure";

/**
 * Saisie libre réellement proposée au client : une option « couleur » propose toujours « Autre »
 * (le client écrit la couleur voulue), même si l'administrateur n'a rien prévu.
 */
export function customMode(g: Pick<OptionGroup, "kind" | "custom">): OptionGroup["custom"] {
  return g.kind === "couleur" && g.custom === "aucune" ? "texte" : g.custom;
}

/** Libellé du bouton de saisie libre. */
export function customLabel(g: Pick<OptionGroup, "kind" | "custom">) {
  if (g.kind === "couleur") return "Autre couleur";
  return customMode(g) === "dimensions" ? "Saisir mes dimensions" : "Autre (à préciser)";
}

const num = (v: string) => {
  const n = Number(v.replace(",", ".").trim());
  return Number.isFinite(n) && n > 0 && n <= 500 ? n : null;
};
const fmt = (n: number) => String(n).replace(".", ",");

/** Saisie « dimensions » encodée « L|l|H » dans Selection.custom. */
export function formatDimensions(raw: string): string | null {
  const [l, w, h] = raw.split("|");
  const L = num(l ?? "");
  const W = num(w ?? "");
  const H = (h ?? "").trim() ? num(h ?? "") : null;
  if (!L || !W || ((h ?? "").trim() && !H)) return null;
  return `${fmt(L)} m × ${fmt(W)} m${H ? ` (hauteur ${fmt(H)} m)` : ""}`;
}

/**
 * Valide les choix et renvoie, pour chaque option, la ligne à écrire dans le message (« Couleur de la bâche : Blanc »).
 * Une option facultative sans choix est simplement omise.
 */
export function describeSelections(groups: OptionGroup[], sel: Selections): { lines: string[]; errors: string[] } {
  const lines: string[] = [];
  const errors: string[] = [];
  for (const g of groups) {
    const s = sel[g.id] ?? { valueId: null, custom: "" };
    if (s.valueId === CUSTOM_VALUE) {
      const empty = !s.custom.replace(/\|/g, "").trim();
      if (empty && !g.required) continue; // saisie libre facultative laissée vide
      const mode = customMode(g);
      const text = mode === "dimensions" ? formatDimensions(s.custom) : s.custom.trim().slice(0, 120) || null;
      if (!text)
        errors.push(
          mode === "dimensions"
            ? `${g.name} : indiquez la longueur et la largeur (en mètres).`
            : g.kind === "couleur"
              ? `${g.name} : précisez la couleur souhaitée.`
              : `${g.name} : précisez votre choix.`,
        );
      else lines.push(g.kind === "couleur" ? `${g.name} : autre couleur, ${text}` : mode === "dimensions" ? `${g.name} : sur mesure, ${text}` : `${g.name} : ${text}`);
      continue;
    }
    const v = g.values.find((x) => x.id === s.valueId);
    if (v) lines.push(`${g.name} : ${v.label}${v.note ? ` (${v.note})` : ""}`);
    else if (g.required) errors.push(`Choisissez : ${g.name.toLowerCase()}.`);
  }
  return { lines, errors };
}

/** Sélection de départ : la première couleur de chaque option « couleur » ; les listes restent à choisir. */
export function initialSelections(groups: OptionGroup[]): Selections {
  return Object.fromEntries(
    groups.map((g) => [
      g.id,
      {
        // Sans valeur prédéfinie, seule la saisie libre est possible : elle est sélectionnée d'office.
        valueId: g.values.length === 0 && customMode(g) !== "aucune" ? CUSTOM_VALUE : g.kind === "couleur" ? (g.values[0]?.id ?? null) : null,
        custom: "",
      },
    ]),
  );
}

export function selectedValueIds(sel: Selections) {
  return new Set(Object.values(sel).map((s) => s.valueId).filter((v): v is string => Boolean(v) && v !== CUSTOM_VALUE));
}

/** Options proposées par défaut à la création du catalogue (modifiables dans le portail). */
export function defaultRangeOptions(): Record<RangeId, OptionGroup[]> {
  const blanc = { label: "Blanc", hex: "#ffffff" };
  return {
    chapiteaux: [
      {
        id: "structure",
        name: "Structure",
        kind: "liste",
        required: true,
        custom: "aucune",
        values: [
          { id: "aluminium", label: "Aluminium", note: "naturel gris" },
          { id: "acier-noir", label: "Acier noir" },
        ],
      },
      {
        id: "couleur-fer",
        name: "Couleur du fer",
        kind: "couleur",
        required: false,
        custom: "aucune",
        values: [
          { id: "fer-gris", label: "Gris aluminium", hex: "#a7a9ac" },
          { id: "fer-noir", label: "Noir", hex: "#111111" },
          { id: "fer-blanc", ...blanc },
        ],
      },
      {
        id: "couleur-bache",
        name: "Couleur de la bâche",
        kind: "couleur",
        required: false,
        custom: "aucune",
        values: [
          { id: "bache-blanc", ...blanc },
          { id: "bache-rouge", label: "Rouge", hex: "#c62828" },
          { id: "bache-bleu", label: "Bleu", hex: "#1565c0" },
          { id: "bache-jaune", label: "Jaune", hex: "#f9c80e" },
          { id: "bache-vert", label: "Vert", hex: "#2e7d32" },
        ],
      },
      {
        id: "dimensions-chapiteau",
        name: "Dimensions",
        kind: "liste",
        required: true,
        custom: "dimensions",
        values: [
          { id: "dim-5x5", label: "5 × 5 m" },
          { id: "dim-10x10", label: "10 × 10 m" },
          { id: "dim-10x20", label: "10 × 20 m" },
        ],
      },
    ],
    "structures-metalliques": [
      { id: "dimensions-structure", name: "Dimensions", kind: "liste", required: true, custom: "dimensions", values: [] },
    ],
    baches: [
      {
        id: "couleur-bache-gamme",
        name: "Couleur",
        kind: "couleur",
        required: false,
        custom: "aucune",
        values: [
          { id: "b-blanc", ...blanc },
          { id: "b-rouge", label: "Rouge", hex: "#c62828" },
          { id: "b-bleu", label: "Bleu", hex: "#1565c0" },
        ],
      },
      { id: "dimensions-bache", name: "Dimensions", kind: "liste", required: true, custom: "dimensions", values: [] },
    ],
    tables: [
      // Le client peut toujours indiquer les dimensions voulues (désactivée pour les tables rondes, qui ont leur diamètre).
      { id: "dimensions-table", name: "Dimensions", kind: "liste", required: false, custom: "dimensions", values: [] },
    ],
    podiums: [{ id: "dimensions-podium", name: "Dimensions", kind: "liste", required: true, custom: "dimensions", values: [] }],
  };
}
