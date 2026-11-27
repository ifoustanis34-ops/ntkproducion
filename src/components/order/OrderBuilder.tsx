"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import type { CatalogPhoto, OptionGroup, RangeId } from "@/lib/catalog/types";
import { cart, orderWhatsappUrl, useCart, type OrderInfo } from "@/lib/cart";
import { ProductConfigurator } from "@/components/products/ProductConfigurator";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

export type OrderProduct = {
  slug: string;
  name: string;
  range: RangeId;
  description: string;
  photos: CatalogPhoto[];
  groups: OptionGroup[];
};

type Props = {
  ranges: { id: RangeId; title: string }[];
  products: OrderProduct[];
  siteUrl: string;
};

const fieldCls =
  "h-11 w-full rounded-lg border border-steel-300 bg-white px-3 text-base text-navy-900 outline-none focus-visible:border-royal-600 focus-visible:ring-3 focus-visible:ring-royal-600/20";

/** Page Commande : catalogue par catégorie, choix des options dans une fenêtre, récapitulatif envoyé sur WhatsApp. */
export function OrderBuilder({ ranges, products, siteUrl }: Props) {
  const lines = useCart();
  const [open, setOpen] = useState<OrderProduct | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [info, setInfo] = useState<OrderInfo>({ name: "", place: "", date: "" });
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const visibleRanges = ranges.filter((r) => products.some((p) => p.range === r.id));
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const waHref = lines.length ? orderWhatsappUrl(lines, info) : null;

  return (
    <>
      <nav aria-label="Catégories" className="sticky top-0 z-30 border-b border-steel-200 bg-white/90 backdrop-blur-xl">
        <ul className="container-site flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {visibleRanges.map((r) => (
            <li key={r.id} className="shrink-0">
              <a href={`#${r.id}`} className="inline-flex min-h-11 items-center rounded-full bg-steel-100 px-5 text-sm font-medium text-navy-900 hover:bg-navy-900 hover:text-white">
                {r.title}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a href="#ma-commande" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-royal-600 px-5 text-sm font-semibold text-white hover:bg-royal-500">
              <ShoppingBag className="size-4" /> Ma commande{count ? ` (${count})` : ""}
            </a>
          </li>
        </ul>
      </nav>

      <div className="container-site space-y-16 py-12 sm:py-16">
        {visibleRanges.map((r) => (
          <section key={r.id} id={r.id} aria-labelledby={`${r.id}-titre`} className="scroll-mt-24">
            <h2 id={`${r.id}-titre`} className="text-2xl font-bold text-navy-900 sm:text-3xl">
              {r.title}
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products
                .filter((p) => p.range === r.id)
                .map((p) => {
                  const photo = p.photos[0];
                  const colors = p.groups.find((g) => g.kind === "couleur" && g.values.length);
                  return (
                    <li key={p.slug} className="flex flex-col overflow-hidden rounded-3xl border border-steel-200 bg-white">
                      <button type="button" onClick={() => setOpen(p)} className="relative aspect-[4/3] bg-steel-100" aria-label={`Choisir : ${p.name}`}>
                        {photo && (
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                            {...(photo.blurDataURL ? { placeholder: "blur" as const, blurDataURL: photo.blurDataURL } : {})}
                            className="object-cover"
                            style={photo.focus ? { objectPosition: photo.focus } : undefined}
                          />
                        )}
                      </button>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-lg font-bold text-navy-900">{p.name}</h3>
                        <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                        {colors && (
                          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={colors.name}>
                            {colors.values.slice(0, 8).map((c) => (
                              <li key={c.id} title={c.label} className="size-5 rounded-full border border-steel-300" style={{ background: c.hex }}>
                                <span className="sr-only">{c.label}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        <button type="button" onClick={() => setOpen(p)} className={cn(buttonStyles({ variant: "primary", size: "md" }), "mt-4 w-full")}>
                          {p.groups.length ? "Choisir les options" : "Ajouter à ma commande"}
                        </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}

        {/* Récapitulatif */}
        <section id="ma-commande" aria-labelledby="ma-commande-titre" className="scroll-mt-24 rounded-[2rem] border border-steel-200 bg-steel-50 p-5 sm:p-8">
          <h2 id="ma-commande-titre" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Ma commande
          </h2>
          {lines.length === 0 ? (
            <p className="mt-3 text-muted-foreground">Votre commande est vide. Choisissez des produits ci-dessus.</p>
          ) : (
            <>
              <ul className="mt-6 divide-y divide-steel-200 rounded-2xl border border-steel-200 bg-white">
                {lines.map((l) => (
                  <li key={l.key} className="flex gap-4 p-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-steel-100">
                      {l.image && <Image src={l.image} alt="" fill sizes="64px" className="object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-navy-900">{l.name}</p>
                      {l.lines.length > 0 && (
                        <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                          {l.lines.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-3 flex items-center gap-3">
                        <div className="inline-flex items-center rounded-lg border border-steel-200">
                          <button type="button" onClick={() => cart.setQty(l.key, l.qty - 1)} aria-label="Diminuer" className="inline-flex size-9 items-center justify-center hover:bg-steel-50">
                            <Minus className="size-4" />
                          </button>
                          <span className="w-10 text-center font-semibold" aria-label="Quantité">
                            {l.qty}
                          </span>
                          <button type="button" onClick={() => cart.setQty(l.key, l.qty + 1)} aria-label="Augmenter" className="inline-flex size-9 items-center justify-center hover:bg-steel-50">
                            <Plus className="size-4" />
                          </button>
                        </div>
                        <button type="button" onClick={() => cart.remove(l.key)} className="inline-flex items-center gap-1 text-sm text-red-600 hover:underline">
                          <Trash2 className="size-4" /> Retirer
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {(
                  [
                    ["name", "Votre nom", "ex. Jean Mbarga"],
                    ["place", "Lieu de l'événement / livraison", "ex. Bastos, Yaoundé"],
                    ["date", "Date souhaitée", "ex. 14 février"],
                  ] as const
                ).map(([k, label, ph]) => (
                  <label key={k} className="text-sm">
                    <span className="mb-1.5 block font-medium text-navy-900">
                      {label} <span className="font-normal text-muted-foreground">— facultatif</span>
                    </span>
                    <input value={info[k]} maxLength={120} placeholder={ph} onChange={(e) => setInfo({ ...info, [k]: e.target.value })} className={fieldCls} />
                  </label>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={waHref ?? "/contact#devis"} target="_blank" rel="noopener noreferrer" className={cn(buttonStyles({ variant: "whatsapp", size: "lg" }), "sm:flex-1")}>
                  <WhatsAppIcon /> Envoyer ma commande sur WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => confirm("Vider toute la commande ?") && cart.clear()}
                  className="text-sm font-medium text-muted-foreground hover:text-red-600"
                >
                  Vider la commande
                </button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Le message s&apos;ouvre dans WhatsApp : vérifiez-le et envoyez-le. Nous vous répondons avec un devis (prix et disponibilité).
              </p>
            </>
          )}
        </section>
      </div>

      {/* Barre mobile */}
      {count > 0 && (
        <a
          href="#ma-commande"
          className="fixed bottom-4 left-4 right-[5.5rem] z-40 flex min-h-14 items-center justify-between rounded-2xl bg-navy-900 px-5 text-white shadow-2xl shadow-navy-950/30 sm:hidden"
        >
          <span className="inline-flex items-center gap-2 font-semibold">
            <ShoppingBag className="size-5" /> Ma commande · {count}
          </span>
          <span className="text-sm">Voir →</span>
        </a>
      )}

      {toast && (
        <p role="status" className="fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg">
          {toast}
        </p>
      )}

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        aria-labelledby="choix-titre"
        className="m-auto w-[min(56rem,calc(100vw-1.5rem))] max-h-[calc(100dvh-1.5rem)] rounded-3xl bg-white p-0 backdrop:bg-navy-950/60"
      >
        {open && (
          <div className="p-5 sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <h2 id="choix-titre" className="text-2xl font-bold text-navy-900">
                {open.name}
              </h2>
              <button type="button" onClick={() => setOpen(null)} aria-label="Fermer" className="rounded-full p-2 hover:bg-steel-100">
                <X className="size-5" />
              </button>
            </div>
            <ProductConfigurator
              key={open.slug}
              layout="dialog"
              name={open.name}
              slug={open.slug}
              pageUrl={`${siteUrl}/produits/${open.slug}`}
              photos={open.photos}
              groups={open.groups}
              onAdded={() => {
                setToast(`${open.name} ajouté à votre commande`);
                setOpen(null);
              }}
            />
          </div>
        )}
      </dialog>
    </>
  );
}
