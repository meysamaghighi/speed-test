import { NextRequest, NextResponse } from "next/server";

// Rate limit: 3 attempts per IP per hour (in-memory, resets on cold start — fine for low volume)
const limiter = new Map<string, { count: number; resetAt: number }>();

function allow(ip: string): boolean {
  const now = Date.now();
  const entry = limiter.get(ip);
  if (!entry || entry.resetAt < now) {
    limiter.set(ip, { count: 1, resetAt: now + 3_600_000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anon";
  if (!allow(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let email: string;
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  // Stripe Search API: find completed sessions by buyer email
  const query = `customer_details.email:"${email}"`;
  const res = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/search?query=${encodeURIComponent(query)}&limit=10`,
    { headers: { Authorization: `Bearer ${key}` }, cache: "no-store" }
  );

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "stripe_error" }, { status: 502 });
  }

  const data = await res.json();
  const paid =
    Array.isArray(data?.data) &&
    data.data.some((s: { payment_status: string }) => s.payment_status === "paid");

  return NextResponse.json({ ok: paid });
}
