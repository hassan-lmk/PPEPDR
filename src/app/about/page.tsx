import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/PageShell";
import { highlights, keyFunctions, type KeyFunction } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "PPEPDR is a centralized digital database for seismic, well, and physical petroleum data in Pakistan.",
};

const highlightItems = highlights.flat();

function FunctionIcon({ name }: { name: KeyFunction["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-6 w-6",
    fill: "none" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "selection":
      return (
        <svg {...common}>
          <path
            d="M4 6h10M4 12h16M4 18h8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "viewing":
      return (
        <svg {...common}>
          <path
            d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case "request":
      return (
        <svg {...common}>
          <path
            d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M14 3.5V8h3.5M9 13h6M9 16.5h4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "trading":
      return (
        <svg {...common}>
          <path
            d="M7 8H3.5l3-3M17 16h3.5l-3 3"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 8h11a3 3 0 0 1 3 3v1M20 16H9a3 3 0 0 1-3-3v-1"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "external":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M3.5 12h17M12 3.5c2.4 2.7 3.7 5.5 3.7 8.5S14.4 17.8 12 20.5C9.6 17.8 8.3 15 8.3 12S9.6 6.2 12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      );
    case "security":
      return (
        <svg {...common}>
          <path
            d="M12 3.5 5 6.5v5c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9v-5l-7-3Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 12.2 11.2 14l3.5-4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "maintenance":
      return (
        <svg {...common}>
          <path
            d="M14.5 5.5a3.5 3.5 0 0 0 4 4L15 13l-1.8-.2L13 11l3.5-5.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M4 19.5 10.5 13M8 19.5H4v-4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function AboutPage() {
  return (
    <PageShell
      title="About us"
      wide
      bannerSrc="/images/banner-about.jpg"
      bannerAlt="Aerial basin landscape with seismic survey overlay"
    >
      <div className="space-y-12">
        <section className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="prose-copy space-y-4">
            <p>
              Easy and secure access to online quality assured Petroleum
              Exploration &amp; Production Data. PPEPDR is a centralized digital
              database for all seismic, well, and physical data that can be
              accessed online. Saving cost and precious time, offline data
              management system as well as associated online data management
              services have been implemented providing, among other benefits,
              fast web-based access to E&amp;P data.
            </p>
            <p>
              Since its inception, the Pakistan National Data Repository has
              improved the speed and ease of accessing and sharing geotechnical
              data. With the establishment of Petrobank in 2001, a significant
              milestone was achieved in the E&amp;P Industry of Pakistan when it
              was decided to introduce cutting-edge data management &amp;
              archival technology. The major objective was to make data
              available online for E&amp;P companies who wish to subscribe to
              such a service.
            </p>
            <p>
              Clients are able to view, select and download data to their
              desktops through a high bandwidth online access system. The highly
              scalable PetroBank architecture is accessible through the Power
              Explorer interface and provides an integrated view of information
              from multiple external databases as well as data stored in
              PetroBank.
            </p>
          </div>

          <aside className="relative min-h-[360px] overflow-hidden border border-neutral-200 bg-brand sm:min-h-[440px] lg:min-h-[520px]">
            <Image
              src="/images/about-office.jpg"
              alt="Modern office building at sunset"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              quality={90}
              className="object-cover object-center"
              priority
            />
          </aside>
        </section>

        <section aria-labelledby="highlights-heading">
          <div className="mb-6 max-w-2xl">
            <p className="section-kicker">Benefits</p>
            <h2
              id="highlights-heading"
              className="mt-1 text-2xl font-semibold text-brand-dark"
            >
              Highlights of PPEPDR
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Key advantages for operators, partners, and government
              stakeholders using the national repository.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {highlightItems.map((item) => (
              <li
                key={item}
                className="flex gap-3 border border-neutral-200 bg-sand/40 px-4 py-3 text-sm leading-6 text-neutral-800"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="functions-heading">
          <div className="mb-6 max-w-2xl">
            <p className="section-kicker">Capabilities</p>
            <h2
              id="functions-heading"
              className="mt-1 text-2xl font-semibold text-brand-dark"
            >
              Key functions
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Core repository services that support discovery, review, access,
              and stewardship of Pakistan&apos;s E&amp;P data.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {keyFunctions.map((item) => (
              <li
                key={item.title}
                className="group flex h-full flex-col border border-neutral-200 bg-white p-5 transition hover:border-[#00AC0E]/50 hover:shadow-[0_12px_30px_rgba(0,172,14,0.14)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center bg-brand text-white transition group-hover:bg-[#00AC0E]">
                  <FunctionIcon name={item.icon} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-brand-dark">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-neutral-600">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
