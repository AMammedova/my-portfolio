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
    <div className="relative w-full min-h-screen overflow-y-auto">
      <Navigation />

      <motion.div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: backgroundOpacity }}>
        {/* This div holds the hero background that fades out on scroll */}
      </motion.div>

      <main ref={containerRef} className="relative w-full">
        <section id="hero" className="w-full">
          <Hero />
        </section>

        <section id="about" className="w-full">
          <About />
        </section>

        <section id="projects" className="w-full bg-black/90">
          <Projects />
        </section>

        <section id="experience" className="w-full bg-black/90">
          <Experience />
        </section>

        <section id="contact" className="w-full bg-black/90">
          <Contact />
        </section>
      </main>
    </div>
  )
}
