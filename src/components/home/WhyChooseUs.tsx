import { Handshake, Layers, Repeat, Ruler, Target } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { strengths } from "@/data/services";
import { getImage } from "@/data/gallery";

const icons = { ruler: Ruler, layers: Layers, repeat: Repeat, target: Target, handshake: Handshake } as const;

export function WhyChooseUs() {
  const img = getImage("podium-scene-couverte");
  return (
    <section aria-labelledby="pourquoi-title" className="py-20 sm:py-28">
      <div className="container-site grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Pourquoi nous choisir"
            title={<span id="pourquoi-title">Pourquoi choisir NTK Production ?</span>}
            intro="Fabricant, vendeur et loueur : cette complémentarité nous permet de vous proposer la formule la plus adaptée à votre événement."
          />
          <Reveal delay={0.15} className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-3xl lg:block">
            <Photo image={img} sizes="40vw" />
          </Reveal>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2">
          {strengths.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal
                as="li"
                key={s.title}
                delay={(i % 2) * 0.08}
                className={`group relative overflow-hidden rounded-3xl border border-steel-200 bg-white p-6 transition-colors duration-500 hover:border-royal-600/40 sm:p-7 ${i === strengths.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <span aria-hidden className="absolute -top-6 -right-2 font-display text-[6.5rem] leading-none font-black text-steel-100 transition-colors duration-500 group-hover:text-royal-600/10">
                  {i + 1}
                </span>
                <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-navy-900 text-azure-300 transition-colors duration-500 group-hover:bg-royal-600 group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <h3 className="relative mt-5 text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="relative mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{s.text}</p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
