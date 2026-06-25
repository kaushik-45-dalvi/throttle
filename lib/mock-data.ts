// Mock data for Throttle dashboard demo

export const mockOverview = {
  totalSaved: 284750, // USD cents
  savedThisMonth: 42380,
  savedThisWeek: 12150,
  savedToday: 2340,
  actualSpend: 58200,
  projectedSpend: 341000,
  requestsToday: 48291,
  batchedToday: 5823,
  avgSavingPct: 78,
};

export const mockSpendData = [
  { date: "Jun 1",  actual: 1200, projected: 5800 },
  { date: "Jun 3",  actual: 1850, projected: 9200 },
  { date: "Jun 5",  actual: 2100, projected: 11000 },
  { date: "Jun 7",  actual: 1700, projected: 8500 },
  { date: "Jun 9",  actual: 2600, projected: 13200 },
  { date: "Jun 11", actual: 3100, projected: 15500 },
  { date: "Jun 13", actual: 2800, projected: 14000 },
  { date: "Jun 15", actual: 3500, projected: 17500 },
  { date: "Jun 17", actual: 4200, projected: 21000 },
  { date: "Jun 19", actual: 3900, projected: 19500 },
  { date: "Jun 20", actual: 2340, projected: 11800 },
];

export const mockRequestsTimeline = [
  { time: "00:00", batched: 12,  unbatched: 2 },
  { time: "02:00", batched: 8,   unbatched: 1 },
  { time: "04:00", batched: 5,   unbatched: 1 },
  { time: "06:00", batched: 18,  unbatched: 3 },
  { time: "08:00", batched: 89,  unbatched: 12 },
  { time: "10:00", batched: 234, unbatched: 28 },
  { time: "12:00", batched: 312, unbatched: 35 },
  { time: "14:00", batched: 289, unbatched: 31 },
  { time: "16:00", batched: 198, unbatched: 22 },
  { time: "18:00", batched: 145, unbatched: 18 },
  { time: "20:00", batched: 98,  unbatched: 11 },
  { time: "22:00", batched: 54,  unbatched: 7 },
];

export const mockProjects = [
  {
    id: "proj-1",
    name: "SearchBot",
    provider: "openai",
    model: "gpt-4o",
    requestsToday: 18432,
    costToday: 12.40,
    savedToday: 89.20,
    budget: 200,
    spent: 148,
    color: "red",
  },
  {
    id: "proj-2",
    name: "DocClassifier",
    provider: "anthropic",
    model: "claude-3-sonnet",
    requestsToday: 9281,
    costToday: 8.20,
    savedToday: 62.40,
    budget: 150,
    spent: 98,
    color: "blue",
  },
  {
    id: "proj-3",
    name: "EmailEnricher",
    provider: "openai",
    model: "gpt-3.5-turbo",
    requestsToday: 24891,
    costToday: 3.10,
    savedToday: 24.80,
    budget: 100,
    spent: 42,
    color: "yellow",
  },
  {
    id: "proj-4",
    name: "DBEnricher",
    provider: "openai",
    model: "gpt-4o-mini",
    requestsToday: 5820,
    costToday: 1.80,
    savedToday: 14.40,
    budget: 80,
    spent: 28,
    color: "black",
  },
];

export const mockRequests = [
  {
    id: "req-001",
    batchId: "bat-a1b2",
    project: "SearchBot",
    provider: "openai",
    model: "gpt-4o",
    inputTokens: 284,
    outputTokens: 92,
    costUsd: 0.0048,
    savingsUsd: 0.024,
    latencyMs: 312,
    status: "success",
    timestamp: "2026-06-20T10:41:22Z",
    batchSize: 8,
  },
  {
    id: "req-002",
    batchId: "bat-c3d4",
    project: "DocClassifier",
    provider: "anthropic",
    model: "claude-3-sonnet",
    inputTokens: 512,
    outputTokens: 148,
    costUsd: 0.0092,
    savingsUsd: 0.055,
    latencyMs: 428,
    status: "success",
    timestamp: "2026-06-20T10:40:55Z",
    batchSize: 12,
  },
  {
    id: "req-003",
    batchId: "bat-e5f6",
    project: "EmailEnricher",
    provider: "openai",
    model: "gpt-3.5-turbo",
    inputTokens: 128,
    outputTokens: 64,
    costUsd: 0.0002,
    savingsUsd: 0.0016,
    latencyMs: 187,
    status: "success",
    timestamp: "2026-06-20T10:40:12Z",
    batchSize: 24,
  },
  {
    id: "req-004",
    batchId: "bat-g7h8",
    project: "SearchBot",
    provider: "openai",
    model: "gpt-4o",
    inputTokens: 398,
    outputTokens: 112,
    costUsd: 0.0062,
    savingsUsd: 0.031,
    latencyMs: 298,
    status: "success",
    timestamp: "2026-06-20T10:39:48Z",
    batchSize: 6,
  },
  {
    id: "req-005",
    batchId: "bat-i9j0",
    project: "DocClassifier",
    provider: "anthropic",
    model: "claude-3-sonnet",
    inputTokens: 1024,
    outputTokens: 312,
    costUsd: 0.0184,
    savingsUsd: 0.11,
    latencyMs: 612,
    status: "error",
    timestamp: "2026-06-20T10:38:30Z",
    batchSize: 1,
  },
  {
    id: "req-006",
    batchId: "bat-k1l2",
    project: "DBEnricher",
    provider: "openai",
    model: "gpt-4o-mini",
    inputTokens: 96,
    outputTokens: 48,
    costUsd: 0.0001,
    savingsUsd: 0.0009,
    latencyMs: 142,
    status: "success",
    timestamp: "2026-06-20T10:37:15Z",
    batchSize: 32,
  },
  {
    id: "req-007",
    batchId: "bat-m3n4",
    project: "SearchBot",
    provider: "openai",
    model: "gpt-4o",
    inputTokens: 312,
    outputTokens: 88,
    costUsd: 0.0050,
    savingsUsd: 0.025,
    latencyMs: 344,
    status: "success",
    timestamp: "2026-06-20T10:36:02Z",
    batchSize: 9,
  },
  {
    id: "req-008",
    batchId: "bat-o5p6",
    project: "EmailEnricher",
    provider: "openai",
    model: "gpt-3.5-turbo",
    inputTokens: 204,
    outputTokens: 76,
    costUsd: 0.0003,
    savingsUsd: 0.0027,
    latencyMs: 221,
    status: "rate_limited",
    timestamp: "2026-06-20T10:35:44Z",
    batchSize: 0,
  },
];

export const mockApiKeys = [
  {
    id: "key-1",
    name: "Production Key",
    project: "SearchBot",
    provider: "openai",
    prefix: "ab_live_xK8p",
    createdAt: "2026-06-01",
    lastUsed: "2 min ago",
    requestsTotal: 284291,
  },
  {
    id: "key-2",
    name: "Dev Key",
    project: "DocClassifier",
    provider: "anthropic",
    prefix: "ab_live_mR2q",
    createdAt: "2026-06-05",
    lastUsed: "1 hr ago",
    requestsTotal: 48210,
  },
  {
    id: "key-3",
    name: "Test Key",
    project: "EmailEnricher",
    provider: "openai",
    prefix: "ab_live_tZ9w",
    createdAt: "2026-06-12",
    lastUsed: "5 min ago",
    requestsTotal: 129840,
  },
];

export const mockAlerts = [
  {
    id: "alert-1",
    project: "SearchBot",
    type: "monthly",
    limitUsd: 200,
    currentUsd: 148,
    pct: 74,
    channels: ["email", "slack"],
    status: "ok",
  },
  {
    id: "alert-2",
    project: "DocClassifier",
    type: "monthly",
    limitUsd: 150,
    currentUsd: 98,
    pct: 65,
    channels: ["email"],
    status: "ok",
  },
  {
    id: "alert-3",
    project: "EmailEnricher",
    type: "rolling",
    limitUsd: 100,
    currentUsd: 42,
    pct: 42,
    channels: ["email", "webhook"],
    status: "ok",
  },
];

export const mockLeaderboard = [
  { rank: 1, team: "Vercel Labs", saved: 1280000, members: 14, badge: "🔥" },
  { rank: 2, team: "Solo Builders Club", saved: 892000, members: 1, badge: "⚡" },
  { rank: 3, team: "ApiBlast Team", saved: 284750, members: 3, badge: "🚀" },
  { rank: 4, team: "DevHive Agency", saved: 198200, members: 8, badge: "💡" },
  { rank: 5, team: "AlphaStack", saved: 142800, members: 5, badge: "🎯" },
  { rank: 6, team: "ByteForge", saved: 98400, members: 2, badge: "⭐" },
  { rank: 7, team: "Nexa Systems", saved: 78100, members: 11, badge: "✨" },
  { rank: 8, team: "CloudPilot", saved: 54200, members: 4, badge: "💎" },
];

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
