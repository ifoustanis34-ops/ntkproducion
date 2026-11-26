import { ArrowRight, Factory, KeyRound, ShoppingBag } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { getImage } from "@/data/gallery";

const pillars = [
  { icon: Factory, title: "Fabrication", text: "Chapiteaux, tentes, tables et podiums fabriqués, y compris sur commande." },
  { icon: ShoppingBag, title: "Vente", text: "Équipez-vous durablement avec votre propre matériel." },
  { icon: KeyRound, title: "Location", text: "Louez le matériel nécessaire le temps de votre événement." },
];

export function AboutPreview() {
  const main = getImage("chapiteau-structure-longue");
  const second = getImage("table-serpentine-modules");
  return (
    <section id="presentation" aria-labelledby="presentation-title" className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/5]">
            <Photo image={main} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
          <Reveal delay={0.2} className="absolute -right-2 -bottom-8 w-[46%] overflow-hidden rounded-3xl border-[6px] border-white shadow-2xl shadow-navy-950/25 sm:-right-6">
            <div className="relative aspect-[4/3]">
              <Photo image={second} sizes="(min-width: 1024px) 22vw, 46vw" />
            </div>
          </Reveal>
          <div aria-hidden className="bg-truss absolute -top-8 -left-8 -z-10 size-48 rounded-3xl text-royal-600/15" />
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="NTK Production"
            title={
              <span id="presentation-title">
                Votre partenaire pour des installations événementielles{" "}
                <span className="text-royal-gradient">à la hauteur de vos ambitions.</span>
              </span>
            }
            intro="Basée à Yaoundé, NTK Production conçoit et met à disposition les équipements qui structurent vos événements : chapiteaux, tentes, bâches VIP, tables, podiums et structures métalliques. Parce que nous fabriquons notre matériel, nous pouvons à la fois le vendre, le louer et l'adapter à votre projet."
          />
          <ul className="mt-10 space-y-4">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.1 + i * 0.08} className="flex gap-4 rounded-2xl border border-steel-200 bg-white p-4 sm:p-5">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-royal-metal text-white">
                  <p.icon className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold text-navy-900">{p.title}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{p.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3} className="mt-8">
            <ButtonLink href="/a-propos" variant="ghost">
              En savoir plus sur NTK Production <ArrowRight />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
