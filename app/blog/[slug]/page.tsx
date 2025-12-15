import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Sparkles, Tag as TagIcon } from "lucide-react"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import Markdown from "@/components/Markdown"
import { formatDateAz, estimateReadAz } from "@/lib/utils"

type Params = {
  slug: string
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return notFound()

  return (
    <div className="relative min-h-screen bg-black/90 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.12),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.1),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.1),transparent_30%)]" />

      <div className="container mx-auto px-4 relative z-10 max-w-5xl space-y-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            All posts
          </Link>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-purple-200 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <Sparkles size={14} />
            Blog
          </span>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-600/25 via-black/40 to-pink-500/15 p-8 md:p-10 backdrop-blur-lg shadow-2xl shadow-purple-500/15">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10">
                <Calendar size={16} />
                {formatDateAz(post.date)}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10">
                <Clock size={16} />
                {estimateReadAz(post.content)}
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-white/80"
                  >
                    <TagIcon size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-6 backdrop-blur-md shadow-lg shadow-purple-500/10">
          <Markdown content={post.content} />
        </div>
      </div>
    </div>
  )
}
