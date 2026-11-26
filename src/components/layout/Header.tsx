"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { whatsappUrlFor } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(menuOpen);
  const wa = whatsappUrlFor("general");

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  // Un seul écouteur passif, synchronisé sur requestAnimationFrame
  useEffect(() => {
    let prev = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Se masque en descendant, réapparaît en remontant
      if (y <= 480 || y < prev - 2) setHidden(false);
      else if (y > prev + 2 && !menuOpenRef.current) setHidden(true);
      prev = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-[70] rounded-md bg-white px-4 py-2 font-semibold text-navy-900 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Aller au contenu
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,translate] duration-500 ease-out-expo",
          hidden && "-translate-y-[110%]",
          solid && !menuOpen
            ? "bg-white/90 shadow-[0_8px_30px_-12px_rgb(7_23_64/0.25)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950/70 to-transparent transition-opacity duration-500",
            solid ? "opacity-0" : "opacity-100",
          )}
        />
        <nav aria-label="Navigation principale" className="container-site relative flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" aria-label="NTK Production — accueil" className="relative block w-[104px] shrink-0 lg:w-[124px]">
            <Image
              src="/images/logo/ntk-production-logo-fond-sombre.png"
              alt="NTK Production"
              width={1056}
              height={528}
              sizes="124px"
              preload
              className={cn("h-auto w-full transition-opacity duration-500", solid && !menuOpen ? "opacity-0" : "opacity-100")}
            />
            <Image
              src="/images/logo/ntk-production-logo.png"
              alt=""
              aria-hidden
              width={1056}
              height={528}
              sizes="124px"
              className={cn(
                "absolute inset-0 h-auto w-full transition-opacity duration-500",
                solid && !menuOpen ? "opacity-100" : "opacity-0",
              )}
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-10 items-center rounded-full px-2.5 text-[0.92rem] font-medium whitespace-nowrap transition-colors xl:px-4",
                      solid ? "text-navy-900 hover:text-royal-600" : "text-white/90 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-2.5 bottom-1 h-[2px] origin-left rounded-full transition-transform duration-500 ease-out-expo xl:inset-x-4",
                        solid ? "bg-royal-600" : "bg-azure-300",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Écrire à NTK Production sur WhatsApp"
                className={cn(
                  "hidden size-11 items-center justify-center rounded-full transition-colors sm:inline-flex lg:hidden xl:inline-flex",
                  solid ? "bg-whatsapp/10 text-whatsapp hover:bg-whatsapp hover:text-white" : "bg-white/10 text-white hover:bg-whatsapp",
                )}
              >
                <WhatsAppIcon className="size-5" />
              </a>
            )}
            <Link href="/contact#devis" className={cn(buttonStyles({ variant: "primary", size: "sm" }), "hidden whitespace-nowrap sm:inline-flex")}>
              Demander un devis
              <ArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
            <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} solid={solid} pathname={pathname} />
          </div>
        </nav>
      </header>
    </>
  );
}
