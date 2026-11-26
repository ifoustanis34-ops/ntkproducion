import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NTK Production",
    short_name: "NTK Production",
    description: "Fabrication, vente et location d'équipements événementiels à Yaoundé.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#071740",
    lang: "fr",
    icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
  };
}
