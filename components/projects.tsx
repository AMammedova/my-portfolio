"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ExternalLink,
  Github,
  MapPin,
  MessageCircle,
  CreditCard,
  QrCode,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
  link: string
  github?: string
  images: string[]
}

// Project data based on CV
const projects: Project[] = [
  {
    id: 1,
    title: "InLoya Website & Admin Panel",
    description:
      "A large-scale loyalty platform for businesses to offer customer rewards and promotions. Features both customer-facing website and admin panel with optimized components and API integrations.",
    tags: ["React", "Next.js", "API Integration", "Responsive UI"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://inloya.com/",
    images: ["/in-1.png", "/in-2.png", "/in-3.png"],
  },
  {
    id: 2,
    title: "Mastercard Promo Code Admin Panel",
    description:
      "An internal panel for generating and managing promo codes for Mastercard campaigns. Features include advanced filtering, search, export (CSV), and role-based access control.",
    tags: ["React", "Next.js", "Zustand", "Admin Panel"],
    image: "/placeholder.svg?height=600&width=800",
    link: "#",
    images: ["/mc-3.png", "/mc-1.png", "/mc-2.png"],
  },
  {
    id: 3,
    title: "Mastercard Courier Tracking Panel",
    description:
      "Admin dashboard to manage couriers distributing branded stickers across locations. Includes courier registration, sticker location tagging, and map-based visualization.",
    tags: ["React", "Google Maps API", "Location Tracking"],
    image: "/placeholder.svg?height=600&width=800",
    link: "#",
    images: ["/ms-1.png", "/ms-2.png"],
  },
  {
    id: 4,
    title: "Mastercard Telegram Chatbot Admin Panel",
    description:
      "Real-time admin interface to manage incoming user requests from a Telegram chatbot created for Mastercard promotions and customer engagement.",
    tags: ["React", "Next.js", "SignalR", "Real-time"],
    image: "/placeholder.svg?height=600&width=800",
    link: "#",
    images: ["/chat-1.png"],
  },
  {
    id: 5,
    title: "Vitanur Company Website & Admin Panel",
    description:
      "Corporate website for a local business showcasing services, team, and offerings, along with an internal admin panel for content management. Fully responsive and SEO-friendly.",
    tags: ["React", "Next.js", "SCSS", "Content Management"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://vitanur.com/",
    images: ["/vita-1.png"],
  },
  {
    id: 6,
    title: "Grandmart Digital Business Card System",
    description:
      "Complete system for generating and managing personalized digital business cards for company employees. Features QR codes, vCards, and mobile-optimized profile pages.",
    tags: ["Next.js", "Tailwind CSS", "QR Code", "vCard"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://vcard.grandmart.az:6003/az/profile/1018",
    images: ["/vcard3.png", "/vcard2.png"],
  },
  {
    id: 7,
    title: "Residential Complex Management System (Startup)",
    description:
      "A comprehensive management system for residential complexes, built as a startup. Includes all features needed for efficient administration: resident and staff management, parking management, communication tools (chatbot, complaints, suggestions),  announcements, and more. Enables seamless interaction between residents and management.",
    tags: ["React", "Next.js", "Real-time Chat", "SignalR"],
    image: "/placeholder.svg?height=600&width=800",
    link: "#",
    images: ["/mtk-1.png", "/mtk-2.png"],
  },
]

// Icons for projects based on their type
const getProjectIcon = (title: string) => {
  if (title.includes("Telegram")) return <MessageCircle className="text-blue-400" size={24} />
  if (title.includes("Tracking")) return <MapPin className="text-red-400" size={24} />
  if (title.includes("Promo Code")) return <CreditCard className="text-yellow-400" size={24} />
  if (title.includes("Business Card")) return <QrCode className="text-green-400" size={24} />
  return null
}

export default function AnimatedCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [modalSliderIdx, setModalSliderIdx] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Handle auto-rotation
  useEffect(() => {
    if (autoRotate) {
      autoRotateIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % projects.length)
      }, 5000)
    } else if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current)
    }

    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current)
      }
    }
  }, [autoRotate])

  // Stop auto-rotation when a project is selected
  useEffect(() => {
    if (selectedProject) {
      setAutoRotate(false)
    }
  }, [selectedProject])

  // Reset modal slider index when selected project changes
  useEffect(() => {
    setModalSliderIdx(0)
  }, [selectedProject])

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setAutoRotate(false)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
    setAutoRotate(false)
  }

  const handleModalSlider = (dir: "prev" | "next", imagesLength: number) => {
    setModalSliderIdx((current) => {
      let nextIdx = dir === "next" ? current + 1 : current - 1
      if (nextIdx < 0) nextIdx = imagesLength - 1
      if (nextIdx >= imagesLength) nextIdx = 0
      return nextIdx
    })
  }

  return (
    <div className="relative">
      <div className="px-4 md:container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Featured Projects
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative">
          <div
            className="w-full h-[680px] mb-4 rounded-xl overflow-hidden border border-white/10 relative"
         
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10"></div>

            {/* Project Carousel */}
            <div className="relative h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-4"
                >
                  {/* Project Image */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-3xl h-64 md:h-80 mb-8 overflow-hidden rounded-2xl shadow-2xl shadow-purple-500/30 relative"
                  >
                    <img
                      src={projects[activeIndex].images[0] || "/placeholder.svg"}
                      alt={projects[activeIndex].title}
                      className="w-full h-full object-cover object-center transition-transform duration-700"
                      style={{ filter: "brightness(0.95) contrast(1.08)" }}
                    />
                    {/* Gradient overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  </motion.div>

                  {/* Project Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center max-w-2xl" // Added margin bottom to create space for pagination
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{projects[activeIndex].title}</h3>
                    <p className="text-white/80 text-sm md:text-base mb-6 line-clamp-3">
                      {projects[activeIndex].description}
                    </p>
                    <button
                      onClick={() => setSelectedProject(projects[activeIndex])}
                      className="px-6 py-3 mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-colors duration-300 shadow-lg shadow-purple-500/20"
                    >
                      View Details
                    </button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel controls */}
              <button
                onClick={handlePrevious}
                className="absolute left-1 top-[90%] md:left-6 top-[60%] md:top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-purple-500/50 transition-colors duration-300 z-10"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-1 top-[90%] md:right-6 top-[60%] md:top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-purple-500/50 transition-colors duration-300 z-10"
              >
                <ChevronRight size={24} />
              </button>

              {/* Auto-rotate toggle */}
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm backdrop-blur-sm transition-colors duration-300 z-10 ${
                  autoRotate ? "bg-purple-500/50 text-white" : "bg-black/30 text-white/70 hover:bg-white/20"
                }`}
              >
                Auto-Rotate: {autoRotate ? "On" : "Off"}
              </button>

              {/* Indicator dots - moved to bottom of container */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index)
                      setAutoRotate(false)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "bg-purple-500 scale-125" : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project tags display */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {projects[activeIndex].tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm text-white/70"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-2xl shadow-purple-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image Slider */}
              <div className="relative h-72 md:h-96 bg-white flex items-center justify-center">
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <>
                    <img
                      src={selectedProject.images[modalSliderIdx] || "/placeholder.svg"}
                      alt={selectedProject.title + " image"}
                      className="object-cover h-full w-full"
                    />
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/70 z-10"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleModalSlider("prev", selectedProject.images.length)
                          }}
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/70 z-10"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleModalSlider("next", selectedProject.images.length)
                          }}
                        >
                          <ChevronRight size={24} />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {selectedProject.images.map((_, i) => (
                            <span
                              key={i}
                              className={`w-2 h-2 rounded-full ${i === modalSliderIdx ? "bg-purple-500" : "bg-white/30"}`}
                            ></span>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-purple-500/50 transition-colors duration-300"
                >
                  <X size={20} />
                </button>
                {getProjectIcon(selectedProject.title) && (
                  <div className="absolute top-4 left-4 p-3 bg-black/50 backdrop-blur-sm rounded-full">
                    {getProjectIcon(selectedProject.title)}
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
                <p className="text-white/80 mb-6 text-lg">{selectedProject.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/70 hover:bg-purple-500/20 hover:text-purple-300 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  {selectedProject.link && selectedProject.link !== "#" ? (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                    >
                      <ExternalLink size={18} />
                      View Live
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg opacity-70 cursor-not-allowed select-none">
                      <span>Internal corporate tool : live access not publicly available.</span>
                    </div>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
                    >
                      <Github size={18} />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
