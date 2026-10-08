import { NextResponse } from "next/server";
import { getEmailError, getRequiredError } from "@/lib/form";
import {
  fieldsToHtml,
  fieldsToText,
  readString,
  sendAdminEmail,
} from "@/lib/mail";
import { memberships } from "@/lib/site";

const requiredFields = [
  { name: "name", label: "Full name" },
  { name: "title", label: "Job title" },
  { name: "email", label: "Email" },
  { name: "tel", label: "Telephone" },
  { name: "company", label: "Company" },
  { name: "address", label: "Street address" },
  { name: "city", label: "City" },
  { name: "province", label: "State / province" },
  { name: "country", label: "Country" },
  { name: "zip", label: "Zip / postal code" },
  { name: "subscription", label: "Subscription type" },
] as const;

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const values = Object.fromEntries(
      [
        "name",
        "title",
        "email",
        "tel",
        "fax",
        "company",
        "industry",
        "address",
        "city",
        "province",
        "country",
        "zip",
        "subscription",
        "comments",
      ].map((key) => [key, readString(data.get(key))]),
    );

    const errors: Record<string, string> = {};
    for (const field of requiredFields) {
      if (field.name === "email") {
        errors.email = getEmailError(values.email, "Email");
      } else {
        errors[field.name] = getRequiredError(
          values[field.name],
          field.label,
        );
      }
    }

    const allowedPlans = new Set(memberships.map((plan) => plan.name));
    if (values.subscription && !allowedPlans.has(values.subscription)) {
      errors.subscription = "Select a valid subscription type.";
    }

    if (Object.values(errors).some(Boolean)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please complete the required fields.",
          errors,
        },
        { status: 400 },
      );
    }

    const fields = {
      "Full name": values.name,
      "Job title": values.title,
      Email: values.email,
      Telephone: values.tel,
      Fax: values.fax,
      Company: values.company,
      "Related industry": values.industry,
      "Street address": values.address,
      City: values.city,
      "State / province": values.province,
      Country: values.country,
      "Zip / postal code": values.zip,
      "Subscription type": values.subscription,
      Comments: values.comments,
    };

    await sendAdminEmail({
      subject: `PPEPDR subscription request — ${values.subscription} — ${values.name}`,
      replyTo: values.email,
      text: `New subscription request\n\n${fieldsToText(fields)}`,
      html: `<p style="font-family:Arial,sans-serif;font-size:14px;">New subscription request from the PPEPDR website.</p>${fieldsToHtml(fields)}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Subscribe form email failed:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Unable to send your subscription request right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
