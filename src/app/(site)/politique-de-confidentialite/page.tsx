import type { Metadata } from "next";
import { contact, primaryPhone } from "@/config/contact";
import { gaId } from "@/config/analytics";
import { pageMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/shared/LegalLayout";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Politique de confidentialité",
    description: "Politique de confidentialité du site de NTK Production.",
    path: "/politique-de-confidentialite",
  }),
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <h2>Données collectées par ce site</h2>
      {gaId ? (
        <>
          <p>
            Ce site ne crée pas de compte utilisateur, n&apos;enregistre aucune donnée personnelle sur ses serveurs et n&apos;utilise
            aucun cookie publicitaire.
          </p>
          <h2>Mesure d&apos;audience</h2>
          <p>
            Avec votre accord uniquement, ce site utilise Google Analytics 4 pour mesurer sa fréquentation (pages consultées, durée de
            visite, type d&apos;appareil, provenance géographique approximative). Ces statistiques servent uniquement à améliorer le
            site. Votre choix est mémorisé dans votre navigateur ; pour le modifier, effacez les données de ce site dans votre
            navigateur et rechargez la page. Le traitement par Google est régi par sa propre politique de confidentialité.
          </p>
        </>
      ) : (
        <p>
          Ce site ne crée pas de compte utilisateur, n&apos;enregistre aucune donnée personnelle sur ses serveurs et n&apos;utilise ni
          cookie publicitaire ni outil de mesure d&apos;audience.
        </p>
      )}

      <h2>Formulaire de demande de devis</h2>
      <p>
        Les informations saisies dans le formulaire de devis ne sont pas stockées par le site : elles servent uniquement à préparer
        un message dans WhatsApp. Votre demande n&apos;est transmise à {contact.companyName} que lorsque vous l&apos;envoyez vous-même
        depuis WhatsApp. Le traitement des messages par WhatsApp est régi par la politique de confidentialité de ce service.
      </p>

      <h2>Utilisation de vos informations</h2>
      <p>
        Les informations que vous nous transmettez (nom, téléphone, e-mail, détails de votre projet) sont utilisées uniquement pour
        répondre à votre demande et établir un devis. Elles ne sont ni vendues ni cédées à des tiers.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez à tout moment demander l&apos;accès, la rectification ou la suppression des informations que vous nous avez
        transmises
        {primaryPhone ? (
          <>
            {" "}
            en nous contactant au <a href={`tel:${primaryPhone.e164}`}>{primaryPhone.display}</a>
          </>
        ) : null}
        .
      </p>

      <h2>Liens externes</h2>
      <p>
        Ce site contient des liens vers des services tiers (WhatsApp, Google Maps{contact.facebook ? ", Facebook" : ""}). Leur
        utilisation est soumise à leurs propres conditions et politiques de confidentialité.
      </p>
    </LegalLayout>
  );
}
