"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { OptionCustom, OptionGroup, OptionValue } from "@/lib/catalog/types";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const newId = () => Math.random().toString(36).slice(2, 10);

const COLOR_PRESETS: Omit<OptionValue, "id">[] = [
  { label: "Blanc", hex: "#ffffff" },
  { label: "Noir", hex: "#111111" },
  { label: "Gris aluminium", hex: "#a7a9ac" },
  { label: "Rouge", hex: "#c62828" },
  { label: "Bordeaux", hex: "#6d1b2b" },
  { label: "Bleu", hex: "#1565c0" },
  { label: "Bleu ciel", hex: "#64b5f6" },
  { label: "Vert", hex: "#2e7d32" },
  { label: "Jaune", hex: "#f9c80e" },
  { label: "Doré", hex: "#c9a227" },
  { label: "Beige", hex: "#e8dcc2" },
];

/** Modèles d'options pour démarrer vite (tout reste modifiable). */
const GROUP_PRESETS: Omit<OptionGroup, "id">[] = [
  { name: "Couleur", kind: "couleur", required: false, custom: "aucune", values: [] },
  { name: "Couleur de la bâche", kind: "couleur", required: false, custom: "aucune", values: [] },
  { name: "Couleur du fer", kind: "couleur", required: false, custom: "aucune", values: [] },
  { name: "Structure", kind: "liste", required: true, custom: "aucune", values: [] },
  { name: "Dimensions", kind: "liste", required: true, custom: "dimensions", values: [] },
  { name: "Diamètre", kind: "liste", required: true, custom: "texte", values: [] },
];

const customLabels: Record<OptionCustom, string> = {
  aucune: "Non",
  texte: "Oui, texte libre",
  dimensions: "Oui, longueur × largeur (× hauteur)",
};

const field = "h-10";
const iconBtn = "rounded-lg p-2 text-navy-900 hover:bg-steel-100 disabled:opacity-30";

/** Éditeur d'une liste d'options (nom, type, valeurs, saisie libre), sérialisée dans un champ caché. */
export function OptionGroupsEditor({
  name,
  groups,
  onChange,
}: {
  /** Nom du champ caché envoyé au serveur */
  name: string;
  groups: OptionGroup[];
  onChange: (g: OptionGroup[]) => void;
}) {
  const update = (i: number, patch: Partial<OptionGroup>) => onChange(groups.map((g, j) => (j === i ? { ...g, ...patch } : g)));
  const move = <T,>(list: T[], i: number, dir: -1 | 1) => {
    const next = [...list];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    return next;
  };

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={JSON.stringify(groups)} />

      {groups.map((g, i) => {
        const setValues = (values: OptionValue[]) => update(i, { values });
        return (
          <fieldset key={g.id} className="rounded-2xl border border-steel-200 bg-steel-50/60 p-4">
            <div className="flex flex-wrap items-end gap-3">
              <label className="min-w-48 flex-1 text-sm">
                <span className="mb-1 block font-medium text-navy-900">Nom de l&apos;option</span>
                <Input value={g.name} maxLength={60} onChange={(e) => update(i, { name: e.target.value })} className={field} placeholder="ex. Couleur de la bâche" />
              </label>
              <label className="text-sm">
                <span className="mb-1 block font-medium text-navy-900">Type</span>
                <select
                  value={g.kind}
                  onChange={(e) => update(i, { kind: e.target.value as OptionGroup["kind"] })}
                  className="h-10 rounded-lg border border-input bg-white px-2"
                >
                  <option value="couleur">Couleurs (pastilles)</option>
                  <option value="liste">Liste de choix</option>
                </select>
              </label>
              <div className="flex items-center gap-1">
                <button type="button" disabled={i === 0} onClick={() => onChange(move(groups, i, -1))} aria-label="Monter l'option" className={iconBtn}>
                  <ArrowUp className="size-4" />
                </button>
                <button type="button" disabled={i === groups.length - 1} onClick={() => onChange(move(groups, i, 1))} aria-label="Descendre l'option" className={iconBtn}>
                  <ArrowDown className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => confirm(`Supprimer l'option « ${g.name || "sans nom"} » ?`) && onChange(groups.filter((_, j) => j !== i))}
                  aria-label="Supprimer l'option"
                  className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-900">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={g.required} onChange={(e) => update(i, { required: e.target.checked })} className="size-4" />
                Choix obligatoire
              </label>
              <label className="inline-flex items-center gap-2">
                « Sur mesure » :
                <select value={g.custom} onChange={(e) => update(i, { custom: e.target.value as OptionCustom })} className="h-9 rounded-lg border border-input bg-white px-2">
                  {(Object.keys(customLabels) as OptionCustom[]).map((k) => (
                    <option key={k} value={k}>
                      {customLabels[k]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <ul className="mt-4 space-y-2">
              {g.values.map((v, k) => (
                <li key={v.id} className="flex flex-wrap items-center gap-2">
                  {g.kind === "couleur" && (
                    <input
                      type="color"
                      aria-label={`Teinte de ${v.label || "la valeur"}`}
                      value={v.hex ?? "#ffffff"}
                      onChange={(e) => setValues(g.values.map((x, j) => (j === k ? { ...x, hex: e.target.value } : x)))}
                      className="h-10 w-12 cursor-pointer rounded-lg border border-input bg-white p-1"
                    />
                  )}
                  <Input
                    aria-label="Valeur"
                    value={v.label}
                    maxLength={60}
                    placeholder={g.kind === "couleur" ? "ex. Blanc" : "ex. Ø 150 cm"}
                    onChange={(e) => setValues(g.values.map((x, j) => (j === k ? { ...x, label: e.target.value } : x)))}
                    className={cn(field, "min-w-36 flex-1")}
                  />
                  <Input
                    aria-label="Précision (facultatif)"
                    value={v.note ?? ""}
                    maxLength={60}
                    placeholder="Précision (ex. 10 places)"
                    onChange={(e) => setValues(g.values.map((x, j) => (j === k ? { ...x, note: e.target.value } : x)))}
                    className={cn(field, "min-w-36 flex-1")}
                  />
                  <span className="flex">
                    <button type="button" disabled={k === 0} onClick={() => setValues(move(g.values, k, -1))} aria-label="Monter" className={iconBtn}>
                      <ArrowUp className="size-4" />
                    </button>
                    <button type="button" disabled={k === g.values.length - 1} onClick={() => setValues(move(g.values, k, 1))} aria-label="Descendre" className={iconBtn}>
                      <ArrowDown className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setValues(g.values.filter((_, j) => j !== k))}
                      aria-label={`Supprimer ${v.label}`}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-2">
              {g.kind === "couleur" &&
                COLOR_PRESETS.filter((c) => !g.values.some((v) => v.label === c.label)).map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setValues([...g.values, { id: newId(), ...c }])}
                    className="inline-flex items-center gap-1.5 rounded-full border border-steel-200 bg-white py-1 pr-3 pl-1 text-sm hover:border-steel-400"
                  >
                    <span className="size-5 rounded-full border border-black/10" style={{ background: c.hex }} />+ {c.label}
                  </button>
                ))}
              <button
                type="button"
                onClick={() => setValues([...g.values, { id: newId(), label: "", ...(g.kind === "couleur" ? { hex: "#888888" } : {}) }])}
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-steel-300 bg-white px-3 py-1 text-sm hover:border-steel-500"
              >
                <Plus className="size-4" /> {g.kind === "couleur" ? "Autre couleur" : "Ajouter une valeur"}
              </button>
            </div>
          </fieldset>
        );
      })}

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">Ajouter une option :</span>
        {GROUP_PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => onChange([...groups, { id: newId(), ...p, values: [] }])}
            className="rounded-full border border-steel-200 bg-white px-3 py-1.5 hover:border-steel-400"
          >
            + {p.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChange([...groups, { id: newId(), name: "", kind: "liste", required: false, custom: "aucune", values: [] }])}
          className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-steel-300 bg-white px-3 py-1.5 hover:border-steel-500"
        >
          <Plus className="size-4" /> Option personnalisée
        </button>
      </div>
    </div>
  );
}
