"use client";
import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const sectionFadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.1,
        ease: "easeOut",
        staggerChildren: 0.3, // Stagger children animation
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionFadeInUp} // Use the variant with staggerChildren
      className="relative h-[calc(100vh-100px)] w-full overflow-hidden text-white"
    >
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        src="/videos/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero/hero.png" // optional
      >
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay (optional, improves text visibility) */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0" /> */}

      {/* Hero Content */}
      {/* <motion.div  // Wrap content div with motion.div for staggerChildren to work
        variants={sectionFadeInUp} // Children will inherit and stagger from this
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <motion.h1 
          variants={textFadeInUp} // Individual animation for h1
          className="text-4xl md:text-6xl font-[900] mb-4"
        >
          Find the Perfect Gift for Every Occasion
        </motion.h1>
        <motion.p 
          variants={textFadeInUp} // Individual animation for p
          className="text-lg md:text-2xl max-w-2xl"
        >
          Discover thoughtfully curated gifts that bring joy and create lasting memories for your loved ones.
        </motion.p>
      </motion.div> */}
    </motion.section>
  );
};

export default Hero;
