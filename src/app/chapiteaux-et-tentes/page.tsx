import { LandingPage, landingMetadata } from "@/components/seo/LandingPage";

export const metadata = landingMetadata("chapiteaux-et-tentes");

export default function Page() {
  return <LandingPage slug="chapiteaux-et-tentes" />;
}
