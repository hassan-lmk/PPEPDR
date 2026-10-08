import nodemailer from "nodemailer";

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getMailConfig() {
  const host = requiredEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT || "25");
  const user =
    process.env.SMTP_USER?.trim() || process.env.SMTP_USE?.trim() || "";
  const pass = process.env.SMTP_PASS?.trim() || "";
  const senderName =
    process.env.SMTP_SENDER_NAME?.trim() || "PPEPDR Website";
  const adminEmail = requiredEnv("SMTP_ADMIN_EMAIL");
  const fromEmail =
    process.env.SMTP_FROM_EMAIL?.trim() || adminEmail;

  return {
    host,
    port,
    user,
    pass,
    senderName,
    adminEmail,
    fromEmail,
    secure: port === 465,
  };
}

export function createMailTransport() {
  const config = getMailConfig();

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.user ? { user: config.user, pass: config.pass } : undefined,
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export async function sendAdminEmail({
  subject,
  text,
  html,
  replyTo,
}: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const config = getMailConfig();
  const transport = createMailTransport();

  await transport.sendMail({
    from: `"${config.senderName}" <${config.fromEmail}>`,
    to: config.adminEmail,
    replyTo: replyTo || undefined,
    subject,
    text,
    html,
  });
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function fieldsToHtml(fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 12px;border:1px solid #e5e5e5;font-weight:600;vertical-align:top;width:180px;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border:1px solid #e5e5e5;white-space:pre-wrap;">${escapeHtml(value || "—")}</td>
        </tr>`,
    )
    .join("");

  return `<table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;color:#111;">${rows}</table>`;
}

export function fieldsToText(fields: Record<string, string>) {
  return Object.entries(fields)
    .map(([label, value]) => `${label}: ${value || "—"}`)
    .join("\n");
}

export function readString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}
