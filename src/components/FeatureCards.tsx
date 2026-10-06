import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    title: "E&P Policies",
    image: "/images/feature-policies-v2.jpg",
    text: "Policies regulating offshore and onshore exploration and production in Pakistan.",
    href: "/policies",
    action: "View E&P Policies",
  },
  {
    title: "E&P Rules",
    image: "/images/feature-rules.jpg",
    text: "Rules governing exploration and production activities across Pakistan.",
    href: "/rules",
    action: "View E&P Rules",
  },
  {
    title: "Model Agreements",
    image: "/images/feature-agreements-v2.jpg",
    text: "Model concession and production sharing agreements for E&P operators.",
    href: "/agreements",
    action: "Browse model agreements",
  },
  {
    title: "Bids Invited",
    image: "/images/feature-bids.jpg",
    text: "Current bidding blocks and opportunities published through PPIS.",
    href: "https://ppisonline.com/bidding-blocks/",
    action: "View bidding blocks",
    external: true,
  },
];

function CardLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function FeatureCards() {
  return (
    <section className="home-section bg-sand" aria-labelledby="explore-heading">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Explore</p>
          <h2 id="explore-heading" className="display-title">
            Essential resources
          </h2>
          <p className="prose-copy mx-auto max-w-xl text-neutral-700">
            Start with the policies, rules, agreements, and bidding information
            operators use most.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <li key={card.title}>
              <CardLink
                href={card.href}
                external={card.external}
                className="group flex h-full flex-col outline-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <h3 className="absolute inset-x-0 bottom-0 px-4 pb-4 text-xl font-semibold text-white drop-shadow-sm">
                    {card.title}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col border border-t-0 border-neutral-200 bg-white px-4 py-5">
                  <p className="flex-1 text-sm leading-6 text-neutral-700">
                    {card.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition group-hover:gap-3">
                    {card.action}
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </CardLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
