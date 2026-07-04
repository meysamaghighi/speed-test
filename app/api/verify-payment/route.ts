import { NextRequest, NextResponse } from "next/server";

// Verifies a Stripe Checkout session (from the Payment Link redirect) without the stripe SDK.
// Requires STRIPE_SECRET_KEY in the environment (server-side only).
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId || !/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) {
    return NextResponse.json({ paid: false, error: "invalid_session_id" }, { status: 400 });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ paid: false, error: "not_configured" }, { status: 503 });
  }

  const res = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    { headers: { Authorization: `Bearer ${key}` }, cache: "no-store" }
  );
  if (!res.ok) {
    return NextResponse.json({ paid: false, error: "stripe_error" }, { status: 502 });
  }

  const session = await res.json();
  const paid = session.payment_status === "paid";
  return NextResponse.json({ paid });
}
