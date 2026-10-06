"use client";

import { useState } from "react";
import {
  firstError,
  getRequiredError,
  type FieldErrors,
} from "@/lib/form";

export function LoginForm() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  return (
    <form
      className="grid max-w-md gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const nextErrors: FieldErrors = {
          username: getRequiredError(data.get("username"), "Username"),
          password: getRequiredError(data.get("password"), "Password"),
        };
        setErrors(nextErrors);
        if (firstError(nextErrors)) {
          setMessage("");
          return;
        }
        setMessage(
          "Member login is not connected in this frontend. Credentials were not sent.",
        );
      }}
    >
      {firstError(errors) ? (
        <p
          role="alert"
          className="border border-danger-border bg-danger-bg px-3 py-2 text-sm text-danger"
        >
          Please enter your username and password.
        </p>
      ) : null}

      <label className="grid gap-1 text-sm font-medium">
        Username
        <input
          name="username"
          required
          autoComplete="username"
          aria-invalid={errors.username ? true : undefined}
          aria-describedby={
            errors.username ? "login-username-error" : undefined
          }
          className="field-input"
        />
        {errors.username ? (
          <span id="login-username-error" className="field-error">
            {errors.username}
          </span>
        ) : null}
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={
            errors.password ? "login-password-error" : undefined
          }
          className="field-input"
        />
        {errors.password ? (
          <span id="login-password-error" className="field-error">
            {errors.password}
          </span>
        ) : null}
      </label>
      <button type="submit" className="btn-primary w-fit">
        Log in to member account
      </button>
      {message ? (
        <p className="text-sm text-brand-dark" role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
