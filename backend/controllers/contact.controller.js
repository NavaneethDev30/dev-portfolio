import { Resend } from "resend";
import Contact from "../models/contact.model.js";
import { RENDER_KEY } from "../config/env.js";

const resend = new Resend(RENDER_KEY);

export const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      const error = new Error("Please provide name, email, and message");
      error.statusCode = 400;
      throw error;
    }

    // Save contact to database
    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    // Send email using Resend
    // Note: Resend's free tier allows sending from onboarding@resend.dev ONLY to your verified email address
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "navaneethdev33@gmail.com", // Your verified email address
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #007bff; padding-left: 10px; color: #333;">
          ${message}
        </blockquote>
      `
    });

    if (error) {
      const err = new Error(error.message);
      err.statusCode = 400;
      throw err;
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};
