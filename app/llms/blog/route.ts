import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllPosts();

  const postEntries = posts
    .map(
      (post) =>
        `### [${post.title}](https://voxen.co/blog/${post.slug})\nPublished: ${post.date}\n${post.description}`
    )
    .join("\n\n");

  const content = `# Voxen Blog — LinkedIn Tips and Personal Branding for Australian Professionals

Voxen publishes daily content about LinkedIn ghostwriting, personal branding, and LinkedIn growth strategies for Australian professionals.

Full blog: https://voxen.co/blog

## Posts

${postEntries}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
