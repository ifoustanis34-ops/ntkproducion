"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { MapPin, Phone } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { contact, primaryPhone } from "@/config/contact";
import { whatsappUrlFor } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  solid: boolean;
  pathname: string;
};

const subscribe = () => () => {};

/** Menu mobile plein écran — animations CSS (clip-path + apparition décalée des liens). */
export function MobileMenu({ open, onOpenChange, solid, pathname }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wa = whatsappUrlFor("general");
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  // Ferme le menu à chaque changement de page
  useEffect(() => {
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  // Ferme le menu si le composant est masqué (Activity / Cache Components)
  useLayoutEffect(() => () => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus(), 150);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onOpenChange]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => onOpenChange(!open)}
        className={cn(
          "relative z-[60] inline-flex size-11 items-center justify-center rounded-full transition-colors",
          open ? "bg-white/10 text-white" : solid ? "bg-navy-900 text-white" : "bg-white/10 text-white backdrop-blur",
        )}
      >
        <span className="relative block h-3.5 w-5" aria-hidden>
          <span className={cn("absolute left-0 h-[2px] w-5 rounded bg-current transition-all duration-300", open ? "top-1.5 rotate-45" : "top-0")} />
          <span className={cn("absolute top-1.5 left-0 h-[2px] w-5 rounded bg-current transition-opacity duration-200", open && "opacity-0")} />
          <span className={cn("absolute left-0 h-[2px] w-5 rounded bg-current transition-all duration-300", open ? "top-1.5 -rotate-45" : "top-3")} />
        </span>
      </button>

      {mounted &&
        createPortal(
          <div
            id="menu-mobile"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            aria-hidden={!open}
            inert={!open}
            data-open={open ? "" : undefined}
            className={cn(
              "group/menu fixed inset-0 z-40 flex flex-col overflow-y-auto bg-navy-950 px-6 pt-[calc(var(--header-h)+1.5rem)] pb-8 text-white transition-[clip-path,visibility] duration-600 ease-out-expo lg:hidden",
              open
                ? "visible [clip-path:circle(150%_at_calc(100%-2.5rem)_2.25rem)]"
                : "invisible [clip-path:circle(0%_at_calc(100%-2.5rem)_2.25rem)]",
            )}
          >
            <div aria-hidden className="bg-truss pointer-events-none absolute inset-0 text-white/[0.035]" />
            <nav aria-label="Navigation mobile" className="relative">
              <ul className="space-y-1">
                {mainNav.map((item, i) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <li
                      key={item.href}
                      className="translate-x-6 opacity-0 transition-[opacity,translate] duration-500 ease-out-expo group-data-open/menu:translate-x-0 group-data-open/menu:opacity-100"
                      style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => onOpenChange(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "font-display flex items-center justify-between border-b border-white/10 py-4 text-3xl font-semibold",
                          active ? "text-azure-300" : "text-white",
                        )}
                      >
                        {item.label}
                        <span className="text-sm font-normal text-steel-400">0{i + 1}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div
              className="relative mt-auto space-y-3 pt-10 opacity-0 transition-opacity duration-500 group-data-open/menu:opacity-100"
              style={{ transitionDelay: open ? "450ms" : "0ms" }}
            >
              <Link href="/contact#devis" onClick={() => onOpenChange(false)} className={cn(buttonStyles({ variant: "primary", size: "lg" }), "w-full")}>
                Demander un devis
              </Link>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={cn(buttonStyles({ variant: "whatsapp", size: "lg" }), "w-full")}>
                  <WhatsAppIcon /> Écrire sur WhatsApp
                </a>
              )}
              <div className="flex flex-col gap-2 pt-4 text-sm text-steel-300">
                {primaryPhone && (
                  <a href={`tel:${primaryPhone.e164}`} className="inline-flex min-h-8 items-center gap-2">
                    <Phone className="size-4" /> {primaryPhone.display}
                  </a>
                )}
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4" /> {contact.location.label}
                </span>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
