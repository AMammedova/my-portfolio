"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Blog from "@/components/blog"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import type { BlogMeta } from "@/lib/blog"

type Props = {
  posts: BlogMeta[]
}

export default function HomeShell({ posts }: Props) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <main className="relative w-full min-h-screen overflow-y-auto">
      <Navigation />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div style={{ opacity: backgroundOpacity }} />
      </div>

      <div className="relative z-10 w-full">
        <div id="hero" className="relative">
          <Hero />
        </div>

        <div id="about" className="relative">
          <About />
        </div>

        <div id="projects" className="relative bg-black/90">
          <Projects />
        </div>

        <div id="blog" className="relative bg-black/90">
          <Blog posts={posts} />
        </div>

        <div id="experience" className="relative bg-black/90">
          <Experience />
        </div>

        <div id="contact" className="relative bg-black/90">
          <Contact />
        </div>
      </div>
    </main>
  )
}
