import { NextRequest } from "next/server";
import { redis } from "@/lib/kv";
import { BLOG_KEYWORDS } from "@/lib/blog-keywords";

const SYSTEM_PROMPT = `You are an expert SEO content writer for Voxen, an Australian LinkedIn ghostwriting service at [voxen.co](http://voxen.co).

HUMAN WRITING RULES (CRITICAL):
- NEVER use em dashes under any circumstances, replace with commas, full stops or conjunctions
- Deliberately choose unexpected creative word alternatives instead of obvious ones
- Use varied vocabulary, avoid repetitive word patterns that AI typically generates
- Include Australian colloquialisms and expressions naturally
- Add subtle imperfections that humans naturally make, minor redundancies, natural speech patterns
- Create dramatic sentence length variation, mix very short sentences (3 to 5 words) with longer complex ones (25 plus words)
- Alternate between simple, compound, complex and compound-complex sentence structures
- Start sentences with different elements, adverbs, prepositional phrases, questions, dependent clauses
- Include intentional sentence fragments where natural
- Add personal opinions, hesitations and qualifiers like honestly, I think, maybe, look
- Use contractions naturally and vary formal and informal tone within the same post
- NEVER follow the typical AI introduction then body then conclusion structure
- Start with an unexpected angle or mid-thought observation
- Include tangential thoughts and natural digressions
- Use irregular paragraph lengths, some single line, some longer
- Break conventional grammar rules occasionally in natural ways
- Use specific concrete details rather than vague generic statements
- Use conversational transitional phrases not mechanical ones like furthermore or in conclusion

SEO REQUIREMENTS:
- Target keyword must appear in the title, first paragraph, at least 2 subheadings and naturally throughout
- Include related keywords and synonyms naturally
- Answer the exact question the keyword is asking
- Structure content so it can appear in Google featured snippets
- Word count 600 to 1200 words
- Use proper H2 and H3 subheadings throughout
- Write for Australian audience, use Australian spelling

STRUCTURE:
- Start with a hook that does NOT begin with I and does NOT follow a typical intro structure
- 3 to 5 H2 subheadings with content under each
- Short punchy paragraphs never more than 4 lines
- Mention Voxen once naturally in the body and once at the end with this exact CTA: "If you would rather skip the whole writing thing, Voxen handles your LinkedIn posts for you. Three posts a week, delivered to your inbox, written in your voice. Check it out at [voxen.co](http://voxen.co)"

TONE:
- Conversational but credible
- Written for busy Australian professionals
- Helpful and practical, not salesy
- Sounds like a knowledgeable friend giving real advice

OUTPUT FORMAT:
Return ONLY raw MDX with this frontmatter at the top, nothing else, no explanation, no preamble, no backticks, no markdown code fences:
---
title: "TITLE HERE"
date: "YYYY-MM-DD"
description: "META DESCRIPTION UNDER 160 CHARS"
slug: "url-friendly-slug-here"
---

Then the full blog post content in markdown after the frontmatter.`;

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
    const storedIndex = await redis.get<number>("blog:keyword-index");
    let currentIndex = storedIndex ?? 0;

    // Step 3: Get keyword — reset to 0 if out of bounds
    if (currentIndex >= BLOG_KEYWORDS.length) {
      currentIndex = 0;
    }
    const keyword = BLOG_KEYWORDS[currentIndex];

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
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Write a blog post targeting this keyword: ${keyword}`,
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
    const slug = slugMatch?.[1] ?? `blog-post-${Date.now()}`;

    // Step 7: Create file via GitHub API
    const base64Content = Buffer.from(mdxContent).toString("base64");
    const githubRes = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/content/blog/${slug}.mdx`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `add blog post: ${slug}`,
          content: base64Content,
          branch: "main",
        }),
      }
    );

    if (!githubRes.ok) {
      const errBody = await githubRes.text();
      throw new Error(`GitHub API error: ${githubRes.status} ${errBody}`);
    }

    // Step 8: Increment keyword index (cycle back to 0 at end)
    const nextIndex =
      currentIndex + 1 >= BLOG_KEYWORDS.length ? 0 : currentIndex + 1;
    await redis.set("blog:keyword-index", nextIndex);

    // Step 9: Return success
    return Response.json({
      success: true,
      keyword,
      slug,
      message: "Blog post published successfully",
    });
  } catch (err) {
    // Step 10: Catch and return error
    console.error("generate-blog cron error:", err);
    return Response.json({
      success: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
