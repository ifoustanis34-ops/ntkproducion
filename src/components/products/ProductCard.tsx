import Image from "next/image";
import type { Product } from "@/data/products";
import { prestationLabels } from "@/data/products";
import { categoryLabels, getImage } from "@/data/gallery";
import { productQuoteMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";
import { ProductMedia } from "./ProductMedia";

type Props = {
  product: Product;
  /** "catalog" : photos secondaires, disponibilité et type de prestation */
  variant?: "compact" | "catalog";
  ctaLabel?: string;
};

/** Fiche produit — composant serveur ; seules les miniatures (catalogue) sont interactives. */
export function ProductCard({ product, variant = "compact", ctaLabel = "Demander des informations" }: Props) {
  const main = getImage(product.mainImage);
  const images = variant === "catalog" ? [product.mainImage, ...product.secondaryImages].map(getImage) : [main];
  const wa = whatsappUrl(productQuoteMessage(product.messageLabel));
  const prestations = product.prestations.length ? product.prestations.map((p) => prestationLabels[p]).join(" · ") : null;
  const badge = (
    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-navy-900 backdrop-blur">
      {categoryLabels[product.category]}
    </span>
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-steel-200 bg-white shadow-[0_1px_0_rgb(7_23_64/0.04)] transition-[box-shadow,translate,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-steel-300 hover:shadow-[0_30px_60px_-30px_rgb(7_23_64/0.35)]">
      {images.length > 1 ? (
        <ProductMedia images={images} productName={product.name} badge={badge} />
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden bg-steel-100">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL={main.blurDataURL}
            className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
            style={main.focus ? { objectPosition: main.focus } : undefined}
          />
          {badge}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-bold text-navy-900">{product.name}</h3>
        <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{product.description}</p>

        {variant === "catalog" && (
          <dl className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-steel-50 p-4 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Prestation</dt>
              <dd className="mt-0.5 font-semibold text-navy-900">{prestations ?? "À confirmer"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Disponibilité</dt>
              <dd className="mt-0.5 font-semibold text-navy-900">À confirmer</dd>
            </div>
          </dl>
        )}
        {variant === "compact" && prestations && (
          <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-royal-600 uppercase">{prestations}</p>
        )}

        <a
          href={wa ?? "/contact#devis"}
          {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={cn(buttonStyles({ variant: variant === "catalog" ? "whatsapp" : "outline", size: "md" }), "mt-6 w-full")}
        >
          {wa && <WhatsAppIcon />}
          {ctaLabel}
        </a>
      </div>
    </article>
  );
}
