"use client";

import { useId, useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, m } from "motion/react";

const loadMotionFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);
import { AlertCircle, Info, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button-link";
import {
  prepareQuoteTransport,
  productOptions,
  serviceTypes,
  validateQuote,
  type QuoteErrors,
  type QuoteRequest,
} from "@/lib/quote";
import { cn } from "@/lib/utils";

const empty: QuoteRequest = {
  fullName: "",
  phone: "",
  email: "",
  serviceType: "",
  product: "",
  eventDate: "",
  eventLocation: "",
  message: "",
};

const fieldCls = "h-12 rounded-xl border-steel-300 bg-white px-4 text-base md:text-[0.95rem]";

type Status = { type: "idle" } | { type: "opened"; url: string } | { type: "unavailable" };

export function ContactForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [values, setValues] = useState<QuoteRequest>({ ...empty, product: defaultProduct });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const uid = useId();
  const id = (k: keyof QuoteRequest) => `${uid}-${k}`;

  const set = (k: keyof QuoteRequest) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateQuote(values);
    setErrors(errs);
    const firstError = Object.keys(errs)[0] as keyof QuoteRequest | undefined;
    if (firstError) {
      document.getElementById(id(firstError))?.focus();
      return;
    }
    const transport = prepareQuoteTransport(values);
    if (transport.kind === "whatsapp") {
      window.open(transport.url, "_blank", "noopener,noreferrer");
      setStatus({ type: "opened", url: transport.url });
    } else {
      setStatus({ type: "unavailable" });
    }
  }

  const err = (k: keyof QuoteRequest) =>
    errors[k] ? (
      <p id={`${id(k)}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
        <AlertCircle className="size-3.5" /> {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof QuoteRequest) => ({
    id: id(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id(k)}-err` : undefined,
  });

  return (
    <LazyMotion features={loadMotionFeatures} strict>
    <MotionConfig reducedMotion="user">
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={`${uid}-note`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={id("fullName")} className="mb-2">
            Nom et prénom <span className="text-destructive">*</span>
          </Label>
          <Input {...a11y("fullName")} className={fieldCls} autoComplete="name" value={values.fullName} onChange={set("fullName")} required />
          {err("fullName")}
        </div>
        <div>
          <Label htmlFor={id("phone")} className="mb-2">
            Numéro de téléphone <span className="text-destructive">*</span>
          </Label>
          <Input {...a11y("phone")} className={fieldCls} type="tel" inputMode="tel" autoComplete="tel" placeholder="+237 …" value={values.phone} onChange={set("phone")} required />
          {err("phone")}
        </div>
        <div>
          <Label htmlFor={id("email")} className="mb-2">
            Adresse e-mail
          </Label>
          <Input {...a11y("email")} className={fieldCls} type="email" autoComplete="email" value={values.email} onChange={set("email")} />
          {err("email")}
        </div>
        <div>
          <Label htmlFor={id("serviceType")} className="mb-2">
            Type de prestation <span className="text-destructive">*</span>
          </Label>
          <select {...a11y("serviceType")} className={cn(fieldCls, "w-full border outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50")} value={values.serviceType} onChange={set("serviceType")} required>
            <option value="">Choisir…</option>
            {serviceTypes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {err("serviceType")}
        </div>
        <div>
          <Label htmlFor={id("product")} className="mb-2">
            Produit concerné
          </Label>
          <select {...a11y("product")} className={cn(fieldCls, "w-full border outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50")} value={values.product} onChange={set("product")}>
            <option value="">Choisir…</option>
            {productOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor={id("eventDate")} className="mb-2">
            Date prévue
          </Label>
          <Input {...a11y("eventDate")} className={fieldCls} type="date" value={values.eventDate} onChange={set("eventDate")} />
        </div>
      </div>
      <div>
        <Label htmlFor={id("eventLocation")} className="mb-2">
          Localisation de l&apos;événement
        </Label>
        <Input {...a11y("eventLocation")} className={fieldCls} placeholder="Ville, quartier…" value={values.eventLocation} onChange={set("eventLocation")} />
      </div>
      <div>
        <Label htmlFor={id("message")} className="mb-2">
          Description du besoin <span className="text-destructive">*</span>
        </Label>
        <Textarea
          {...a11y("message")}
          className="min-h-36 rounded-xl border-steel-300 bg-white px-4 py-3 text-base md:text-[0.95rem]"
          placeholder="Type d'événement, nombre d'invités, équipements souhaités…"
          value={values.message}
          onChange={set("message")}
          required
        />
        {err("message")}
      </div>

      <p id={`${uid}-note`} className="flex items-start gap-2 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0 text-royal-600" />
        Votre demande sera préparée dans WhatsApp : il vous suffira d&apos;appuyer sur « Envoyer » pour nous la transmettre. Aucune
        donnée n&apos;est enregistrée sur ce site.
      </p>

      <button type="submit" className={cn(buttonStyles({ variant: "primary", size: "lg" }), "w-full sm:w-auto")}>
        <Send /> Envoyer ma demande
      </button>

      <AnimatePresence>
        {status.type !== "idle" && (
          <m.div
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "rounded-2xl border p-5 text-sm",
              status.type === "opened" ? "border-whatsapp/30 bg-whatsapp/5 text-navy-900" : "border-destructive/30 bg-destructive/5",
            )}
          >
            {status.type === "opened" ? (
              <>
                <p className="font-semibold">Votre message a été préparé dans WhatsApp.</p>
                <p className="mt-1 text-muted-foreground">
                  Pour que votre demande nous parvienne, appuyez sur « Envoyer » dans la conversation WhatsApp. Si WhatsApp ne s&apos;est pas
                  ouvert, utilisez le bouton ci-dessous.
                </p>
                <a href={status.url} target="_blank" rel="noopener noreferrer" className={cn(buttonStyles({ variant: "whatsapp", size: "sm" }), "mt-4")}>
                  <WhatsAppIcon /> Ouvrir WhatsApp
                </a>
              </>
            ) : (
              <p>La transmission par WhatsApp est momentanément indisponible. Merci de nous contacter par téléphone.</p>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </form>
    </MotionConfig>
    </LazyMotion>
  );
}
