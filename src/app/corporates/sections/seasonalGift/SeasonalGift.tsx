"use client"
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Container from "../../components/Container"
import Image from "next/image"

const SeasonalGift = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const sectionScaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut",
        staggerChildren: 0.3,
      },
    },
  }

  const titleFadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const imageContainerScaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionScaleUp}
    >
      <Container className="lg:px-24 sm:!pt-10 pt-0">
        <motion.h1
          variants={titleFadeInUp}
          className="text-center font-semibold text-4xl md:text-5xl font-serif text-[#3a5a40] mb-8 md:mb-10"
        >
          Seasonal Gift
        </motion.h1>

        <motion.div
          variants={imageContainerScaleUp}
          className="relative overflow-hidden rounded-sm h-40 aspect-video w-full sm:h-[550px] hover:shadow-lg hover:shadow-gray-500/50 transition-all duration-300"
        >
          <Image
            src="/images/seasonal-gift/seasonalGift.jpg"
            alt="Seasonal Gift"
            fill
            className="object-cover object-center hover:scale-105 transition-all duration-300"
          />
        </motion.div>
      </Container>
    </motion.div>
  )
}

export default SeasonalGift
