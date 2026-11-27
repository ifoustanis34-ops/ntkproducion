import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: { default: "Portail administrateur", template: "%s | Portail NTK Production" },
  robots: { index: false, follow: false },
};

/** Habillage du portail (sans menu ni pied de page du site public). */
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-dvh flex-col bg-steel-50">
      <header className="border-b border-steel-200 bg-navy-950 text-white">
        <div className="container-site flex h-16 items-center justify-between gap-4">
          <Link href="/admin" className="font-display text-lg font-bold">
            NTK Production <span className="font-body text-sm font-medium text-steel-300">· Portail</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/" target="_blank" className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 text-steel-200 hover:bg-white/10 hover:text-white">
              <ExternalLink className="size-4" /> <span className="hidden sm:inline">Voir le site</span>
            </Link>
            <form action={logoutAction}>
              <button className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 text-steel-200 hover:bg-white/10 hover:text-white">
                <LogOut className="size-4" /> <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="container-site flex-1 py-8 sm:py-12">{children}</main>
    </div>
  );
}
