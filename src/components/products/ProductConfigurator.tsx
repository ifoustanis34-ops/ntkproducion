"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, Plus } from "lucide-react";
import type { CatalogColor, CatalogDimension, CatalogPhoto } from "@/lib/catalog/types";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  pageUrl: string;
  photos: CatalogPhoto[];
  colors: CatalogColor[];
  dimensions: CatalogDimension[];
  allowCustomDimensions: boolean;
};

const CUSTOM = "sur-mesure";

/** Photos correspondant à la sélection : les plus spécifiques d'abord, sinon les photos générales. */
function photosFor(photos: CatalogPhoto[], colorId: string | null, dimensionId: string | null) {
  const matching = photos.filter(
    (p) => (!p.colorId || p.colorId === colorId) && (!p.dimensionId || p.dimensionId === dimensionId),
  );
  const score = (p: CatalogPhoto) => (p.colorId ? 2 : 0) + (p.dimensionId ? 1 : 0);
  const list = matching.length ? matching : photos.filter((p) => !p.colorId && !p.dimensionId);
  return [...(list.length ? list : photos)].sort((a, b) => score(b) - score(a));
}

const num = (v: string) => {
  const n = Number(v.replace(",", "."));
  return Number.isFinite(n) && n > 0 && n <= 500 ? n : null;
};
const fmt = (n: number) => String(n).replace(".", ",");

/** Choix de la couleur, des dimensions et de la quantité, puis demande de devis sur WhatsApp. */
export function ProductConfigurator({ name, pageUrl, photos, colors, dimensions, allowCustomDimensions }: Props) {
  const [colorId, setColorId] = useState<string | null>(colors[0]?.id ?? null);
  const [dimension, setDimension] = useState<string | null>(null);
  const [custom, setCustom] = useState({ length: "", width: "", height: "" });
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const dimensionId = dimension && dimension !== CUSTOM ? dimension : null;
  const visible = useMemo(() => photosFor(photos, colorId, dimensionId), [photos, colorId, dimensionId]);
  const current = visible[Math.min(active, visible.length - 1)];
  const color = colors.find((c) => c.id === colorId);
  const askDimension = dimensions.length > 0 || allowCustomDimensions;

  const select = (fn: () => void) => {
    fn();
    setActive(0);
    setErrors([]);
  };

  function validate(): { ok: true; message: string } | { ok: false; errors: string[] } {
    const errs: string[] = [];
    let dimText: string | null = null;
    if (askDimension) {
      if (!dimension && dimensions.length > 0) errs.push("Choisissez une dimension.");
      const freeOnly = dimensions.length === 0;
      const empty = !custom.length.trim() && !custom.width.trim() && !custom.height.trim();
      if (freeOnly && empty) {
        dimText = "à préciser";
      } else if (dimension === CUSTOM || freeOnly) {
        const l = num(custom.length);
        const w = num(custom.width);
        const h = custom.height.trim() ? num(custom.height) : null;
        if (!l || !w) errs.push("Indiquez la longueur et la largeur souhaitées (en mètres).");
        else if (custom.height.trim() && !h) errs.push("La hauteur indiquée n'est pas valide.");
        else dimText = `Sur mesure : ${fmt(l)} m × ${fmt(w)} m${h ? ` (hauteur ${fmt(h)} m)` : ""}`;
      } else if (dimension) {
        dimText = dimensions.find((d) => d.id === dimension)?.label ?? null;
      }
    }
    if (errs.length) return { ok: false, errors: errs };
    const message = [
      `Bonjour NTK Production, je souhaite obtenir un devis pour : ${name}.`,
      color ? `• Couleur : ${color.name}` : null,
      dimText ? `• Dimensions : ${dimText}` : null,
      `• Quantité : ${qty}`,
      `Produit : ${pageUrl}`,
    ]
      .filter(Boolean)
      .join("\n");
    return { ok: true, message };
  }

  const result = validate();
  const href = result.ok ? whatsappUrl(result.message) : null;

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      {/* Photos */}
      <div className="self-start overflow-hidden rounded-3xl border border-steel-200 bg-white">
        <div className="relative aspect-[4/3] bg-steel-100">
          {current && (
            <Image
              key={current.id}
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              {...(current.blurDataURL ? { placeholder: "blur" as const, blurDataURL: current.blurDataURL } : {})}
              className="page-enter object-cover"
              style={current.focus ? { objectPosition: current.focus } : undefined}
            />
          )}
        </div>
        {visible.length > 1 && (
          <div className="flex flex-wrap gap-2 p-4" role="group" aria-label={`Photos : ${name}`}>
            {visible.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Afficher la photo ${i + 1} : ${img.alt}`}
                aria-pressed={img.id === current?.id}
                className={cn(
                  "relative size-14 shrink-0 overflow-hidden rounded-lg ring-2 ring-offset-2 transition-all",
                  img.id === current?.id ? "ring-royal-600" : "opacity-70 ring-transparent hover:opacity-100",
                )}
              >
                <Image src={img.src} alt="" fill sizes="112px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Configuration */}
      <div className="space-y-8">
        {colors.length > 0 && (
          <fieldset>
            <legend className="text-sm font-semibold tracking-[0.14em] text-navy-900 uppercase">
              Couleur : <span className="font-medium tracking-normal normal-case text-muted-foreground">{color?.name}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {colors.map((c) => {
                const selected = c.id === colorId;
                const hasPhoto = photos.some((p) => p.colorId === c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => select(() => setColorId(c.id))}
                    aria-pressed={selected}
                    title={c.name + (hasPhoto ? "" : " (photo non disponible)")}
                    className={cn(
                      "flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-sm font-medium transition-colors",
                      selected ? "border-royal-600 bg-royal-600/5 text-navy-900" : "border-steel-200 text-navy-900 hover:border-steel-400",
                    )}
                  >
                    <span
                      className="relative inline-flex size-7 items-center justify-center rounded-full border border-black/10"
                      style={{ background: c.hex }}
                    >
                      {selected && <Check className="size-4 text-white mix-blend-difference" />}
                    </span>
                    {c.name}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {askDimension && (
          <fieldset>
            <legend className="text-sm font-semibold tracking-[0.14em] text-navy-900 uppercase">
              Dimensions
              {dimensions.length === 0 && (
                <span className="font-medium tracking-normal normal-case text-muted-foreground"> — facultatif</span>
              )}
            </legend>
            {dimensions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {[...dimensions, ...(allowCustomDimensions ? [{ id: CUSTOM, label: "Sur mesure" }] : [])].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => select(() => setDimension(d.id))}
                    aria-pressed={dimension === d.id}
                    className={cn(
                      "min-h-11 rounded-xl border px-4 text-sm font-semibold transition-colors",
                      dimension === d.id
                        ? "border-royal-600 bg-royal-600 text-white"
                        : "border-steel-200 text-navy-900 hover:border-steel-400",
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            )}
            {(dimension === CUSTOM || (dimensions.length === 0 && allowCustomDimensions)) && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {(
                  [
                    ["length", "Longueur (m)", true],
                    ["width", "Largeur (m)", true],
                    ["height", "Hauteur (m)", false],
                  ] as const
                ).map(([key, label, required]) => (
                  <label key={key} className="text-sm">
                    <span className="mb-1.5 block font-medium text-navy-900">
                      {label}
                      {!required && <span className="font-normal text-muted-foreground"> — facultatif</span>}
                    </span>
                    <input
                      inputMode="decimal"
                      value={custom[key]}
                      onChange={(e) => {
                        setCustom((c) => ({ ...c, [key]: e.target.value }));
                        setErrors([]);
                      }}
                      placeholder={key === "height" ? "—" : "ex. 10"}
                      className="h-11 w-full rounded-lg border border-steel-300 bg-white px-3 text-base text-navy-900 outline-none focus-visible:border-royal-600 focus-visible:ring-3 focus-visible:ring-royal-600/20"
                    />
                  </label>
                ))}
              </div>
            )}
          </fieldset>
        )}

        <fieldset>
          <legend className="text-sm font-semibold tracking-[0.14em] text-navy-900 uppercase">Quantité</legend>
          <div className="mt-3 inline-flex items-center rounded-xl border border-steel-200">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Diminuer la quantité"
              className="inline-flex size-11 items-center justify-center text-navy-900 hover:bg-steel-50"
            >
              <Minus className="size-4" />
            </button>
            <input
              inputMode="numeric"
              aria-label="Quantité"
              value={qty}
              onChange={(e) => {
                const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
                setQty(Number.isFinite(n) ? Math.min(999, Math.max(1, n)) : 1);
              }}
              className="h-11 w-16 border-x border-steel-200 text-center text-base font-semibold text-navy-900 outline-none"
            />
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(999, q + 1))}
              aria-label="Augmenter la quantité"
              className="inline-flex size-11 items-center justify-center text-navy-900 hover:bg-steel-50"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </fieldset>

        <div>
          {errors.length > 0 && (
            <ul role="alert" className="mb-4 space-y-1 rounded-xl bg-red-50 p-4 text-sm text-red-700">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
          <a
            href={href ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!result.ok) {
                e.preventDefault();
                setErrors(result.errors);
              } else if (!href) {
                e.preventDefault();
                router.push("/contact#devis");
              }
            }}
            className={cn(buttonStyles({ variant: "whatsapp", size: "lg" }), "w-full")}
          >
            <WhatsAppIcon /> Demander le devis sur WhatsApp
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            Votre choix est envoyé dans un message WhatsApp prérempli : vous pouvez le compléter avant de l&apos;envoyer. Prix et
            disponibilité communiqués sur devis.
          </p>
        </div>
      </div>
    </div>
  );
}
