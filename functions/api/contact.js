/**
 * POST /api/contact
 * Server-side contact handler for Cloudflare Pages.
 *
 * Required environment variables (Pages → Settings → Variables and Secrets):
 *   TURNSTILE_SECRET_KEY  – Cloudflare Turnstile secret key
 *   CONTACT_WEBHOOK_URL   – Google Apps Script web app URL (kept server-side only)
 */

const TOPICS = [
  "General Inquiry",
  "Product Information",
  "Business Partnership",
  "K-Beauty / Supplier Inquiry",
  "Website / Content Feedback"
];

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

function clean(value, max) {
  return String(value == null ? "" : value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

export async function onRequestPost(context) {
  const request = context.request;
  const env = context.env;

  if (!env.TURNSTILE_SECRET_KEY || !env.CONTACT_WEBHOOK_URL) {
    return json({ ok: false, error: "Service is not configured." }, 500);
  }

  /* Same-origin only */
  const origin = request.headers.get("Origin");
  try {
    if (!origin || new URL(origin).host !== new URL(request.url).host) {
      return json({ ok: false, error: "Request not allowed." }, 403);
    }
  } catch (error) {
    return json({ ok: false, error: "Request not allowed." }, 403);
  }

  let form;
  try {
    form = await request.formData();
  } catch (error) {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  /* Honeypot: pretend success, send nothing */
  if (clean(form.get("_honey"), 100)) {
    return json({ ok: true });
  }

  const data = {
    name: clean(form.get("name"), 100),
    email: clean(form.get("email"), 150),
    country_code: clean(form.get("country_code"), 20),
    phone: clean(form.get("phone"), 30),
    inquiry_topic: clean(form.get("inquiry_topic"), 60),
    company: clean(form.get("company"), 150),
    message: clean(form.get("message"), 2000),
    consent: clean(form.get("consent"), 5)
  };

  /* Validation */
  if (data.name.length < 2) {
    return json({ ok: false, error: "Please enter your full name." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
    return json({ ok: false, error: "Please enter a valid email address." }, 400);
  }
  if (!/^[0-9+()\-.\s]{5,30}$/.test(data.phone)) {
    return json({ ok: false, error: "Please enter a valid phone number." }, 400);
  }
  if (TOPICS.indexOf(data.inquiry_topic) === -1) {
    return json({ ok: false, error: "Please select an inquiry topic." }, 400);
  }
  if (data.message.length < 10) {
    return json({ ok: false, error: "Please enter a longer message." }, 400);
  }
  if (data.consent !== "yes") {
    return json({ ok: false, error: "Please accept the privacy policy to continue." }, 400);
  }

  /* Turnstile verification */
  const token = clean(form.get("cf-turnstile-response"), 2048);
  if (!token) {
    return json({ ok: false, error: "Please complete the verification." }, 400);
  }

  try {
    const verifyBody = new URLSearchParams();
    verifyBody.set("secret", env.TURNSTILE_SECRET_KEY);
    verifyBody.set("response", token);
    const ip = request.headers.get("CF-Connecting-IP");
    if (ip) verifyBody.set("remoteip", ip);

    const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: verifyBody
    });
    const verifyResult = await verifyResponse.json();

    if (!verifyResult.success) {
      return json({ ok: false, error: "Verification failed. Please try again." }, 400);
    }
  } catch (error) {
    return json({ ok: false, error: "Verification service unavailable. Please try again." }, 502);
  }

  /* Forward to Google Apps Script (same field names as before) */
  try {
    const payload = new URLSearchParams();
    payload.set("name", data.name);
    payload.set("email", data.email);
    payload.set("country_code", data.country_code);
    payload.set("phone", data.phone);
    payload.set("inquiry_topic", data.inquiry_topic);
    payload.set("company", data.company);
    payload.set("message", data.message);
    payload.set("consent", "yes");
    payload.set("_honey", "");

    const forward = await fetch(env.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload,
      redirect: "follow"
    });

    if (!forward.ok) {
      return json({ ok: false, error: "Message could not be sent. Please try again later." }, 502);
    }
  } catch (error) {
    return json({ ok: false, error: "Message could not be sent. Please try again later." }, 502);
  }

  return json({ ok: true });
}

export async function onRequest() {
  return new Response(JSON.stringify({ ok: false, error: "Method not allowed." }), {
    status: 405,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Allow": "POST"
    }
  });
}
