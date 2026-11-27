import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Connexion" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm rounded-3xl border border-steel-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold text-navy-900">Connexion</h1>
      <p className="mt-2 mb-6 text-sm text-muted-foreground">Espace réservé à l&apos;administrateur de NTK Production.</p>
      <LoginForm />
    </div>
  );
}
