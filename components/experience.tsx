"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react"

// Experience data based on Aisel Mamedova's CV
const experiences = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "GRANDMART MMC",
    location: "Baku, Azerbaijan",
    period: "12/2024 - Present",
    description:
      "Designed internal dashboards for reporting using React-based admin interfaces. Developed custom frontend components to visualize KPIs for management dashboards. Applied UI/UX best practices to ensure usability of data-driven dashboards.",
    type: "work",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Vitanur",
    location: "Baku, Azerbaijan",
    period: "06/2024 - 12/2024",
    description:
      "Developed and maintained key features for the platform using React.js, Next.js, and TypeScript, increasing platform performance by 20%. Integrated RESTful APIs in collaboration with backend teams, ensuring smooth data flow and consistent UI behavior. Applied responsive and accessible design principles using Tailwind CSS and modern JavaScript best practices.",
    type: "work",
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Frazex LLC",
    location: "Baku, Azerbaijan",
    period: "12/2022 - 06/2024",
    description:
      "Built web applications using React.js and Next.js, implementing UI components based on Figma designs. Contributed to bug fixes and feature enhancements, improving overall user experience and functionality. Developed interactive UI components and reusable code modules using React.js.",
    type: "work",
  },
  {
    id: 4,
    title: "Frontend Developer Intern",
    company: "A-Group Sigorta",
    location: "Baku, Azerbaijan",
    period: "06/2022 - 08/2022",
    description:
      "Assisted in developing responsive user interfaces using React.js and JavaScript under the guidance of senior developers. Participated in implementing reusable UI components and maintained styling consistency with CSS frameworks. Collaborated with the frontend team in debugging and improving existing features for internal insurance dashboards.",
    type: "work",
  },
  {
    id: 5,
    title: "Bachelor's Degree: Computer Science",
    company: "Azerbaijan State Oil and Industry University",
    location: "Baku, Azerbaijan",
    period: "09/2019 - 07/2023",
    description:
      "Studied Computer Science with a focus on web development and programming fundamentals.",
    type: "education",
  },
  {
    id: 6,
    title: "Frontend Development Bootcamp",
    company: "Algoritmika Bootcamp",
    location: "Baku, Azerbaijan",
    period: "2022 - 2023",
    description:
      "Covered advanced React.js, state management (Redux, Context API), project architecture, and real-life case studies.",
    type: "education",
  },
  {
    id: 7,
    title: "Web Development Certificate",
    company: "High Result Academy",
    location: "Baku, Azerbaijan",
    period: "09/2021 - 06/2022",
    description:
      "Focused on fundamentals of HTML, CSS, JavaScript, and responsive web design.",
    type: "education",
  },
]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={containerRef} className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Experience & Education
        </motion.h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500/30 transform md:-translate-x-1/2"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gray-900 border-2 border-purple-500 z-10 flex items-center justify-center">
                  {exp.type === "work" ? (
                    <Briefcase className="h-4 w-4 text-purple-500" />
                  ) : (
                    <GraduationCap className="h-4 w-4 text-purple-500" />
                  )}
                </div>

                {/* Content Card */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/50 transition-all touch-manipulation"
                  >
                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <h4 className="text-lg font-medium text-purple-400 mb-2">{exp.company}</h4>

                    <div className="flex flex-wrap items-center text-sm text-white/60 mb-4 gap-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {exp.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-white/80">{exp.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}