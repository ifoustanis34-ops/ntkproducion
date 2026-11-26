import { cacheLife } from "next/cache";

/** Année du copyright : calculée côté serveur, mise en cache et revalidée chaque jour. */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
