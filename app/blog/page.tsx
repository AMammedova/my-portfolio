import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag as TagIcon } from "lucide-react"
import { getAllPosts } from "@/lib/blog"
import { formatDateAz, estimateReadAz } from "@/lib/utils"

export default async function BlogIndexPage() {
  const posts = await getAllPosts()

  return (
    <div className="relative min-h-screen bg-black/90 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(139,92,246,0.12),transparent_20%),radial-gradient(circle_at_90%_0%,rgba(236,72,153,0.1),transparent_20%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.08),transparent_30%)]" />

      <div className="container mx-auto px-4 relative z-10 space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Blog
            </h1>
          </div>
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Home page
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/15 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3 text-xs text-white/60">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDateAz(post.date)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} />
                  {estimateReadAz(post.summary)}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-100 transition-colors">
                {post.title}
              </h2>
              <p className="text-white/70 text-sm mb-4 line-clamp-3">{post.summary}</p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 group-hover:border-purple-400/40 transition-colors"
                  >
                    <TagIcon size={14} />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute inset-x-0 bottom-0 h-1 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500 to-pink-500 transition-opacity duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
