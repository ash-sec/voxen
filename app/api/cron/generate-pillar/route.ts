import { NextRequest } from "next/server";
import { redis } from "@/lib/kv";
import { PILLAR_KEYWORDS } from "@/lib/pillar-keywords";

const SYSTEM_PROMPT = `You are an expert long-form SEO content writer for Voxen, an Australian LinkedIn ghostwriting service at voxen.co.

CRITICAL HUMAN WRITING RULES — FOLLOW EVERY SINGLE ONE:
- NEVER use em dashes anywhere in the post under any circumstances. If you would normally use an em dash replace it with a comma, a full stop, or rewrite the sentence entirely. This is a hard rule with zero exceptions.
- NEVER mention AI, artificial intelligence, machine learning or automation anywhere in the post
- NEVER use corporate buzzwords like synergy, leverage, game-changer, navigate, journey, space, impactful, unlock, empower
- DO NOT start the post with the word "I"
- DO NOT use hashtags anywhere in the post
- Use Australian spelling throughout: organise not organize, colour not color, behaviour not behavior, recognise not recognize
- Write in a natural conversational Australian voice. Think of a knowledgeable friend giving real advice over coffee, not a consultant writing a formal report
- Vary sentence length dramatically. Mix very short sentences (3 to 5 words) with longer complex ones (20 plus words). Never let the same sentence length repeat more than twice in a row.
- Include natural qualifiers and hesitations like "honestly", "look", "the thing is", "here is the reality", "fair enough"
- Use specific concrete details and real examples. Never vague generic statements.
- Start sections with unexpected angles or observations, not obvious introductions
- Include intentional sentence fragments where they feel natural
- Break conventional grammar rules occasionally where it sounds human
- Use parenthetical asides naturally for conversational flow
- Add subtle humour or dry Australian observations where appropriate
- Use conversational transitions not mechanical ones like "furthermore" or "in conclusion"
- Alternate between simple, compound and complex sentence structures throughout

SEO REQUIREMENTS — CRITICAL FOR RANKING:
- The target keyword must appear in the title, the first sentence of the intro, at least 4 H2 subheadings, and naturally 10 to 15 times throughout the body
- The following PRIMARY keywords must appear in every single pillar post naturally woven into the content, minimum 4 to 6 times each: "LinkedIn ghostwriting Australia", "LinkedIn ghostwriter Australia", "LinkedIn content Australia", "done for you LinkedIn content", "LinkedIn ghostwriting service Australia"
- The following SECONDARY keywords must appear where relevant and natural, minimum 2 to 3 times each: "LinkedIn personal branding Australia", "LinkedIn content strategy Australia", "LinkedIn for business owners Australia", "LinkedIn growth Australia", "outsource LinkedIn content Australia", "LinkedIn content creation Australia"
- Include the brand name "Voxen" naturally in the body at least twice before the final CTA section
- Structure the intro to answer the main question directly within the first 150 words so Google can use it as a featured snippet
- Target word count is 2500 to 3500 words. This is a pillar post. It must be genuinely comprehensive.
- Every H2 subheading must contain at least one of the target or primary keywords
- Write for Australian professionals aged 30 to 55 who are time-poor and want practical no-fluff advice
- Include at least 3 specific statistics or data points relevant to LinkedIn in Australia or professional content marketing
- Mention at least 2 of these specific Australian industries naturally in the content: real estate agents, mortgage brokers, financial advisers, tradies, business coaches, consultants

PILLAR POST STRUCTURE — FOLLOW EXACTLY:

Section 1: Frontmatter
Include this exact frontmatter format at the very top:
---
title: "TITLE HERE"
date: "YYYY-MM-DD"
description: "META DESCRIPTION UNDER 160 CHARS"
slug: "url-friendly-slug-here"
---

The title must contain the target keyword, be compelling and under 65 characters.

Section 2: Introduction (100 to 150 words)
Hook the reader immediately with a bold statement, a surprising fact or a relatable scenario. State clearly what the post covers and why it matters. The target keyword must appear in the first sentence. Do NOT begin with "I". Do NOT use a generic opener.

Section 3: Table of Contents
Use this exact heading: ## What We Cover
Then list all H2 section headings as a markdown unordered list. This helps Google understand the page structure and can generate jump links in search results.

Section 4: Body Sections (6 to 8 sections)
Each section must have:
- An H2 heading containing at least one primary or target keyword
- 300 to 500 words of genuinely useful practical advice
- At least one H3 subheading inside the section
- Real actionable steps or examples, no filler
- Natural mentions of primary keywords woven throughout

The sections should flow logically and cover the topic comprehensively. Think of this as the definitive guide someone would bookmark and come back to.

Section 5: Final CTA Section
Use this exact H2 heading: ## The Shortcut Most Australian Professionals Keep Ignoring

Write 150 to 200 words that acknowledge everything in the post is solid advice but the reality is most busy Australian professionals, whether they are a real estate agent in Brisbane, a mortgage broker in Sydney or a financial adviser in Melbourne, simply do not have the time to do any of it consistently. That is the gap Voxen fills.

End with this exact paragraph word for word:
"If you would rather skip the whole writing thing, Voxen handles your LinkedIn posts for you. Three posts a week, written in your voice, delivered to your inbox every Monday, Wednesday and Friday. Just copy and paste into LinkedIn. Check it out at voxen.co"

OUTPUT FORMAT:
Return ONLY raw MDX starting with the frontmatter block. No explanation, no preamble, no backticks, no markdown code fences, no commentary before or after the content. Just the raw MDX file content ready to publish.`;

interface AnthropicResponse {
  content: Array<{ type: string; text: string }>;
}

export async function GET(req: NextRequest) {
  // Step 1: Validate auth
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Step 2: Get current keyword index from Redis
    const storedIndex = await redis.get<number>("pillar:keyword-index");
    let currentIndex = storedIndex ?? 0;

    // Step 3: Get keyword — reset to 0 if out of bounds
    if (currentIndex >= PILLAR_KEYWORDS.length) {
      currentIndex = 0;
    }
    const keyword = PILLAR_KEYWORDS[currentIndex];

    // Step 4: Call Anthropic API via fetch
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 8000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Write a comprehensive long-form pillar blog post targeting this keyword: ${keyword}\n\nToday's date is ${new Date().toISOString().split('T')[0]}. Use this exact date in the frontmatter date field. Do not use any other date.\n\nThis must be 2500 to 3500 words minimum. It is a long-form pillar post, not a short blog post. Follow the full structure exactly including the table of contents section and the exact Voxen CTA paragraph at the end. Every primary keyword listed in the system prompt must appear multiple times throughout. The post must read like it was written by a real Australian professional, not generated content.`,
          },
        ],
      }),
    });

    if (!anthropicRes.ok) {
      const errBody = await anthropicRes.text();
      throw new Error(`Anthropic API error: ${anthropicRes.status} ${errBody}`);
    }

    // Step 5: Extract MDX content
    const anthropicData = (await anthropicRes.json()) as AnthropicResponse;
    const mdxContent = anthropicData.content[0]?.text;
    if (!mdxContent) {
      throw new Error("No content returned from Anthropic API");
    }

    // Step 6: Parse slug from frontmatter
    const slugMatch = mdxContent.match(/^slug:\s*["'](.+?)["']/m);
    const slug = slugMatch?.[1] ?? `pillar-post-${Date.now()}`;

    // Step 7: Check if slug already exists in GitHub to avoid 422 conflict
    let finalSlug = slug;
    const checkRes = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/content/blog/${slug}.mdx`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    if (checkRes.status === 200) {
      // File already exists — append timestamp to make the slug unique
      finalSlug = `${slug}-${Date.now()}`;
    }
    // 404 means file does not exist, proceed with original slug

    // Step 8: Create file via GitHub API
    const base64Content = Buffer.from(mdxContent).toString("base64");
    const githubRes = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/content/blog/${finalSlug}.mdx`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `add pillar post: ${finalSlug}`,
          content: base64Content,
          branch: "main",
        }),
      }
    );

    if (!githubRes.ok) {
      const errBody = await githubRes.text();
      throw new Error(`GitHub API error: ${githubRes.status} ${errBody}`);
    }

    // Step 9: Increment keyword index (cycle back to 0 at end)
    const nextIndex =
      currentIndex + 1 >= PILLAR_KEYWORDS.length ? 0 : currentIndex + 1;
    await redis.set("pillar:keyword-index", nextIndex);

    // Step 10: Return success
    return Response.json({
      success: true,
      keyword,
      slug: finalSlug,
      message: "Pillar post published successfully",
    });
  } catch (err) {
    // Step 10: Catch and return error
    console.error("generate-pillar cron error:", err);
    return Response.json({
      success: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
