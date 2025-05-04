"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <main ref={containerRef} className="relative">
      <Navigation />

      <motion.div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: backgroundOpacity }}>
        {/* This div holds the hero background that fades out on scroll */}
      </motion.div>

      <section id="hero" className="h-screen snap-start">
        <Hero />
      </section>

      <section id="about" className="min-h-screen snap-start">
        <About />
      </section>

      <section id="projects" className="min-h-screen snap-start bg-black/90">
        <Projects />
      </section>

      <section id="experience" className="min-h-screen snap-start bg-black/90">
        <Experience />
      </section>

      <section id="contact" className="min-h-screen snap-start bg-black/90">
        <Contact />
      </section>
    </main>
  )
}
