import { LandingPage, landingMetadata } from "@/components/seo/LandingPage";

export const metadata = landingMetadata("hangars-metalliques");

export default function Page() {
  return <LandingPage slug="hangars-metalliques" />;
}
