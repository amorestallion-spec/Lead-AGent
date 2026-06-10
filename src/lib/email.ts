import { sendWithResend } from "./resend-client";
import fs from "fs";
import path from "path";

const QUEUE_FILE = path.join(process.cwd(), "contact-submissions.json");

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: string;
}

/**
 * Send contact email - tries Resend first, falls back to saved queue
 */
export async function sendContactEmail(data: ContactSubmission): Promise<boolean> {
  const { name, email, phone, message } = data;

  // Try Resend (primary email service)
  const resent = await sendWithResend({ name, email, phone, message });
  if (resent) {
    console.log(`✓ Email sent via Resend for ${name} <${email}>`);
    return true;
  }

  console.log("ℹ Resend not configured, saving to queue file");

  // Fallback: save to queue file
  try {
    let queue: ContactSubmission[] = [];
    if (fs.existsSync(QUEUE_FILE)) {
      const raw = fs.readFileSync(QUEUE_FILE, "utf-8");
      queue = JSON.parse(raw);
    }
    queue.push(data);
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
    console.log(`✓ Saved to queue file (${queue.length} pending)`);
  } catch (err) {
    console.error("✕ Failed to save to queue:", err);
  }

  return false;
}

/**
 * Read all pending submissions from the queue
 */
export function getPendingSubmissions(): ContactSubmission[] {
  if (!fs.existsSync(QUEUE_FILE)) return [];
  try {
    const raw = fs.readFileSync(QUEUE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Clear the queue (call after forwarding submissions)
 */
export function clearQueue(): void {
  try {
    fs.writeFileSync(QUEUE_FILE, "[]");
  } catch {
    // ignore
  }
}