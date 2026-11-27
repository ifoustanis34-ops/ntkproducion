import { NextResponse, type NextRequest } from "next/server";
import { products } from "@/data/products";
import { articles } from "@/data/articles";

const known: Record<string, Set<string>> = {
  produits: new Set(products.map((p) => p.slug)),
  conseils: new Set(articles.map((a) => a.slug)),
};

/**
 * Fiches produits et articles inconnus : vraie réponse 404 (au lieu d'un 200 « noindex »),
 * pour que Google et les visiteurs reçoivent un statut correct.
 */
export function proxy(request: NextRequest) {
  const [, section, slug, ...rest] = request.nextUrl.pathname.split("/");
  if (slug && (rest.length > 0 || !known[section]?.has(slug))) {
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
