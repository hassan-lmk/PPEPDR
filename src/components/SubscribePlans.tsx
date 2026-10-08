"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SubscribeForm } from "@/components/SubscribeForm";
import { memberships } from "@/lib/site";

export function SubscribePlans() {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!activePlan) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePlan(null);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activePlan]);

  const close = () => setActivePlan(null);

  return (
    <>
      <section aria-labelledby="plans-heading" className="space-y-5">
        <div className="max-w-2xl">
          <p className="section-kicker">Membership</p>
          <h2
            id="plans-heading"
            className="mt-1 text-xl font-semibold text-brand-dark sm:text-2xl"
          >
            Access plans
          </h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Compare benefits, then request the plan that fits your organisation.
            Pricing is annual unless noted otherwise.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {memberships.map((plan, index) => {
            const featured = index === 0;
            return (
              <article
                key={plan.name}
                className={`flex flex-col border ${
                  featured
                    ? "border-brand bg-white shadow-[0_0_0_1px_rgba(0,51,0,0.12)]"
                    : "border-neutral-200 bg-white"
                }`}
              >
                <div
                  className={`px-4 py-4 ${
                    featured
                      ? "bg-brand text-white"
                      : "border-b border-neutral-200 bg-sand/70 text-brand-dark"
                  }`}
                >
                  {featured ? (
                    <p className="mb-1 text-[11px] font-semibold tracking-[0.16em] text-white/75 uppercase">
                      Most complete
                    </p>
                  ) : null}
                  <h3 className="text-base font-semibold leading-snug">
                    {plan.name}
                  </h3>
                  <p
                    className={`mt-2 text-2xl font-bold tracking-tight ${
                      featured ? "text-white" : "text-brand-dark"
                    }`}
                  >
                    {plan.price}
                    {plan.period ? (
                      <span
                        className={`ml-1 text-sm font-medium ${
                          featured ? "text-white/75" : "text-neutral-500"
                        }`}
                      >
                        / {plan.period}
                      </span>
                    ) : null}
                  </p>
                  <p
                    className={`mt-2 text-sm leading-5 ${
                      featured ? "text-white/85" : "text-neutral-600"
                    }`}
                  >
                    {plan.summary}
                  </p>
                </div>
                <div className="flex flex-1 flex-col px-4 py-4">
                  <ul className="space-y-2.5 text-sm leading-5 text-neutral-700">
                    {plan.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-2">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                          aria-hidden
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setActivePlan(plan.name)}
                    className={`mt-5 inline-flex min-h-11 items-center justify-center px-4 text-sm font-semibold transition ${
                      featured
                        ? "cta-on-brand bg-brand hover:bg-brand-dark"
                        : "border border-brand/30 text-brand-dark hover:bg-sand"
                    }`}
                  >
                    Request this plan
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {activePlan ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/55 p-0 sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden border border-neutral-200 bg-white shadow-2xl sm:max-h-[88vh]"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-neutral-200 bg-sand/60 px-5 py-4 sm:px-6 sm:py-5">
              <div>
                <p className="section-kicker">Request access</p>
                <h2
                  id={titleId}
                  className="mt-1 text-xl font-semibold text-brand-dark sm:text-2xl"
                >
                  Subscription request
                </h2>
                <p
                  id={descriptionId}
                  className="mt-2 max-w-xl text-sm leading-6 text-neutral-600"
                >
                  Requesting{" "}
                  <strong className="text-brand-dark">{activePlan}</strong>.
                  Complete the form to continue.
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-300 text-neutral-700 transition hover:bg-white"
                aria-label="Close subscription form"
              >
                <span aria-hidden className="text-xl leading-none">
                  ×
                </span>
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              <SubscribeForm key={activePlan} initialPlan={activePlan} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
