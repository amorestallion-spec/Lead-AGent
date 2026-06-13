import { Resend } from "resend";

// Resend client - only initialized when RESEND_API_KEY is set
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("⚠ RESEND_API_KEY not found in environment variables");
    return null;
  }
  console.log(`ℹ Resend client initialized (API key length: ${apiKey.length})`);
  return new Resend(apiKey);
}

const FROM_ADDRESS = "Crank AI solutions <contact@voiechios.resend.app>";
const TO_ADDRESS = "info.crankai@gmail.com";

/**
 * Check if we're using Resend's sandbox sender (onboarding@resend.dev).
 * In sandbox mode, emails are only delivered to the account owner's
 * verified email — other recipients are silently accepted but NOT delivered.
 * To fix: verify the recipient email in the Resend dashboard, or add a custom domain.
 */
function isSandboxMode(): boolean {
  return FROM_ADDRESS.includes("onboarding@resend.dev");
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
  if (!resend) {
    console.error("✕ Cannot send email: Resend client not initialized (RESEND_API_KEY missing)");
    return false;
  }

  const { name, email, phone, message } = payload;

  console.log("=== Resend Email Debug ===");
  console.log("FROM:", FROM_ADDRESS);
  console.log("TO:", TO_ADDRESS);
  console.log("Reply-To:", email);
  console.log("Subject:", `New Contact: ${name} - Crank AI solutions`);
  console.log("Sandbox mode:", isSandboxMode() ? "YES (onboarding@resend.dev)" : "NO (custom domain)");
  console.log("Payload sender email:", email);
  console.log("Payload sender name:", name);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      replyTo: email,
      subject: `New Contact: ${name} - Crank AI solutions`,
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
              Sent via Crank AI solutions — AI-Powered Websites for Local Businesses
            </p>
          </div>
        </div>
      `,
    });

    console.log("=== Resend API Response ===");
    console.log("Data:", JSON.stringify(data, null, 2));
    console.log("Error:", JSON.stringify(error, null, 2));

    if (error) {
      console.error("✕ Resend API returned an error:");
      console.error("  Error name:", error.name);
      console.error("  Error message:", error.message);
      console.error("  Full error:", JSON.stringify(error));
      return false;
    }

    if (data?.id) {
      console.log(`✓ Resend email accepted (id: ${data.id})`);
      if (isSandboxMode()) {
        console.warn(
          `  NOTE: In sandbox mode, "${TO_ADDRESS}" must be verified in Resend dashboard for delivery.\n` +
          `  Sender's email "${email}" added as Reply-To for easy response.`
        );
      } else {
        console.log(`  Custom domain detected — email should be delivered to ${TO_ADDRESS}`);
      }
    } else {
      console.warn("⚠ Resend returned success but no email ID — delivery may not have occurred");
      console.warn("  Full data:", JSON.stringify(data));
    }
    return true;
  } catch (error) {
    console.error("✕ Resend email send threw an exception:");
    console.error("  Error:", error);
    if (error instanceof Error) {
      console.error("  Message:", error.message);
      console.error("  Stack:", error.stack);
    }
    return false;
  }
}