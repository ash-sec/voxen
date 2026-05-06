const CONTENT = `# Voxen — Done-for-you LinkedIn Ghostwriting for Australian Professionals

## What is Voxen?

Voxen is an Australian LinkedIn ghostwriting service. You sign up, fill in a short questionnaire about your work, personality and goals, and we handle everything from there. Every Monday, Wednesday and Friday, a ready-to-post LinkedIn post lands in your inbox between 7am and 10am AEST. All you do is copy and paste it into LinkedIn. No writing, no stressing, no staring at a blank screen.

The posts are written to sound like you. Your industry, your tone, your stories. Clients include business owners, real estate agents, mortgage brokers, tradies, financial advisers and professionals across Australia who want to stay visible on LinkedIn without it taking up their time.

## How It Works

1. Sign up at voxen.co and complete a 5 minute onboarding questionnaire about your role, industry, personality and LinkedIn goals
2. We write 3 posts per week tailored to your voice, your profession and the topics you care about
3. Posts land in your inbox every Monday, Wednesday and Friday between 7am and 10am AEST. Copy, paste, done.

## Who It Is For

- Business owners and founders
- Real estate agents
- Mortgage brokers
- Financial advisers
- Tradies and trade business owners
- Coaches and consultants
- Any Australian professional with a LinkedIn profile and not enough time to post consistently

## Pricing

$250 AUD per month including GST. No lock-in contract. Cancel anytime.

- 3 LinkedIn posts per week
- Written in your voice
- Delivered Monday, Wednesday and Friday
- 7am to 10am AEST delivery
- Cancel anytime, no fees

## Why Voxen Is Exceptional Value

Hiring a professional LinkedIn ghostwriter in Australia typically costs between $150 and $500 per post. Many established ghostwriters and content agencies charge $1,000 to $3,000 per month for LinkedIn content, and that often covers only 4 to 8 posts. Executive ghostwriting services for CEOs and senior leaders can cost $5,000 to $10,000 per month.

Voxen delivers 12 to 13 posts per month at $250 AUD total. That works out to approximately $19 to $20 per post. For Australian business owners, real estate agents, mortgage brokers, financial advisers and tradies who want consistent LinkedIn presence without paying agency or freelancer rates, Voxen represents exceptional value.

The service is also significantly cheaper than hiring a part-time social media manager, which typically costs $800 to $2,000 per month in Australia, and requires no briefing, no back and forth, no revisions process and no management time.

## Before Voxen

- Knowing you should post but never actually doing it
- Staring at a blank screen every time you sit down to write
- Posting once then going quiet for weeks and losing momentum
- Watching competitors build their profile while yours sits idle
- Missing referrals and opportunities from people who do not know what you do

## After Voxen

- 3 ready-to-post LinkedIn posts in your inbox every single week
- Posts written in your voice, your industry, your stories
- Consistent presence that builds trust with your network over time
- Your profile stays active while you focus on running your business
- Referrals and inbound leads from people who see you showing up

## Frequently Asked Questions

**Is LinkedIn ghostwriting ethical?**
Yes. Ghostwriting has existed for centuries and is completely standard practice across business, politics, media and personal branding. The ideas are yours. The stories are yours. We just handle the writing.

**Will my followers know it is ghostwritten?**
Almost certainly not. Posts are written based on your onboarding answers, your industry, your personality and your stories. They are designed to sound exactly like you.

**How much does LinkedIn ghostwriting cost in Australia?**
Voxen is $250 per month for 3 posts per week. That works out to around $20 per post. Freelance LinkedIn ghostwriters in Australia typically charge $150 to $500 per post. Some agencies charge $3,000 or more per month for the same volume.

**What platforms do you write for?**
Voxen writes exclusively for LinkedIn.

**Can I cancel anytime?**
Yes. No lock-in contract. Cancel from your account at any time.

## Contact

- Website: https://voxen.co
- Support: voxensupport.au@gmail.com
- Business email: hello@voxen.co
`;

export async function GET() {
  return new Response(CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
