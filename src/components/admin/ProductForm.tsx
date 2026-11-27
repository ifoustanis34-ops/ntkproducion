"use client";

import { useActionState, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { saveProductAction, type FormState } from "@/app/admin/actions";
import type { CatalogColor, CatalogDimension, CatalogProduct, RangeId } from "@/lib/catalog/types";
import { rangeIds, rangeLabels } from "@/lib/catalog/types";
import { slugify } from "@/lib/catalog/slug";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buttonStyles } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

const COLOR_PRESETS: Omit<CatalogColor, "id">[] = [
  { name: "Blanc", hex: "#ffffff" },
  { name: "Noir", hex: "#111111" },
  { name: "Rouge", hex: "#c62828" },
  { name: "Bordeaux", hex: "#6d1b2b" },
  { name: "Bleu", hex: "#1565c0" },
  { name: "Bleu ciel", hex: "#64b5f6" },
  { name: "Vert", hex: "#2e7d32" },
  { name: "Jaune", hex: "#f9c80e" },
  { name: "Doré", hex: "#c9a227" },
  { name: "Beige", hex: "#e8dcc2" },
  { name: "Gris", hex: "#9e9e9e" },
];

const DIMENSION_PRESETS: Record<RangeId, string[]> = {
  chapiteaux: ["3 × 3 m", "5 × 5 m", "6 × 6 m", "10 × 10 m", "10 × 20 m", "10 × 30 m"],
  "structures-metalliques": ["10 × 15 m", "15 × 20 m", "20 × 30 m", "20 × 40 m"],
  baches: ["3 × 4 m", "4 × 6 m", "6 × 8 m", "8 × 10 m"],
  tables: ["Ø 1,20 m", "Ø 1,50 m", "Ø 1,80 m", "1,80 × 0,75 m", "2,40 × 0,75 m"],
  podiums: ["4 × 3 m", "6 × 4 m", "8 × 6 m", "10 × 8 m", "12 × 10 m"],
};

const newId = () => Math.random().toString(16).slice(2, 10).padEnd(8, "0");

const field = "h-11";

export function ProductForm({ product, defaultRange }: { product?: CatalogProduct; defaultRange?: RangeId }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProductAction, {});
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [range, setRange] = useState<RangeId>(product?.range ?? defaultRange ?? "chapiteaux");
  const [colors, setColors] = useState<CatalogColor[]>(product?.colors ?? []);
  const [dimensions, setDimensions] = useState<CatalogDimension[]>(product?.dimensions ?? []);

  const addColor = (c: Omit<CatalogColor, "id">) => {
    if (colors.some((x) => x.name.toLowerCase() === c.name.toLowerCase())) return;
    setColors([...colors, { id: newId(), ...c }]);
  };
  const addDimension = (label: string) => {
    if (dimensions.some((d) => d.label === label)) return;
    setDimensions([...dimensions, { id: newId(), label }]);
  };

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="id" value={product?.id ?? ""} />
      <input type="hidden" name="colors" value={JSON.stringify(colors)} />
      <input type="hidden" name="dimensions" value={JSON.stringify(dimensions)} />

      {/* Informations */}
      <section className="space-y-5 rounded-3xl border border-steel-200 bg-white p-5 sm:p-7">
        <h2 className="text-lg font-bold text-navy-900">Informations</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name" className="mb-2">
              Nom du produit *
            </Label>
            <Input
              id="name"
              name="name"
              required
              maxLength={120}
              className={field}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              placeholder="ex. Tente pagode"
            />
          </div>
          <div>
            <Label htmlFor="range" className="mb-2">
              Gamme *
            </Label>
            <select
              id="range"
              name="range"
              value={range}
              onChange={(e) => setRange(e.target.value as RangeId)}
              className="h-11 w-full rounded-lg border border-input bg-white px-3 text-base"
            >
              {rangeIds.map((r) => (
                <option key={r} value={r}>
                  {rangeLabels[r]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="slug" className="mb-2">
              Adresse de la page
            </Label>
            <div className="flex items-center rounded-lg border border-input bg-steel-50 pl-3 text-sm text-muted-foreground">
              /produits/
              <input
                id="slug"
                name="slug"
                maxLength={80}
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                className="h-11 min-w-0 flex-1 rounded-r-lg bg-white px-2 text-base text-navy-900 outline-none"
              />
            </div>
            {product && <p className="mt-1 text-xs text-muted-foreground">Changer l&apos;adresse casse les liens déjà partagés.</p>}
          </div>
          <div>
            <Label htmlFor="messageLabel" className="mb-2">
              Nom dans le message WhatsApp
            </Label>
            <Input id="messageLabel" name="messageLabel" maxLength={120} className={field} defaultValue={product?.messageLabel} placeholder="ex. tente pagode" />
          </div>
        </div>
        <div>
          <Label htmlFor="description" className="mb-2">
            Description courte * <span className="font-normal text-muted-foreground">(1 à 2 phrases, affichée sur les cartes)</span>
          </Label>
          <Textarea id="description" name="description" required maxLength={600} rows={2} defaultValue={product?.description} />
        </div>
        <div>
          <Label htmlFor="details" className="mb-2">
            Présentation détaillée <span className="font-normal text-muted-foreground">(une ligne vide entre deux paragraphes)</span>
          </Label>
          <Textarea id="details" name="details" maxLength={4000} rows={5} defaultValue={product?.details.join("\n\n")} />
        </div>
        <div>
          <Label htmlFor="uses" className="mb-2">
            Usages <span className="font-normal text-muted-foreground">(un par ligne : mariages, obsèques…)</span>
          </Label>
          <Textarea id="uses" name="uses" maxLength={1500} rows={3} defaultValue={product?.uses.join("\n")} />
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-navy-900">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="prestation-fabrication" defaultChecked={product ? product.prestations.includes("fabrication") : true} className="size-4" />
            Fabrication
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="prestation-vente" defaultChecked={product ? product.prestations.includes("vente") : true} className="size-4" />
            Vente
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="published" defaultChecked={product?.published ?? true} className="size-4" />
            Publié sur le site
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} className="size-4" />
            Mis en avant sur l&apos;accueil
          </label>
        </div>
      </section>

      {/* Couleurs */}
      <section className="space-y-4 rounded-3xl border border-steel-200 bg-white p-5 sm:p-7">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Couleurs proposées</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Le visiteur choisit parmi ces couleurs. Vous pourrez ensuite associer des photos à chaque couleur (section Photos).
          </p>
        </div>
        {colors.length > 0 && (
          <ul className="space-y-2">
            {colors.map((c, i) => (
              <li key={c.id} className="flex items-center gap-3">
                <input
                  type="color"
                  aria-label={`Teinte de ${c.name || "la couleur"}`}
                  value={c.hex}
                  onChange={(e) => setColors(colors.map((x, j) => (j === i ? { ...x, hex: e.target.value } : x)))}
                  className="h-11 w-14 cursor-pointer rounded-lg border border-input bg-white p-1"
                />
                <Input
                  aria-label="Nom de la couleur"
                  value={c.name}
                  maxLength={40}
                  onChange={(e) => setColors(colors.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                  className={cn(field, "flex-1")}
                />
                <button
                  type="button"
                  onClick={() => setColors(colors.filter((_, j) => j !== i))}
                  aria-label={`Supprimer ${c.name}`}
                  className="rounded-lg p-2.5 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.filter((p) => !colors.some((c) => c.name === p.name)).map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => addColor(p)}
              className="inline-flex items-center gap-2 rounded-full border border-steel-200 py-1 pr-3 pl-1 text-sm hover:border-steel-400"
            >
              <span className="size-6 rounded-full border border-black/10" style={{ background: p.hex }} />+ {p.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setColors([...colors, { id: newId(), name: "", hex: "#888888" }])}
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-steel-300 px-3 py-1 text-sm hover:border-steel-500"
          >
            <Plus className="size-4" /> Autre couleur
          </button>
        </div>
      </section>

      {/* Dimensions */}
      <section className="space-y-4 rounded-3xl border border-steel-200 bg-white p-5 sm:p-7">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Dimensions proposées</h2>
          <p className="mt-1 text-sm text-muted-foreground">Le visiteur choisit l&apos;une de ces tailles.</p>
        </div>
        {dimensions.length > 0 && (
          <ul className="space-y-2">
            {dimensions.map((d, i) => (
              <li key={d.id} className="flex items-center gap-3">
                <Input
                  aria-label="Dimension"
                  value={d.label}
                  maxLength={40}
                  onChange={(e) => setDimensions(dimensions.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                  className={cn(field, "flex-1")}
                />
                <button
                  type="button"
                  onClick={() => setDimensions(dimensions.filter((_, j) => j !== i))}
                  aria-label={`Supprimer ${d.label}`}
                  className="rounded-lg p-2.5 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-2">
          {DIMENSION_PRESETS[range]
            .filter((l) => !dimensions.some((d) => d.label === l))
            .map((l) => (
              <button key={l} type="button" onClick={() => addDimension(l)} className="rounded-full border border-steel-200 px-3 py-1.5 text-sm hover:border-steel-400">
                + {l}
              </button>
            ))}
          <button
            type="button"
            onClick={() => setDimensions([...dimensions, { id: newId(), label: "" }])}
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-steel-300 px-3 py-1.5 text-sm hover:border-steel-500"
          >
            <Plus className="size-4" /> Autre dimension
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm text-navy-900">
          <input type="checkbox" name="allowCustomDimensions" defaultChecked={product?.allowCustomDimensions ?? true} className="size-4" />
          Proposer aussi « Sur mesure » (le visiteur saisit ses propres dimensions)
        </label>
      </section>

      <div className="sticky bottom-4 z-10 flex flex-wrap items-center gap-4 rounded-2xl border border-steel-200 bg-white/95 p-4 shadow-lg backdrop-blur">
        <button disabled={pending} className={cn(buttonStyles({ variant: "primary" }), "disabled:opacity-60")}>
          {pending ? "Enregistrement…" : product ? "Enregistrer les modifications" : "Créer le produit"}
        </button>
        {state.error && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {state.error}
          </p>
        )}
        {state.ok && !pending && (
          <p role="status" className="text-sm font-medium text-green-700">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
