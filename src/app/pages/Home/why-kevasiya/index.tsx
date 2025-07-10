"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
import { FiTruck, FiGift, FiCheckSquare, FiSmile } from "react-icons/fi"; // Example icons
import Image from "next/image";

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
}

const benefitsData: Benefit[] = [
  {
    id: "shipping",
    title: "Pan India Shipping",
    description: "Delivering smiles across the nation, wherever you are.",
    icon: FiTruck,
    image: "/images/home/why-kevasiya/truck.png",
  },
  {
    id: "personalized",
    title: "Personalized Gifts",
    description: "Unique, custom-made gifts that tell a personal story.",
    icon: FiGift,
    image: "/images/home/why-kevasiya/gift.png",
  },
  {
    id: "selection",
    title: "Diverse Selection",
    description: "A wide array of choices to suit every taste and occasion.",
    icon: FiCheckSquare,
    image: "/images/home/why-kevasiya/select.png",
  },
  {
    id: "expectations",
    title: "Exceed Expectations",
    description: "Committed to quality and service that goes above and beyond.",
    icon: FiSmile,
    image: "/images/home/why-kevasiya/smiley.png",
  },
];

const WhyKevasiya: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white text-gray-900">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Heading */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-5 md:mb-5"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#3a5a40] mb-4">
            Why Choose <span className="text-kevasiya-gold">Kevasiya</span>?
          </h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-[#5a6d5c] max-w-2xl mx-auto"
          >
            Experience the difference with our commitment to quality and
            customer satisfaction.
          </motion.p>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-12 md:mb-16"
        >
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#AE8F65] to-transparent rounded-full"></div>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefitsData.map((benefit, index) => {
            // const IconComponent = benefit.icon;
            return (
              <motion.div
                key={benefit.id}
                variants={itemVariants}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-kevasiya-gold/20 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <motion.div 
                  className="p-4 bg-kevasiya-gold/10 h-36 "
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: (index || 0) * 0.5 // 0.5 second delay based on index
                  }}
                >
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    width={100}
                    height={100}
                    className="mix-blend-multiply h-full w-full object-contain"
                  />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyKevasiya;
