import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/produits", priority: 0.9, changeFrequency: "monthly" },
  { path: "/realisations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/a-propos", priority: 0.7, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: absoluteUrl(r.path), changeFrequency: r.changeFrequency, priority: r.priority }));
}
