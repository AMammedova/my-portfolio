"use client"

import { motion } from "framer-motion"
import { Code, Layout, GitBranch, Figma, Server, Layers } from "lucide-react"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartPie,
  ChartPieSeries,
  ChartPieValueLabel,
} from "@/components/ui/chart"

const skillCategories = [
  {
    name: "Frontend Technologies",
    icon: <Layout className="h-6 w-6" />,
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS"],
  },
  {
    name: "State Management",
    icon: <Layers className="h-6 w-6" />,
    skills: ["Redux", "Context API", "Zustand"],
  },
  {
    name: "Testing",
    icon: <Code className="h-6 w-6" />,
    skills: ["Jest", "React Testing Library"],
  },
  {
    name: "Version Control & Dev Tools",
    icon: <GitBranch className="h-6 w-6" />,
    skills: ["Git", "GitHub", "GitLab", "VSCode", "Chrome DevTools", "Vercel", "Netlify"],
  },
  {
    name: "Backend Integration",
    icon: <Server className="h-6 w-6" />,
    skills: ["REST APIs", "GraphQL", "Axios", "JSON"],
  },
  {
    name: "UI/UX & Design Tools",
    icon: <Figma className="h-6 w-6" />,
    skills: ["Figma", "Storybook"],
  },
]

const skillProficiency = [
  { name: "React.js", value: 90 },
  { name: "Next.js", value: 85 },
  { name: "TypeScript", value: 80 },
  { name: "Tailwind CSS", value: 90 },
  { name: "Redux", value: 75 },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My technical toolkit and areas of expertise in frontend development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{category.name}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="flex items-center text-gray-700 dark:text-gray-300">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">Proficiency Levels</h3>
            <div className="h-80">
              <ChartContainer>
                <Chart>
                  <ChartPie>
                    <ChartPieSeries
                      data={skillProficiency}
                      category="name"
                      value="value"
                      paddingAngle={2}
                      cornerRadius={4}
                    >
                      <ChartPieValueLabel className="fill-white font-medium" fontSize={12} />
                    </ChartPieSeries>
                  </ChartPie>
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                </Chart>
                <ChartLegend>
                  {skillProficiency.map((skill) => (
                    <ChartLegendItem key={skill.name} name={skill.name} className="text-sm" />
                  ))}
                </ChartLegend>
              </ChartContainer>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600/10 to-blue-500/10 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Always Learning</h3>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            The tech landscape is constantly evolving, and so am I. I'm committed to continuous learning and staying
            up-to-date with the latest frontend technologies and best practices.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
