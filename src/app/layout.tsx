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
import { Analytics } from "@/components/analytics/Analytics";

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
    default: "NTK Production | Chapiteaux, tentes et hangars métalliques à Yaoundé",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "NTK Production",
    "NTK Production Yaoundé",
    "fabricant de chapiteaux Yaoundé",
    "fabrication de tentes événementielles Cameroun",
    "bâches VIP Cameroun",
    "tables de cérémonie Yaoundé",
    "fabrication de podiums de spectacle",
    "construction métallique Yaoundé",
    "hangars métalliques Cameroun",
    "charpentes métalliques Yaoundé",
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
          <Analytics />
      </body>
    </html>
  );
}
