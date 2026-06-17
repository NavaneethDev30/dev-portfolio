import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please provide name, email, and message" }, { status: 400 });
    }

    const { EMAIL_USER, EMAIL_PASS } = process.env;

    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("Missing email credentials in .env");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const senderMailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for reaching out! I have received your message and I'll get back to you as soon as possible🦇.</p>
        <p><strong>Your Message:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
          ${message}
        </blockquote>
        <br/>
        <p>Best regards,</p>
        <p>Navaneeth Dev G</p>
      `,
    };

    const adminMailOptions = {
      from: EMAIL_USER,
      to: "navaneethdev33@gmail.com",
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #007bff; padding-left: 10px; color: #333;">
          ${message}
        </blockquote>
      `,
    };

    await Promise.all([
      transporter.sendMail(senderMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
