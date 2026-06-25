# ⚡ Throttle

> One proxy. 80% less spend.

Throttle is a drop-in request batching proxy dashboard that slashes API costs for developers consuming paid third-party APIs (OpenAI, Anthropic, Stripe, Twilio, and others). By grouping parallel or near-simultaneous requests into single upstream calls, Throttle reduces API spend by up to 80% with a one-line integration.

---

## 🎨 Design Theme: Bauhaus

Inspired by modern geometric, bold, and functional art directions, Throttle features:
- **Color Palette**: Off-white/cream backgrounds (`#F5F0E8`), rich primary accents (Bauhaus Red `#E8391D`, Bauhaus Blue `#1B4FD8`, Bauhaus Yellow `#F5C800`), and dark charcoal charcoal borders (`#1A1A1A`).
- **Typography**: Bold headings set in `Space Grotesk` paired with clean, readable body text in `Inter`.
- **Containers**: Sharp corners (`0px` border-radius), thick strokes, and retro flat-shadows (`6px 6px 0px #1A1A1A`).

---

## ✨ Features

1. **Dashboard Overview**: Live counter tracking lifetime savings, alongside comparison charts of actual vs. projected spend.
2. **Projects Manager**: Budget allocations, current utilization metrics, and cost breakdown per project.
3. **Requests Explorer**: Paginated audit table detailing proxied request latency, status, batch size, input/output tokens, and savings.
4. **API Keys Configurator**: Creation and revocation of proxy API keys matched to upstream providers.
5. **Budget Alerts**: Threshold progress trackers notifying teams via email, Slack, or webhook callbacks when limits are reached.
6. **Public Leaderboard**: Podiums and shareable rankings showcasing team savings achievements.
7. **Custom Auth Pages**: Styled Sign-In and Sign-Up catch-all pages powered by Clerk.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 20.9.0 or higher recommended)
- A Clerk Developer account keys

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and append your Clerk publishable and secret keys:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

4. **Verify Production Build**
   ```bash
   npm run build
   ```

---

## 📦 SDK Usage Example

Integrate Throttle into your backend in just one line of code:

```typescript
import { Throttle } from '@throttle/sdk';

// Initialize the proxy client (e.g. wrapping OpenAI completions)
const openai = new Throttle('openai', {
  apiKey: process.env.THROTTLE_API_KEY,
  windowMs: 10 // batching window size
});

// Run parallel completions that automatically batch upstream
const [res1, res2] = await Promise.all([
  openai.chat.completions.create({ model: 'gpt-4o', messages: [{ role: 'user', content: 'Task A' }] }),
  openai.chat.completions.create({ model: 'gpt-4o', messages: [{ role: 'user', content: 'Task B' }] })
]);

console.log('Requests successfully batched and executed.');
```

---

## 📁 File Structure

```
throttle/
├── app/
│   ├── layout.tsx            ← Clerk Provider + fonts
│   ├── globals.css           ← Bauhaus design system tokens
│   ├── page.tsx              ← Marketing landing page
│   ├── sign-in/              ← Clerk custom sign-in page
│   ├── sign-up/              ← Clerk custom sign-up page
│   ├── leaderboard/          ← Public savings ranking
│   └── dashboard/
│       ├── layout.tsx        ← Sidebar + TopNav layout wrapper
│       ├── page.tsx          ← Dashboard overview & charts
│       ├── requests/         ← Requests table explorer
│       ├── projects/         ← Project budget controls
│       ├── keys/             ← Keys creation & list
│       ├── alerts/           ← Budget alert configurator
│       └── billing/          ← Subscription plans & invoices
├── components/
│   ├── charts/               ← Recharts modules
│   ├── layout/               ← Navbars and sidebars
│   └── ui/                   ← Geometric SVG primitives
├── lib/
│   └── mock-data.ts          ← Pre-populated metric datasets
├── package.json
└── middleware.ts             ← Route protection config
```
