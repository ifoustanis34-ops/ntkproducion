"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Trash2, Upload } from "lucide-react";
import { deletePhotoAction, movePhotoAction, updatePhotoAction, uploadPhotoAction } from "@/app/admin/actions";
import type { CatalogColor, CatalogDimension, CatalogPhoto } from "@/lib/catalog/types";
import { buttonStyles } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

type Props = { productId: string; photos: CatalogPhoto[]; colors: CatalogColor[]; dimensions: CatalogDimension[] };

/** Réduit la photo dans le navigateur (2400 px, JPEG) : envoi rapide même en 3G, quelle que soit la taille d'origine. */
async function shrink(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.88));
    return blob ?? file;
  } catch {
    return file; // format non lisible par le navigateur : le serveur tentera la conversion
  }
}

const selectCls = "h-10 w-full rounded-lg border border-input bg-white px-2 text-sm";

export function PhotoManager({ productId, photos, colors, dimensions }: Props) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [batchColor, setBatchColor] = useState("");
  const [batchDim, setBatchDim] = useState("");
  const [progress, setProgress] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, start] = useTransition();

  async function upload(files: FileList) {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name));
    const errs: string[] = [];
    for (let i = 0; i < list.length; i++) {
      setProgress(`Envoi de la photo ${i + 1} sur ${list.length}…`);
      const fd = new FormData();
      fd.set("photo", await shrink(list[i]), list[i].name.replace(/\.\w+$/, ".jpg"));
      fd.set("colorId", batchColor);
      fd.set("dimensionId", batchDim);
      try {
        const res = await uploadPhotoAction(productId, fd);
        if (res.error) errs.push(`${list[i].name} : ${res.error}`);
      } catch {
        errs.push(`${list[i].name} : échec de l'envoi (connexion interrompue ?)`);
      }
    }
    setProgress(null);
    setErrors(errs);
    if (input.current) input.current.value = "";
    router.refresh();
  }

  const run = (fn: () => Promise<unknown>) =>
    start(async () => {
      await fn();
      router.refresh();
    });

  return (
    <section className="space-y-5 rounded-3xl border border-steel-200 bg-white p-5 sm:p-7">
      <div>
        <h2 className="text-lg font-bold text-navy-900">Photos ({photos.length})</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          La première photo est la photo principale. Associez une photo à une couleur et/ou une dimension : elle s&apos;affichera
          quand le visiteur choisira cette option. Une photo « Toutes » s&apos;affiche pour tous les choix.
        </p>
      </div>

      {/* Ajout */}
      <div className="rounded-2xl bg-steel-50 p-4">
        <p className="text-sm font-semibold text-navy-900">Ajouter des photos</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <label className="text-sm">
            <span className="mb-1 block text-muted-foreground">Couleur illustrée</span>
            <select value={batchColor} onChange={(e) => setBatchColor(e.target.value)} className={selectCls}>
              <option value="">Toutes les couleurs</option>
              {colors.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted-foreground">Dimension illustrée</span>
            <select value={batchDim} onChange={(e) => setBatchDim(e.target.value)} className={selectCls}>
              <option value="">Toutes les dimensions</option>
              {dimensions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-end">
            <button
              type="button"
              disabled={Boolean(progress)}
              onClick={() => input.current?.click()}
              className={cn(buttonStyles({ variant: "primary" }), "w-full disabled:opacity-60")}
            >
              <Upload /> {progress ? "Envoi…" : "Choisir des photos"}
            </button>
            <input
              ref={input}
              type="file"
              accept="image/*,.heic,.heif"
              multiple
              hidden
              onChange={(e) => e.target.files?.length && upload(e.target.files)}
            />
          </div>
        </div>
        {colors.length === 0 && dimensions.length === 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            Astuce : ajoutez d&apos;abord des couleurs ou des dimensions ci-dessus (puis enregistrez) pour pouvoir y associer des photos.
          </p>
        )}
        {progress && (
          <p role="status" className="mt-3 text-sm font-medium text-royal-600">
            {progress}
          </p>
        )}
        {errors.length > 0 && (
          <ul role="alert" className="mt-3 space-y-1 text-sm text-red-700">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Liste */}
      {photos.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucune photo pour l&apos;instant.</p>
      ) : (
        <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", pending && "opacity-60")}>
          {photos.map((ph, i) => (
            <PhotoCard
              key={`${ph.id}-${ph.colorId}-${ph.dimensionId}-${ph.alt}`}
              photo={ph}
              index={i}
              count={photos.length}
              colors={colors}
              dimensions={dimensions}
              onMove={(dir) => run(() => movePhotoAction(productId, ph.id, dir))}
              onDelete={() => {
                if (confirm("Supprimer définitivement cette photo ?")) run(() => deletePhotoAction(productId, ph.id));
              }}
              onSave={(data) => run(() => updatePhotoAction(productId, ph.id, data))}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

function PhotoCard({
  photo,
  index,
  count,
  colors,
  dimensions,
  onMove,
  onDelete,
  onSave,
}: {
  photo: CatalogPhoto;
  index: number;
  count: number;
  colors: CatalogColor[];
  dimensions: CatalogDimension[];
  onMove: (dir: -1 | 1) => void;
  onDelete: () => void;
  onSave: (d: { alt: string; colorId: string | null; dimensionId: string | null }) => void;
}) {
  const [alt, setAlt] = useState(photo.alt);
  const [colorId, setColorId] = useState(photo.colorId ?? "");
  const [dimensionId, setDimensionId] = useState(photo.dimensionId ?? "");
  const dirty = alt !== photo.alt || colorId !== (photo.colorId ?? "") || dimensionId !== (photo.dimensionId ?? "");

  return (
    <li className="overflow-hidden rounded-2xl border border-steel-200">
      <div className="relative aspect-[4/3] bg-steel-100">
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" />
        {index === 0 && (
          <span className="absolute top-2 left-2 rounded-full bg-navy-900 px-2.5 py-1 text-xs font-semibold text-white">Principale</span>
        )}
      </div>
      <div className="space-y-2 p-3">
        <label className="block text-xs">
          <span className="mb-1 block text-muted-foreground">Description (texte alternatif, utile pour Google)</span>
          <input value={alt} onChange={(e) => setAlt(e.target.value)} maxLength={200} className={cn(selectCls, "h-9")} />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <select aria-label="Couleur" value={colorId} onChange={(e) => setColorId(e.target.value)} className={cn(selectCls, "h-9")}>
            <option value="">Toutes couleurs</option>
            {colors.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select aria-label="Dimension" value={dimensionId} onChange={(e) => setDimensionId(e.target.value)} className={cn(selectCls, "h-9")}>
            <option value="">Toutes dimensions</option>
            {dimensions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1 pt-1">
          <button type="button" disabled={index === 0} onClick={() => onMove(-1)} aria-label="Déplacer avant" className="rounded-lg p-2 hover:bg-steel-100 disabled:opacity-30">
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            disabled={index === count - 1}
            onClick={() => onMove(1)}
            aria-label="Déplacer après"
            className="rounded-lg p-2 hover:bg-steel-100 disabled:opacity-30"
          >
            <ArrowRight className="size-4" />
          </button>
          <button type="button" onClick={onDelete} aria-label="Supprimer la photo" className="rounded-lg p-2 text-red-600 hover:bg-red-50">
            <Trash2 className="size-4" />
          </button>
          <button
            type="button"
            disabled={!dirty}
            onClick={() => onSave({ alt, colorId: colorId || null, dimensionId: dimensionId || null })}
            className={cn(buttonStyles({ variant: "primary", size: "sm" }), "ml-auto disabled:opacity-40")}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </li>
  );
}
