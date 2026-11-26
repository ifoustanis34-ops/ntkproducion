import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd, localBusinessJsonLd } from "@/lib/seo";
import { RevealScript } from "@/components/layout/RevealScript";

// Archivo (licence OFL) en chasse élargie 112 % : rappelle le lettrage large et géométrique du logo.
// Instance statique de largeur (axe wdth figé à 112) et graisses 500–900, sous-ensemble latin :
// 33 Ko au lieu de 90 Ko pour la police variable complète.
const display = localFont({
  src: "./fonts/archivo-112-wght500-900.woff2",
  weight: "500 900",
  variable: "--font-display",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "NTK Production | Chapiteaux, tentes, tables et podiums à Yaoundé",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "NTK Production",
    "fabrication de chapiteaux Cameroun",
    "vente de chapiteaux Yaoundé",
    "vente de tentes événementielles",
    "vente de matériel événementiel",
    "fabrication de tables événementielles",
    "tables serpentines VIP",
    "fabrication de podiums",
    "structures métalliques Cameroun",
    "équipements événementiels Yaoundé",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, alt: "Chapiteau installé par NTK Production" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: siteConfig.googleSiteVerification ? { google: siteConfig.googleSiteVerification } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#071740",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <RevealScript />
        <JsonLd data={localBusinessJsonLd()} />
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
      </body>
    </html>
  );
}
