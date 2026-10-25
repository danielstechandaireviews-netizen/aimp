import "server-only";

/**
 * Newsletter provider integration.
 *
 *   NEWSLETTER_PROVIDER = "convertkit" | "mailchimp" | "none" (default)
 *
 * ConvertKit (Kit) — API v4:
 *   CONVERTKIT_API_KEY, CONVERTKIT_FORM_ID
 * Mailchimp — Marketing API v3:
 *   MAILCHIMP_API_KEY (ends in "-us21" etc.), MAILCHIMP_AUDIENCE_ID
 *
 * With "none", sign-ups are emailed to CONTACT_TO_EMAIL via Resend so you
 * don't lose them while you choose a provider.
 */

export type SubscribeResult = { ok: true } | { ok: false; error: string };

export async function subscribe(email: string, firstName?: string, tag?: string): Promise<SubscribeResult> {
  const provider = (process.env.NEWSLETTER_PROVIDER ?? "none").replace(/["'\s]/g, "").toLowerCase();

  try {
    if (provider === "convertkit") return await subscribeConvertKit(email, firstName);
    if (provider === "mailchimp") return await subscribeMailchimp(email, firstName, tag);
  } catch (err) {
    console.error(`[newsletter] ${provider} error:`, err);
    return { ok: false, error: "Subscription failed" };
  }

  const { sendNotification } = await import("./email");
  const res = await sendNotification("New newsletter sign-up", { Email: email, "First name": firstName, Source: tag });
  return res.ok ? { ok: true } : { ok: false, error: res.error };
}

async function subscribeConvertKit(email: string, firstName?: string): Promise<SubscribeResult> {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;
  if (!apiKey || !formId) return { ok: false, error: "ConvertKit is not configured" };

  const headers = { "Content-Type": "application/json", "X-Kit-Api-Key": apiKey };

  // 1) Create or update the subscriber
  const create = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers,
    body: JSON.stringify({ email_address: email, first_name: firstName || undefined }),
  });
  if (!create.ok) return { ok: false, error: `Kit subscriber error ${create.status}` };

  // 2) Add them to the form (triggers your Kit automations / incentive email)
  const add = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email_address: email }),
  });
  if (!add.ok) return { ok: false, error: `Kit form error ${add.status}` };
  return { ok: true };
}

async function subscribeMailchimp(email: string, firstName?: string, tag?: string): Promise<SubscribeResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!apiKey || !audienceId) return { ok: false, error: "Mailchimp is not configured" };

  const dc = apiKey.split("-")[1];
  const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
    },
    body: JSON.stringify({
      email_address: email,
      status: "pending", // double opt-in — recommended for GDPR
      merge_fields: firstName ? { FNAME: firstName } : undefined,
      tags: tag ? [tag] : undefined,
    }),
  });

  if (res.ok) return { ok: true };
  const body = (await res.json().catch(() => ({}))) as { title?: string };
  // Already subscribed is fine from the visitor's point of view.
  if (body.title === "Member Exists") return { ok: true };
  return { ok: false, error: `Mailchimp error ${res.status}` };
}
