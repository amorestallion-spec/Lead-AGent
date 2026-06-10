import { Resend } from "resend";

// Resend client - only initialized when RESEND_API_KEY is set
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("⚠ RESEND_API_KEY not found in environment variables");
    return null;
  }
  return new Resend(apiKey);
}

/**
 * Send email via Resend (the primary email service for this project)
 * Falls back to logging if not configured
 */
export async function sendWithResend(payload: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<boolean> {
  const resend = getResendClient();
  if (!resend) return false;

  const { name, email, phone, message } = payload;

  try {
    const result = await resend.emails.send({
      from: "Crank A,i solutions <onboarding@resend.dev>",
      to: ["kofiwritescopy@gmail.com"],
      subject: `New Contact: ${name} - Crank A,i solutions`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed, #14b8a6); padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">✨ New Contact Form Submission</h1>
          </div>
          <div style="background: #1a1a2e; padding: 24px; border-radius: 0 0 12px 12px; color: #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 100px;">Name:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #fff;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></td>
              </tr>
              ${phone ? `<tr>
                <td style="padding: 8px 0; color: #888;">Phone:</td>
                <td style="padding: 8px 0; color: #fff;">${phone}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #888;">Time:</td>
                <td style="padding: 8px 0; color: #fff;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
              <p style="margin: 0 0 8px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; line-height: 1.6; color: #ccc;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 20px 0;" />
            <p style="color: #666; font-size: 12px; text-align: center;">
              Sent via Crank A,i solutions — AI-Powered Websites for Local Businesses
            </p>
          </div>
        </div>
      `,
    });

    console.log("✓ Resend API response:", JSON.stringify(result));
    return true;
  } catch (error) {
    console.error("✕ Resend email send failed:", error);
    return false;
  }
}