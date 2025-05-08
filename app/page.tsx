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
    <>
      <Navigation />
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div style={{ opacity: backgroundOpacity }}>
          {/* Background content */}
        </motion.div>
      </div>

      <div className="relative z-10">
        <div id="hero">
          <Hero />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="projects" className="bg-black/90">
          <Projects />
        </div>

        <div id="experience" className="bg-black/90">
          <Experience />
        </div>

        <div id="contact" className="bg-black/90">
          <Contact />
        </div>
      </div>
    </>
  )
}
