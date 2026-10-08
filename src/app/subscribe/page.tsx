import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { SubscribePlans } from "@/components/SubscribePlans";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Subscribe for PetroBank online access to PPEPDR data.",
};

const downloadCharges = [
  { label: "Seismic data", value: "US $3 per line kilometer" },
  { label: "Well data", value: "US $53 per well" },
];

export default function SubscribePage() {
  return (
    <PageShell
      title="Subscribe"
      showSidebar={false}
      wide
      bannerSrc="/images/banner-subscribe-v4.jpg"
      bannerAlt="Petroleum data workstation overlooking an energy horizon at dusk"
    >
      <div className="space-y-12">
        <p className="prose-copy max-w-3xl">
          Choose a membership tier for PetroBank online access to Pakistan&apos;s
          E&amp;P data repository. Select a plan to open the request form — our
          team will follow up on onboarding and DGPC requirements.
        </p>

        <SubscribePlans />

        <section
          aria-labelledby="charges-heading"
          className="border border-neutral-200 bg-sand/50"
        >
          <div className="grid gap-6 px-5 py-5 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <p className="section-kicker">Usage fees</p>
              <h2
                id="charges-heading"
                className="mt-1 text-xl font-semibold text-brand-dark"
              >
                Online data downloading charges
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Download fees apply in addition to membership. All data sales
                are subject to DGPC approval.
              </p>
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {downloadCharges.map((item) => (
                <div
                  key={item.label}
                  className="border border-neutral-200 bg-white px-4 py-3"
                >
                  <dt className="text-xs font-semibold tracking-[0.12em] text-neutral-500 uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-base font-semibold text-brand-dark">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
