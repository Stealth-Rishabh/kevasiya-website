"use client";
import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const sectionFadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const titleFadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardGroupFadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const cardItemFadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const textFadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, delay: 0.2 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionFadeInUp}
      className="bg-[#FBE0C2] py-16 px-4"
    >
      <div className="container mx-auto sm:max-w-6xl px-8">
        {/* Heading */}
        <motion.h2
          variants={titleFadeInUp}
          className="text-center text-4xl md:text-5xl font-semibold font-serif text-[#4d5d4a] mb-10"
        >
          What You&apos;ll Get
        </motion.h2>

        {/* Main Card - Our Catalogue */}
        <motion.div
          variants={cardGroupFadeInUp}
          className="relative w-full h-64 md:h-80 mb-6 overflow-hidden rounded-t-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-black/0 transition-colors z-10"></div>
          <Image
            src="/images/serviceImage/services (1).webp"
            alt="Our catalogue of gift items including decorative boxes and gourmet foods"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-8 left-0 right-0 text-center z-20">
            <motion.h3
              variants={textFadeIn}
              className="text-[#f5e9d5] text-3xl font-serif"
            >
              Our Catalogue
            </motion.h3>
          </div>
        </motion.div>

        {/* Three Cards Row */}
        <motion.div
          variants={cardGroupFadeInUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 "
        >
          {/* Custom Curated Gifts */}
          <motion.div
            variants={cardItemFadeInUp}
            className="relative w-full h-52 md:h-64 overflow-hidden rounded-bl-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-black/0 transition-colors z-10"></div>
            <Image
              src="/images/serviceImage/services (2).webp"
              alt="Custom curated gift sets with decorative items"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-0 right-0 text-center z-20">
              <motion.h3
                variants={textFadeIn}
                className="text-[#f5e9d5] text-2xl font-serif"
              >
                Custom Curated Gifts
              </motion.h3>
            </div>
          </motion.div>

          {/* Gifting Consultation */}
          <motion.div
            variants={cardItemFadeInUp}
            className="relative w-full h-52 md:h-64 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-black/0 transition-colors z-10"></div>
            <Image
              src="/images/serviceImage/services (3).webp"
              alt="Gifting consultation service with a professional"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-0 right-0 text-center z-20">
              <motion.h3
                variants={textFadeIn}
                className="text-[#f5e9d5] text-2xl font-serif"
              >
                Gifting Consultation
              </motion.h3>
            </div>
          </motion.div>

          {/* Promotional Gifts */}
          <motion.div
            variants={cardItemFadeInUp}
            className="relative w-full h-52 md:h-64 overflow-hidden rounded-br-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-black/0 transition-colors z-10"></div>
            <Image
              src="/images/serviceImage/services (4).webp"
              alt="Custom packaging and branding with company logos"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-0 right-0 text-center z-20">
              <motion.h3
                variants={textFadeIn}
                className="text-[#f5e9d5] text-2xl font-serif"
              >
                Custom Packaging & Branding
              </motion.h3>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Services;
