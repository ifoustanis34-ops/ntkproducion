"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

/** Rappel flottant de la commande en cours (masqué sur la page Commande elle-même). */
export function CartPill() {
  const lines = useCart();
  const pathname = usePathname();
  const count = lines.reduce((n, l) => n + l.qty, 0);
  if (!count || pathname === "/commande") return null;
  return (
    <Link
      href="/commande#ma-commande"
      className="fixed bottom-4 left-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy-900 px-5 text-sm font-semibold text-white shadow-xl shadow-navy-950/30 hover:bg-navy-800 sm:bottom-6 sm:left-6"
    >
      <ShoppingBag className="size-5" /> Ma commande · {count}
    </Link>
  );
}
