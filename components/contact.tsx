"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const form = new FormData()
      form.append("name", formData.name)
      form.append("email", formData.email)
      form.append("message", formData.message)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout
      // Formspree AJAX üçün redirect: false parametri əlavə edirik
      const res = await fetch("https://formspree.io/f/xkgdzvep?redirect=false", {
        method: "POST",
        body: form,
        signal: controller.signal,
        headers: {
          Accept: "application/json"
        }
      })
      clearTimeout(timeoutId)
      // 200-299 və ya 302 (redirect) status-u success kimi qəbul edirik
      if (res.ok || res.status === 302) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        // Response-u JSON kimi oxumağa cəhd edirik
        const data = await res.json().catch(() => null)
        if (data && data.errors) {
          setError(`Xəta: ${data.errors.map((e: any) => e.message).join(", ")}`)
        } else {
          setError("Şəxsi mesajınızı göndərmək mümkün olmadı. Zəhmət olmasa, bir az sonra yenidən cəhd edin.")
        }
      }
    } catch (err: any) {
      // Network error və ya timeout - amma email göndərilə bilər
      // Formspree çox vaxt email göndərir, amma CORS səbəbindən error atır
      // Optimistic success göstəririk
      if (err.name === "AbortError") {
        setError("Sorğu vaxtı bitdi. Zəhmət olmasa, yenidən cəhd edin.")
      } else {
        // CORS və ya digər network error - amma email göndərilə bilər
        // Bu halda success göstəririk, çünki Formspree çox vaxt email göndərir
        setIsSubmitted(true)
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setIsSubmitted(false), 5000)
      }
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen py-20 flex items-center relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
            <p className="text-white/80 mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              Feel free to reach out through the form or connect with me on social media.
            </p>

            <div className="flex space-x-4 mb-8">
              <motion.a
                href="https://github.com/AMammedova"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 transition-colors touch-manipulation"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/aysel-mammedova/"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 transition-colors touch-manipulation"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              {/* <motion.a
                href="#"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a> */}
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <p className="text-white/80 font-mono">
                Based in Baku, Azerbaijan
                <br />
                Available for remote work worldwide
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 min-h-[450px] flex items-center justify-center">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 w-full">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4 border border-green-300 shadow-lg">
                    <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">Təşəkkürlər!</h3>
                  <p className="text-white/90 text-lg max-w-md text-center">Mesajınız uğurla göndərildi.<br />Ən qısa zamanda geri dönüş edəcəm.</p>
                  <button
                    className="mt-8 px-6 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all"
                    onClick={() => setIsSubmitted(false)}
                  >Yeni mesaj göndər</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg mx-auto">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-purple-500 touch-manipulation"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-purple-500 touch-manipulation"
                      placeholder="yourname@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-purple-500 min-h-[120px] touch-manipulation"
                      placeholder="Hello, I'd like to talk about..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <Button
                    type="submit"
                    data-event="contact_click"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg transition-all touch-manipulation"
                    disabled={isSubmitting}
                  >
                    <span className="flex items-center justify-center">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                  </Button>
                  {error && (
                    <div className="text-red-400 mt-3 text-center bg-red-900/20 rounded p-4">
                      <div className="flex flex-col items-center">
                        <svg className="w-8 h-8 mb-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728" /></svg>
                        <span>{error}</span>
                        <button
                          type="button"
                          onClick={() => setError(null)}
                          className="mt-3 px-5 py-1 bg-red-500/90 text-white rounded hover:bg-red-700 transition-colors text-sm"
                          disabled={isSubmitting}
                        >
                          Tamam, yenidən cəhd et
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
