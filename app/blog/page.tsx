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
      <main className="min-h-screen" style={{ background: "#0A0F1E" }}>
        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div
            className="orb w-96 h-96 top-0 -right-20 pointer-events-none"
            style={{ background: "rgba(59,130,246,0.08)" }}
          />
          <div
            className="orb w-72 h-72 top-20 -left-16 pointer-events-none"
            style={{ background: "rgba(99,102,241,0.06)", animationDelay: "3s" }}
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="badge inline-flex mb-6">The Voxen Blog</div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Insights for{" "}
              <span className="gradient-text">Australian professionals</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Practical advice on building your LinkedIn presence, growing your
              professional brand, and making the most of your online reputation.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <p className="text-center text-slate-400 py-20">
                No posts yet — check back soon.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <article key={post.slug} className="glass-card-hover p-8 flex flex-col">
                    {/* Date */}
                    <time
                      dateTime={post.date}
                      className="text-xs font-medium text-blue-400 mb-4 uppercase tracking-wider"
                    >
                      {formatDate(post.date)}
                    </time>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 leading-snug flex-1">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {post.description}
                    </p>

                    {/* Read More */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
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
