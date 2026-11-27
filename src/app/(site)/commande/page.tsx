import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { OrderBuilder } from "@/components/order/OrderBuilder";
import { getPublishedProducts } from "@/lib/catalog/store";
import { productRanges } from "@/data/ranges";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Passer une commande",
  description:
    "Composez votre commande NTK Production : chapiteaux, tentes, bâches, tables et podiums, avec couleurs, dimensions et quantités. Envoi direct sur WhatsApp.",
  path: "/commande",
});

export default async function OrderPage() {
  const products = (await getPublishedProducts()).map((p) => ({
    slug: p.slug,
    name: p.name,
    range: p.range,
    description: p.description,
    photos: p.photos,
    groups: p.groups,
  }));
  return (
    <>
      <PageHero
        eyebrow="Commande"
        title="Composez votre commande"
        intro="Choisissez vos produits par catégorie, leurs couleurs, dimensions et quantités, puis envoyez la commande complète sur WhatsApp. Nous vous répondons avec un devis."
        image="chapiteau-evenement-tapis-rouge"
        crumb={{ label: "Commande", path: "/commande" }}
      />
      <OrderBuilder ranges={productRanges.map((r) => ({ id: r.id, title: r.title }))} products={products} siteUrl={siteConfig.url} />
    </>
  );
}
