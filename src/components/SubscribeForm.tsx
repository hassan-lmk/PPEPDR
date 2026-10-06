"use client";

import { useState } from "react";
import {
  firstError,
  getEmailError,
  getRequiredError,
  type FieldErrors,
} from "@/lib/form";
import { memberships } from "@/lib/site";

const fields = [
  { name: "name", label: "Name", required: true },
  { name: "title", label: "Title", required: true },
  { name: "company", label: "Company", required: true },
  { name: "address", label: "Address", required: true },
  { name: "city", label: "City", required: true },
  { name: "province", label: "State/Province", required: true },
  { name: "country", label: "Country", required: true },
  { name: "zip", label: "Zip/Postal Code", required: true },
  { name: "tel", label: "Tel", required: true },
  { name: "fax", label: "Fax", required: false },
  { name: "email", label: "Email", required: true, type: "email" },
  { name: "industry", label: "Related Industry", required: false },
] as const;

export function SubscribeForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  if (sent) {
    return (
      <p className="prose-copy" role="status">
        Thank you. This preview does not send subscription requests to
        PetroBank, so nothing was submitted.
      </p>
    );
  }

  return (
    <form
      className="grid max-w-2xl gap-3"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const nextErrors: FieldErrors = {};

        for (const field of fields) {
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
      <p className="prose-copy">
        Please fill out the following form to subscribe for PetroBank&apos;s
        Online Service.
      </p>

      {firstError(errors) ? (
        <p
          role="alert"
          className="border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger"
        >
          Please complete the required fields highlighted below.
        </p>
      ) : null}

      {fields.map((field) => {
        const error = errors[field.name];
        const errorId = `subscribe-${field.name}-error`;
        return (
          <label
            key={field.name}
            className="grid gap-1 text-sm sm:grid-cols-[180px_1fr] sm:items-start"
          >
            <span className="sm:pt-2">
              {field.label}
              {field.required ? "*" : ""}
            </span>
            <span className="grid gap-1">
              <input
                name={field.name}
                type={"type" in field ? field.type : "text"}
                required={field.required}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                className="field-input"
              />
              {error ? (
                <span id={errorId} className="field-error">
                  {error}
                </span>
              ) : null}
            </span>
          </label>
        );
      })}
      <label className="grid gap-1 text-sm sm:grid-cols-[180px_1fr] sm:items-start">
        <span className="sm:pt-2">Subscription Type*</span>
        <span className="grid gap-1">
          <select
            name="subscription"
            required
            aria-invalid={errors.subscription ? true : undefined}
            aria-describedby={
              errors.subscription ? "subscribe-subscription-error" : undefined
            }
            className="field-input"
          >
            {memberships.map((plan) => (
              <option key={plan.name} value={plan.name}>
                {plan.name}
              </option>
            ))}
          </select>
          {errors.subscription ? (
            <span id="subscribe-subscription-error" className="field-error">
              {errors.subscription}
            </span>
          ) : null}
        </span>
      </label>
      <label className="grid gap-1 text-sm sm:grid-cols-[180px_1fr]">
        <span>Comments</span>
        <textarea name="comments" rows={6} className="field-input" />
      </label>
      <div className="flex gap-3 sm:pl-[180px]">
        <button type="submit" className="btn-primary px-6 py-2">
          Submit subscription request
        </button>
        <button
          type="reset"
          className="btn-secondary"
          onClick={() => setErrors({})}
        >
          Reset form
        </button>
      </div>
    </form>
  );
}
