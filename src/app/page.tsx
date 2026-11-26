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
  title: "NTK Production | Chapiteaux, tentes et hangars à Yaoundé",
  absoluteTitle: true,
  description:
    "NTK Production, fabricant à Yaoundé : chapiteaux, tentes, bâches VIP, tables, podiums, hangars et charpentes métalliques. Devis gratuit sur WhatsApp.",
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
