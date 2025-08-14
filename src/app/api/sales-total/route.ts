// pages/api/sales-total.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-07-30.basil',
});

export async function GET() {
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100,
    });

    const total = paymentIntents.data.reduce(
      (sum, pi) => sum + (pi.amount_received ?? 0),
      0
    );

    return NextResponse.json({
      total: total / 100,
      currency: 'EUR',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}