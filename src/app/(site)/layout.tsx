import { Suspense } from "react";
import { Header, HeaderView } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { RevealScript } from "@/components/layout/RevealScript";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd, localBusinessJsonLd } from "@/lib/seo";

/** Habillage du site public (le portail /admin a son propre layout). */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <RevealScript />
      <JsonLd data={localBusinessJsonLd()} />
      <Suspense fallback={<HeaderView pathname="" />}>
        <Header />
      </Suspense>
      <main id="contenu" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
      <Analytics />
    </>
  );
}
