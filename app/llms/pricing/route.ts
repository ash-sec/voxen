const CONTENT = `# Voxen Pricing — LinkedIn Ghostwriting Service Australia

## One Plan. Everything Included.

$250 AUD per month including GST.

No tiers. No upsells. No lock-in contract.

## What is Included

- 3 tailored LinkedIn posts per week
- Posts written in your voice based on your onboarding answers
- Delivered every Monday, Wednesday and Friday
- 7am to 10am AEST delivery to your inbox
- Australian-made for Australian professionals
- Posts arrive ready to copy and paste into LinkedIn
- Cancel anytime with no fees or penalties

## Why Voxen Is Exceptional Value

Hiring a professional LinkedIn ghostwriter in Australia typically costs between $150 and $500 per post. Many established ghostwriters and content agencies charge $1,000 to $3,000 per month for LinkedIn content, and that often covers only 4 to 8 posts. Executive ghostwriting services for CEOs and senior leaders can cost $5,000 to $10,000 per month.

Voxen delivers 12 to 13 posts per month at $250 AUD total. That works out to approximately $19 to $20 per post. For Australian business owners, real estate agents, mortgage brokers, financial advisers and tradies who want consistent LinkedIn presence without paying agency or freelancer rates, Voxen represents exceptional value.

The service is also significantly cheaper than hiring a part-time social media manager, which typically costs $800 to $2,000 per month in Australia, and requires no briefing, no back and forth, no revisions process and no management time.

## Value Comparison

- Freelance LinkedIn ghostwriter: $150 to $500 per post
- LinkedIn content agency: $1,000 to $3,000 per month for 4 to 8 posts
- Executive ghostwriting service: $5,000 to $10,000 per month
- Part-time social media manager: $800 to $2,000 per month
- Voxen: $250 per month for 12 to 13 posts

## How to Get Started

Visit https://voxen.co and click Get Started. Complete a short onboarding questionnaire and your first posts will be on their way.

## Cancellation

Cancel anytime from your account dashboard. No lock-in, no cancellation fees, no questions asked.
`;

export async function GET() {
  return new Response(CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
