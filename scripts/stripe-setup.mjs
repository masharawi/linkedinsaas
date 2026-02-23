/**
 * Eenmalig uitvoeren: maak LinkFlow product + €29/maand prijs in Stripe.
 * Run: node scripts/stripe-setup.mjs  (leest STRIPE_SECRET_KEY uit .env.local)
 */
import Stripe from "stripe";
import { readFileSync } from "fs";
import { resolve } from "path";

// Laad .env.local
try {
  const envPath = resolve(process.cwd(), ".env.local");
  const env = readFileSync(envPath, "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
} catch {}

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Geef STRIPE_SECRET_KEY mee: STRIPE_SECRET_KEY=sk_... node scripts/stripe-setup.mjs");
  process.exit(1);
}

const stripe = new Stripe(key);

async function main() {
  const product = await stripe.products.create({
    name: "LinkFlow",
    description: "AI-postgenerator voor LinkedIn. Onbeperkt virale posts genereren. €29/maand, 3 dagen gratis proefperiode.",
    metadata: { linkflow: "main" },
  });
  console.log("Product:", product.id);

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 2900, // €29.00
    currency: "eur",
    recurring: { interval: "month" },
    metadata: { linkflow: "monthly" },
  });
  console.log("Price:", price.id);

  console.log("\n✅ Klaar! Gebruik in checkout:");
  console.log("STRIPE_PRICE_ID=" + price.id);
  console.log("\nTrial (3 dagen) zet je bij het aanmaken van de Checkout Session:");
  console.log("subscription_data: { trial_period_days: 3 }");
}

main().catch(console.error);
