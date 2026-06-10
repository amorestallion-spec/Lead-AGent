import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail, type ContactSubmission } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const submission: ContactSubmission = {
      name,
      email,
      phone: phone || undefined,
      message,
      submittedAt: new Date().toISOString(),
    };

    console.log("=== New Contact Form Submission ===");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone || "Not provided");
    console.log("Message:", message);
    console.log("To: kofiwritescopy@gmail.com");
    console.log("===================================");

    // Try to send email via SMTP or save to queue
    const sent = await sendContactEmail(submission);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! We'll get back to you within 4 hours.",
        queued: !sent,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}