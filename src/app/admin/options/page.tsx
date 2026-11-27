import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/admin/auth";
import { readCatalogSync } from "@/lib/catalog/store";
import { rangeIds, rangeLabels } from "@/lib/catalog/types";
import { RangeOptionsForm } from "@/components/admin/RangeOptionsForm";

export const metadata: Metadata = { title: "Options par gamme" };

export default function RangeOptionsPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Chargement…</p>}>
      <RangeOptions />
    </Suspense>
  );
}

async function RangeOptions() {
  await requireAdmin();
  const { rangeOptions } = readCatalogSync();
  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-royal-600 hover:underline">
        <ArrowLeft className="size-4" /> Tous les produits
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-navy-900">Options par gamme</h1>
      <p className="mt-1 text-muted-foreground">
        Ces options s&apos;appliquent à <strong>tous les produits</strong> de la gamme (ex. structure aluminium ou acier, couleur de la
        bâche pour les chapiteaux). Chaque produit peut en désactiver certaines et ajouter ses propres options (ex. diamètre d&apos;une
        table ronde).
      </p>
      <nav aria-label="Gammes" className="mt-6 flex flex-wrap gap-2">
        {rangeIds.map((r) => (
          <a key={r} href={`#${r}`} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-900 shadow-sm hover:bg-steel-100">
            {rangeLabels[r]}
          </a>
        ))}
      </nav>
      <div className="mt-8 space-y-8">
        {rangeIds.map((r) => (
          <section key={r} id={r} className="scroll-mt-6 rounded-3xl border border-steel-200 bg-white p-5 sm:p-7">
            <h2 className="mb-4 text-xl font-bold text-navy-900">{rangeLabels[r]}</h2>
            <RangeOptionsForm range={r} groups={rangeOptions[r] ?? []} />
          </section>
        ))}
      </div>
    </div>
  );
}
