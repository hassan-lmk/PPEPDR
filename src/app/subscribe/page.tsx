import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { SubscribeForm } from "@/components/SubscribeForm";
import { memberships } from "@/lib/site";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Subscribe for PetroBank online access to PPEPDR data.",
};

export default function SubscribePage() {
  return (
    <PageShell title="Subscribe">
      <div className="grid gap-4 sm:grid-cols-2">
        {memberships.map((plan) => (
          <article key={plan.name} className="border border-neutral-200">
            <div className="bg-brand px-4 py-3 text-white">
              <h2 className="text-lg font-medium">{plan.name}</h2>
              <p className="text-sm">
                {plan.price}
                {plan.period ? ` / ${plan.period}` : ""}
              </p>
            </div>
            <div className="p-4">
              <p className="mb-3 font-medium">{plan.summary}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {plan.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 bg-[#cccccc] p-5">
        <h2 className="font-semibold">Online Data Downloading Charges</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Seismic data – US $3 per line kilometer</li>
          <li>Well data – US $53 per well</li>
        </ul>
        <p className="mt-3 text-sm">*All data sale is subject to DGPC approval</p>
      </div>

      <div className="mt-8">
        <SubscribeForm />
      </div>
    </PageShell>
  );
}
