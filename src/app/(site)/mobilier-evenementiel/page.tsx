import { LandingPage, landingMetadata } from "@/components/seo/LandingPage";

export const metadata = landingMetadata("mobilier-evenementiel");

export default function Page() {
  return <LandingPage slug="mobilier-evenementiel" />;
}
