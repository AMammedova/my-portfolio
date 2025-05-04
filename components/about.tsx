"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimation } from "framer-motion"
import Image from "next/image"
import { FaReact, FaGithub, FaFigma, FaJs, FaCss3Alt } from "react-icons/fa"
import { SiNextdotjs, SiRedux, SiTypescript, SiTailwindcss, SiGnubash, SiFramer, SiGreensock } from "react-icons/si"

const skills = [
  { name: "React", icon: <FaReact />, delay: 0, color: "from-blue-400 to-blue-600" },
  { name: "Next.js", icon: <SiNextdotjs />, delay: 0.1, color: "from-black to-gray-800" },
  { name: "TypeScript", icon: <SiTypescript />, delay: 0.2, color: "from-blue-500 to-blue-700" },
  { name: "JavaScript", icon: <FaJs />, delay: 0.3, color: "from-yellow-400 to-yellow-600" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, delay: 0.4, color: "from-cyan-400 to-cyan-600" },
  { name: "Redux", icon: <SiRedux />, delay: 0.5, color: "from-purple-500 to-purple-700" },
  { name: "Git/GitHub", icon: <FaGithub />, delay: 0.6, color: "from-gray-600 to-gray-800" },
  { name: "Figma", icon: <FaFigma />, delay: 0.7, color: "from-pink-500 to-pink-700" },
  { name: "Framer Motion", icon: <SiFramer />, delay: 0.8, color: "from-purple-400 to-purple-600" },
  { name: "GSAP", icon: <SiGreensock />, delay: 0.9, color: "from-green-400 to-green-600" },
]

interface BlobProps {
  color: string;
  initialPosition: {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
  };
  delay?: number;
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
      const factor = 0.2 * (1 - distance / radius)
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
      className={`absolute w-[30rem] h-[30rem] rounded-full filter blur-3xl opacity-20 ${color} touch-none`}
      style={{
        x,
        y,
        scale,
        ...initialPosition
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 0.2,
        transition: { delay, duration: 1 }
      }}
      whileHover={{ opacity: 0.3 }}
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
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  )
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const textY = useTransform(scrollYProgress, [0.1, 0.4], [50, 0])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Interactive Background Blobs */}
      <div className="absolute inset-0 z-0">
        <InteractiveBlob
          color="bg-purple-500"
          initialPosition={{ top: "10%", left: "10%" }}
          delay={0}
        />
        <InteractiveBlob
          color="bg-pink-500"
          initialPosition={{ bottom: "10%", right: "10%" }}
          delay={0.2}
        />
        <InteractiveBlob
          color="bg-blue-500"
          initialPosition={{ top: "50%", right: "20%" }}
          delay={0.4}
        />
      </div>

      <div className="container mx-auto px-4 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            About Me
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="flex justify-center"
            style={{ scale: imageScale, opacity: imageOpacity }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 z-10" />
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl z-20" />
              <Image
                src="/profil.jpg"
                alt="Aisel"
                fill
                className="object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div className="flex flex-col space-y-6" style={{ opacity: textOpacity, y: textY }}>
            <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Creative Frontend Developer
            </h3>
            <p className="text-white/80 leading-relaxed text-md">
              I'm not just a frontend developer — I'm a digital builder shaping ideas into intuitive, interactive realities.

              In my world, code meets creativity. I use React to bring structure, but AI to bring speed, flexibility, and imagination. Whether I'm prototyping with AI tools, building clean and responsive UIs, or enhancing user journeys through intelligent workflows, I'm always blending technology with vision.

              Think of me as the bridge between human insight and machine intelligence — someone who codes not just to build, but to transform how we build.

            </p>
            <p className="text-white/70 leading-relaxed text-md">
              With every line of code and every pixel I design, I'm driven by a simple belief:
              great digital experiences don't have to take forever — not when you work smart.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-3 pt-4">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4, delay: skill.delay, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  className={`px-4 py-2 rounded-full text-sm font-mono text-white flex items-center gap-2 bg-gradient-to-r ${skill.color} hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 backdrop-blur-sm border border-white/10`}
                >
                  <span className="text-lg">{skill.icon}</span>
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
