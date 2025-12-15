"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen ? "glass" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#hero" className="text-xl font-bold text-white">
              <span className="gradient-text">Aisel</span>  Mamedova
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  {item.name}
                </a>
              ))}

              {/* <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button> */}
            </nav>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 glass md:hidden pt-20"
          >
            <div className="container mx-auto px-4 py-8">
              <nav className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors text-lg font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}

                {/* <div className="pt-4 flex items-center">
                  <span className="text-white/60 mr-3">Theme:</span>
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div> */}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
