import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey || stripeSecretKey.trim() === "") {
  throw new Error(
    "Missing environment variable: STRIPE_SECRET_KEY is not set or is empty. " +
    "Add it to your Vercel project environment variables and redeploy."
  );
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-03-25.dahlia",
  typescript: true,
});

export function formatAUD(cents: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(cents / 100);
}

export function nextBillingDate(currentPeriodEnd: number): string {
  return new Date(currentPeriodEnd * 1000).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
