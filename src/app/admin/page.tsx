import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp, ExternalLink, ImageOff, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin/auth";
import { readCatalogSync, sortProducts } from "@/lib/catalog/store";
import { rangeIds, rangeLabels } from "@/lib/catalog/types";
import { buttonStyles } from "@/components/ui/button-link";
import { moveProductAction } from "./actions";

export const metadata: Metadata = { title: "Produits" };

export default function AdminHome() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Chargement…</p>}>
      <ProductList />
    </Suspense>
  );
}

async function ProductList() {
  await requireAdmin();
  const { products } = readCatalogSync();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">Produits</h1>
          <p className="mt-1 text-muted-foreground">
            {products.length} produit{products.length > 1 ? "s" : ""}, classés par gamme. Les changements sont visibles sur le site
            immédiatement.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/options" className={buttonStyles({ variant: "outline" })}>
            Options par gamme
          </Link>
          <Link href="/admin/produits/nouveau" className={buttonStyles({ variant: "primary" })}>
            <Plus /> Nouveau produit
          </Link>
        </div>
      </div>

      <div className="mt-10 space-y-10">
        {rangeIds.map((range) => {
          const list = sortProducts(products.filter((p) => p.range === range));
          return (
            <section key={range} aria-labelledby={`gamme-${range}`}>
              <h2 id={`gamme-${range}`} className="text-lg font-bold text-navy-900">
                {rangeLabels[range]} <span className="text-sm font-medium text-muted-foreground">({list.length})</span>
              </h2>
              {list.length === 0 ? (
                <p className="mt-3 rounded-2xl border border-dashed border-steel-300 p-5 text-sm text-muted-foreground">
                  Aucun produit dans cette gamme.{" "}
                  <Link href={`/admin/produits/nouveau?gamme=${range}`} className="font-medium text-royal-600 underline">
                    Ajouter un produit
                  </Link>
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-steel-200 overflow-hidden rounded-2xl border border-steel-200 bg-white">
                  {list.map((p, i) => (
                    <li key={p.id} className="flex items-center gap-4 p-3 sm:p-4">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-steel-100">
                        {p.photos[0] ? (
                          <Image src={p.photos[0].src} alt="" fill sizes="64px" className="object-cover" />
                        ) : (
                          <ImageOff className="absolute inset-0 m-auto size-5 text-steel-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link href={`/admin/produits/${p.id}`} className="font-semibold text-navy-900 hover:text-royal-600">
                          {p.name}
                        </Link>
                        <p className="mt-0.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span className={p.published ? "text-green-700" : "text-amber-700"}>{p.published ? "● Publié" : "● Masqué"}</span>
                          {p.featured && <span>★ Accueil</span>}
                          <span>{p.photos.length} photo(s)</span>
                          <span>{p.options.length} option(s) propre(s)</span>
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <form action={moveProductAction.bind(null, p.id, -1)}>
                          <button disabled={i === 0} aria-label="Monter" className="rounded-lg p-2 text-navy-900 hover:bg-steel-100 disabled:opacity-30">
                            <ArrowUp className="size-4" />
                          </button>
                        </form>
                        <form action={moveProductAction.bind(null, p.id, 1)}>
                          <button
                            disabled={i === list.length - 1}
                            aria-label="Descendre"
                            className="rounded-lg p-2 text-navy-900 hover:bg-steel-100 disabled:opacity-30"
                          >
                            <ArrowDown className="size-4" />
                          </button>
                        </form>
                        {p.published && (
                          <Link href={`/produits/${p.slug}`} target="_blank" aria-label="Voir sur le site" className="rounded-lg p-2 text-navy-900 hover:bg-steel-100">
                            <ExternalLink className="size-4" />
                          </Link>
                        )}
                        <Link href={`/admin/produits/${p.id}`} className={buttonStyles({ variant: "outline", size: "sm" })}>
                          Modifier
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
