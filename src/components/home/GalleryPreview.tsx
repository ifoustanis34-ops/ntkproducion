import { ArrowRight } from "lucide-react";
import { Gallery } from "@/components/gallery/Gallery";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { galleryImages } from "@/data/gallery";

export function GalleryPreview() {
  return (
    <section aria-labelledby="realisations-title" className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28">
      <div aria-hidden className="bg-truss pointer-events-none absolute inset-0 text-white/[0.03]" />
      <div className="container-site relative">
        <SectionHeading
          tone="dark"
          eyebrow="Nos réalisations"
          title={<span id="realisations-title">Nos équipements, en situation.</span>}
          intro="Chapiteaux, tentes, tables, podiums et structures métalliques : découvrez nos photographies."
        />
        <div className="mt-12">
          <Gallery images={galleryImages} filterSet="home" limit={10} tone="dark" />
        </div>
        <div className="mt-12 flex justify-center">
          <ButtonLink href="/realisations" variant="light">
            Voir toutes nos réalisations <ArrowRight />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
