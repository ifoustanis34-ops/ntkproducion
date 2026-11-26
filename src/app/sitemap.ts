import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { galleryImages, getImage } from "@/data/gallery";
import { landings } from "@/data/landings";
import { products } from "@/data/products";
import { articles } from "@/data/articles";

type Entry = MetadataRoute.Sitemap[number];

const img = (id: string) => absoluteUrl(getImage(id).src);

/** Plan du site : toutes les pages indexables, avec leurs images principales (Google Images). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Entry[] = [
    { url: absoluteUrl("/"), priority: 1, changeFrequency: "monthly", images: [absoluteUrl("/images/hero/hero-tente-pagode-drapee.jpg")] },
    { url: absoluteUrl("/produits"), priority: 0.9, changeFrequency: "monthly", images: products.map((p) => img(p.mainImage)) },
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
    images: [p.mainImage, ...p.secondaryImages].map(img),
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
