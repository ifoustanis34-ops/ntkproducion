import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Expertise } from "@/components/home/Expertise";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ContactCTA } from "@/components/home/ContactCTA";
import { QuickContact } from "@/components/home/QuickContact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "NTK Production | Chapiteaux, tentes, tables et podiums à Yaoundé",
  absoluteTitle: true,
  description:
    "Fabrication et vente de chapiteaux, tentes événementielles, tables rondes pliables, tables serpentines VIP, podiums et structures métalliques à Yaoundé, Cameroun.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Expertise />
      <FeaturedProducts />
      <GalleryPreview />
      <WhyChooseUs />
      <ContactCTA />
      <QuickContact />
    </>
  );
}
