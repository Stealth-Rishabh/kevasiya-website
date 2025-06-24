"use client";

import { motion } from "framer-motion";
import IconMarquee from "@/components/ui/IconMarquee";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Handshake } from "lucide-react";

interface ClientsSliderProps {
  icons: { src: string; alt: string }[];
}

export function ClientsSlider({ icons }: ClientsSliderProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "-50px 0px",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#f8f8f8] to-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] bg-gradient-radial from-transparent via-transparent to-[#3a5a4010] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 max-w-7xl"
      >
        {/* Animated Heading */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#3a5a40] mb-4">
            Trusted By Industry Leaders
          </h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-[#5a6d5c] max-w-2xl mx-auto"
          >
            We&apos;re proud to collaborate with some of the most respected
            brands worldwide
          </motion.p>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-12 md:mb-16"
        >
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#AE8F65] to-transparent rounded-full"></div>
        </motion.div>

        {/* Marquee with enhanced styling */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

          <div className="py-6 md:py-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <IconMarquee
              icons={icons}
              speed={50}
              iconClassName="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
              containerClassName="gap-12 px-4"
            />
          </div>
        </motion.div>

        {/* Optional CTA */}
        <Link href="#" className="cursor-pointer flex justify-center">
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center animate-bounce "
          >
            <button className="px-8 py-3 bg-[#3a5a40] text-white rounded-lg hover:bg-[#2d3a2e] transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              Become a Partner  
              <Handshake className="w-4 h-4 mt-1" />
            </button>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
