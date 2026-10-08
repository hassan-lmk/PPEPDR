import Image from "next/image";
import Link from "next/link";

const links = [
  {
    title: "Pakistan Petroleum E&P Policies",
    action: "List of E&P Policies",
    href: "/policies",
  },
  {
    title: "Model Petroleum Concession Agreement",
    action: "Browse model agreements",
    href: "/agreements",
  },
  {
    title: "Bids Invited",
    detail: "List of blocks available for bidding",
    action: "View bidding blocks",
    href: "https://ppisonline.com/bidding-blocks/",
    external: true,
  },
  {
    title: "Block Award Process",
    action: "View block award process",
    href: "/#block-award",
  },
  {
    title: "Pakistan Petroleum E & P Rules",
    action: "List of E&P Rules",
    href: "/rules",
  },
  {
    title: "Data Review Request",
    action: "Sign up for a data review demo",
    href: "https://www.ppisonline.com/data-review",
    external: true,
  },
];

export function Sidebar() {
  return (
    <aside className="space-y-3" aria-label="Related links">
      {links.map((link) => {
        const action = link.external ? (
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-link-strong"
          >
            {link.action}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <Link href={link.href} className="text-sm text-link-strong">
            {link.action}
          </Link>
        );

        return (
          <div key={link.title} className="bg-muted-surface p-3">
            <h2 className="text-sm font-bold text-brand-dark">{link.title}</h2>
            {link.detail ? <p className="mt-2 text-sm">{link.detail}</p> : null}
            <p className="mt-2 text-sm text-link">{action}</p>
          </div>
        );
      })}
    </aside>
  );
}

export function PageShell({
  title,
  children,
  showSidebar = true,
  wide = false,
  bannerSrc = "/images/inner-banner-v2.jpg",
  bannerAlt = "",
}: {
  title: string;
  children: React.ReactNode;
  showSidebar?: boolean;
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
        className={`mx-auto gap-8 px-4 py-8 ${
          wide ? "max-w-7xl" : "max-w-6xl"
        } ${
          showSidebar
            ? "grid lg:grid-cols-[minmax(0,1fr)_240px]"
            : "block"
        }`}
      >
        <article>
          <h1 className="page-title">{title}</h1>
          {children}
        </article>
        {showSidebar ? <Sidebar /> : null}
      </div>
    </>
  );
}
