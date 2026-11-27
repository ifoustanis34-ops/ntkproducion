"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import type { CatalogPhoto, OptionGroup } from "@/lib/catalog/types";
import {
  CUSTOM_VALUE,
  customLabel,
  customMode,
  describeSelections,
  initialSelections,
  photosFor,
  selectedValueIds,
  type Selections,
} from "@/lib/catalog/options";
import { cart, useCart } from "@/lib/cart";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  slug: string;
  pageUrl: string;
  photos: CatalogPhoto[];
  groups: OptionGroup[];
  /** "page" : fiche produit (2 colonnes, devis direct possible) ; "dialog" : fenêtre de la page Commande */
  layout?: "page" | "dialog";
  onAdded?: () => void;
};

const inputCls =
  "h-11 w-full rounded-lg border border-steel-300 bg-white px-3 text-base text-navy-900 outline-none focus-visible:border-royal-600 focus-visible:ring-3 focus-visible:ring-royal-600/20";

/** Choix des options et de la quantité, ajout à la commande ou demande de devis directe sur WhatsApp. */
export function ProductConfigurator({ name, slug, pageUrl, photos, groups, layout = "page", onAdded }: Props) {
  const [sel, setSel] = useState<Selections>(() => initialSelections(groups));
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const cartLines = useCart();

  const chosen = useMemo(() => selectedValueIds(sel), [sel]);
  const visible = useMemo(() => photosFor(photos, chosen), [photos, chosen]);
  const current = visible[Math.min(active, visible.length - 1)];
  const result = describeSelections(groups, sel);

  const set = (groupId: string, patch: Partial<Selections[string]>) => {
    setSel((s) => ({ ...s, [groupId]: { ...(s[groupId] ?? { valueId: null, custom: "" }), ...patch } }));
    setActive(0);
    setErrors([]);
    setAdded(false);
  };

  const message = [
    `Bonjour NTK Production, je souhaite obtenir un devis pour : ${name}.`,
    ...result.lines.map((l) => `• ${l}`),
    `• Quantité : ${qty}`,
    `Produit : ${pageUrl}`,
  ].join("\n");
  const waHref = whatsappUrl(message);

  function addToOrder() {
    if (result.errors.length) return setErrors(result.errors);
    cart.add({ slug, name, image: current?.src, lines: result.lines, qty });
    setAdded(true);
    onAdded?.();
  }

  const photosBlock = (
    <div className={cn("self-start overflow-hidden rounded-3xl border border-steel-200 bg-white", layout === "dialog" && "rounded-2xl")}>
      <div className={cn("relative bg-steel-100", layout === "dialog" ? "aspect-[16/10]" : "aspect-[4/3]")}>
        {current && (
          <Image
            key={current.id}
            src={current.src}
            alt={current.alt}
            fill
            sizes={layout === "dialog" ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 1024px) 45vw, 100vw"}
            {...(current.blurDataURL ? { placeholder: "blur" as const, blurDataURL: current.blurDataURL } : {})}
            className="page-enter object-cover"
            style={current.focus ? { objectPosition: current.focus } : undefined}
          />
        )}
      </div>
      {visible.length > 1 && (
        <div className="flex flex-wrap gap-2 p-3" role="group" aria-label={`Photos : ${name}`}>
          {visible.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Afficher la photo ${i + 1} : ${img.alt}`}
              aria-pressed={img.id === current?.id}
              className={cn(
                "relative size-12 shrink-0 overflow-hidden rounded-lg ring-2 ring-offset-2 transition-all",
                img.id === current?.id ? "ring-royal-600" : "opacity-70 ring-transparent hover:opacity-100",
              )}
            >
              <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={cn("grid gap-8", layout === "page" ? "lg:grid-cols-2 lg:gap-14" : "md:grid-cols-[0.9fr_1.1fr] md:gap-8")}>
      {photosBlock}

      <div className="space-y-7">
        {groups.map((g) => {
          const s = sel[g.id] ?? { valueId: null, custom: "" };
          const chosenValue = g.values.find((v) => v.id === s.valueId);
          const isCustom = s.valueId === CUSTOM_VALUE;
          const mode = customMode(g);
          const [L = "", W = "", H = ""] = s.custom.split("|");
          return (
            <fieldset key={g.id}>
              <legend className="text-sm font-semibold tracking-[0.12em] text-navy-900 uppercase">
                {g.name}
                {!g.required && <span className="font-normal tracking-normal normal-case text-muted-foreground"> — facultatif</span>}
                {chosenValue && (
                  <span className="font-medium tracking-normal normal-case text-muted-foreground">
                    {" "}
                    : {chosenValue.label}
                    {chosenValue.note ? ` (${chosenValue.note})` : ""}
                  </span>
                )}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.values.map((v) => {
                  const selected = s.valueId === v.id;
                  return g.kind === "couleur" ? (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => set(g.id, { valueId: selected && !g.required ? null : v.id })}
                      aria-pressed={selected}
                      className={cn(
                        "flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-sm font-medium transition-colors",
                        selected ? "border-royal-600 bg-royal-600/5 text-navy-900" : "border-steel-200 text-navy-900 hover:border-steel-400",
                      )}
                    >
                      <span className="relative inline-flex size-7 items-center justify-center rounded-full border border-black/10" style={{ background: v.hex }}>
                        {selected && <Check className="size-4 text-white mix-blend-difference" />}
                      </span>
                      {v.label}
                    </button>
                  ) : (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => set(g.id, { valueId: selected && !g.required ? null : v.id })}
                      aria-pressed={selected}
                      className={cn(
                        "min-h-11 rounded-xl border px-4 py-1.5 text-left text-sm font-semibold transition-colors",
                        selected ? "border-royal-600 bg-royal-600 text-white" : "border-steel-200 text-navy-900 hover:border-steel-400",
                      )}
                    >
                      {v.label}
                      {v.note && <span className={cn("block text-xs font-normal", selected ? "text-white/80" : "text-muted-foreground")}>{v.note}</span>}
                    </button>
                  );
                })}
                {mode !== "aucune" && g.values.length > 0 && (
                  <button
                    type="button"
                    onClick={() => set(g.id, { valueId: CUSTOM_VALUE })}
                    aria-pressed={isCustom}
                    className={cn(
                      "min-h-11 rounded-xl border px-4 text-sm font-semibold transition-colors",
                      isCustom ? "border-royal-600 bg-royal-600 text-white" : "border-dashed border-steel-300 text-navy-900 hover:border-steel-500",
                    )}
                  >
                    {customLabel(g)}
                  </button>
                )}
              </div>
              {isCustom && mode === "dimensions" && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {(
                    [
                      ["Longueur (m)", L, 0],
                      ["Largeur (m)", W, 1],
                      ["Hauteur (m)", H, 2],
                    ] as const
                  ).map(([label, val, idx]) => (
                    <label key={label} className="text-sm">
                      <span className="mb-1.5 block font-medium text-navy-900">
                        {label}
                        {idx === 2 && <span className="font-normal text-muted-foreground"> — facultatif</span>}
                      </span>
                      <input
                        inputMode="decimal"
                        value={val}
                        placeholder={idx === 2 ? "—" : "ex. 10"}
                        onChange={(e) => {
                          const parts = [L, W, H];
                          parts[idx] = e.target.value.replace(/\|/g, "");
                          set(g.id, { custom: parts.join("|") });
                        }}
                        className={inputCls}
                      />
                    </label>
                  ))}
                </div>
              )}
              {isCustom && mode === "texte" && (
                <input
                  value={s.custom}
                  maxLength={120}
                  placeholder={g.kind === "couleur" ? "Écrivez la couleur souhaitée (ex. bleu nuit)" : "Précisez votre besoin"}
                  aria-label={`${g.name} sur mesure`}
                  onChange={(e) => set(g.id, { custom: e.target.value })}
                  className={cn(inputCls, "mt-3")}
                />
              )}
            </fieldset>
          );
        })}

        <fieldset>
          <legend className="text-sm font-semibold tracking-[0.12em] text-navy-900 uppercase">Quantité</legend>
          <div className="mt-3 inline-flex items-center rounded-xl border border-steel-200">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Diminuer la quantité" className="inline-flex size-11 items-center justify-center text-navy-900 hover:bg-steel-50">
              <Minus className="size-4" />
            </button>
            <input
              inputMode="numeric"
              aria-label="Quantité"
              value={qty}
              onChange={(e) => {
                const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
                setQty(Number.isFinite(n) ? Math.min(999, Math.max(1, n)) : 1);
                setAdded(false);
              }}
              className="h-11 w-16 border-x border-steel-200 text-center text-base font-semibold text-navy-900 outline-none"
            />
            <button type="button" onClick={() => setQty((q) => Math.min(999, q + 1))} aria-label="Augmenter la quantité" className="inline-flex size-11 items-center justify-center text-navy-900 hover:bg-steel-50">
              <Plus className="size-4" />
            </button>
          </div>
        </fieldset>

        <div className="space-y-3">
          {errors.length > 0 && (
            <ul role="alert" className="space-y-1 rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
          {added && (
            <p role="status" className="rounded-xl bg-green-50 p-4 text-sm text-green-800">
              Ajouté à votre commande ({cartLines.length} article{cartLines.length > 1 ? "s" : ""}).{" "}
              {layout === "page" && (
                <Link href="/commande#ma-commande" className="font-semibold underline">
                  Voir ma commande
                </Link>
              )}
            </p>
          )}
          <button type="button" onClick={addToOrder} className={cn(buttonStyles({ variant: "primary", size: "lg" }), "w-full")}>
            <ShoppingBag /> Ajouter à ma commande
          </button>
          {layout === "page" && (
            <a
              href={waHref ?? "/contact#devis"}
              target={waHref ? "_blank" : undefined}
              rel="noopener noreferrer"
              onClick={(e) => {
                if (result.errors.length) {
                  e.preventDefault();
                  setErrors(result.errors);
                }
              }}
              className={cn(buttonStyles({ variant: "whatsapp", size: "lg" }), "w-full")}
            >
              <WhatsAppIcon /> Demander ce produit seul sur WhatsApp
            </a>
          )}
          <p className="text-sm text-muted-foreground">
            Ajoutez plusieurs produits à votre commande, puis envoyez-la en un seul message WhatsApp. Prix et disponibilité
            communiqués sur devis.
          </p>
        </div>
      </div>
    </div>
  );
}
