import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact the Directorate General of Petroleum Concessions and LMK Resources.",
};

const offices = [
  {
    id: "dgpc",
    name: "Directorate General of Petroleum Concessions (DGPC)",
    lines: [
      "3rd Floor, Petroleum House",
      "Ataturk Avenue, G-5/2, Islamabad",
      "Postal Code 44000",
    ],
    phone: "051-9202200, 9204176",
    phoneHref: "tel:+92519202200",
    web: { label: "www.mpnr.gov.pk", href: "http://www.mpnr.gov.pk/" },
  },
  {
    id: "lmkr",
    name: "LMK Resources Pakistan (Private) Limited",
    lines: [
      "9th Floor, No 55-C, PTET/Ufone Tower",
      "Jinnah Avenue, Islamabad, Pakistan",
      "Postal Code 44000",
    ],
    phone: "+92 51 111 101 101",
    phoneHref: "tel:+9251111101101",
    fax: "+92 51 831 7933",
    email: "support@ppepdr.net",
  },
];

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3A2 2 0 0 1 18 19 14.5 14.5 0 0 1 5 6a2 2 0 0 1 1.5-2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <PageShell title="Contact us" showSidebar={false} wide>
      <div className="space-y-8">
        <p className="prose-copy max-w-3xl">
          Reach the Directorate General of Petroleum Concessions or LMK
          Resources for repository support, subscriptions, and general
          enquiries. We welcome your questions and suggestions.
        </p>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
          <section
            aria-labelledby="contact-form-heading"
            className="border border-neutral-200 bg-white"
          >
            <div className="border-b border-neutral-200 bg-sand/60 px-5 py-4 sm:px-6 sm:py-5">
              <p className="section-kicker">Write to us</p>
              <h2
                id="contact-form-heading"
                className="mt-1 text-xl font-semibold text-brand-dark sm:text-2xl"
              >
                Send a message
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Share your opinions, queries, or suggestions. Your feedback
                helps us improve PetroBank services.
              </p>
            </div>
            <div className="px-5 py-6 sm:px-6 sm:py-7">
              <ContactForm />
            </div>
          </section>

          <aside className="space-y-6" aria-label="Office addresses">
            {offices.map((office) => (
              <section
                key={office.id}
                aria-labelledby={`${office.id}-heading`}
                className="border border-neutral-200 bg-sand/50 p-5 sm:p-6"
              >
                <h2
                  id={`${office.id}-heading`}
                  className="text-base font-semibold text-brand-dark"
                >
                  {office.name}
                </h2>

                <div className="mt-5 space-y-4 text-sm leading-6 text-neutral-700">
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-accent">
                      <IconPin />
                    </span>
                    <address className="not-italic">
                      {office.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>

                  <div className="flex gap-3">
                    <span className="mt-0.5 text-accent">
                      <IconPhone />
                    </span>
                    <div>
                      <a
                        href={office.phoneHref}
                        className="font-medium text-link-strong hover:underline"
                      >
                        {office.phone}
                      </a>
                      {office.fax ? (
                        <p className="mt-1 text-neutral-600">
                          Fax: {office.fax}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {office.email ? (
                    <div className="flex gap-3">
                      <span className="mt-0.5 text-accent">
                        <IconMail />
                      </span>
                      <a
                        href={`mailto:${office.email}`}
                        className="font-medium text-link-strong hover:underline"
                      >
                        {office.email}
                      </a>
                    </div>
                  ) : null}

                  {office.web ? (
                    <div className="flex gap-3">
                      <span className="mt-0.5 text-accent" aria-hidden>
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="8.5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                          <path
                            d="M3.5 12h17M12 3.5c2.5 2.8 3.8 5.6 3.8 8.5S14.5 17.7 12 20.5C9.5 17.7 8.2 14.9 8.2 12S9.5 6.3 12 3.5Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                        </svg>
                      </span>
                      <a
                        href={office.web.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-link-strong hover:underline"
                      >
                        {office.web.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </div>
                  ) : null}
                </div>
              </section>
            ))}
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
