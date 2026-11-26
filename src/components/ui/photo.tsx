import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";
import { cn } from "@/lib/utils";

type PhotoProps = {
  image: GalleryImage;
  sizes: string;
  className?: string;
  /** Remplit le conteneur parent (qui doit être position: relative) */
  fill?: boolean;
  preload?: boolean;
  quality?: number;
};

/** next/image avec dimensions réelles, placeholder flou et alt issus de data/gallery.ts. */
export function Photo({ image, sizes, className, fill = true, preload, quality }: PhotoProps) {
  return fill ? (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      className={cn("object-cover", className)}
      style={image.focus ? { objectPosition: image.focus } : undefined}
      preload={preload}
      quality={quality}
    />
  ) : (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      className={className}
      preload={preload}
      quality={quality}
    />
  );
}
