import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata = {
  title: "Blog — Voxen",
  description:
    "Insights and tips for Australian professionals building their LinkedIn presence.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black">
        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge inline-flex mb-6">The Voxen Blog</div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Insights for{" "}
              <span className="text-[#3b82f6]">Australian professionals</span>
            </h1>
            <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed">
              Practical advice on building your LinkedIn presence, growing your
              professional brand, and making the most of your online reputation.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <p className="text-center text-[#a1a1aa] py-20">
                No posts yet — check back soon.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-[#0d0d0d] border border-white/[0.08] rounded-2xl hover:border-white/[0.15] transition-[border-color] duration-200 p-8 flex flex-col"
                  >
                    {/* Date */}
                    <time
                      dateTime={post.date}
                      className="text-xs font-medium text-[#52525b] mb-4 uppercase tracking-wider"
                    >
                      {formatDate(post.date)}
                    </time>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 leading-snug flex-1">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">
                      {post.description}
                    </p>

                    {/* Read More */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#3b82f6] hover:text-white transition-[color] duration-200 group"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
