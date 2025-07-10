"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

const faqData = [
  "How do I place an order?",
  "Can I customize an order?",
  "Does the price of the product change for customized orders?",
  "What are the available payment methods?",
  "Can I make changes or cancel my order after it's been placed?",
  "Are the product colors shown on the website accurate?",
  "What if I order multiple products?",
  "How long will it take to receive my order?",
];

export default function Component() {
  const [openItems, setOpenItems] = useState<number[]>([]);
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

  const listContainerFadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const faqItemFadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const answerReveal: Variants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={sectionFadeInUp}
      className="min-h-screen bg-gradient-to-b from-[#3A5834F5] to-[#3A5834F5] flex items-center justify-center py-14 flex-col"
    >
      <div className="w-full max-w-2xl px-8 sm:px-0">
        <motion.h1
          variants={titleFadeInUp}
          className="text-4xl font-serif text-white text-center mb-12 sm:font-semibold"
        >
          FAQs
        </motion.h1>

        <motion.div variants={listContainerFadeInUp} className="space-y-1">
          {faqData.map((question, index) => (
            <motion.div
              key={index}
              variants={faqItemFadeInUp}
              className="border-b border-green-700/50"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between py-6 px-2 text-left text-white hover:bg-green-700/20 transition-colors duration-200 group"
              >
                <span className="text-lg font-light pr-4">{question}</span>
                <motion.span
                  animate={{ rotate: openItems.includes(index) ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-2xl font-light transition-transform duration-200`}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openItems.includes(index) && (
                  <motion.div
                    variants={answerReveal}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="px-2 pb-6 text-white/80 text-base leading-relaxed overflow-hidden"
                  >
                    <p>
                      This is where the answer to &quot;{question}&quot; would
                      appear. You can add detailed information, instructions, or
                      any relevant content here.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* <div className="w-full max-w-full py-5 bg-[#FBE0C2]">
        <p className="text-[#3A5834F5] text-center">Copyright © 2025 All Rights Reserved</p>
      </div> */}
    </motion.div>
  );
}
