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
    return NextResponse.rewrite(new URL("/page-introuvable", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/produits/:slug+", "/conseils/:slug+"],
};
