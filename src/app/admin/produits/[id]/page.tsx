import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/admin/auth";
import { readCatalogSync } from "@/lib/catalog/store";
import { rangeLabels } from "@/lib/catalog/types";
import { ProductForm } from "@/components/admin/ProductForm";
import { PhotoManager } from "@/components/admin/PhotoManager";
import { deleteProductAction } from "@/app/admin/actions";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";

export const metadata: Metadata = { title: "Modifier un produit" };

export default function EditProductPage(props: PageProps<"/admin/produits/[id]">) {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Chargement…</p>}>
      <EditProduct {...props} />
    </Suspense>
  );
}

async function EditProduct({ params, searchParams }: PageProps<"/admin/produits/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const created = (await searchParams).cree === "1";
  const product = readCatalogSync().products.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-royal-600 hover:underline">
          <ArrowLeft className="size-4" /> Tous les produits
        </Link>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-royal-600 uppercase">{rangeLabels[product.range]}</p>
            <h1 className="text-3xl font-bold text-navy-900">{product.name}</h1>
          </div>
          {product.published && (
            <Link href={`/produits/${product.slug}`} target="_blank" className="inline-flex items-center gap-1.5 text-sm font-medium text-royal-600 hover:underline">
              Voir sur le site <ExternalLink className="size-4" />
            </Link>
          )}
        </div>
        {created && (
          <p role="status" className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-800">
            Produit créé. Ajoutez maintenant ses photos ci-dessous.
          </p>
        )}
      </div>

      <PhotoManager productId={product.id} photos={product.photos} colors={product.colors} dimensions={product.dimensions} />
      <ProductForm key={product.updatedAt} product={product} />

      <section className="rounded-3xl border border-red-200 bg-white p-5 sm:p-7">
        <h2 className="text-lg font-bold text-red-700">Supprimer ce produit</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Le produit et ses photos ajoutées depuis le portail seront définitivement supprimés. Pour le retirer temporairement du site,
          décochez plutôt « Publié sur le site ».
        </p>
        <form action={deleteProductAction.bind(null, product.id)} className="mt-4">
          <ConfirmSubmit
            message={`Supprimer définitivement « ${product.name} » et ses photos ?`}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            Supprimer définitivement
          </ConfirmSubmit>
        </form>
      </section>
    </div>
  );
}
