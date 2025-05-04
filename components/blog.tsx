"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "Learn how to create beautiful, responsive user interfaces using Tailwind CSS utility classes.",
    category: "Frontend",
    date: "April 15, 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "State Management Patterns in React Applications",
    excerpt: "Explore different state management approaches in React and when to use each one.",
    category: "React",
    date: "March 22, 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Optimizing Next.js Applications for Performance",
    excerpt: "Practical techniques to improve loading times and overall performance in Next.js apps.",
    category: "Performance",
    date: "February 10, 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Creating Accessible Web Forms: A Complete Guide",
    excerpt: "Best practices for building forms that everyone can use, regardless of ability.",
    category: "Accessibility",
    date: "January 28, 2024",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Blog & Case Studies
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and case studies from my experience as a frontend developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Featured blog post"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
                  Featured
                </span>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  The Evolution of Frontend Development: Trends for 2025
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  An in-depth look at how frontend development has evolved over the years and what trends we can expect
                  to see in 2025. Covering everything from new frameworks to design patterns and performance
                  optimization techniques.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">May 5, 2024</span>
                  <a
                    href="#"
                    className="flex items-center text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300"
                  >
                    Read Article <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Regular Posts */}
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                <a
                  href="#"
                  className="flex items-center text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300"
                >
                  Read Article <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
