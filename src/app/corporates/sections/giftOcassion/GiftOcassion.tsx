"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "../../components/Container";
import Image from "next/image";
import Button from "../../components/Button";
import { MorphingText } from "@/components/magicui/morphing-text";
import Link from "next/link";

const GiftOcassion = () => {
  const texts = [ "Anniversary", "Onboarding", "Rewards", "Diwali"];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const sectionSlideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
        ease: "easeOut",
        staggerChildren: 0.3,
      },
    },
  };

  const contentBlockFadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const textElementFadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const imageScaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionSlideInRight}
    >
      <Container className="lg:px-24 overflow-x-hidden sm:px-6 px-0">
        <section className="flex flex-col sm:flex-row gap-4 justify-between items-center ">
          <motion.div
            variants={contentBlockFadeInUp}
            className="relative grid h-max space-y-10 sm:w-[500px] "
          >
            <motion.h1
              variants={textElementFadeInUp}
              className=" text-4xl md:text-5xl font-semibold font-serif text-[#3a5a40] text-center sm:text-left "
            >
              Gifts for Every Occasion
            </motion.h1>
            <motion.p
              variants={textElementFadeInUp}
              className=" text-xl leading-relaxed sm:text-3xl text-gray-700 text-center sm:text-left "
            >
              Bespoke Gifts and Eco-friendly gifts, meticulously crafted to
              boost your brand&apos;s sophistication.
            </motion.p>
            <motion.div
              variants={textElementFadeInUp}
              className="flex justify-center sm:justify-start"
            >
              <Link href="/contact">
                <Button className="!mt-4 text-3xl w-fit sm:py-4 sm:px-8 mx-auto sm:mx-0 animate-pulse cursor-pointer">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            variants={imageScaleUp}
            className="relative mt-10 sm:mt-0 overflow-hidden rounded-t-full h-[500px] w-full sm:w-96 hover:shadow-lg hover:shadow-gray-500/50 transition-all duration-300 hover:-translate-y-2"
          >
            <Image
              src="/images/occasion/occasion.webp"
              alt="Gift Ocassion"
              fill
              className="object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-black/0 transition-colors z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 text-center z-20">
              <MorphingText
                texts={texts}
                className="text-[#FBE0C2] !text-5xl"
              />
            </div>
          </motion.div>
        </section>
      </Container>
    </motion.div>
  );
};

export default GiftOcassion;
