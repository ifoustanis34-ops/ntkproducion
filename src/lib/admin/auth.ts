import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";

/**
 * Authentification du portail : un seul compte, défini sur le serveur.
 *   ADMIN_USERNAME (défaut « admin »), ADMIN_PASSWORD (obligatoire, 12 caractères minimum).
 * Sans ADMIN_PASSWORD valide, le portail reste fermé.
 */
const COOKIE = "ntk_admin";
const SESSION_DAYS = 7;

function config() {
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (password.length < 12) return null;
  const username = process.env.ADMIN_USERNAME?.trim() || "admin";
  // Clé de signature dérivée : changer le mot de passe invalide toutes les sessions.
  const secret = createHash("sha256").update(`ntk-admin:${username}:${password}:${process.env.ADMIN_SESSION_SECRET ?? ""}`).digest();
  return { username, password, secret };
}

export const adminConfigured = () => config() !== null;

const sign = (payload: string, secret: Buffer) => createHmac("sha256", secret).update(payload).digest("base64url");

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** Limite les tentatives de connexion : 5 essais par adresse IP toutes les 15 minutes. */
const attempts = new Map<string, { count: number; until: number }>();
async function clientIp() {
  const h = await headers();
  return h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";
}

export async function login(username: string, password: string): Promise<"ok" | "invalide" | "bloque" | "non-configure"> {
  const cfg = config();
  if (!cfg) return "non-configure";
  const ip = await clientIp();
  const now = Date.now();
  const a = attempts.get(ip);
  if (a && a.until > now && a.count >= 5) return "bloque";

  if (!(safeEqual(username.trim(), cfg.username) && safeEqual(password, cfg.password))) {
    const cur = a && a.until > now ? a : { count: 0, until: now + 15 * 60_000 };
    attempts.set(ip, { count: cur.count + 1, until: cur.until });
    return "invalide";
  }
  attempts.delete(ip);
  const exp = String(now + SESSION_DAYS * 86_400_000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp, cfg.secret)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86_400,
  });
  return "ok";
}

export async function logout() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  // Toujours évalué à la requête : jamais figé au moment de la compilation (où ADMIN_PASSWORD peut être absent).
  await connection();
  const cfg = config();
  if (!cfg) return false;
  const value = (await cookies()).get(COOKIE)?.value ?? "";
  const [exp, sig] = value.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(exp, cfg.secret));
}

/** À appeler en tête de chaque page et action du portail. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/connexion");
}
