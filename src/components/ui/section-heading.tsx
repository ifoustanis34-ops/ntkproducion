import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, intro, align = "left", tone = "light", className, as = "h2" }: Props) {
  const H = as;
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase",
            tone === "light" ? "text-royal-600" : "text-azure-300",
          )}
        >
          <span aria-hidden className={cn("h-px w-8", tone === "light" ? "bg-royal-600" : "bg-azure-300")} />
          {eyebrow}
        </p>
      )}
      <H
        className={cn(
          "text-3xl leading-[1.08] font-bold sm:text-4xl lg:text-[2.85rem]",
          tone === "light" ? "text-navy-900" : "text-white",
        )}
      >
        {title}
      </H>
      {intro && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", tone === "light" ? "text-muted-foreground" : "text-steel-300")}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
