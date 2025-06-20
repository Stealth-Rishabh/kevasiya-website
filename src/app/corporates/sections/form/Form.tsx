"use client"
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import QueryForm from "./query-form"
import Image from "next/image"

export default function Form() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const sectionFadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut",
        staggerChildren: 0.3,
      },
    },
  }

  const formSlideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  const gridFadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.15 },
    },
  }

  const imageScaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionFadeIn}
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/images/form/form.webp')" }}
    >
      {/* Main section with form on the left */}
      <div className="flex-1 flex items-center p-8">
        <div className="w-full sm:max-w-7xl sm:px-24  mx-auto flex ">
          <motion.div variants={formSlideInLeft} className="w-full md:w-1/2">
            <QueryForm />
          </motion.div>
          <div className="hidden md:block md:w-1/2"></div>
        </div>
      </div>

      {/* Grid section with four equal divs */}
      <motion.div
        variants={gridFadeInUp}
        className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 px-8 pb-8 sm:p-8"
      >
        {[
          "/images/form/form (1).webp",
          "/images/form/form (2).webp",
          "/images/form/form (3).webp",
          "/images/form/form (4).webp",
        ].map((item) => (
          <motion.div
            key={item}
            variants={imageScaleUp}
            className="bg-white/30 backdrop-blur-sm rounded-lg shadow-lg p-4 aspect-square flex items-center justify-center overflow-hidden"
          >
            <Image
              src={`${item}`}
              alt={`Gift box ${item}`}
              className="w-full h-full object-cover rounded-md hover:scale-125 transition-all duration-300"
              width={200}
              height={200}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
