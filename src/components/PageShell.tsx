import Image from "next/image";

export function PageShell({
  title,
  children,
  wide = false,
  bannerSrc = "/images/inner-banner-v2.jpg",
  bannerAlt = "",
}: {
  title: string;
  children: React.ReactNode;
  wide?: boolean;
  bannerSrc?: string;
  bannerAlt?: string;
}) {
  return (
    <>
      <div className="relative h-44 w-full sm:h-56 md:h-64 lg:h-72">
        <Image
          src={bannerSrc}
          alt={bannerAlt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-ink/45"
          aria-hidden
        />
      </div>
      <div
        className={`mx-auto px-4 py-8 ${wide ? "max-w-7xl" : "max-w-6xl"}`}
      >
        <article>
          <h1 className="page-title">{title}</h1>
          {children}
        </article>
      </div>
    </>
  );
}
