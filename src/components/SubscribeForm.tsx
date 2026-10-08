"use client";

import { useState } from "react";
import {
  firstError,
  getEmailError,
  getRequiredError,
  type FieldErrors,
} from "@/lib/form";
import { memberships } from "@/lib/site";

type Field = {
  name: string;
  label: string;
  required: boolean;
  type?: string;
  autoComplete?: string;
  span?: "full" | "half";
};

const contactFields: Field[] = [
  {
    name: "name",
    label: "Full name",
    required: true,
    autoComplete: "name",
    span: "half",
  },
  {
    name: "title",
    label: "Job title",
    required: true,
    autoComplete: "organization-title",
    span: "half",
  },
  {
    name: "email",
    label: "Email",
    required: true,
    type: "email",
    autoComplete: "email",
    span: "half",
  },
  {
    name: "tel",
    label: "Telephone",
    required: true,
    type: "tel",
    autoComplete: "tel",
    span: "half",
  },
  {
    name: "fax",
    label: "Fax",
    required: false,
    type: "tel",
    span: "half",
  },
];

const organisationFields: Field[] = [
  {
    name: "company",
    label: "Company",
    required: true,
    autoComplete: "organization",
    span: "full",
  },
  {
    name: "industry",
    label: "Related industry",
    required: false,
    span: "full",
  },
];

const addressFields: Field[] = [
  {
    name: "address",
    label: "Street address",
    required: true,
    autoComplete: "street-address",
    span: "full",
  },
  {
    name: "city",
    label: "City",
    required: true,
    autoComplete: "address-level2",
    span: "half",
  },
  {
    name: "province",
    label: "State / province",
    required: true,
    autoComplete: "address-level1",
    span: "half",
  },
  {
    name: "country",
    label: "Country",
    required: true,
    autoComplete: "country-name",
    span: "half",
  },
  {
    name: "zip",
    label: "Zip / postal code",
    required: true,
    autoComplete: "postal-code",
    span: "half",
  },
];

function FieldGrid({
  fields,
  errors,
}: {
  fields: Field[];
  errors: FieldErrors;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => {
        const error = errors[field.name];
        const errorId = `subscribe-${field.name}-error`;
        return (
          <label
            key={field.name}
            className={`grid gap-1.5 text-sm ${
              field.span === "full" ? "sm:col-span-2" : ""
            }`}
          >
            <span className="font-medium text-neutral-800">
              {field.label}
              {field.required ? (
                <span className="text-danger" aria-hidden>
                  {" "}
                  *
                </span>
              ) : (
                <span className="font-normal text-neutral-500">
                  {" "}
                  (optional)
                </span>
              )}
            </span>
            <input
              name={field.name}
              type={field.type ?? "text"}
              required={field.required}
              autoComplete={field.autoComplete}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className="field-input"
            />
            {error ? (
              <span id={errorId} className="field-error">
                {error}
              </span>
            ) : null}
          </label>
        );
      })}
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-4 border-0 p-0">
      <legend className="w-full border-b border-neutral-200 pb-2">
        <span className="text-base font-semibold text-brand-dark">{title}</span>
        {description ? (
          <span className="mt-1 block text-sm font-normal text-neutral-600">
            {description}
          </span>
        ) : null}
      </legend>
      {children}
    </fieldset>
  );
}

export function SubscribeForm({
  initialPlan,
}: {
  initialPlan?: string;
}) {
  const defaultPlan =
    initialPlan && memberships.some((item) => item.name === initialPlan)
      ? initialPlan
      : (memberships[0]?.name ?? "");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);

  if (sent) {
    return (
      <div
        role="status"
        className="border border-brand/20 bg-sand/70 px-5 py-6 sm:px-6"
      >
        <p className="text-lg font-semibold text-brand-dark">
          Request received (preview)
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-700">
          Thank you. This preview does not send subscription requests to
          PetroBank, so nothing was submitted. In production, your details
          would be routed for membership processing.
        </p>
      </div>
    );
  }

  const allFields = [...contactFields, ...organisationFields, ...addressFields];

  return (
    <form
      className="space-y-8"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const nextErrors: FieldErrors = {};

        for (const field of allFields) {
          if (!field.required) continue;
          if (field.name === "email") {
            nextErrors.email = getEmailError(data.get("email"), "Email");
          } else {
            nextErrors[field.name] = getRequiredError(
              data.get(field.name),
              field.label,
            );
          }
        }

        nextErrors.subscription = getRequiredError(
          data.get("subscription"),
          "Subscription type",
        );

        setErrors(nextErrors);
        if (firstError(nextErrors)) return;
        setSent(true);
      }}
    >
      {firstError(errors) ? (
        <p
          role="alert"
          className="border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger"
        >
          Please complete the required fields highlighted below.
        </p>
      ) : null}

      <Section title="Contact person">
        <FieldGrid fields={contactFields} errors={errors} />
      </Section>

      <Section title="Organisation">
        <FieldGrid fields={organisationFields} errors={errors} />
      </Section>

      <Section title="Address">
        <FieldGrid fields={addressFields} errors={errors} />
      </Section>

      <Section
        title="Plan & comments"
        description="Confirm the membership tier you want and add any notes for our team."
      >
        <div className="grid gap-4">
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-neutral-800">
              Subscription type
              <span className="text-danger" aria-hidden>
                {" "}
                *
              </span>
            </span>
            <select
              name="subscription"
              required
              value={selectedPlan}
              onChange={(event) => setSelectedPlan(event.target.value)}
              aria-invalid={errors.subscription ? true : undefined}
              aria-describedby={
                errors.subscription ? "subscribe-subscription-error" : undefined
              }
              className="field-input max-w-md"
            >
              {memberships.map((plan) => (
                <option key={plan.name} value={plan.name}>
                  {plan.name}
                  {plan.period
                    ? ` — ${plan.price} / ${plan.period}`
                    : ` — ${plan.price}`}
                </option>
              ))}
            </select>
            {errors.subscription ? (
              <span id="subscribe-subscription-error" className="field-error">
                {errors.subscription}
              </span>
            ) : null}
          </label>

          <label className="grid gap-1.5 text-sm">
            <span className="font-medium text-neutral-800">
              Comments{" "}
              <span className="font-normal text-neutral-500">(optional)</span>
            </span>
            <textarea
              name="comments"
              rows={5}
              className="field-input"
              placeholder="Tell us about your data needs, preferred start date, or DGPC references."
            />
          </label>
        </div>
      </Section>

      <div className="flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-6">
        <button type="submit" className="btn-primary min-h-11 px-6 py-2.5">
          Submit subscription request
        </button>
        <button
          type="reset"
          className="btn-secondary min-h-11"
          onClick={() => {
            setErrors({});
            setSelectedPlan(defaultPlan);
          }}
        >
          Reset form
        </button>
        <p className="w-full text-xs leading-5 text-neutral-500 sm:w-auto sm:max-w-md">
          Required fields are marked with *. All data sales remain subject to
          DGPC approval.
        </p>
      </div>
    </form>
  );
}
