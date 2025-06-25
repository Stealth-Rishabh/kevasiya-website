"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Gift, Heart, Sparkles, Crown, Baby, Building2 } from "lucide-react"

export default function AboutUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const categories = [
    { icon: Crown, label: "Bridal Showers" },
    { icon: Building2, label: "Corporate Gifting" },
    { icon: Baby, label: "Baby Announcements" },
    { icon: Sparkles, label: "Festive Hampers" },
    { icon: Gift, label: "Room Baskets" },
    { icon: Heart, label: "Sagan Trays" },
  ]

  const stats = [
    { number: "2,000+", label: "Custom hampers created" },
    { number: "99%", label: "Customer satisfaction rate" },
    { number: "500+", label: "Trusted by wedding planners" },
  ]

  return (
    <section className="relative min-h-screen bg-white py-12 sm:py-16 lg:py-32 overflow-hidden">
      {/* Background decorative elements - using hardcoded colors */}
      <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 bg-[#3A5A40]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 sm:bottom-40 left-5 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 bg-[#AE8F65]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl" ref={ref}>
        {/* Main heading with typewriter effect */}
        <motion.div
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#3A5A40] leading-tight mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Bespoke Favors. <span className="block text-[#AE8F65]">Unmatched Elegance.</span>
            <span className="block">Cherished Memories.</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Welcome to the premier destination for luxury gifting that leaves a lasting impression.
          </motion.p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          {/* Left content */}
          <motion.div
            className="lg:col-span-6 space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute -left-2 sm:-left-4 top-0 w-1 h-12 sm:h-16 bg-[#AE8F65]"></div>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed pl-4 sm:pl-8">
                We believe in the magic of gifting. From thoughtful concepts to curated execution, each hamper becomes a
                symbol of celebration, love, and memory.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Our in-house hampers feature the finest gourmet indulgences and keepsakes—designed to be treasured.
                Whether it's a bridal shower, baby announcement, or corporate gesture, we elevate every moment.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                With Kevasiya, each occasion becomes a canvas of creativity. Emotions come alive, and ordinary days
                become extraordinary.
              </p>
            </motion.div>
          </motion.div>

          {/* Right images */}
          <div className="lg:col-span-6 relative mt-8 lg:mt-0">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Main image */}
              <div className="relative z-10 mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                <Image
                  src="/images/wedding/products/wedding (8).webp"
                  alt="Luxury gift hamper"
                  width={400}
                  height={500}
                  className="rounded-2xl shadow-2xl object-cover w-full h-[700px]"
                />
              </div>

              {/* Floating secondary image - hide on mobile */}
              <motion.div
                className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 z-20 hidden sm:block"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/wedding/products/wedding (1).webp"
                  alt="Gift details"
                  width={250}
                  height={200}
                  className="rounded-xl shadow-xl object-cover border-4 border-white w-32 sm:w-48 lg:w-auto h-60"
                />
              </motion.div>

              {/* Decorative floating element - smaller on mobile */}
              <motion.div
                className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-[#AE8F65]/20 rounded-full z-0"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              ></motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 sm:p-6 bg-[#3A5A40]/5 rounded-2xl border border-[#3A5A40]/10"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#3A5A40] mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#3A5A40] mb-8 sm:mb-12">
            Our Signature Collections
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#AE8F65]/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#AE8F65]" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight">
                  {category.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-0">
            <motion.h3
              className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#3A5A40] mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              Ready to Create Something Beautiful?
            </motion.h3>

            <motion.p
              className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              Discover our curated collections or get in touch to create a bespoke gifting experience that will be
              treasured forever.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              {/* Shop Button */}
              <motion.button
                className="group relative w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-[#3A5A40] text-white font-medium text-base sm:text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#3A5A40]/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                  Explore Collections
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#3A5A40] to-[#AE8F65] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.button>

              {/* Contact Button */}
              <motion.button
                className="group relative w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-transparent border-2 border-[#AE8F65] text-[#AE8F65] font-medium text-base sm:text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#AE8F65]/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 group-hover:text-white transition-colors duration-300">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  Start Your Journey
                </span>
                <motion.div
                  className="absolute inset-0 bg-[#AE8F65] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.button>
            </motion.div>

            {/* Decorative elements - smaller on mobile */}
            
          </div>
        </motion.div>
      </div>
    </section>
  )
}
