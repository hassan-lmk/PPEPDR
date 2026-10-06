import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-0 overflow-hidden bg-forest text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url(/images/footer.jpg)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-forest/95 to-forest/90" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-start md:gap-16">
          <div>
            <Link href="/" aria-label="PPEPDR home">
              <Image
                src="/images/logo.png"
                alt="PPEPDR"
                width={200}
                height={90}
                className="h-14 w-auto sm:h-16"
              />
            </Link>
            <p className="mt-4 max-w-lg text-2xl font-semibold leading-snug">
              National petroleum exploration &amp; production data, online.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75">
              A centralized digital repository for seismic, well, and physical
              data supporting Pakistan&apos;s E&amp;P industry.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white/60 uppercase">
              Navigate
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/85 transition hover:text-accent"
                    >
                      {item.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-white/85 transition hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {year} PPEPDR. All rights reserved.</p>
          <Link href="/contact" className="hover:text-accent">
            Contact us
          </Link>
        </div>
      </div>
    </footer>
  );
}
