"use client"

import { motion } from "framer-motion"

export default function Story() {
  return (
    <section id="story" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            My Story
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The journey that shaped my career as a frontend developer.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-lg dark:prose-invert mx-auto"
          >
            <p>
              My journey into frontend development began during my Computer Science studies at Azerbaijan State Oil and
              Industry University. I was always fascinated by the intersection of design and functionality, and how a
              well-crafted interface could transform the user experience.
            </p>

            <p>
              Starting with the fundamentals of HTML, CSS, and JavaScript at High Result Academy, I quickly discovered
              my passion for building responsive and intuitive web interfaces. This led me to dive deeper into modern
              frontend frameworks, particularly React.js and Next.js, through Algoritmika Bootcamp's intensive program.
            </p>

            <p>
              My professional journey began with an internship at A-Group Sigorta, where I had my first taste of
              real-world development challenges. Working under experienced mentors, I learned not just technical skills
              but also the importance of collaboration and clean, maintainable code.
            </p>

            <p>
              At Frazex LLC, I had the opportunity to build complete web applications from Figma designs to functional
              interfaces. This experience taught me the value of attention to detail and the importance of translating
              design vision into technical reality.
            </p>

            <p>
              My time at Vitanur allowed me to refine my skills with React.js, Next.js, and TypeScript, working on
              performance optimization and API integration. The collaborative environment helped me grow as a team
              player and problem solver.
            </p>

            <p>
              Now at Grandmart MMC, I'm focused on creating data-driven dashboards and internal tools that help
              businesses visualize and act on their KPIs. This work has deepened my understanding of how frontend
              development directly impacts business operations and decision-making.
            </p>

            <p>
              Throughout this journey, I've maintained a commitment to clean code, continuous learning, and building
              impactful digital experiences. I believe that great frontend development is about more than just technical
              skills—it's about understanding user needs and business goals, and bringing them together through
              thoughtful implementation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
