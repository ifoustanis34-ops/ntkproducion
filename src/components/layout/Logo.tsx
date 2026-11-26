import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  /** "dark" = version pour fonds sombres (lettrage blanc) */
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
};

/** Ratio réel du logo détouré : 1056 × 528 */
export function Logo({ tone = "light", className, priority }: Props) {
  return (
    <Link href="/" aria-label="NTK Production — accueil" className={cn("relative block shrink-0", className)}>
      <Image
        src={tone === "dark" ? "/images/logo/ntk-production-logo-fond-sombre.png" : "/images/logo/ntk-production-logo.png"}
        alt="NTK Production"
        width={1056}
        height={528}
        sizes="(min-width: 1024px) 128px, 104px"
        className="h-auto w-full"
        preload={priority}
      />
    </Link>
  );
}
