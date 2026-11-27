"use client";

import { useActionState, useState } from "react";
import { saveProductAction, type FormState } from "@/app/admin/actions";
import type { CatalogProduct, OptionGroup, RangeId } from "@/lib/catalog/types";
import { rangeIds, rangeLabels } from "@/lib/catalog/types";
import { slugify } from "@/lib/catalog/slug";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buttonStyles } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";
import { OptionGroupsEditor } from "./OptionGroupsEditor";

const field = "h-11";

export function ProductForm({
  product,
  defaultRange,
  rangeOptions,
}: {
  product?: CatalogProduct;
  defaultRange?: RangeId;
  /** Options définies pour chaque gamme (portail > Options par gamme) */
  rangeOptions: Record<RangeId, OptionGroup[]>;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProductAction, {});
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [range, setRange] = useState<RangeId>(product?.range ?? defaultRange ?? "chapiteaux");
  const [options, setOptions] = useState<OptionGroup[]>(product?.options ?? []);
  const [disabled, setDisabled] = useState<string[]>(product?.disabledRangeOptions ?? []);
  const inherited = rangeOptions[range] ?? [];

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="id" value={product?.id ?? ""} />
      {disabled.map((id) => (
        <input key={id} type="hidden" name="disabledRangeOptions" value={id} />
      ))}

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

      {/* Options */}
      <section className="space-y-5 rounded-3xl border border-steel-200 bg-white p-5 sm:p-7">
        <div>
          <h2 className="text-lg font-bold text-navy-900">Options proposées au client</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Le client choisit une valeur pour chaque option (couleur, structure, dimensions, diamètre…) avant d&apos;envoyer sa demande.
            Vous pourrez ensuite associer des photos à chaque valeur (section Photos).
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-navy-900">Options de la gamme « {rangeLabels[range]} »</h3>
          {inherited.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Aucune option commune pour cette gamme.{" "}
              <a href="/admin/options" className="font-medium text-royal-600 underline">
                Définir les options par gamme
              </a>
            </p>
          ) : (
            <ul className="mt-2 space-y-2">
              {inherited.map((g) => (
                <li key={g.id}>
                  <label className="flex items-start gap-2 text-sm text-navy-900">
                    <input
                      type="checkbox"
                      className="mt-0.5 size-4"
                      checked={!disabled.includes(g.id)}
                      onChange={(e) => setDisabled(e.target.checked ? disabled.filter((x) => x !== g.id) : [...disabled, g.id])}
                    />
                    <span>
                      <strong>{g.name}</strong>
                      <span className="text-muted-foreground"> — {g.values.map((v) => v.label).join(", ") || "saisie libre"}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            Décochez une option si elle ne concerne pas ce produit. Les valeurs se modifient dans{" "}
            <a href="/admin/options" className="underline">
              Options par gamme
            </a>
            .
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-navy-900">Options propres à ce produit</h3>
          <OptionGroupsEditor name="options" groups={options} onChange={setOptions} />
        </div>
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
