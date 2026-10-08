import { NextResponse } from "next/server";
import { getEmailError, getRequiredError } from "@/lib/form";
import {
  fieldsToHtml,
  fieldsToText,
  readString,
  sendAdminEmail,
} from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const name = readString(data.get("name"));
    const email = readString(data.get("email"));
    const phone = readString(data.get("phone"));
    const question = readString(data.get("question"));

    const errors = {
      name: getRequiredError(name, "Name"),
      email: getEmailError(email, "E-mail"),
      phone: getRequiredError(phone, "Contact number"),
    };

    if (Object.values(errors).some(Boolean)) {
      return NextResponse.json(
        { ok: false, message: "Please fix the highlighted fields.", errors },
        { status: 400 },
      );
    }

    const fields = {
      Name: name,
      Email: email,
      Phone: phone,
      "Comments / suggestions": question,
    };

    await sendAdminEmail({
      subject: `PPEPDR contact form — ${name}`,
      replyTo: email,
      text: `New contact form submission\n\n${fieldsToText(fields)}`,
      html: `<p style="font-family:Arial,sans-serif;font-size:14px;">New contact form submission from the PPEPDR website.</p>${fieldsToHtml(fields)}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Unable to send your message right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
