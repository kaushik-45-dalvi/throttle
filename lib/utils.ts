// Utility functions for Throttle dashboard

export function formatCurrency(cents: number, currency = "USD") {
  if (currency === "INR") {
    return `₹${(cents / 100).toLocaleString("en-IN")}`;
  }
  return `$${(cents / 100).toFixed(2)}`;
}

export function formatUSD(usd: number) {
  if (usd >= 1000) return `$${(usd / 1000).toFixed(1)}k`;
  return `$${usd.toFixed(2)}`;
}

export function formatINR(usd: number) {
  const inr = usd * 84; // approx rate
  if (inr >= 100000) return `₹${(inr / 100000).toFixed(1)}L`;
  if (inr >= 1000) return `₹${(inr / 1000).toFixed(1)}k`;
  return `₹${inr.toFixed(0)}`;
}

/** Generate a random API key prefix like "ab_live_xK8p" */
export function generateKeyPrefix(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ab_live_${suffix}`;
}

/** Pick a random color for a new project */
export function pickProjectColor(): string {
  const colors = ["red", "blue", "yellow", "black"];
  return colors[Math.floor(Math.random() * colors.length)];
}
