"use client";

import { useActionState } from "react";
import { loginAction, type FormState } from "@/app/admin/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonStyles } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(loginAction, {});
  return (
    <form action={action} className="space-y-5">
      <div>
        <Label htmlFor="username" className="mb-2">
          Identifiant
        </Label>
        <Input id="username" name="username" autoComplete="username" required defaultValue="admin" className="h-11" />
      </div>
      <div>
        <Label htmlFor="password" className="mb-2">
          Mot de passe
        </Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required className="h-11" />
      </div>
      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button disabled={pending} className={cn(buttonStyles({ variant: "primary" }), "w-full disabled:opacity-60")}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
