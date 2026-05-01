import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} — Voxen Blog`,
    description: post.frontmatter.description,
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl md:text-4xl font-bold text-white mb-6 mt-10 leading-tight"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-bold text-white mb-4 mt-10 leading-tight"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-bold text-white mb-3 mt-8"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-slate-300 leading-relaxed mb-5 text-base" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-outside pl-6 text-slate-300 mb-5 space-y-2" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside pl-6 text-slate-300 mb-5 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-slate-300 leading-relaxed text-base" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-slate-200 italic" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-blue-500/60 pl-5 my-6 text-slate-400 italic"
      {...props}
    />
  ),
  hr: () => (
    <hr className="border-none border-t border-blue-500/15 my-8" />
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: "#0f172a" }}>
        {/* Header */}
        <section className="relative pt-32 pb-12 px-6 overflow-hidden">
          <div
            className="orb w-80 h-80 top-0 -right-16 pointer-events-none"
            style={{ background: "rgba(59,130,246,0.07)" }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors mb-10 group"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>

            {/* Date */}
            <time
              dateTime={post.frontmatter.date}
              className="text-xs font-medium text-blue-400 uppercase tracking-wider mb-4 block"
            >
              {formatDate(post.frontmatter.date)}
            </time>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              {post.frontmatter.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              {post.frontmatter.description}
            </p>

            {/* Author/meta bar */}
            <div className="flex items-center gap-3 pb-10 border-b border-blue-500/15">
              <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-400">V</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">The Voxen Team</p>
                <p className="text-xs text-slate-500">Voxen Blog</p>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-12 text-center">
              <div className="badge inline-flex mb-5">Done For You</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                Want your LinkedIn handled for you?
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
                3 posts delivered to your inbox every Monday, Wednesday and
                Friday. Written in your voice. Ready to copy and paste.
              </p>
              <Link
                href="https://voxen.co/#pricing"
                className="btn-primary inline-flex items-center gap-2"
              >
                See Pricing
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
