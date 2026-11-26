export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <section className="bg-navy-950 text-white">
        <div className="container-site pt-[calc(var(--header-h)+3.5rem)] pb-14">
          <h1 className="text-4xl font-extrabold sm:text-5xl">{title}</h1>
        </div>
      </section>
      <article className="container-site max-w-3xl py-14 sm:py-20 [&_a]:font-medium [&_a]:text-royal-600 [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy-900 [&_h2:first-child]:mt-0 [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_p+p]:mt-3">
        {children}
      </article>
    </>
  );
}
