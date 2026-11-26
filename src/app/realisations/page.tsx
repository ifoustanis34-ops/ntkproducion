import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Gallery } from "@/components/gallery/Gallery";
import { ContactCTA } from "@/components/home/ContactCTA";
import { galleryImages } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Réalisations : chapiteaux, tentes, podiums, hangars",
  description:
    "Photos des réalisations de NTK Production à Yaoundé : chapiteaux, tentes pagode, tables serpentines VIP, podiums, hangars et structures métalliques.",
  path: "/realisations",
  image: "/images/chapiteaux/chapiteau-octogonal-parois-transparentes.jpg",
});

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos réalisations"
        title={
          <>
            Nos équipements <span className="text-steel-gradient">en images.</span>
          </>
        }
        intro="Filtrez par catégorie et ouvrez chaque photographie en plein écran."
        image="chapiteau-parois-transparentes"
        crumb={{ label: "Réalisations", path: "/realisations" }}
      />
      <section aria-label="Galerie des réalisations" className="py-16 sm:py-24">
        <div className="container-site">
          <Gallery images={galleryImages} filterSet="portfolio" />
        </div>
      </section>
      <div className="pb-20 sm:pb-28">
        <ContactCTA />
      </div>
    </>
  );
}
