import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/admin/auth";
import { isRangeId } from "@/lib/catalog/types";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Nouveau produit" };

export default function NewProductPage({ searchParams }: PageProps<"/admin/produits/nouveau">) {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Chargement…</p>}>
      <NewProduct searchParams={searchParams} />
    </Suspense>
  );
}

async function NewProduct({ searchParams }: { searchParams: PageProps<"/admin/produits/nouveau">["searchParams"] }) {
  await requireAdmin();
  const gamme = (await searchParams).gamme;
  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-royal-600 hover:underline">
        <ArrowLeft className="size-4" /> Tous les produits
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-navy-900">Nouveau produit</h1>
      <p className="mt-1 mb-8 text-muted-foreground">Créez le produit, puis ajoutez ses photos sur la page suivante.</p>
      <ProductForm defaultRange={isRangeId(gamme) ? gamme : undefined} />
    </div>
  );
}
