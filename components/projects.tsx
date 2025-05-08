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


// "use client"

// import { useState, useEffect, useRef, useMemo } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { X, ExternalLink, Github, MapPin, MessageCircle, CreditCard, QrCode, Building, Laptop, Code } from "lucide-react"
// import * as THREE from "three"
// import { Canvas, useFrame, useThree } from "@react-three/fiber"
// import { Float, Environment, OrbitControls, ContactShadows, Html, Text, useGLTF, SpotLight } from "@react-three/drei"
// import { easing } from "maath"

// interface Project {
//   id: number
//   title: string
//   description: string
//   tags: string[]
//   image: string
//   link: string
//   github?: string
//   images: string[]
//   color?: string
//   model?: string
// }

// // Project data based on CV with added color and 3D model properties
// const projects: Project[] = [
//   {
//     id: 1,
//     title: "InLoya Website & Admin Panel",
//     description:
//       "A large-scale loyalty platform for businesses to offer customer rewards and promotions. Features both customer-facing website and admin panel with optimized components and API integrations.",
//     tags: ["React", "Next.js", "API Integration", "Responsive UI"],
//     image: "/placeholder.svg?height=600&width=800",
//     link: "https://inloya.com/",
//     images: ["/in-1.png", "/in-2.png", "/in-3.png"],
//     color: "#8b5cf6", // Purple
//     model: "laptop",
//   },
//   {
//     id: 2,
//     title: "Mastercard Promo Code Admin Panel",
//     description:
//       "An internal panel for generating and managing promo codes for Mastercard campaigns. Features include advanced filtering, search, export (CSV), and role-based access control.",
//     tags: ["React", "Next.js", "Zustand", "Admin Panel"],
//     image: "/placeholder.svg?height=600&width=800",
//     link: "#",
//     images: ["/mc-3.png", "/mc-1.png", "/mc-2.png"],
//     color: "#ec4899", // Pink
//     model: "creditcard",
//   },
//   {
//     id: 3,
//     title: "Mastercard Courier Tracking Panel",
//     description:
//       "Admin dashboard to manage couriers distributing branded stickers across locations. Includes courier registration, sticker location tagging, and map-based visualization.",
//     tags: ["React", "Google Maps API", "Location Tracking"],
//     image: "/placeholder.svg?height=600&width=800",
//     link: "#",
//     images: ["/ms-1.png", "/ms-2.png"],
//     color: "#f59e0b", // Amber
//     model: "pin",
//   },
//   {
//     id: 4,
//     title: "Mastercard Telegram Chatbot Admin Panel",
//     description:
//       "Real-time admin interface to manage incoming user requests from a Telegram chatbot created for Mastercard promotions and customer engagement.",
//     tags: ["React", "Next.js", "SignalR", "Real-time"],
//     image: "/placeholder.svg?height=600&width=800",
//     link: "#",
//     images: ["/chat-1.png"],
//     color: "#3b82f6", // Blue
//     model: "chat",
//   },
//   {
//     id: 5,
//     title: "Vitanur Company Website & Admin Panel",
//     description:
//       "Corporate website for a local business showcasing services, team, and offerings, along with an internal admin panel for content management. Fully responsive and SEO-friendly.",
//     tags: ["React", "Next.js", "SCSS", "Content Management"],
//     image: "/placeholder.svg?height=600&width=800",
//     link: "https://vitanur.com/",
//     images: ["/vita-1.png"],
//     color: "#10b981", // Emerald
//     model: "laptop",
//   },
//   {
//     id: 6,
//     title: "Grandmart Digital Business Card System",
//     description:
//       "Complete system for generating and managing personalized digital business cards for company employees. Features QR codes, vCards, and mobile-optimized profile pages.",
//     tags: ["Next.js", "Tailwind CSS", "QR Code", "vCard"],
//     image: "/placeholder.svg?height=600&width=800",
//     link: "https://vcard.grandmart.az:6003/az/profile/1018",
//     images: ["/vc-1.png"],
//     color: "#06b6d4", // Cyan
//     model: "card",
//   },
//   {
//     id: 7,
//     title: "Residential Complex Management System (Startup)",
//     description:
//       "A comprehensive management system for residential complexes, built as a startup. Includes all features needed for efficient administration: resident and staff management, parking management, communication tools (chatbot, complaints, suggestions), announcements, and more. Enables seamless interaction between residents and management.",
//     tags: ["React", "Next.js", "Real-time Chat", "SignalR"],
//     image: "/placeholder.svg?height=600&width=800",
//     link: "#",
//     images: ["/mtk-1.png", "/mtk-2.png"],
//     color: "#6366f1", // Indigo
//     model: "building",
//   },
// ]

// // Filter categories based on project tags
// const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)))
// const filters = ["All", ...allTags]

// // Icons for projects based on their type
// const getProjectIcon = (title: string) => {
//   if (title.includes("Telegram")) return <MessageCircle className="text-blue-400" size={24} />
//   if (title.includes("Tracking")) return <MapPin className="text-red-400" size={24} />
//   if (title.includes("Promo Code")) return <CreditCard className="text-yellow-400" size={24} />
//   if (title.includes("Business Card")) return <QrCode className="text-green-400" size={24} />
//   if (title.includes("Residential")) return <Building className="text-purple-400" size={24} />
//   if (title.includes("Website")) return <Laptop className="text-emerald-400" size={24} />
//   return <Code className="text-white" size={24} />
// }

// // Enhanced 3D Model Components
// function LaptopModel({ color }: { color: string }) {
//   return (
//     <group>
//       {/* Base */}
//       <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
//         <boxGeometry args={[1.5, 0.1, 1]} />
//         <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.2} clearcoat={0.6} transmission={0.1} />
//       </mesh>
//       {/* Screen */}
//       <mesh position={[0, 0.35, -0.35]} rotation={[-Math.PI / 6, 0, 0]} castShadow>
//         <boxGeometry args={[1.4, 0.7, 0.05]} />
//         <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.1} clearcoat={0.8} transmission={0.3} emissive={color} emissiveIntensity={0.2} />
//       </mesh>
//       {/* Screen content - simplified website */}
//       <mesh position={[0, 0.35, -0.325]} rotation={[-Math.PI / 6, 0, 0]}>
//         <planeGeometry args={[1.3, 0.6]} />
//         <meshBasicMaterial color="#111" />
//       </mesh>
//       {/* Keyboard */}
//       <mesh position={[0, 0, 0.2]} rotation={[0, 0, 0]}>
//         <planeGeometry args={[1.3, 0.7]} />
//         <meshPhysicalMaterial color="#222" metalness={0.5} roughness={0.6} />
//       </mesh>
//       {/* Add glowing logo on the laptop */}
//       <mesh position={[0, 0.05, -0.48]} rotation={[-Math.PI / 6, 0, 0]}>
//         <circleGeometry args={[0.1, 16]} />
//         <meshBasicMaterial color={color} toneMapped={false} />
//       </mesh>
//     </group>
//   )
// }

// function CreditCardModel({ color }: { color: string }) {
//   const glowColor = new THREE.Color(color).convertSRGBToLinear()
  
//   return (
//     <group>
//       <mesh castShadow receiveShadow>
//         <boxGeometry args={[1.5, 1, 0.08]} />
//         <meshPhysicalMaterial 
//           color={color} 
//           metalness={0.8} 
//           roughness={0.15} 
//           clearcoat={0.7} 
//           transmission={0.2} 
//         />
//       </mesh>
//       {/* Chip */}
//       <mesh position={[-0.4, 0.2, 0.05]} castShadow>
//         <boxGeometry args={[0.3, 0.3, 0.05]} />
//         <meshStandardMaterial color="gold" metalness={0.9} roughness={0.3} />
//       </mesh>
//       {/* Card number */}
//       <group position={[0, -0.1, 0.05]}>
//         {[...Array(4)].map((_, i) => (
//           <mesh key={i} position={[-0.6 + i * 0.4, 0, 0]}>
//             <planeGeometry args={[0.3, 0.1]} />
//             <meshBasicMaterial color="#fff" opacity={0.7} transparent />
//           </mesh>
//         ))}
//       </group>
//       {/* Glowing edge effect */}
//       <mesh position={[0, 0, 0]} scale={[1.52, 1.02, 0.1]}>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshBasicMaterial color={glowColor} opacity={0.2} transparent />
//       </mesh>
//     </group>
//   )
// }

// function PinModel({ color }: { color: string }) {
//   return (
//     <group>
//       {/* Main pin */}
//       <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
//         <coneGeometry args={[0.4, 1, 32]} />
//         <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.2} clearcoat={0.5} />
//       </mesh>
//       {/* Pin head */}
//       <mesh position={[0, -0.3, 0]} castShadow>
//         <sphereGeometry args={[0.25, 32, 32]} />
//         <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.1} />
//       </mesh>
//       {/* Map circle base */}
//       <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
//         <circleGeometry args={[1, 32]} />
//         <meshStandardMaterial color="#333" opacity={0.7} transparent />
//       </mesh>
//       {/* Map lines */}
//       {[...Array(4)].map((_, i) => (
//         <mesh key={i} position={[0, -0.49, 0]} rotation={[Math.PI / 2, i * Math.PI / 4, 0]}>
//           <planeGeometry args={[1.8, 0.02]} />
//           <meshBasicMaterial color="#555" transparent opacity={0.5} />
//         </mesh>
//       ))}
//       {/* Pulse effect */}
//       <mesh position={[0, -0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
//         <ringGeometry args={[0.6, 0.65, 32]} />
//         <meshBasicMaterial color={color} transparent opacity={0.6} />
//       </mesh>
//     </group>
//   )
// }

// function ChatBubbleModel({ color }: { color: string }) {
//   return (
//     <group>
//       {/* Main bubble */}
//       <mesh castShadow receiveShadow>
//         <sphereGeometry args={[0.7, 32, 32]} />
//         <meshPhysicalMaterial 
//           color={color} 
//           metalness={0.6} 
//           roughness={0.25} 
//           clearcoat={0.7} 
//           transmission={0.2} 
//         />
//       </mesh>
//       {/* Tail */}
//       <mesh position={[0.5, -0.6, 0]} rotation={[0, 0, Math.PI / 4]}>
//         <coneGeometry args={[0.15, 0.3, 16]} />
//         <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.2} />
//       </mesh>
//       {/* Message lines */}
//       {[...Array(3)].map((_, i) => (
//         <mesh key={i} position={[0, 0.1 - i * 0.2, 0.5]}>
//           <boxGeometry args={[0.8, 0.08, 0.05]} />
//           <meshBasicMaterial color="white" opacity={0.7} transparent />
//         </mesh>
//       ))}
//       {/* Notification dot */}
//       <mesh position={[0.5, 0.5, 0.2]}>
//         <sphereGeometry args={[0.12, 16, 16]} />
//         <meshBasicMaterial color="#ff0066" />
//       </mesh>
//     </group>
//   )
// }

// function CardModel({ color }: { color: string }) {
//   return (
//     <group>
//       <mesh castShadow receiveShadow>
//         <boxGeometry args={[1.2, 0.8, 0.06]} />
//         <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.18} clearcoat={0.7} transmission={0.25} />
//       </mesh>
//       {/* QR code */}
//       <mesh position={[0.3, 0, 0.04]}>
//         <planeGeometry args={[0.4, 0.4]} />
//         <meshBasicMaterial>
//           <canvasTexture attach="map" image={createQRCodeTexture()} />
//         </meshBasicMaterial>
//       </mesh>
//       {/* Contact info */}
//       <group position={[-0.3, 0, 0.04]}>
//         {[...Array(3)].map((_, i) => (
//           <mesh key={i} position={[0, 0.15 - i * 0.15, 0]}>
//             <planeGeometry args={[0.5, 0.08]} />
//             <meshBasicMaterial color="white" opacity={0.8} transparent />
//           </mesh>
//         ))}
//       </group>
//       {/* Card holder photo placeholder */}
//       <mesh position={[-0.4, 0.25, 0.04]}>
//         <circleGeometry args={[0.15, 32]} />
//         <meshBasicMaterial color="white" opacity={0.6} transparent />
//       </mesh>
//     </group>
//   )
// }

// // Create a basic QR code texture for the business card
// function createQRCodeTexture() {
//   const size = 64;
//   const canvas = document.createElement('canvas');
//   canvas.width = size;
//   canvas.height = size;
//   const ctx = canvas.getContext('2d');
//   if (ctx) {
//     ctx.fillStyle = 'white';
//     ctx.fillRect(0, 0, size, size);
    
//     // Create a simplified QR code pattern
//     ctx.fillStyle = 'black';
//     for (let i = 0; i < 8; i++) {
//       for (let j = 0; j < 8; j++) {
//         if (Math.random() > 0.5 || 
//             // Position detection patterns (corners)
//             (i < 3 && j < 3) || 
//             (i > 4 && j < 3) || 
//             (i < 3 && j > 4)) {
//           ctx.fillRect(i * 8, j * 8, 8, 8);
//         }
//       }
//     }
    
//     // Position detection patterns (solid squares in corners)
//     ctx.fillStyle = 'black';
//     ctx.fillRect(0, 0, 24, 24);
//     ctx.fillRect(40, 0, 24, 24);
//     ctx.fillRect(0, 40, 24, 24);
    
//     ctx.fillStyle = 'white';
//     ctx.fillRect(8, 8, 8, 8);
//     ctx.fillRect(48, 8, 8, 8);
//     ctx.fillRect(8, 48, 8, 8);
//   }
//   return canvas;
// }

// function BuildingModel({ color }: { color: string }) {
//   return (
//     <group>
//       {/* Main building */}
//       <mesh castShadow receiveShadow>
//         <boxGeometry args={[1, 1.5, 1]} />
//         <meshPhysicalMaterial color={color} metalness={0.5} roughness={0.3} clearcoat={0.5} />
//       </mesh>
      
//       {/* Roof */}
//       <mesh position={[0, 0.85, 0]} castShadow>
//         <boxGeometry args={[1.2, 0.2, 1.2]} />
//         <meshStandardMaterial color="#333" />
//       </mesh>
      
//       {/* Windows - front face */}
//       {[...Array(9)].map((_, i) => {
//         const row = Math.floor(i / 3);
//         const col = i % 3;
//         return (
//           <mesh 
//             key={`front-${i}`} 
//             position={[-0.3 + col * 0.3, 0.3 - row * 0.3, 0.51]} 
//             castShadow
//           >
//             <boxGeometry args={[0.2, 0.2, 0.02]} />
//             <meshPhysicalMaterial 
//               color={'#a5b4fc'} 
//               metalness={0.2} 
//               roughness={0.1} 
//               emissive={'#a5b4fc'} 
//               emissiveIntensity={Math.random() * 0.5 + 0.2} 
//             />
//           </mesh>
//         );
//       })}
      
//       {/* Windows - side face */}
//       {[...Array(9)].map((_, i) => {
//         const row = Math.floor(i / 3);
//         const col = i % 3;
//         return (
//           <mesh 
//             key={`side-${i}`} 
//             position={[0.51, 0.3 - row * 0.3, -0.3 + col * 0.3]} 
//             castShadow
//           >
//             <boxGeometry args={[0.02, 0.2, 0.2]} />
//             <meshPhysicalMaterial 
//               color={'#a5b4fc'} 
//               metalness={0.2} 
//               roughness={0.1} 
//               emissive={'#a5b4fc'} 
//               emissiveIntensity={Math.random() * 0.5 + 0.2} 
//             />
//           </mesh>
//         );
//       })}
      
//       {/* Door */}
//       <mesh position={[0, -0.6, 0.51]} castShadow>
//         <boxGeometry args={[0.3, 0.3, 0.05]} />
//         <meshStandardMaterial color="#333" />
//       </mesh>
      
//       {/* Base platform */}
//       <mesh position={[0, -0.85, 0]} receiveShadow>
//         <boxGeometry args={[1.5, 0.2, 1.5]} />
//         <meshStandardMaterial color="#555" roughness={0.8} />
//       </mesh>
//     </group>
//   )
// }

// // Enhanced 3D Model Component
// const Model = ({ project, isHovered, onClick }: { project: Project; isHovered: boolean; onClick: () => void }) => {
//   const modelRef = useRef<THREE.Group>(null)
//   const { viewport } = useThree()
//   const isMobile = viewport.width < 5
//   const color = useMemo(() => new THREE.Color(project.color || "#8b5cf6"), [project.color])
  
//   // Enhance the hover animation
//   useFrame((state, delta) => {
//     if (modelRef.current) {
//       // Continuous rotation
//       modelRef.current.rotation.y += delta * (isHovered ? 0.6 : 0.2)
      
//       // Hover effect with smoother animation
//       if (isHovered) {
//         easing.damp3(modelRef.current.scale, [1.15, 1.15, 1.15], 0.2, delta)
//         easing.damp(modelRef.current.position, 'y', 0.1, 0.2, delta)
//       } else {
//         easing.damp3(modelRef.current.scale, [1, 1, 1], 0.15, delta)
//         easing.damp(modelRef.current.position, 'y', 0, 0.2, delta)
//       }
//     }
//   })

//   // Select model by project.model
//   let ModelShape = null
//   switch (project.model) {
//     case "laptop":
//       ModelShape = <LaptopModel color={color.getStyle()} />
//       break
//     case "creditcard":
//       ModelShape = <CreditCardModel color={color.getStyle()} />
//       break
//     case "pin":
//       ModelShape = <PinModel color={color.getStyle()} />
//       break
//     case "chat":
//       ModelShape = <ChatBubbleModel color={color.getStyle()} />
//       break
//     case "card":
//       ModelShape = <CardModel color={color.getStyle()} />
//       break
//     case "building":
//       ModelShape = <BuildingModel color={color.getStyle()} />
//       break
//     default:
//       ModelShape = <LaptopModel color={color.getStyle()} />
//   }

//   return (
//     <Float 
//       speed={2} 
//       rotationIntensity={isHovered ? 0.4 : 0.2} 
//       floatIntensity={isHovered ? 0.8 : 0.5}
//     >
//       <group ref={modelRef} onClick={onClick} castShadow receiveShadow>
//         {ModelShape}
        
//         {/* Label with improved visibility */}
//         <Html 
//           position={[0, isMobile ? 1.4 : 1.8, 0]} 
//           wrapperClass="html-label" 
//           center 
//           distanceFactor={isHovered ? 10 : 8} 
//           occlude 
//           transform
//         >
//           <div
//             className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap ${
//               isHovered ? "bg-white text-black scale-110 shadow-lg" : "bg-black/80 text-white scale-100"
//             }`}
//             style={{ 
//               boxShadow: isHovered ? `0 0 15px ${project.color}` : 'none',
//               borderLeft: `3px solid ${project.color}`
//             }}
//           >
//             {project.title}
//           </div>
//         </Html>
        
//         {/* Project number badge */}
//         <Html position={[-0.9, -0.8, 0]} wrapperClass="html-label" center distanceFactor={12} occlude>
//           <div 
//             className="px-2 py-1 rounded-full text-xs font-bold shadow-md"
//             style={{ 
//               background: `linear-gradient(135deg, ${project.color}, ${color.getStyle()})`,
//               color: 'white'
//             }}
//           >
//             0{project.id}
//           </div>
//         </Html>
        
//         {/* Add a spotlight to highlight the model when hovered */}
//         {isHovered && (
//           <SpotLight 
//             position={[0, 5, 0]} 
//             angle={0.3} 
//             penumbra={1} 
//             intensity={1} 
//             color={project.color}
//             castShadow 
//             attenuation={5}
//             anglePower={5}
//           />
//         )}
//       </group>
//     </Float>
//   )
// }

// // Enhanced 3D Scene Component with Grid Layout
// const ProjectsScene = ({
//   filteredProjects,
//   hoveredProject,
//   setHoveredProject,
//   setSelectedProject,
// }: {
//   filteredProjects: Project[]
//   hoveredProject: number | null
//   setHoveredProject: (id: number | null) => void
//   setSelectedProject: (project: Project | null) => void
// }) => {
//   return (
//     <Canvas 
//       camera={{ position: [0, 4, 13], fov: 45 }} 
//       className="w-full h-[550px] md:h-[650px] lg:h-[750px]"
//       shadows
//       dpr={[1, 2]} // Improve resolution on hi-dpi displays
//     >
//       <color attach="background" args={["#050816"]} />
      
//       {/* Improved lighting setup */}
//       <ambientLight intensity={0.3} />
//       <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} intensity={0.8} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
//       <spotLight position={[-10, 15, -10]} angle={0.15} penumbra={1} intensity={0.4} castShadow />
//       <directionalLight position={[5, 5, 5]} intensity={0.3} castShadow />

//       <group position={[0, -1, 0]}>
//         {filteredProjects.map((project, i) => {
//           // Calculate grid position with improved spacing
//           const cols = Math.min(3, filteredProjects.length)
//           const rows = Math.ceil(filteredProjects.length / cols)

//           const col = i % cols
//           const row = Math.floor(i / cols)

//           // Center the grid with better spacing
//           const gridWidth = cols * 4.5
//           const gridHeight = rows * 4.5

//           const x = col * 4.5 - gridWidth / 2 + 2.25
//           const z = row * 4.5 - gridHeight / 2 + 2.25

//           return (
//             <group
//               key={project.id}
//               position={[x, 0, z]}
//               onPointerOver={() => setHoveredProject(project.id)}
//               onPointerOut={() => setHoveredProject(null)}
//             >
//               <Model
//                 project={project}
//                 isHovered={hoveredProject === project.id}
//                 onClick={() => setSelectedProject(project)}
//               />
              
//               {/* Enhanced platform beneath each model */}
//               <mesh position={[0, -0.7, 0]} receiveShadow>
//                 <cylinderGeometry args={[1.2, 1.4, 0.1, 32]} />
//                 <meshPhysicalMaterial 
//                   color={project.color} 
//                   opacity={0.3} 
//                   transparent 
//                   roughness={0.2} 
//                   metalness={0.9} 
//                   emissive={project.color}
//                   emissiveIntensity={hoveredProject === project.id ? 0.3 : 0.1}
//                 />
//               </mesh>
              
//               {/* Add a subtle glow effect under each model */}
//               <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//                 <planeGeometry args={[2.5, 2.5]} />
//                 <meshBasicMaterial 
//                   color={project.color} 
//                   opacity={hoveredProject === project.id ? 0.1 : 0.05} 
//                   transparent 
//                   blending={THREE.AdditiveBlending}
//                 />
//               </mesh>
//             </group>
//           )
//         })}

//         {/* Enhanced grid floor with subtle emission */}
//         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
//           <planeGeometry args={[50, 50, 50, 50]} />
//           <meshStandardMaterial 
//             color="#111" 
//             wireframe 
//             opacity={0.15} 
//             transparent 
//             emissive="#334155"
//             emissiveIntensity={0.1}
//           />
//         </mesh>
        
//         {/* Add ground reflection plane */}
//         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.91, 0]} receiveShadow>
//           <planeGeometry args={[100, 100]} />
//           <meshStandardMaterial 
//             color="#050816" 
//             metalness={0.9}
//             roughness={0.4}
//             opacity={0.6}
//             transparent
//           />
//         </mesh>
//       </group>

//       <ContactShadows 
//         position={[0, -1.5, 0]} 
//         opacity={0.4} 
//         scale={20} 
//         blur={2.5} 
//         far={4.5} 
//         resolution={1024}
//       />
//       <Environment preset="night" />

//       <OrbitControls
//         enableZoom={true}
//         enablePan={false}
//         minPolarAngle={Math.PI / 6}
//         maxPolarAngle={Math.PI / 2.2}
//         dampingFactor={0.04}
//         rotateSpeed={0.4}
//         minDistance={3}
//         maxDistance={20}
//       />
//     </Canvas>
//   )
// }

// // Main Projects Component
// export default function Projects() {
//   const [activeFilter, setActiveFilter] = useState<string>("All")
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null)
//   const [hoveredProject, setHoveredProject] = useState<number | null>(null)
//   const [modalSliderIdx, setModalSliderIdx] = useState(0)
//   const [isLoaded, setIsLoaded] = useState(false)

//   useEffect(() => {
//     // Simulate loading of 3D assets
//     const timer = setTimeout(() => {
//       setIsLoaded(true)
//     }, 1000)

//     return () => clearTimeout(timer)
//   }, [])

//   useEffect(() => {
//     setModalSliderIdx(0)
//   }, [selectedProject])

//   const filteredProjects =
//     activeFilter === "All" ? projects : projects.filter((project) => project.tags.includes(activeFilter))

//   // Modal slider handler
//   const handleModalSlider = (dir: "prev" | "next", imagesLength: number) => {
//     setModalSliderIdx((current) => {
//       let nextIdx = dir === "next" ? current + 1 : current - 1
//       if (nextIdx < 0) nextIdx = imagesLength - 1
//       if (nextIdx >= imagesLength) nextIdx = 0
//       return nextIdx
//     })
//   }

//   return (
//     <div className="min-h-[80vh] py-20 relative overflow-hidden">
//       {/* Subtle background gradient */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/10 rounded-full filter blur-[150px]" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-700/10 rounded-full filter blur-[150px]" />
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-4xl md:text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
//         >
//           Featured Projects
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           viewport={{ once: true }}
//           className="text-center text-white/70 max-w-2xl mx-auto mb-12"
//         >
//           Browse my portfolio in an organized 3D showcase. Hover over projects to explore and click for details.
//         </motion.p>

//         {/* Filter Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="flex flex-wrap justify-center gap-3 mb-12"
//         >
//           {filters.map((filter) => (
//             <motion.button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
//                 activeFilter === filter
//                   ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
//                   : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
//               }`}
//             >
//               {filter}
//             </motion.button>
//           ))}
//         </motion.div>

//         {/* Loading state */}
//         {!isLoaded && (
//           <div className="flex items-center justify-center h-[500px]">
//             <div className="relative w-16 h-16">
//               <div className="absolute top-0 left-0 w-full h-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
//             </div>
//           </div>
//         )}

//         {/* 3D Projects Scene */}
//         {isLoaded && (
//           <div className="relative w-full bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/5">
//             <ProjectsScene
//               filteredProjects={filteredProjects}
//               hoveredProject={hoveredProject}
//               setHoveredProject={setHoveredProject}
//               setSelectedProject={setSelectedProject}
//             />

//             {/* Instruction overlay */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-md text-white/70 text-xs">
//               <span>Drag to rotate • Scroll to zoom • Click on a project for details</span>
//             </div>
//           </div>
//         )}

//         {/* Project cards for mobile fallback */}
//         <div className="mt-12 md:hidden grid grid-cols-1 gap-6">
//           {filteredProjects.map((project, index) => (
//             <motion.div
//               key={project.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -5 }}
//               className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer shadow-md"
//               onClick={() => setSelectedProject(project)}
//               style={{ borderLeftColor: project.color, borderLeftWidth: "4px" }}
//             >
//               <div className="relative h-48 bg-white flex items-center justify-center">
//                 <img
//                   src={project.images[0] || "/placeholder.svg"}
//                   alt={project.title + " image"}
//                   className="object-cover h-full w-full"
//                 />
//               </div>
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
//                     {project.title}
//                   </h3>
//                   <span className="text-sm text-white/50">0{project.id}</span>
//                 </div>
//                 <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.description}</p>
//                 <div className="flex flex-wrap gap-2">
//                   {project.tags.slice(0, 3).map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors duration-300"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                   {project.tags.length > 3 && (
//                     <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70">
//                       +{project.tags.length - 3}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Project Modal */}
//       <AnimatePresence>
//         {selectedProject && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
//             onClick={() => setSelectedProject(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               transition={{ type: "spring", damping: 30 }}
//               className="bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//               style={{
//                 boxShadow: `0 0 30px ${selectedProject.color}20`,
//               }}
//             >
//               {/* Modal Image Slider */}
//               <div className="relative h-72 md:h-80 bg-white flex items-center justify-center">
//                 {selectedProject.images && selectedProject.images.length > 0 && (
//                   <>
//                     <img
//                       src={selectedProject.images[modalSliderIdx] || "/placeholder.svg"}
//                       alt={selectedProject.title + " image"}
//                       className="object-cover h-full w-full"
//                     />
//                     {selectedProject.images.length > 1 && (
//                       <>
//                         <button
//                           className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 hover:bg-black/70 z-10"
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             handleModalSlider("prev", selectedProject.images.length)
//                           }}
//                         >
//                           &#8592;
//                         </button>
//                         <button
//                           className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1 hover:bg-black/70 z-10"
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             handleModalSlider("next", selectedProject.images.length)
//                           }}
//                         >
//                           &#8594;
//                         </button>
//                         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
//                           {selectedProject.images.map((_, i) => (
//                             <span
//                               key={i}
//                               className={`w-2 h-2 rounded-full ${
//                                 i === modalSliderIdx ? "bg-purple-500" : "bg-white/30"
//                               }`}
//                             ></span>
//                           ))}
//                         </div>
//                       </>
//                     )}
//                   </>
//                 )}
//                 <button
//                   onClick={() => setSelectedProject(null)}
//                   className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-purple-500/50 transition-colors duration-300"
//                 >
//                   <X size={20} />
//                 </button>
//                 {getProjectIcon(selectedProject.title) && (
//                   <div className="absolute top-4 left-4 p-3 bg-black/50 backdrop-blur-sm rounded-full">
//                     {getProjectIcon(selectedProject.title)}
//                   </div>
//                 )}
//               </div>

//               <div className="p-8">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-2xl md:text-3xl font-bold text-white">{selectedProject.title}</h3>
//                   <span className="text-white/50 text-lg font-light">Project 0{selectedProject.id}</span>
//                 </div>

//                 <p className="text-white/80 mb-6 text-base leading-relaxed">{selectedProject.description}</p>

//                 <div className="mb-6">
//                   <h4 className="text-sm uppercase text-white/50 mb-2">Technologies</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedProject.tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="px-3 py-1.5 bg-white/10 rounded-md text-sm text-white/70 hover:bg-purple-500/20 hover:text-purple-300 transition-colors duration-300"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap gap-4">
//                   {selectedProject.link && selectedProject.link !== "#" ? (
//                     <a
//                       href={selectedProject.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-md transition-all duration-300 shadow-md"
//                     >
//                       <ExternalLink size={18} />
//                       View Live
//                     </a>
//                   ) : (
//                     <div className="flex items-center gap-2 px-5 py-2.5 bg-gray-700 text-white rounded-md opacity-70 cursor-not-allowed select-none">
//                       <span>Internal corporate tool</span>
//                     </div>
//                   )}
//                   {selectedProject.github && (
//                     <a
//                       href={selectedProject.github}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-md transition-all duration-300"
//                     >
//                       <Github size={18} />
//                       Source Code
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }