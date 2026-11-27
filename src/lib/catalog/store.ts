import { mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { cacheLife, cacheTag } from "next/cache";
import { products as seedProducts } from "@/data/products";
import { getImage } from "@/data/gallery";
import type { Catalog, CatalogProduct } from "./types";

/**
 * Stockage du catalogue : un fichier JSON + un dossier de photos, hors du code.
 * Emplacement : NTK_DATA_DIR (par défaut <projet>/.data). Sur le serveur, ce dossier doit être sauvegardé.
 */
export const dataDir = path.resolve(/*turbopackIgnore: true*/ process.env.NTK_DATA_DIR?.trim() || path.join(process.cwd(), ".data"));
export const uploadsDir = path.join(dataDir, "uploads");
const catalogFile = path.join(dataDir, "catalog.json");

export const CATALOG_TAG = "catalogue";

/** Catalogue de départ, construit à partir de data/products.ts. */
function seedCatalog(): Catalog {
  const now = new Date(0).toISOString();
  return {
    version: 1,
    products: seedProducts.map((p, i) => ({
      id: p.slug,
      slug: p.slug,
      name: p.name,
      range: p.category,
      messageLabel: p.messageLabel,
      description: p.description,
      details: p.details,
      uses: p.uses,
      prestations: p.prestations,
      featured: Boolean(p.featured),
      published: true,
      order: i,
      photos: [p.mainImage, ...p.secondaryImages].map((id) => {
        const g = getImage(id);
        return {
          id: g.id,
          src: g.src,
          width: g.width,
          height: g.height,
          alt: g.alt,
          blurDataURL: g.blurDataURL,
          focus: g.focus,
          colorId: null,
          dimensionId: null,
        };
      }),
      colors: [],
      dimensions: [],
      allowCustomDimensions: true,
      updatedAt: now,
    })),
  };
}

let memo: { mtimeMs: number; catalog: Catalog } | null = null;

/** Lecture directe (non mise en cache par Next) — utilisée par le proxy et les actions admin. */
export function readCatalogSync(): Catalog {
  let mtimeMs: number;
  try {
    mtimeMs = statSync(catalogFile).mtimeMs;
  } catch {
    return seedCatalog();
  }
  if (memo && memo.mtimeMs === mtimeMs) return memo.catalog;
  const catalog = JSON.parse(readFileSync(catalogFile, "utf8")) as Catalog;
  memo = { mtimeMs, catalog };
  return catalog;
}

/** Écriture atomique (fichier temporaire puis renommage) : jamais de fichier à moitié écrit. */
export function writeCatalogSync(catalog: Catalog) {
  mkdirSync(dataDir, { recursive: true });
  const tmp = `${catalogFile}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(catalog, null, 2));
  renameSync(tmp, catalogFile);
  memo = null;
}

/** Applique une modification au catalogue (lecture → modification → écriture), en série. */
let queue: Promise<unknown> = Promise.resolve();
export function mutateCatalog<T>(fn: (c: Catalog) => T): Promise<T> {
  const run = queue.then(() => {
    const catalog = structuredClone(readCatalogSync());
    const result = fn(catalog);
    writeCatalogSync(catalog);
    return result;
  });
  queue = run.catch(() => undefined);
  return run;
}

const byOrder = (a: CatalogProduct, b: CatalogProduct) => a.order - b.order || a.name.localeCompare(b.name, "fr");

/** Catalogue mis en cache pour le site public ; invalidé par les actions du portail (tag « catalogue »). */
export async function getCatalog(): Promise<Catalog> {
  "use cache";
  cacheTag(CATALOG_TAG);
  cacheLife("days");
  return readCatalogSync();
}

export async function getPublishedProducts(): Promise<CatalogProduct[]> {
  const { products } = await getCatalog();
  return products.filter((p) => p.published).sort(byOrder);
}

export async function getPublishedProduct(slug: string): Promise<CatalogProduct | undefined> {
  return (await getPublishedProducts()).find((p) => p.slug === slug);
}

export function sortProducts(list: CatalogProduct[]) {
  return [...list].sort(byOrder);
}
