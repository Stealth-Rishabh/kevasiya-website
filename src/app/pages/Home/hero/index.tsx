"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Media */}
      {isMobile ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src="/hero_home_t.jpg"
          alt="Hero Banner"
          fill
          className="absolute inset-0 object-cover z-0"
          priority
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Hero Content */}
      <motion.div
        className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tight"
          variants={textVariants}
        >
          <span className="block text-white font-serif">KEVASIYA</span>
          <span className="block text-white text-2xl md:text-4xl lg:text-5xl font-light mt-4 tracking-widest">
            CRAFTING EXCELLENCE
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl mb-12 text-white font-light max-w-3xl mx-auto leading-relaxed"
          variants={textVariants}
        >
          Where tradition meets innovation, creating masterpieces that define
          luxury and sophistication
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          variants={textVariants}
        >
          <Link href="/collections">
            <button className="px-12 py-4 bg-white text-black font-bold text-lg rounded-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore Collection
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-12 py-4 border-2 border-white text-white font-semibold text-lg rounded-md hover:bg-white hover:text-black transition-all duration-300 shadow-lg">
              Book Your Gift
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
