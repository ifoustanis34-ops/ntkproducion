import { whatsappUrlFor } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

/** Bouton WhatsApp flottant permanent. */
export function WhatsAppFloat() {
  const url = whatsappUrlFor("general");
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter avec NTK Production sur WhatsApp"
      className="group animate-wa-pulse fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-navy-950/30 transition-transform duration-300 hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden rounded-full bg-navy-950 px-4 py-2 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 sm:block">
        Discutons de votre projet
      </span>
    </a>
  );
}
