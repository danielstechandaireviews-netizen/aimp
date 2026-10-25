import "server-only";
import { Resend } from "resend";

/**
 * Email delivery via Resend. Configure with:
 *   RESEND_API_KEY      – your Resend API key
 *   RESEND_FROM_EMAIL   – optional sender on a domain verified in Resend
 *                         (defaults to DEFAULT_FROM)
 *   CONTACT_TO_EMAIL    – where enquiries are delivered (defaults to OWNER_INBOX)
 */

/** Inbox that receives every form submission (contact, enquiries, newsletter sign-ups). */
const OWNER_INBOX = "danielstechandaireviews@gmail.com";

export type SendResult = { ok: true } | { ok: false; error: string };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Default sender — aimonipoint.com is verified in Resend. */
const DEFAULT_FROM = "AIMoniPoint <daniel@aimonipoint.com>";

/** Reads an env var, ignoring stray whitespace and wrapping quotes pasted into the hosting dashboard. */
function env(name: string) {
  return process.env[name]?.trim().replace(/^(["'])(.*)\1$/, "$2").trim() || undefined;
}

function isConfigured() {
  return Boolean(env("RESEND_API_KEY"));
}

async function send(opts: { to: string; subject: string; html: string; text: string; replyTo?: string }): Promise<SendResult> {
  if (!isConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email:dev] Resend not configured — would send "${opts.subject}" to ${opts.to}\n${opts.text}`);
      return { ok: true };
    }
    console.error("[email] RESEND_API_KEY is not set.");
    return { ok: false, error: "Email is not configured" };
  }

  try {
    const resend = new Resend(env("RESEND_API_KEY"));
    const { error } = await resend.emails.send({
      from: env("RESEND_FROM_EMAIL") ?? DEFAULT_FROM,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    });
    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] Unexpected error:", err);
    return { ok: false, error: "Unexpected error" };
  }
}

/** Sends a form submission to the site owner as a simple table. */
export async function sendNotification(subject: string, fields: Record<string, string | undefined>, replyTo?: string) {
  const to = env("CONTACT_TO_EMAIL") ?? OWNER_INBOX;

  const rows = Object.entries(fields).filter(([, v]) => v);
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;font-size:14px;color:#111">
      <h2 style="margin:0 0 16px">${escapeHtml(subject)}</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="border:1px solid #ddd;font-weight:600;vertical-align:top">${escapeHtml(k)}</td><td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v!)}</td></tr>`,
          )
          .join("")}
      </table>
    </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  return send({ to, subject: `[AIMoniPoint] ${subject}`, html, text, replyTo });
}

/** Sends the lead-magnet download link to the subscriber. */
export async function sendLeadMagnet(to: string, firstName: string, title: string, url: string) {
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#111;line-height:1.6">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thanks for requesting <strong>${escapeHtml(title)}</strong>. You can download it here:</p>
      <p><a href="${escapeHtml(url)}" style="display:inline-block;background:#14b8a6;color:#04141a;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">Download the roadmap</a></p>
      <p>If you'd like help choosing your path, reply to this email or book a free discovery call on the website.</p>
      <p>— Daniel, AIMoniPoint</p>
    </div>`;
  const text = `Hi ${firstName},\n\nThanks for requesting ${title}. Download it here: ${url}\n\n— Daniel, AIMoniPoint`;
  return send({ to, subject: `Your copy of ${title}`, html, text });
}
