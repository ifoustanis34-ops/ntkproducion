import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = {
  message: string;
  children: React.ReactNode;
  variant?: "whatsapp" | "primary" | "light" | "outlineLight" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Lien de repli si aucun numéro WhatsApp valide n'est configuré */
  fallbackHref?: string;
  icon?: boolean;
};

/** Bouton WhatsApp avec message prérempli. Ne génère jamais de lien vers un numéro incomplet. */
export function WhatsAppCta({ message, children, variant = "whatsapp", size, className, fallbackHref = "/contact#devis", icon = true }: Props) {
  const url = whatsappUrl(message);
  return (
    <ButtonLink href={url ?? fallbackHref} variant={variant} size={size} className={className}>
      {icon && url && <WhatsAppIcon />}
      {children}
    </ButtonLink>
  );
}
