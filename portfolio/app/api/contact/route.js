import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide name, email, and message' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Send emails simultaneously using Promise.all
    const [adminResponse, userResponse] = await Promise.all([
      // 1. Notification email to you
      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'navaneethdev33@gmail.com', // Your verified email
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
      }),
      // 2. Acknowledgement email to the user
      // NOTE: On Resend free tier, this might fail if the user's email isn't verified.
      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email, 
        subject: 'Thank you for contacting me!',
        html: `
          <h3>Hi ${name},</h3>
          <p>Thank you for reaching out! I have received your message and I'll get back to you as soon as possible 🦇.</p>
          <p><strong>Your Message:</strong></p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
            ${message}
          </blockquote>
          <br/>
          <p>Best regards,</p>
          <p>Navaneeth Dev G</p>
        `,
      })
    ]);

    // Check if either failed
    if (adminResponse.error || userResponse.error) {
      console.error("Resend API Error:", adminResponse.error || userResponse.error);
      return NextResponse.json(
        { error: adminResponse.error?.message || userResponse.error?.message || 'Failed to send emails' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
