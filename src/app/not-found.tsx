import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { TrussLine } from "@/components/shared/TrussLine";
import { Suspense } from "react";
import { Header, HeaderView } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
    <Suspense fallback={<HeaderView pathname="" />}>
        <Header />
      </Suspense>
    <main id="contenu" className="flex-1">
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-navy-950 text-white">
      <TrussLine className="pointer-events-none absolute top-24 left-1/2 w-[90%] max-w-4xl -translate-x-1/2 text-white/15" />
      <div className="container-site relative pt-[var(--header-h)] text-center">
        <p className="font-display text-7xl font-black text-steel-gradient sm:text-9xl">404</p>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">Cette page est introuvable.</h1>
        <p className="mt-3 text-steel-300">La page que vous recherchez n&apos;existe pas ou a été déplacée.</p>
        <ButtonLink href="/" variant="light" className="mt-8">
          <ArrowLeft /> Retour à l&apos;accueil
        </ButtonLink>
      </div>
    </section>
    </main>
    <Footer />
    </>
  );
}
