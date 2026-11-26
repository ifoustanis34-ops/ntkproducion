import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonStyles = cva(
  "group/btn relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[0.95rem] font-semibold tracking-tight whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-expo select-none focus-visible:outline-2 focus-visible:outline-offset-3 active:scale-[0.98] [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-royal-600 text-white shadow-[0_10px_30px_-10px_rgb(11_77_184/0.7)] hover:bg-royal-500 hover:shadow-[0_14px_36px_-10px_rgb(20_100_214/0.8)]",
        light: "bg-white text-navy-900 shadow-lg shadow-navy-950/20 hover:bg-steel-100",
        outlineLight:
          "border border-white/40 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white/15",
        outline: "border border-navy-900/20 text-navy-900 hover:border-royal-600 hover:text-royal-600",
        whatsapp:
          "bg-whatsapp text-white shadow-[0_10px_30px_-12px_rgb(31_174_85/0.8)] hover:bg-whatsapp-hover",
        ghost: "px-0 text-royal-600 hover:text-navy-800",
      },
      size: {
        md: "",
        lg: "min-h-13 px-8 text-base",
        sm: "min-h-10 px-4 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonLinkProps = VariantProps<typeof buttonStyles> & {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  "aria-label"?: string;
};

export function ButtonLink({ href, variant, size, className, children, external, ...rest }: ButtonLinkProps) {
  const cls = cn(buttonStyles({ variant, size }), className);
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    const isHttp = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
