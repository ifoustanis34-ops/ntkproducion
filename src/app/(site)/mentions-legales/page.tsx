import type { Metadata } from "next";
import { contact, verifiedPhones } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/shared/LegalLayout";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Mentions légales",
    description: "Mentions légales du site de NTK Production, Yaoundé, Cameroun.",
    path: "/mentions-legales",
  }),
  robots: { index: false, follow: true },
};

export default function LegalNoticePage() {
  const c = siteConfig.company;
  return (
    <LegalLayout title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        <strong>{contact.companyName}</strong>
        {c.legalForm && <>, {c.legalForm}</>}
        <br />
        {contact.location.label}
        {verifiedPhones.map((p) => (
          <span key={p.e164}>
            <br />
            Téléphone : <a href={`tel:${p.e164}`}>{p.display}</a>
          </span>
        ))}
        {contact.emails.map((email) => (
          <span key={email}>
            <br />
            E-mail : <a href={`mailto:${email}`}>{email}</a>
          </span>
        ))}
      </p>
      {(c.registrationNumber || c.taxId) && (
        <p>
          {c.registrationNumber && <>RCCM : {c.registrationNumber}</>}
          {c.registrationNumber && c.taxId && <br />}
          {c.taxId && <>NIU : {c.taxId}</>}
        </p>
      )}
      {c.publicationDirector && <p>Directeur de la publication : {c.publicationDirector}</p>}

      {c.host && (
        <>
          <h2>Hébergement</h2>
          <p>
            {c.host.name}
            <br />
            {c.host.address}
          </p>
        </>
      )}

      <h2>Propriété intellectuelle</h2>
      <p>
        Le logo et la marque {contact.companyName} ainsi que les contenus de ce site sont protégés. Toute reproduction sans
        autorisation préalable est interdite.
      </p>

      <h2>Informations commerciales</h2>
      <p>
        Les produits présentés le sont à titre indicatif. Les tarifs, dimensions et disponibilités sont communiqués sur demande, au
        moment de l&apos;établissement d&apos;un devis.
      </p>
    </LegalLayout>
  );
}
