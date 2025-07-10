"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Gift,
  Pen,
  Headphones,
  MessageSquare,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";

const steps = [
  {
    number: 1,
    icon: Gift,
    label: "Choose the Gift",
    description:
      "Browse curated hampers for Baby, Wedding, Corporate or Festive occasions.",
  },
  {
    number: 2,
    icon: Pen,
    label: "Fill the Form",
    description: "Share your gifting needs—and leave the rest to us.",
  },
  {
    number: 3,
    icon: Headphones,
    label: "Kevsaiya Team Contacts You",
    description: "A dedicated consultant reaches out within your timeline.",
  },
  {
    number: 4,
    icon: MessageSquare,
    label: "Queries Resolved & Order Finalized",
    description:
      "We clarify all details, guide approvals, and finalize your order.",
  },
];

export default function OurProcessStepper() {
  const [activeStep, setActiveStep] = useState(1);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#AE8F65]/5 to-[#4A674F]/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#AE8F65]/10 border border-[#AE8F65]/20 mb-6">
            <Sparkles size={16} className="text-[#AE8F65]" />
            <span className="text-sm font-medium text-[#4A674F]">
              Our Simple Process
            </span>
          </div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            How We Make
            <span className="block bg-gradient-to-r from-[#AE8F65] to-[#4A674F] bg-clip-text text-transparent">
              Corporate Gifting
            </span>
            <span className="block">Effortless</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From selection to delivery, our streamlined process ensures your
            corporate gifting experience is seamless, personalized, and
            memorable for every recipient.
          </motion.p>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <motion.ol
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            role="list"
            className="flex items-center justify-between space-x-8"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.number === activeStep;
              const isCompleted = step.number < activeStep;

              return (
                <React.Fragment key={step.number}>
                  <motion.li
                    variants={itemVariants}
                    className={`flex-1 group transition-colors duration-500`}
                    aria-current={isActive ? "step" : undefined}
                    tabIndex={0}
                    role="button"
                    onClick={() => setActiveStep(step.number)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveStep(step.number);
                      }
                    }}
                  >
                    <div
                      className={`
                        relative rounded-2xl p-6 transition-all duration-300 cursor-pointer
                        min-h-[220px] flex flex-col transform hover:scale-105
                        ${
                          isActive
                            ? "bg-gradient-to-br from-[#AE8F65] to-[#4A674F] text-white shadow-2xl shadow-[#AE8F65]/25"
                            : "bg-white text-gray-700 hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-100"
                        }
                        ${isCompleted ? "ring-2 ring-[#4A674F]/20" : ""}
                      `}
                    >
                      {/* Floating Badge */}
                      {isActive && (
                        <div className="absolute -top-3 -right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                          <div className="w-3 h-3 bg-[#4A674F] rounded-full"></div>
                        </div>
                      )}

                      {/* Step Number and Icon */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div
                          className={`
                          w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300
                          ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-[#AE8F65]/10 text-[#AE8F65] group-hover:bg-[#AE8F65]/20"
                          }
                        `}
                        >
                          {step.number}
                        </div>
                        <div
                          className={`
                          p-2 rounded-lg transition-all duration-300
                          ${
                            isActive
                              ? "bg-white/20"
                              : "bg-[#4A674F]/10 group-hover:bg-[#4A674F]/20"
                          }
                        `}
                        >
                          <Icon
                            size={24}
                            className={`transition-all duration-300 ${
                              isActive ? "text-white" : "text-[#4A674F]"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Step Label */}
                      <h3 className="text-lg font-semibold mb-2 leading-tight transition-colors duration-300">
                        {step.label}
                      </h3>

                      {/* Step Description */}
                      <p
                        className={`text-sm leading-relaxed flex-grow transition-colors duration-300 ${
                          isActive ? "text-white/90" : "text-gray-600"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </motion.li>

                  {/* Connector Arrow */}
                  {index < steps.length - 1 && (
                    <motion.div
                      variants={itemVariants}
                      className="flex-shrink-0"
                    >
                      <div
                        className={`
                        p-2 rounded-full transition-all duration-300
                        ${
                          isCompleted || isActive
                            ? "bg-[#4A674F]/10"
                            : "bg-gray-100"
                        }
                      `}
                      >
                        <ChevronRight
                          size={20}
                          className={`
                            transition-all duration-300
                            ${
                              isCompleted || isActive
                                ? "text-[#4A674F]"
                                : "text-gray-400"
                            }
                          `}
                        />
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </motion.ol>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <motion.ol
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            role="list"
            className="space-y-6"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.number === activeStep;
              const isCompleted = step.number < activeStep;

              return (
                <motion.li
                  key={step.number}
                  variants={itemVariants}
                  className={`relative transition-colors duration-500`}
                  aria-current={isActive ? "step" : undefined}
                >
                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-16 -ml-px">
                      <div
                        className={`
                          w-full h-full transition-all duration-500 rounded-full
                          ${
                            isCompleted || isActive
                              ? "bg-gradient-to-b from-[#AE8F65] to-[#4A674F]"
                              : "bg-gray-300"
                          }
                        `}
                      />
                    </div>
                  )}

                  <div
                    className={`
                      relative rounded-2xl p-5 transition-all duration-300 cursor-pointer
                      min-h-[140px] flex flex-col transform hover:scale-[1.02]
                      ${
                        isActive
                          ? "bg-gradient-to-br from-[#AE8F65] to-[#4A674F] text-white shadow-xl shadow-[#AE8F65]/25"
                          : "bg-white text-gray-700 shadow-lg border border-gray-100"
                      }
                    `}
                    tabIndex={0}
                    role="button"
                    onClick={() => setActiveStep(step.number)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveStep(step.number);
                      }
                    }}
                  >
                    {/* Floating Badge */}
                    {isActive && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <div className="w-2.5 h-2.5 bg-[#4A674F] rounded-full"></div>
                      </div>
                    )}

                    {/* Step Number and Icon */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`
                        w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition-all duration-300
                        ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#AE8F65]/10 text-[#AE8F65]"
                        }
                      `}
                      >
                        {step.number}
                      </div>
                      <div
                        className={`
                        p-2 rounded-lg transition-all duration-300
                        ${isActive ? "bg-white/20" : "bg-[#4A674F]/10"}
                      `}
                      >
                        <Icon
                          size={20}
                          className={`transition-all duration-300 ${
                            isActive ? "text-white" : "text-[#4A674F]"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Step Label */}
                    <h3 className="text-base font-semibold mb-2 leading-tight">
                      {step.label}
                    </h3>

                    {/* Step Description */}
                    <p
                      className={`text-sm leading-relaxed ${
                        isActive ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-[#AE8F65] to-[#4A674F] hover:from-[#4A674F] hover:to-[#AE8F65] text-white px-8 py-4 text-base font-semibold min-h-[52px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              console.log("Start Your Corporate Order clicked");
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Corporate Order
              <ChevronRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
