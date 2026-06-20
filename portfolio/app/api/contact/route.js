import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide name, email, and message' },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials are not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Send emails simultaneously using Promise.all
    await Promise.all([
      // 1. Notification email to you
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Your verified email
        replyTo: email, // Set the sender's email for replies
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
      transporter.sendMail({
        from: process.env.EMAIL_USER,
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
