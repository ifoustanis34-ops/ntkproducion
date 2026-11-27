import { mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { cacheLife, cacheTag } from "next/cache";
import { products as seedProducts } from "@/data/products";
import { getImage } from "@/data/gallery";
import { defaultRangeOptions, effectiveOptions } from "./options";
import { rangeIds, type Catalog, type CatalogProduct, type OptionGroup } from "./types";

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
    version: 2,
    rangeOptions: defaultRangeOptions(),
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
          valueIds: [],
        };
      }),
      options: p.slug === "tables-rondes-pliables" ? [roundTableDiameter()] : [],
      disabledRangeOptions: [],
      updatedAt: now,
    })),
  };
}

/** Diamètre des tables rondes (valeur de départ confirmée : Ø 150 cm pour 10 places). */
function roundTableDiameter(): OptionGroup {
  return {
    id: "diametre",
    name: "Diamètre",
    kind: "liste",
    required: true,
    custom: "texte",
    values: [{ id: "d-150", label: "Ø 150 cm", note: "10 places" }],
  };
}

/* Ancien format (v1) : couleurs et dimensions fixes par produit. */
type LegacyProduct = Omit<CatalogProduct, "options" | "disabledRangeOptions" | "photos"> & {
  photos: (CatalogProduct["photos"][number] & { colorId?: string | null; dimensionId?: string | null })[];
  colors?: { id: string; name: string; hex: string }[];
  dimensions?: { id: string; label: string }[];
  allowCustomDimensions?: boolean;
  options?: OptionGroup[];
  disabledRangeOptions?: string[];
};

/**
 * Met un catalogue lu sur disque au format courant (v2). Les couleurs et dimensions de l'ancien format
 * deviennent des options du produit, en gardant leurs identifiants : les photos restent associées.
 */
function normalize(raw: { version?: number; products: LegacyProduct[]; rangeOptions?: Catalog["rangeOptions"] }): Catalog {
  const defaults = defaultRangeOptions();
  const rangeOptions = Object.fromEntries(rangeIds.map((r) => [r, raw.rangeOptions?.[r] ?? defaults[r]])) as Catalog["rangeOptions"];
  if (raw.version === 2) return { version: 2, products: raw.products as CatalogProduct[], rangeOptions };
  return {
    version: 2,
    rangeOptions,
    products: raw.products.map((p) => {
      const options: OptionGroup[] = [...(p.options ?? [])];
      if (p.colors?.length) {
        options.push({ id: "couleur", name: "Couleur", kind: "couleur", required: false, custom: "aucune", values: p.colors.map((c) => ({ id: c.id, label: c.name, hex: c.hex })) });
      }
      const isRoundTable = p.slug === "tables-rondes-pliables";
      const rangeHasDimensions = (rangeOptions[p.range] ?? []).some((g) => /dimension/i.test(g.name));
      if (p.dimensions?.length) {
        options.push({
          id: "dimensions",
          name: "Dimensions",
          kind: "liste",
          required: true,
          custom: p.allowCustomDimensions ? "dimensions" : "aucune",
          values: p.dimensions.map((d) => ({ id: d.id, label: d.label })),
        });
      } else if (p.allowCustomDimensions && !rangeHasDimensions && !isRoundTable) {
        // Ancien « sur mesure » seul : gardé uniquement si la gamme ne propose pas déjà des dimensions.
        options.push({ id: "dimensions", name: "Dimensions", kind: "liste", required: false, custom: "dimensions", values: [] });
      }
      if (isRoundTable && !options.some((g) => /diam/i.test(g.name))) options.unshift(roundTableDiameter());
      const rest: Partial<LegacyProduct> = { ...p };
      delete rest.colors;
      delete rest.dimensions;
      delete rest.allowCustomDimensions;
      return {
        ...(rest as LegacyProduct),
        options,
        disabledRangeOptions: p.disabledRangeOptions ?? [],
        photos: p.photos.map(({ colorId, dimensionId, ...ph }) => ({
          ...ph,
          valueIds: ph.valueIds ?? [colorId, dimensionId].filter((v): v is string => Boolean(v)),
        })),
      };
    }),
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
  const catalog = normalize(JSON.parse(readFileSync(catalogFile, "utf8")));
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

/** Produit publié avec ses options effectives (gamme + produit). */
export type ShopProduct = CatalogProduct & { groups: OptionGroup[] };

export function toShopProducts(catalog: Catalog): ShopProduct[] {
  return catalog.products
    .filter((p) => p.published)
    .sort(byOrder)
    .map((p) => ({ ...p, groups: effectiveOptions(p, catalog.rangeOptions) }));
}

export async function getPublishedProducts(): Promise<ShopProduct[]> {
  return toShopProducts(await getCatalog());
}

export function sortProducts(list: CatalogProduct[]) {
  return [...list].sort(byOrder);
}
