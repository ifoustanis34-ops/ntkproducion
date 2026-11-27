"use client";

import { useSyncExternalStore } from "react";
import { contact } from "@/config/contact";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Commande en cours (panier), conservée dans le navigateur du visiteur.
 * Aucune donnée n'est envoyée au serveur : la commande part dans un message WhatsApp.
 */
export type CartLine = {
  key: string;
  slug: string;
  name: string;
  image?: string;
  /** Choix lisibles : « Couleur de la bâche : Blanc » */
  lines: string[];
  qty: number;
};

const KEY = "ntk-commande-v1";
const listeners = new Set<() => void>();
let cache: CartLine[] | null = null;
const EMPTY: CartLine[] = [];

function read(): CartLine[] {
  if (cache) return cache;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(raw) ? (raw as CartLine[]).filter((l) => l && typeof l.name === "string" && l.qty > 0) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: CartLine[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* stockage indisponible : la commande reste valable pour cette visite */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export const cart = {
  /** Ajoute un article ; un article identique (mêmes choix) voit sa quantité augmenter. */
  add(item: Omit<CartLine, "key">) {
    const key = `${item.slug}|${item.lines.join("|")}`;
    const list = read();
    const existing = list.find((l) => l.key === key);
    write(
      existing
        ? list.map((l) => (l.key === key ? { ...l, qty: Math.min(999, l.qty + item.qty) } : l))
        : [...list, { ...item, key }].slice(-50),
    );
  },
  setQty(key: string, qty: number) {
    write(read().map((l) => (l.key === key ? { ...l, qty: Math.min(999, Math.max(1, qty)) } : l)));
  },
  remove(key: string) {
    write(read().filter((l) => l.key !== key));
  },
  clear() {
    write([]);
  },
};

export type OrderInfo = { name: string; place: string; date: string };

/** Message WhatsApp de la commande complète. */
export function orderMessage(lines: CartLine[], info: OrderInfo) {
  const body = lines.map((l, i) => [`${i + 1}. ${l.name} — quantité : ${l.qty}`, ...l.lines.map((x) => `   • ${x}`)].join("\n"));
  const extra = [
    info.name.trim() && `Nom : ${info.name.trim().slice(0, 80)}`,
    info.place.trim() && `Lieu : ${info.place.trim().slice(0, 120)}`,
    info.date.trim() && `Date souhaitée : ${info.date.trim().slice(0, 40)}`,
  ].filter(Boolean);
  return [`Bonjour ${contact.companyName}, je souhaite passer la commande suivante :`, "", ...body, ...(extra.length ? ["", ...extra] : []), "", "Merci de me transmettre un devis."].join("\n");
}

export const orderWhatsappUrl = (lines: CartLine[], info: OrderInfo) => whatsappUrl(orderMessage(lines, info));
