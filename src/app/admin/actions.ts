"use server";

import { randomBytes } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp, { type OutputInfo } from "sharp";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { login, logout, requireAdmin } from "@/lib/admin/auth";
import { CATALOG_TAG, mutateCatalog, readCatalogSync, uploadsDir } from "@/lib/catalog/store";
import { slugify } from "@/lib/catalog/slug";
import {
  isRangeId,
  type CatalogColor,
  type CatalogDimension,
  type CatalogPhoto,
  type CatalogProduct,
  type Prestation,
} from "@/lib/catalog/types";

export type FormState = { ok?: boolean; error?: string; message?: string };

const rid = (n = 4) => randomBytes(n).toString("hex");

const str = (fd: FormData, k: string, max: number) => String(fd.get(k) ?? "").trim().slice(0, max);
const lines = (v: string, max: number) =>
  v
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, max);

/**
 * Rafraîchit le site après une modification : le tag couvre les listes (accueil, produits, gammes, sitemap) ;
 * les fiches produits créées après la compilation n'y sont pas reliées, on les invalide donc par leur adresse.
 */
function refresh(...slugs: (string | undefined)[]) {
  updateTag(CATALOG_TAG);
  for (const slug of new Set(slugs.filter(Boolean))) revalidatePath(`/produits/${slug}`);
}

const slugOf = (productId: string) => readCatalogSync().products.find((p) => p.id === productId)?.slug;

/* ---------- Connexion ---------- */

export async function loginAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const res = await login(str(fd, "username", 100), String(fd.get("password") ?? "").slice(0, 200));
  if (res === "non-configure") return { error: "Le portail n'est pas encore configuré sur le serveur (ADMIN_PASSWORD)." };
  if (res === "bloque") return { error: "Trop de tentatives. Réessayez dans 15 minutes." };
  if (res === "invalide") return { error: "Identifiant ou mot de passe incorrect." };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/connexion");
}

/* ---------- Produits ---------- */

function parseColors(raw: string): CatalogColor[] {
  try {
    const arr = JSON.parse(raw) as unknown[];
    return arr
      .slice(0, 30)
      .map((c) => c as Partial<CatalogColor>)
      .filter((c) => typeof c.name === "string" && c.name.trim())
      .map((c) => ({
        id: typeof c.id === "string" && /^[a-z0-9]{4,16}$/.test(c.id) ? c.id : rid(),
        name: c.name!.trim().slice(0, 40),
        hex: typeof c.hex === "string" && /^#[0-9a-fA-F]{6}$/.test(c.hex) ? c.hex.toLowerCase() : "#ffffff",
      }));
  } catch {
    return [];
  }
}

function parseDimensions(raw: string): CatalogDimension[] {
  try {
    const arr = JSON.parse(raw) as unknown[];
    return arr
      .slice(0, 40)
      .map((d) => d as Partial<CatalogDimension>)
      .filter((d) => typeof d.label === "string" && d.label.trim())
      .map((d) => ({
        id: typeof d.id === "string" && /^[a-z0-9]{4,16}$/.test(d.id) ? d.id : rid(),
        label: d.label!.trim().slice(0, 40),
      }));
  } catch {
    return [];
  }
}

export async function saveProductAction(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = str(fd, "id", 40);
  const name = str(fd, "name", 120);
  const range = String(fd.get("range") ?? "");
  const description = str(fd, "description", 600);
  if (!name) return { error: "Le nom du produit est obligatoire." };
  if (!isRangeId(range)) return { error: "Choisissez une gamme." };
  if (!description) return { error: "La description courte est obligatoire." };

  const slug = slugify(str(fd, "slug", 80) || name);
  if (!slug) return { error: "Adresse de la page invalide." };
  const prestations = (["fabrication", "vente"] as Prestation[]).filter((p) => fd.get(`prestation-${p}`) === "on");
  const colors = parseColors(String(fd.get("colors") ?? "[]"));
  const dimensions = parseDimensions(String(fd.get("dimensions") ?? "[]"));

  const fields = {
    slug,
    name,
    range,
    messageLabel: str(fd, "messageLabel", 120) || name.toLowerCase(),
    description,
    details: str(fd, "details", 4000)
      .split(/\n\s*\n/)
      .map((p) => p.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .slice(0, 10),
    uses: lines(str(fd, "uses", 1500), 12),
    prestations,
    featured: fd.get("featured") === "on",
    published: fd.get("published") === "on",
    colors,
    dimensions,
    allowCustomDimensions: fd.get("allowCustomDimensions") === "on",
    updatedAt: new Date().toISOString(),
  } satisfies Partial<CatalogProduct>;

  let previousSlug: string | undefined;
  const result = await mutateCatalog((c): { error?: string; id?: string } => {
    if (c.products.some((p) => p.slug === slug && p.id !== id)) return { error: "Cette adresse de page est déjà utilisée par un autre produit." };
    if (id) {
      const p = c.products.find((x) => x.id === id);
      if (!p) return { error: "Produit introuvable." };
      previousSlug = p.slug;
      const colorIds = new Set(colors.map((x) => x.id));
      const dimIds = new Set(dimensions.map((x) => x.id));
      Object.assign(p, fields);
      // Une couleur ou une dimension supprimée libère les photos qui y étaient associées.
      p.photos.forEach((ph) => {
        if (ph.colorId && !colorIds.has(ph.colorId)) ph.colorId = null;
        if (ph.dimensionId && !dimIds.has(ph.dimensionId)) ph.dimensionId = null;
      });
      return { id };
    }
    const newId = rid(6);
    const order = Math.max(-1, ...c.products.filter((p) => p.range === range).map((p) => p.order)) + 1;
    c.products.push({ id: newId, order, photos: [], ...fields });
    return { id: newId };
  });

  if (result.error) return { error: result.error };
  refresh(previousSlug, slug);
  if (!id) redirect(`/admin/produits/${result.id}?cree=1`);
  return { ok: true, message: "Modifications enregistrées." };
}

export async function deleteProductAction(id: string) {
  await requireAdmin();
  const removed = await mutateCatalog((c) => {
    const p = c.products.find((x) => x.id === id);
    c.products = c.products.filter((x) => x.id !== id);
    return p;
  });
  if (removed) await Promise.all(removed.photos.map(removeFile));
  refresh(removed?.slug);
  redirect("/admin");
}

export async function moveProductAction(id: string, dir: -1 | 1) {
  await requireAdmin();
  await mutateCatalog((c) => {
    const p = c.products.find((x) => x.id === id);
    if (!p) return;
    const list = c.products.filter((x) => x.range === p.range).sort((a, b) => a.order - b.order);
    list.forEach((x, i) => (x.order = i));
    const i = list.indexOf(p);
    const other = list[i + dir];
    if (!other) return;
    [p.order, other.order] = [other.order, p.order];
  });
  refresh();
}

/* ---------- Photos ---------- */

async function removeFile(ph: CatalogPhoto) {
  if (!ph.src.startsWith("/media/")) return; // images d'origine du site : jamais supprimées
  await unlink(path.join(uploadsDir, path.basename(ph.src))).catch(() => undefined);
}

const MAX_UPLOAD = 8 * 1024 * 1024;

export async function uploadPhotoAction(productId: string, fd: FormData): Promise<{ error?: string; photo?: CatalogPhoto }> {
  await requireAdmin();
  const file = fd.get("photo");
  if (!(file instanceof File) || file.size === 0) return { error: "Aucun fichier reçu." };
  if (file.size > MAX_UPLOAD) return { error: "Photo trop lourde (8 Mo maximum)." };
  const colorId = String(fd.get("colorId") ?? "") || null;
  const dimensionId = String(fd.get("dimensionId") ?? "") || null;

  let out: { data: Buffer; info: OutputInfo };
  let blur: Buffer;
  try {
    const input = Buffer.from(await file.arrayBuffer());
    const img = sharp(input, { failOn: "error" }).rotate();
    out = await img
      .clone()
      .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true });
    blur = await img.clone().resize(12, 12, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
  } catch {
    return { error: "Ce fichier n'est pas une image valide (JPEG, PNG, WebP ou HEIC)." };
  }

  const product = readCatalogSync().products.find((p) => p.id === productId);
  if (!product) return { error: "Produit introuvable." };
  if (product.photos.length >= 40) return { error: "40 photos maximum par produit." };

  const color = product.colors.find((x) => x.id === colorId);
  const dim = product.dimensions.find((x) => x.id === dimensionId);
  const base = slugify([product.slug, color?.name, dim?.label].filter(Boolean).join(" ")).slice(0, 100);
  const filename = `${base}-ntk-production-yaounde-${rid(3)}.webp`;
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, filename), out.data);

  const photo: CatalogPhoto = {
    id: rid(6),
    src: `/media/${filename}`,
    width: out.info.width,
    height: out.info.height,
    alt: [product.name, color?.name.toLowerCase(), dim ? `(${dim.label})` : null].filter(Boolean).join(" ") + " — NTK Production, Yaoundé",
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    colorId: color ? color.id : null,
    dimensionId: dim ? dim.id : null,
  };

  const saved = await mutateCatalog((c) => {
    const p = c.products.find((x) => x.id === productId);
    if (!p) return false;
    p.photos.push(photo);
    p.updatedAt = new Date().toISOString();
    return true;
  });
  if (!saved) {
    await removeFile(photo);
    return { error: "Produit introuvable." };
  }
  refresh(product.slug);
  return { photo };
}

export async function updatePhotoAction(
  productId: string,
  photoId: string,
  data: { alt: string; colorId: string | null; dimensionId: string | null },
): Promise<{ error?: string }> {
  await requireAdmin();
  const ok = await mutateCatalog((c) => {
    const p = c.products.find((x) => x.id === productId);
    const ph = p?.photos.find((x) => x.id === photoId);
    if (!p || !ph) return false;
    ph.alt = String(data.alt ?? "").trim().slice(0, 200) || ph.alt;
    ph.colorId = p.colors.some((x) => x.id === data.colorId) ? data.colorId : null;
    ph.dimensionId = p.dimensions.some((x) => x.id === data.dimensionId) ? data.dimensionId : null;
    p.updatedAt = new Date().toISOString();
    return true;
  });
  if (!ok) return { error: "Photo introuvable." };
  refresh(slugOf(productId));
  return {};
}

export async function movePhotoAction(productId: string, photoId: string, dir: -1 | 1) {
  await requireAdmin();
  await mutateCatalog((c) => {
    const p = c.products.find((x) => x.id === productId);
    if (!p) return;
    const i = p.photos.findIndex((x) => x.id === photoId);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= p.photos.length) return;
    [p.photos[i], p.photos[j]] = [p.photos[j], p.photos[i]];
  });
  refresh(slugOf(productId));
}

export async function deletePhotoAction(productId: string, photoId: string) {
  await requireAdmin();
  const removed = await mutateCatalog((c) => {
    const p = c.products.find((x) => x.id === productId);
    const ph = p?.photos.find((x) => x.id === photoId);
    if (!p || !ph) return null;
    p.photos = p.photos.filter((x) => x.id !== photoId);
    return ph;
  });
  if (removed) await removeFile(removed);
  refresh(slugOf(productId));
}
