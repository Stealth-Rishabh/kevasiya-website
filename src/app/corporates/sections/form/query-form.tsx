"use client"

import type React from "react"

import { useState } from "react"

export default function QueryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Message sent successfully!")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <div className="w-full p-8 rounded-[2px] shadow-lg" style={{ backgroundColor: "#f8e8d8" }}>
      <h1 className="text-3xl  mb-6 text-center font-serif" style={{ color: "#3a5a40" }}>
        Query Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full px-3 py-2 border bg-white border-gray-300  focus:outline-none focus:ring-1 focus:ring-green-800"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-3 py-2 border bg-white border-gray-300  focus:outline-none focus:ring-1 focus:ring-green-800"
          />
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone No"
            required
            className="w-full px-3 py-2 border bg-white border-gray-300  focus:outline-none focus:ring-1 focus:ring-green-800"
          />
        </div>

        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message..."
            required
            rows={4}
            className="w-full px-3 py-2 border bg-white border-gray-300  focus:outline-none focus:ring-1 focus:ring-green-800"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 text-white font-medium rounded-md transition-colors"
            style={{ backgroundColor: "#3a5a40" }}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  )
}
