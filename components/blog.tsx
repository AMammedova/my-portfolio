"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, BookOpen, Calendar, Clock, Tag as TagIcon } from "lucide-react"
import type { BlogMeta } from "@/lib/blog"
import { formatDateAz, estimateReadAz } from "@/lib/utils"

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

type Props = {
  posts: BlogMeta[]
}

export default function Blog({ posts }: Props) {
  if (!posts?.length) return null

  const [featured, ...rest] = posts

  return (
    <section id="blog" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.12),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.1),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.1),transparent_30%)]" />

      <div className="container mx-auto px-4 relative z-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 max-w-5xl mx-auto text-center md:text-left">
          <div className="space-y-3 max-w-3xl mx-auto md:mx-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Blog & Notes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="text-white/70 text-lg"
            >

            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 text-white border border-white/15 hover:border-purple-300/50 hover:bg-white/15 transition-all duration-300 shadow-lg shadow-purple-500/20"
            >
              All posts
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.a
            {...cardMotion}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-purple-600/80 via-purple-500/60 to-pink-500/60 p-[1px] shadow-2xl shadow-purple-500/20 hover:shadow-purple-400/40 transition-all duration-300 lg:col-span-2"
            href={`/blog/${featured.slug}`}
          >
            <div className="relative h-full w-full rounded-2xl bg-black/60 p-6 md:p-8">
              <div className="flex items-center gap-2 text-sm text-white/70 mb-4">
                <BookOpen size={18} />
                <span>Featured post</span>
              </div>
              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-50 transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-white/75 md:text-lg">{featured.summary}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80 border border-white/10"
                    >
                      <TagIcon size={14} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-white/70">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={16} />
                      {formatDateAz(featured.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={16} />
                      {estimateReadAz(featured.summary)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-100">
                    Oxu
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl opacity-60 group-hover:opacity-90 transition-opacity" />
            </div>
          </motion.a>

          {rest.map((article, idx) => (
            <motion.a
              key={article.slug}
              {...cardMotion}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/15 transition-all duration-300"
              href={`/blog/${article.slug}`}
            >
              <div className="flex items-center justify-between mb-3 text-xs text-white/60">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDateAz(article.date)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} />
                  {estimateReadAz(article.summary)}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-100 transition-colors">
                {article.title}
              </h3>
              <p className="text-white/70 text-sm mb-4 line-clamp-3">{article.summary}</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-white/70 group-hover:border-purple-400/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500 to-pink-500 transition-opacity duration-300" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
