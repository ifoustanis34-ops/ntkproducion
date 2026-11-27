import { readFile } from "node:fs/promises";
import path from "node:path";
import { uploadsDir } from "@/lib/catalog/store";

const SAFE_NAME = /^[a-z0-9][a-z0-9-]{0,150}\.webp$/;

/** Sert les photos ajoutées depuis le portail (noms uniques → cache permanent). */
export async function GET(_req: Request, ctx: RouteContext<"/media/[file]">) {
  const { file } = await ctx.params;
  if (!SAFE_NAME.test(file)) return new Response("Introuvable", { status: 404 });
  try {
    const body = await readFile(path.join(uploadsDir, file));
    return new Response(new Uint8Array(body), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Introuvable", { status: 404 });
  }
}
