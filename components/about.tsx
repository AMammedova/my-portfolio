"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimation } from "framer-motion"
import { FaReact, FaGithub, FaFigma, FaJs } from "react-icons/fa"
import {
  SiNextdotjs,
  SiRedux,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiGreensock,
  SiOpenai,
  SiHuggingface,
  SiReactquery
} from "react-icons/si"
import { TbDatabase, TbPrompt } from "react-icons/tb"

// Updated skills array with categorization
const skills = [
  // Frontend skills
  { name: "React", icon: <FaReact />, delay: 0, color: "from-blue-400 to-blue-600", category: "frontend" },
  { name: "Next.js", icon: <SiNextdotjs />, delay: 0.1, color: "from-black to-gray-800", category: "frontend" },
  { name: "TypeScript", icon: <SiTypescript />, delay: 0.2, color: "from-blue-500 to-blue-700", category: "frontend" },
  { name: "JavaScript", icon: <FaJs />, delay: 0.3, color: "from-yellow-400 to-yellow-600", category: "frontend" },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    delay: 0.4,
    color: "from-cyan-400 to-cyan-600",
    category: "frontend",
  },
  { name: "Redux", icon: <SiRedux />, delay: 0.5, color: "from-purple-500 to-purple-700", category: "frontend" },
  { name: "Zustand", icon: <SiTailwindcss />, delay: 0.6, color: "from-cyan-500 to-cyan-700", category: "frontend" },
  { name: "Tanstack Query", icon: <SiReactquery />, delay: 0.6, color: "from-cyan-500 to-cyan-700", category: "frontend" },

  // AI skills
  { name: "LangChain", icon: <SiOpenai />, delay: 0.1, color: "from-green-400 to-teal-600", category: "ai" },
  { name: "OpenAI API", icon: <SiOpenai />, delay: 0.2, color: "from-emerald-400 to-emerald-600", category: "ai" },
  { name: "Prompt Engineering", icon: <TbPrompt />, delay: 0.3, color: "from-teal-400 to-cyan-500", category: "ai" },
  { name: "HuggingFace", icon: <SiHuggingface />, delay: 0.4, color: "from-yellow-500 to-amber-600", category: "ai" },
  { name: "Vector DBs", icon: <TbDatabase />, delay: 0.5, color: "from-lime-400 to-green-600", category: "ai" },

  // Common tools
  { name: "Framer Motion", icon: <SiFramer />, delay: 0.6, color: "from-purple-400 to-purple-600", category: "tool" },
  { name: "GSAP", icon: <SiGreensock />, delay: 0.7, color: "from-green-400 to-green-600", category: "tool" },
  { name: "Figma", icon: <FaFigma />, delay: 0.8, color: "from-pink-500 to-pink-700", category: "tool" },
  { name: "Git/GitHub", icon: <FaGithub />, delay: 0.9, color: "from-gray-600 to-gray-800", category: "tool" },
]

type Skill = {
  name: string;
  icon: React.ReactNode;
  delay: number;
  color: string;
  category: string;
};

interface BlobProps {
  color: string
  initialPosition: {
    top?: string
    left?: string
    bottom?: string
    right?: string
  }
  delay?: number
}

const InteractiveBlob = ({ color, initialPosition, delay = 0 }: BlobProps) => {
  const blobRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const controls = useAnimation()

  const springConfig = { damping: 30, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  const scale = useSpring(1, springConfig)

  const handleInteraction = (clientX: number, clientY: number) => {
    const rect = blobRef.current?.getBoundingClientRect()
    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = clientX - centerX
    const distanceY = clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    // Attraction/repulsion radius
    const radius = 400

    if (distance < radius) {
      const factor = 0.15 * (1 - distance / radius) // Reduced intensity
      mouseX.set(distanceX * factor)
      mouseY.set(distanceY * factor)
      scale.set(1 + factor)
    } else {
      mouseX.set(0)
      mouseY.set(0)
      scale.set(1)
    }
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      handleInteraction(event.clientX, event.clientY)
    }

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault() // Prevent scrolling while touching blobs
      const touch = event.touches[0]
      handleInteraction(touch.clientX, touch.clientY)
    }

    const handleTouchEnd = () => {
      // Reset blob position when touch ends
      mouseX.set(0)
      mouseY.set(0)
      scale.set(1)
    }

    // Add both mouse and touch event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [mouseX, mouseY, scale])

  return (
    <motion.div
      ref={blobRef}
      className={`absolute w-[30rem] h-[30rem] rounded-full filter blur-3xl opacity-15 ${color} touch-none`}
      style={{
        x,
        y,
        scale,
        ...initialPosition,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 0.15,
        transition: { delay, duration: 1 },
      }}
      whileHover={{ opacity: 0.25 }}
      onTouchStart={(e) => {
        e.preventDefault()
        const touch = e.touches[0]
        handleInteraction(touch.clientX, touch.clientY)
      }}
    >
      <motion.div
        className="w-full h-full rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </motion.div>
  )
}

// Skill card component for the categorized skills display
const SkillCategory = ({ title, skills, color }: { title: string; skills: Skill[]; color: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, staggerChildren: 0.1 }}
      viewport={{ once: true }}
      className="bg-black/20 backdrop-blur-sm rounded-xl p-5 border border-white/10 shadow-xl"
    >
      <h3 className={`text-xl font-bold mb-4 bg-clip-text text-transparent ${color}`}>{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm font-mono text-white bg-gradient-to-r ${skill.color} shadow-md border border-white/10 backdrop-blur-sm cursor-pointer transition-all duration-200 whitespace-nowrap`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: skill.delay * 0.5 }}
            whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
          >
            <span className="text-base">{skill.icon}</span>
            {skill.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const textY = useTransform(scrollYProgress, [0.1, 0.4], [50, 0])

  // Filter skills by category
  const frontendSkills = skills.filter((skill) => skill.category === "frontend")
  const aiSkills = skills.filter((skill) => skill.category === "ai")
  const toolSkills = skills.filter((skill) => skill.category === "tool")

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Interactive Background Blobs - Positioned strategically */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <InteractiveBlob color="bg-purple-500" initialPosition={{ top: "5%", left: "15%" }} delay={0} />
        <InteractiveBlob color="bg-pink-500" initialPosition={{ bottom: "15%", right: "10%" }} delay={0.2} />
        <InteractiveBlob color="bg-blue-500" initialPosition={{ top: "40%", right: "15%" }} delay={0.4} />
      </div>

      <div className="container mx-auto px-4 z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">About Me</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-medium"
          >
      
          </motion.p>
        </div>

        {/* Two-column layout for larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left column: Bio and description */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Frontend Developer & AI Specialist
              </h3>
              <div className="space-y-4">
                <p className="text-white/80 leading-relaxed">
                  I'm not just a frontend developer — I'm a digital builder shaping ideas into intuitive, interactive
                  realities.
                </p>
                <p className="text-white/80 leading-relaxed">
                  In my world, code meets creativity. I use React to bring structure, but AI to bring speed,
                  flexibility, and imagination. Whether I'm prototyping with AI tools, building clean and responsive
                  UIs, or enhancing user journeys through intelligent workflows, I'm always blending technology with
                  vision.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Think of me as the bridge between human insight and machine intelligence — someone who codes not just
                  to build, but to transform how we build.
                </p>
                <p className="text-white/70 leading-relaxed font-medium italic">
                  With every line of code and every pixel I design, I'm driven by a simple belief: great digital
                  experiences don't have to take forever — not when you work smart.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right column: Categorized skills */}
          <div className="order-1 lg:order-2 space-y-6">
            <SkillCategory
              title="Frontend Development"
              skills={frontendSkills}
              color="bg-gradient-to-r from-blue-400 to-purple-500"
            />
            <SkillCategory
              title="AI & Machine Learning"
              skills={aiSkills}
              color="bg-gradient-to-r from-teal-400 to-green-500"
            />
            <SkillCategory
              title="Tools & Workflow"
              skills={toolSkills}
              color="bg-gradient-to-r from-pink-400 to-rose-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
