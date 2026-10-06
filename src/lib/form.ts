export type FieldErrors = Record<string, string>;

export function getRequiredError(value: FormDataEntryValue | null, label: string) {
  if (typeof value !== "string" || !value.trim()) {
    return `${label} is required.`;
  }
  return "";
}

export function getEmailError(value: FormDataEntryValue | null, label = "Email") {
  const required = getRequiredError(value, label);
  if (required) return required;
  const email = String(value).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return `Enter a valid ${label.toLowerCase()}.`;
  }
  return "";
}

export function firstError(errors: FieldErrors) {
  return Object.values(errors).find(Boolean) ?? "";
}
