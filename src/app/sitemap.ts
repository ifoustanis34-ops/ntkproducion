import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { galleryImages, getImage } from "@/data/gallery";
import { landings } from "@/data/landings";
import { getPublishedProducts } from "@/lib/catalog/store";
import { articles } from "@/data/articles";

type Entry = MetadataRoute.Sitemap[number];

const img = (id: string) => absoluteUrl(getImage(id).src);

/** Plan du site : toutes les pages indexables, avec leurs images principales (Google Images). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getPublishedProducts();
  const pages: Entry[] = [
    { url: absoluteUrl("/"), priority: 1, changeFrequency: "monthly", images: [absoluteUrl("/images/hero/hero-tente-pagode-drapee.jpg")] },
    { url: absoluteUrl("/produits"), priority: 0.9, changeFrequency: "monthly", images: products.flatMap((p) => (p.photos[0] ? [absoluteUrl(p.photos[0].src)] : [])) },
    { url: absoluteUrl("/services"), priority: 0.8, changeFrequency: "monthly" },
    { url: absoluteUrl("/realisations"), priority: 0.7, changeFrequency: "monthly", images: galleryImages.map((g) => absoluteUrl(g.src)) },
    { url: absoluteUrl("/a-propos"), priority: 0.6, changeFrequency: "yearly" },
    { url: absoluteUrl("/contact"), priority: 0.8, changeFrequency: "yearly" },
    { url: absoluteUrl("/zone-intervention"), priority: 0.6, changeFrequency: "yearly" },
    { url: absoluteUrl("/conseils"), priority: 0.6, changeFrequency: "monthly" },
  ];

  const landingPages: Entry[] = landings.map((l) => ({
    url: absoluteUrl(`/${l.slug}`),
    priority: 0.9,
    changeFrequency: "monthly",
    images: [l.heroImage, ...(l.gallery ?? [])].map(img),
  }));

  const productPages: Entry[] = products.map((p) => ({
    url: absoluteUrl(`/produits/${p.slug}`),
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: p.updatedAt > "1971" ? p.updatedAt.slice(0, 10) : undefined,
    images: p.photos.map((ph) => absoluteUrl(ph.src)),
  }));

  const articlePages: Entry[] = articles.map((a) => ({
    url: absoluteUrl(`/conseils/${a.slug}`),
    lastModified: a.date,
    priority: 0.5,
    changeFrequency: "yearly",
    images: [img(a.image)],
  }));

  return [...pages, ...landingPages, ...productPages, ...articlePages];
}
