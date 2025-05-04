"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, MapPin, MessageCircle, CreditCard, QrCode } from "lucide-react"

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
  images: string[]; // array of image URLs
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
    images: [
      "/in-1.png",
      "/in-2.png",
      "/in-3.png",

    ],
  },
  {
    id: 2,
    title: "Mastercard Promo Code Admin Panel",
    description:
      "An internal panel for generating and managing promo codes for Mastercard campaigns. Features include advanced filtering, search, export (CSV), and role-based access control.",
    tags: ["React", "Next.js", "Zustand", "Admin Panel"],
    image: "/placeholder.svg?height=600&width=800",
    link: "#",
    images: [
      "/mc-3.png",
      "/mc-1.png",
      "/mc-2.png",

    ],
  },
  {
    id: 3,
    title: "Mastercard Courier Tracking Panel",
    description:
      "Admin dashboard to manage couriers distributing branded stickers across locations. Includes courier registration, sticker location tagging, and map-based visualization.",
    tags: ["React", "Google Maps API", "Location Tracking"],
    image: "/placeholder.svg?height=600&width=800",
    link: "#",
    images: [
      "/ms-1.png",
      "/ms-2.png"
    ],
  },
  {
    id: 4,
    title: "Mastercard Telegram Chatbot Admin Panel",
    description:
      "Real-time admin interface to manage incoming user requests from a Telegram chatbot created for Mastercard promotions and customer engagement.",
    tags: ["React", "Next.js", "SignalR", "Real-time"],
    image: "/placeholder.svg?height=600&width=800",
    link: "#",
    images: [
      "/chat-1.png",
    ],
  },
  {
    id: 5,
    title: "Vitanur Company Website & Admin Panel",
    description:
      "Corporate website for a local business showcasing services, team, and offerings, along with an internal admin panel for content management. Fully responsive and SEO-friendly.",
    tags: ["React", "Next.js", "SCSS", "Content Management"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://vitanur.com/",
    images: [
      "/vita-1.png",
    ],
  },
  {
    id: 6,
    title: "Grandmart Digital Business Card System",
    description:
      "Complete system for generating and managing personalized digital business cards for company employees. Features QR codes, vCards, and mobile-optimized profile pages.",
    tags: ["Next.js", "Tailwind CSS", "QR Code", "vCard"],
    image: "/placeholder.svg?height=600&width=800",
    link: "https://vcard.grandmart.az:6003/az/profile/1018",
    images: [
      "/vc-1.png",
    ],
  },
  {
    id: 7,
    title: "Residential Complex Management System (Startup)",
    description:
      "A comprehensive management system for residential complexes, built as a startup. Includes all features needed for efficient administration: resident and staff management, parking management, communication tools (chatbot, complaints, suggestions),  announcements, and more. Enables seamless interaction between residents and management.",
    tags: [
      "React",
      "Next.js",
      "Real-time Chat",
      "SignalR"
    ],
    image: "/placeholder.svg?height=600&width=800",
    link: "#",
    images: [
      "/mtk-1.png",
      "/mtk-2.png"
    ],
  },
]

// Filter categories based on project tags
const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)))
const filters = ["All", ...allTags]

// Icons for projects based on their type
const getProjectIcon = (title: string) => {
  if (title.includes("Telegram")) return <MessageCircle className="text-blue-400" size={24} />;
  if (title.includes("Tracking")) return <MapPin className="text-red-400" size={24} />;
  if (title.includes("Promo Code")) return <CreditCard className="text-yellow-400" size={24} />;
  if (title.includes("Business Card")) return <QrCode className="text-green-400" size={24} />;
  return null;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  // Track current image index for each card
  const [sliderIndexes, setSliderIndexes] = useState<{ [id: number]: number }>({})
  // Modal slider index
  const [modalSliderIdx, setModalSliderIdx] = useState(0)

  useEffect(() => {
    setModalSliderIdx(0)
  }, [selectedProject])

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.tags.includes(activeFilter))

  // Helper to change slider index
  const handleSlider = (projectId: number, dir: "prev" | "next", imagesLength: number) => {
    setSliderIndexes((prev) => {
      const current = prev[projectId] || 0
      let nextIdx = dir === "next" ? current + 1 : current - 1
      if (nextIdx < 0) nextIdx = imagesLength - 1
      if (nextIdx >= imagesLength) nextIdx = 0
      return { ...prev, [projectId]: nextIdx }
    })
  }

  // Modal slider handler
  const handleModalSlider = (dir: "prev" | "next", imagesLength: number) => {
    setModalSliderIdx((current) => {
      let nextIdx = dir === "next" ? current + 1 : current - 1
      if (nextIdx < 0) nextIdx = imagesLength - 1
      if (nextIdx >= imagesLength) nextIdx = 0
      return nextIdx
    })
  }

  return (
    <div className="min-h-screen py-20 ">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Featured Projects
        </motion.h2>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const currentIdx = sliderIndexes[project.id] || 0
            const hasMultiple = project.images.length > 1
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-purple-500/20"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Slider */}
                <div className="relative h-56 bg-white flex items-center justify-center">
                  <img
                    src={project.images[currentIdx]}
                    alt={project.title + ' image'}
                    className="object-cover h-full w-full"
                  />
                  {hasMultiple && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 hover:bg-black/70 z-10"
                        onClick={e => { e.stopPropagation(); handleSlider(project.id, 'prev', project.images.length) }}
                      >
                        &#8592;
                      </button>
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 hover:bg-black/70 z-10"
                        onClick={e => { e.stopPropagation(); handleSlider(project.id, 'next', project.images.length) }}
                      >
                        &#8594;
                      </button>
                    </>
                  )}
                  {hasMultiple && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {project.images.map((_, i) => (
                        <span key={i} className={`w-2 h-2 rounded-full ${i === currentIdx ? 'bg-purple-500' : 'bg-white/30'}`}></span>
                      ))}
                    </div>
                  )}
                </div>
                {/* Existing Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">{project.title}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
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
                      src={selectedProject.images[modalSliderIdx]}
                      alt={selectedProject.title + ' image'}
                      className="object-cover h-full w-full"
                    />
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 hover:bg-black/70 z-10"
                          onClick={e => { e.stopPropagation(); handleModalSlider('prev', selectedProject.images.length) }}
                        >
                          &#8592;
                        </button>
                        <button
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 hover:bg-black/70 z-10"
                          onClick={e => { e.stopPropagation(); handleModalSlider('next', selectedProject.images.length) }}
                        >
                          &#8594;
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {selectedProject.images.map((_, i) => (
                            <span key={i} className={`w-2 h-2 rounded-full ${i === modalSliderIdx ? 'bg-purple-500' : 'bg-white/30'}`}></span>
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
                    <span key={tag} className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/70 hover:bg-purple-500/20 hover:text-purple-300 transition-colors duration-300">
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