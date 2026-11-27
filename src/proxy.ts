import { NextResponse, type NextRequest } from "next/server";
import { readCatalogSync } from "@/lib/catalog/store";
import { articles } from "@/data/articles";

const articleSlugs = new Set(articles.map((a) => a.slug));

/** Slugs valides par section (catalogue relu à chaque modification du fichier). */
function isKnown(section: string, slug: string) {
  if (section === "conseils") return articleSlugs.has(slug);
  if (section === "produits") return readCatalogSync().products.some((p) => p.published && p.slug === slug);
  return true;
}

/**
 * Fiches produits et articles inconnus : vraie réponse 404 (au lieu d'un 200 « noindex »),
 * pour que Google et les visiteurs reçoivent un statut correct.
 */
export function proxy(request: NextRequest) {
  const [, section, slug, ...rest] = request.nextUrl.pathname.split("/");
  if (slug && (rest.length > 0 || !isKnown(section, slug))) {
    // Derrière Nginx (X-Forwarded-Proto: https), l'URL de la requête est en https alors que Next écoute
    // en http : une réécriture en https serait traitée comme un proxy externe et échouerait (500).
    // On force donc http pour que la réécriture reste interne.
    const url = request.nextUrl.clone();
    url.pathname = "/page-introuvable";
    url.protocol = "http:";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/produits/:slug+", "/conseils/:slug+"],
};
