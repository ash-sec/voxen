import Anthropic from "@anthropic-ai/sdk";
import type { OnboardingAnswers } from "./types";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const PERSONALITY_DESCRIPTIONS: Record<string, string> = {
  straight: "direct, no-nonsense, gets to the point quickly",
  warm: "warm, empathetic, supportive and encouraging",
  funny: "casual, a bit cheeky, light-hearted with occasional humour",
  passionate: "passionate, enthusiastic, motivated and inspiring",
};

export async function generateLinkedInPost(
  subscriberName: string,
  profession: string,
  onboarding: OnboardingAnswers,
  dayOfWeek: string
): Promise<string> {
  const personalityDesc =
    PERSONALITY_DESCRIPTIONS[onboarding.personality] ?? "authentic and genuine";

  const systemPrompt = `You are a LinkedIn ghostwriter for ${subscriberName}, who works as ${profession} in Australia. Your job is to write a LinkedIn post that sounds completely like them — human, real, occasionally imperfect.

WRITING RULES:
- Write in first person as ${subscriberName}
- Personality style: ${personalityDesc}
- Post length: 150–250 words
- Use line breaks between thoughts — NO walls of text
- End with a question to drive comments
- Sound completely human — never like AI content
- Occasionally reference Australian workplace culture naturally (e.g. "arvo", "on the tools", "double shift", "knock off time")
- Reference their profession and topics they care about
- Draw on their frustrations and wins naturally
- DO NOT use hashtags excessively (max 2–3 at the end if any)
- DO NOT start every post with "I" — vary the opening
- DO NOT use corporate buzzwords like "synergy", "leverage", "game-changer"
- Keep it real — LinkedIn content that gets engagement is authentic storytelling

SUBSCRIBER PROFILE:
Job title: ${onboarding.jobTitle}
What they want to be known for: ${onboarding.wantKnownFor}
Topics they care about: ${onboarding.topics.join(", ")}
Industry frustration: ${onboarding.frustration}
Recent win or challenge: ${onboarding.recentWin}
Ideal audience: ${onboarding.audience}
Slang/phrases they use: ${onboarding.slang || "none specified"}
Day of the week: ${dayOfWeek}`;

  const userPrompt = `Write one LinkedIn post for ${subscriberName} for ${dayOfWeek}.

Vary the topic — don't always use the same theme. Choose from:
- A story or observation from work
- Something they've learned recently
- A frustration or challenge, handled with authenticity
- A win or proud moment
- A question or hot take for their industry
- Advice for someone earlier in their career

Make it feel like something a real Australian ${profession} would actually post. Human tone, relatable content, ends with an engaging question.

Output ONLY the LinkedIn post text — no preamble, no "Here is the post:", no quotation marks around the whole thing.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 600,
    messages: [{ role: "user", content: userPrompt }],
    system: systemPrompt,
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");
  return content.text.trim();
}
