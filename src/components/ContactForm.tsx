"use client";

import { useId, useState } from "react";
import {
  firstError,
  getEmailError,
  getRequiredError,
  type FieldErrors,
} from "@/lib/form";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const formErrorId = useId();
  const nameErrorId = useId();
  const emailErrorId = useId();
  const phoneErrorId = useId();

  if (sent) {
    return (
      <div
        className="border border-brand/20 bg-sand px-5 py-6 text-sm leading-6 text-brand-dark"
        role="status"
      >
        <p className="font-semibold">Thank you for your message.</p>
        <p className="mt-2 text-neutral-700">
          Your enquiry has been sent to the PPEPDR support team. We will get
          back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const nextErrors: FieldErrors = {
          name: getRequiredError(data.get("name"), "Name"),
          email: getEmailError(data.get("email"), "E-mail"),
          phone: getRequiredError(data.get("phone"), "Contact number"),
        };
        setErrors(nextErrors);
        setSubmitError("");
        if (firstError(nextErrors)) return;

        setSubmitting(true);
        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            body: data,
          });
          const result = (await response.json().catch(() => null)) as {
            ok?: boolean;
            message?: string;
            errors?: FieldErrors;
          } | null;

          if (!response.ok || !result?.ok) {
            if (result?.errors) setErrors(result.errors);
            setSubmitError(
              result?.message ||
                "Unable to send your message right now. Please try again later.",
            );
            return;
          }

          setSent(true);
          form.reset();
        } catch {
          setSubmitError(
            "Unable to send your message right now. Please try again later.",
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {firstError(errors) || submitError ? (
        <p
          id={formErrorId}
          role="alert"
          className="border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger"
        >
          {submitError ||
            "Please fix the highlighted fields and try again."}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium text-neutral-800">
          Name<span className="text-danger">*</span>
          <input
            name="name"
            autoComplete="name"
            required
            placeholder="Your full name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? nameErrorId : undefined}
            className="field-input min-h-11 w-full"
          />
          {errors.name ? (
            <span id={nameErrorId} className="field-error">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="grid gap-1.5 text-sm font-medium text-neutral-800">
          E-mail<span className="text-danger">*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@company.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? emailErrorId : undefined}
            className="field-input min-h-11 w-full"
          />
          {errors.email ? (
            <span id={emailErrorId} className="field-error">
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>

      <label className="grid gap-1.5 text-sm font-medium text-neutral-800 sm:max-w-md">
        Contact number<span className="text-danger">*</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="+92 …"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? phoneErrorId : undefined}
          className="field-input min-h-11 w-full"
        />
        {errors.phone ? (
          <span id={phoneErrorId} className="field-error">
            {errors.phone}
          </span>
        ) : null}
      </label>

      <label className="grid gap-1.5 text-sm font-medium text-neutral-800">
        Comments / suggestions
        <textarea
          name="question"
          rows={6}
          placeholder="How can we help?"
          className="field-input w-full resize-y"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-neutral-500">
          Fields marked with <span className="text-danger">*</span> are
          required.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary min-h-11 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Sending…" : "Submit message"}
        </button>
      </div>
    </form>
  );
}
