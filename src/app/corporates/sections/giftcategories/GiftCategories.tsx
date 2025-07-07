"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "../../components/Container";
import Link from "next/link";
import Image from "next/image";

const GiftCategories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const sectionSlideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const titleFadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardSlideIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const imageHoverEffect = {
    hover: { scale: 1.05 },
  };

  const textFadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionSlideInLeft}
    >
      <Container className="lg:px-24 px-0 sm:px-6">
        {/* Main Heading */}
        <motion.h1
          variants={titleFadeInUp}
          className="text-center font-semibold text-4xl md:text-5xl font-serif text-[#3a5a40] mb-8 md:mb-16"
        >
          Corporate Gift Categories
        </motion.h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Rewards & Recognition - Large Left Card */}
          <motion.div
            variants={cardSlideIn}
            className="md:col-span-5 relative overflow-hidden sm:rounded-bl-[7rem] h-80 sm:h-[600px]"
          >
            <Link href="/collections/corporates/corporate-diwali">
              <motion.div whileHover="hover" variants={imageHoverEffect}>
                <Image
                  src="/images/categories/categories (1).webp"
                  alt="Corporate Diwali gift box with wine and gourmet items"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                <motion.h2
                  variants={textFadeIn}
                  className="text-white text-3xl font-serif"
                >
                  Corporate<br />
                  Diwali
                </motion.h2>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-colors z-10"></div>
            </Link>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={cardSlideIn}
            className="md:col-span-7 grid grid-cols-1 gap-4 md:gap-6"
          >
            {/* Work Anniversary - Large Top Card */}
            <motion.div
              variants={cardSlideIn}
              className="relative overflow-hidden sm:rounded-tr-[7rem] h-80 sm:h-[345px]"
            >
              <Link href="/collections/corporates/work-anniversary">
                <motion.div whileHover="hover" variants={imageHoverEffect}>
                  <Image
                    src="/images/categories/categories (2).webp"
                    alt="Work anniversary gift set with gourmet snacks and decorative items"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                  <motion.h2
                    variants={textFadeIn}
                    className="text-white text-3xl font-serif"
                  >
                    Work Anniversary
                  </motion.h2>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-colors z-10"></div>
              </Link>
            </motion.div>

            {/* Bottom Three Cards */}
            <motion.div
              variants={cardSlideIn}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            >
              {/* Employee Onboarding */}
              <motion.div
                variants={cardSlideIn}
                className="relative overflow-hidden h-80 sm:h-[230px]"
              >
                <Link href="/collections/corporates/onboarding">
                  <motion.div whileHover="hover" variants={imageHoverEffect}>
                    <Image
                      src="/images/categories/categories (3).webp"
                      alt="Employee onboarding gift basket with office supplies and treats"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                    <motion.h2
                      variants={textFadeIn}
                      className="text-white text-3xl font-serif"
                    >
                      Employee
                      <br />
                      Onboarding
                    </motion.h2>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 transition-colors z-10"></div>
                </Link>
              </motion.div>

              {/* Client Appreciation */}
              <motion.div
                variants={cardSlideIn}
                className="relative overflow-hidden h-80 sm:h-[230px]"
              >
                <Link href="/collections/corporates/special-occasions">
                  <motion.div whileHover="hover" variants={imageHoverEffect}>
                    <Image
                      src="/images/categories/categories (4).webp"
                      alt="Client appreciation gift set with premium items"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                    <motion.h2
                      variants={textFadeIn}
                      className="text-white text-3xl font-serif"
                    >
                      Special
                      <br />
                      Occasions
                    </motion.h2>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-colors z-10"></div>
                </Link>
              </motion.div>

              {/* Clients */}
              <motion.div
                variants={cardSlideIn}
                className="relative overflow-hidden h-80 sm:h-[230px]"
              >
                <Link href="/collections/corporates/reward-and-recognitions">
                  <motion.div whileHover="hover" variants={imageHoverEffect}>
                    <Image
                      src="/images/categories/categories (5).webp"
                      alt="Client gift basket with premium products"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                    <motion.h2
                      variants={textFadeIn}
                      className="text-white text-3xl font-serif"
                    >
                      Rewards &<br />
                      Recognition
                    </motion.h2>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-colors z-10"></div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default GiftCategories;
