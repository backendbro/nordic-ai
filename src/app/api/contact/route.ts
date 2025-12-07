import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, message } = body;

    // Send email
    const result = await resend.emails.send({
      from: "Nordic AI <info@nordicai.io>",
      to: "info@nordicai.io",
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
