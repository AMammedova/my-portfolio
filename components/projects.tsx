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
    <div className="min-h-screen py-20 relative">
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
                <div className="relative aspect-video">
                  <img
                    src={project.images[sliderIndexes[project.id] || 0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {project.images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSlider(project.id, "prev", project.images.length);
                        }}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        ←
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSlider(project.id, "next", project.images.length);
                        }}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        →
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {getProjectIcon(project.title)}
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                  <p className="text-white/70 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-white/5 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-black/90 rounded-xl border border-white/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="relative aspect-video">
                <img
                  src={selectedProject.images[modalSliderIdx]}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                {selectedProject.images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <button
                      onClick={() => handleModalSlider("prev", selectedProject.images.length)}
                      className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => handleModalSlider("next", selectedProject.images.length)}
                      className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {getProjectIcon(selectedProject.title)}
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                </div>
                <p className="text-white/70 mb-4">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-white/5 text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}