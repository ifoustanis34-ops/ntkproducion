# NTK Production — site vitrine

Site vitrine de **NTK Production** (fabrication et vente d'équipements événementiels, Yaoundé).

- Next.js 16 (App Router, React Server Components, Cache Components) · React 19 · TypeScript strict
- Tailwind CSS 4 · shadcn/ui (champs de formulaire) · Lucide · Motion (galerie, visionneuse, formulaire)

## Lancer le projet

Prérequis : Node.js ≥ 20.9.

```bash
npm install
cp .env.example .env.local   # puis renseigner NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

Production locale :

```bash
npm run build
npm start                    # http://localhost:3000
```

Contrôles : `npm run lint` et `npx tsc --noEmit`.

## Déploiement

**Vercel (recommandé)** : importer le dépôt, définir `NEXT_PUBLIC_SITE_URL` (et éventuellement
`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) dans les variables d'environnement, puis déployer.
L'optimisation d'images (AVIF/WebP) fonctionne sans configuration.

**Serveur Node (VPS)** : `npm ci && npm run build`, puis `npm start` derrière un reverse proxy
(Nginx/Caddy) avec HTTPS, idéalement géré par un gestionnaire de processus (pm2, systemd).
`sharp` est installé automatiquement pour l'optimisation des images.

Après la mise en ligne :

1. Google Search Console : ajouter la propriété, vérifier (variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
   ou DNS), soumettre `https://<domaine>/sitemap.xml`.
2. Google Business Profile : créer/compléter la fiche avec les mêmes nom, téléphone et adresse que le site.

## Où modifier le contenu

| Besoin | Fichier |
| --- | --- |
| Téléphones, WhatsApp, Facebook, e-mail, adresse, carte | `src/config/contact.ts` |
| URL du site, informations légales (RCCM, NIU, hébergeur…) | `src/config/site.ts` |
| Messages WhatsApp préremplis | `src/lib/whatsapp.ts` |
| Photos (titre, catégorie, description, texte alternatif) | `src/data/gallery.ts` |
| Produits du catalogue | `src/data/products.ts` |
| Domaines d'expertise, services, arguments | `src/data/services.ts` |
| Menu | `src/data/navigation.ts` |
| Pages d'activité SEO (chapiteaux, bâches, mobilier, podiums, construction métallique, hangars) | `src/data/landings.ts` |
| Articles de la rubrique Conseils | `src/data/articles.ts` |
| Gammes de la page Produits | `src/data/ranges.ts` |
| Google Analytics 4 (`NEXT_PUBLIC_GA_ID`, avec bandeau de consentement) | `src/config/analytics.ts` |

Toute valeur `null` dans la configuration n'est **jamais affichée** : il suffit de la renseigner
pour qu'elle apparaisse (footer, contact, données structurées…).

### Ajouter une photo

1. Déposer le fichier `.jpg` dans `public/images/<categorie>/`.
2. Lancer `python3 scripts/generate-image-meta.py` (dimensions + miniature floue ; nécessite Pillow).
3. Ajouter une entrée dans `src/data/gallery.ts` (et, si besoin, la référencer dans un produit).

### Ajouter un produit

Ajouter un objet dans `src/data/products.ts` (les images référencent les `id` de `gallery.ts`).
Le champ `price` est prévu mais volontairement absent : aucun prix n'est affiché tant qu'il n'est pas communiqué.

### Formulaire de devis

La v1 prépare un message WhatsApp (`src/lib/quote.ts`). Pour ajouter un envoi par e-mail ou vers
un backend, créer un nouveau transport dans `prepareQuoteTransport` (ex. un `POST` vers une Route Handler).

## Structure

```
src/
  app/            pages (accueil, a-propos, services, produits, realisations, contact, légales),
                  sitemap.ts, robots.ts, manifest.ts, icônes
  components/     layout/ home/ products/ gallery/ contact/ shared/ ui/
  config/         site.ts, contact.ts
  data/           gallery.ts, products.ts, services.ts, navigation.ts, image-meta.ts (généré)
  lib/            whatsapp.ts, quote.ts, seo.tsx, utils.ts
public/images/    logo/ hero/ chapiteaux/ tables/ podiums/ structures-metalliques/
scripts/          generate-image-meta.py
```

Les dossiers d'origine (`chapiteaux/`, `table/`, `podium/`, `emgar/`, `logo/`) sont conservés intacts.
