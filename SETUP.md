# Voxen — Setup & Deployment Guide

## Project Location
`C:\Users\ashva\Documents\Vonex Website\voxen`

## Local Development

```bash
cd "C:\Users\ashva\Documents\Vonex Website\voxen"
npm run dev
```

Open http://localhost:3000

---

## Environment Variables

Fill in `.env.local` with real values before deploying:

### 1. Stripe
- Go to https://dashboard.stripe.com
- **STRIPE_SECRET_KEY** — from Developers → API Keys (use `sk_live_...` in production)
- **STRIPE_PRICE_ID** — Create a Recurring product: $250 AUD/month, copy the Price ID (`price_...`)
- **STRIPE_WEBHOOK_SECRET** — After deploying, go to Developers → Webhooks → Add endpoint:
  - URL: `https://yourdomain.com/api/stripe-webhook`
  - Events: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`
  - Copy the signing secret (`whsec_...`)

### 2. Resend
- Go to https://resend.com
- Create an API key → **RESEND_API_KEY**
- Add & verify your sending domain (or use `onboarding@resend.dev` for testing)
- **Important**: Update `FROM_EMAIL` in `lib/resend.ts` to match your verified domain

### 3. Anthropic
- Go to https://console.anthropic.com
- Create an API key → **ANTHROPIC_API_KEY**

### 4. Upstash Redis
- Go to https://upstash.com → Create a Redis database
- Copy **KV_REST_API_URL** and **KV_REST_API_TOKEN**

### 5. App URL
- **NEXT_PUBLIC_BASE_URL** — your production URL, e.g. `https://voxen.co`

### 6. Cron Secret
- Generate: `openssl rand -hex 32`
- Set as **CRON_SECRET** — used to secure the `/api/cron` endpoint

---

## Deploying to Vercel

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial Voxen build"
   git remote add origin https://github.com/yourusername/voxen.git
   git push -u origin main
   ```

2. Go to https://vercel.com → Import your repository

3. Add all environment variables from `.env.local` in Vercel's project settings

4. Deploy — Vercel auto-detects Next.js

5. Add your custom domain in Vercel's Domain settings

---

## Cron Jobs (Vercel)

`vercel.json` configures cron jobs to run Mon/Wed/Fri at 7–10am AEST:

| UTC Schedule | AEST Time |
|---|---|
| `0 21 * * 0,2,4` | 7am Mon/Wed/Fri |
| `0 22 * * 0,2,4` | 8am Mon/Wed/Fri |
| `0 23 * * 0,2,4` | 9am Mon/Wed/Fri |
| `0 0 * * 1,3,5`  | 10am Mon/Wed/Fri |

Each subscriber gets a randomised hour (7–10) assigned at signup. The cron fires hourly and only delivers to subscribers whose `sendHour` matches the current AEST hour.

**Important**: Vercel Cron requires a Pro plan for production use.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Payments | Stripe |
| Email | Resend |
| Database | Upstash Redis |
| AI | Claude claude-sonnet-4-20250514 |
| Auth | Magic link (no passwords) |
| Hosting | Vercel |

---

## Key File Structure

```
app/
  page.tsx                  # Landing page
  signup/page.tsx           # Email + OTP + Stripe checkout
  onboarding/               # 8-step questionnaire
  login/                    # Magic link login
  account/                  # Dashboard (protected)
    billing/                # Subscription management
    posts/                  # Post history (coming soon)
    support/                # FAQ + contact form
  api/
    send-otp/               # Send 6-digit OTP
    verify-otp/             # Verify OTP → Stripe checkout
    stripe-webhook/         # Handle Stripe events
    magic-link/             # Send login link
    auth-verify/            # Consume magic link token
    onboarding/             # Save onboarding answers
    cancel-subscription/    # Cancel Stripe sub
    send-support/           # Contact form emails
    me/                     # Current subscriber data
    cron/                   # Post delivery (Mon/Wed/Fri)
    logout/                 # Clear session
components/
  Navbar.tsx
  HeroSection.tsx
  WhoItsFor.tsx
  HowItWorks.tsx
  PricingSection.tsx
  Testimonials.tsx
  FAQSection.tsx
  Footer.tsx
  DashboardShell.tsx
lib/
  types.ts                  # TypeScript interfaces
  kv.ts                     # Upstash Redis helpers
  stripe.ts                 # Stripe client
  resend.ts                 # Resend client + templates
  claude.ts                 # Claude post generation
  auth.ts                   # Session cookie helpers
  utils.ts                  # Utilities
  emails/                   # HTML email templates
    otp.ts
    welcome.ts
    magic-link.ts
    post-delivery.ts
    cancellation.ts
```

---

## Support Email
voxensupport.au@gmail.com
