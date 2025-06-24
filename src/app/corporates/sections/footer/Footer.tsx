"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiSend,
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiGift,
  FiClock,
  FiShield,
} from "react-icons/fi";
import { BiBuilding, BiLeaf } from "react-icons/bi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Corporate contact:", email);
    setEmail("");
  };

  const corporateServices = [
    {
      icon: FiGift,
      title: "Bulk Gifting",
      desc: "Custom solutions for employee appreciation",
    },
    {
      icon: FiUsers,
      title: "Team Building",
      desc: "Curated experiences for corporate teams",
    },
    {
      icon: FiTrendingUp,
      title: "Scalable Solutions",
      desc: "Growing with your business needs",
    },
    {
      icon: FiClock,
      title: "Express Delivery",
      desc: "Priority handling for urgent orders",
    },
  ];

  const socialLinks = [
    {
      icon: FiLinkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: FiTwitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: FiInstagram,
      href: "https://www.instagram.com/kevasiya.in/",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
  ];

  const quickLinks = [
    { name: "Corporate Solutions", href: "/corporate-solutions" },
    { name: "Bulk Orders", href: "/bulk-orders" },
    { name: "Custom Packaging", href: "/custom-packaging" },
    { name: "B2B Pricing", href: "/b2b-pricing" },
    { name: "Partnership Program", href: "/partnership" },
    { name: "Enterprise Support", href: "/enterprise-support" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#1a2e1c] via-[#2d4230] to-[#3a5a40]">
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            className="absolute top-10 left-10 w-64 h-64 text-kevasiya-gold/5"
            viewBox="0 0 100 100"
          >
            <defs>
              <pattern
                id="hexagon"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="10,1 19,6 19,14 10,19 1,14 1,6"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagon)" />
          </svg>
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-kevasiya-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-kevasiya-gold/5 rounded-full blur-2xl"></div>
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10"
      >
        {/* Corporate Partnership Section */}
        <motion.div
          variants={itemVariants}
          className="border-b border-white/10 py-20"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <BiBuilding className="w-16 h-16 text-kevasiya-gold mx-auto mb-6" />
                <h3 className="text-5xl md:text-6xl font-serif text-white mb-6">
                  Corporate{" "}
                  <span className="text-kevasiya-gold">Excellence</span>
                </h3>
                <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Elevate your corporate relationships with our premium business
                  solutions. From executive gifts to employee recognition
                  programs, we craft experiences that matter.
                </p>
              </motion.div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {corporateServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-kevasiya-gold/30 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-kevasiya-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-kevasiya-gold/30 transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-kevasiya-gold" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {service.title}
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="max-w-2xl mx-auto text-center"
            >
              <h4 className="text-2xl font-semibold text-white mb-6">
                Ready to Partner with Us?
              </h4>
              <form
                onSubmit={handleContactSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="relative flex-1">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate email"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-kevasiya-gold focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="px-8 py-4 bg-kevasiya-gold text-white font-semibold rounded-lg hover:bg-kevasiya-gold/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiSend className="w-5 h-5" />
                  Get Started
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div variants={itemVariants} className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Brand Section */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <div className="mb-8">
                  <h2 className="text-4xl font-serif text-white mb-2">
                    KEVASIYA
                  </h2>
                  <div className="w-full h-0.5 bg-kevasiya-gold mb-4"></div>
                  <p className="text-lg text-kevasiya-gold font-medium">
                    Corporate Solutions
                  </p>
                </div>

                <p className="text-white/80 mb-8 leading-relaxed">
                  Your trusted partner in corporate excellence. We deliver
                  premium solutions that strengthen business relationships and
                  create lasting impressions.
                </p>

                {/* Corporate Contact */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-white/80 hover:text-kevasiya-gold transition-colors duration-300">
                    <FiMapPin className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Corporate Office: Tower A, Business District, Mumbai
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80 hover:text-kevasiya-gold transition-colors duration-300">
                    <FiPhone className="w-5 h-5 flex-shrink-0" />
                    <span>+91 9876543210 (Corporate Sales)</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80 hover:text-kevasiya-gold transition-colors duration-300">
                    <FiMail className="w-5 h-5 flex-shrink-0" />
                    <span>corporate@kevasiya.com</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className={`p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white/80 ${social.color} transition-all duration-300 hover:bg-white/20`}
                      whileHover={{ y: -3, scale: 1.1 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Corporate Services */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <h4 className="text-xl font-semibold text-white mb-6 relative">
                  Corporate Services
                  <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-kevasiya-gold"></div>
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-white/80 hover:text-kevasiya-gold transition-all duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-kevasiya-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Why Choose Us */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <h4 className="text-xl font-semibold text-white mb-6 relative">
                  Why Choose Kevasiya
                  <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-kevasiya-gold"></div>
                </h4>
                <ul className="space-y-4">
                  {[
                    { icon: FiAward, text: "Industry Leading Quality" },
                    { icon: FiShield, text: "Trusted by 500+ Companies" },
                    { icon: BiLeaf, text: "Sustainable Practices" },
                    { icon: FiClock, text: "24/7 Corporate Support" },
                  ].map((item) => (
                    <li
                      key={item.text}
                      className="flex items-center gap-3 text-white/80"
                    >
                      <item.icon className="w-5 h-5 text-kevasiya-gold flex-shrink-0" />
                      <span className="text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <h4 className="text-xl font-semibold text-white mb-6 relative">
                  Get In Touch
                  <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-kevasiya-gold"></div>
                </h4>
                <div className="space-y-6">
                  <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                    <p className="text-kevasiya-gold font-semibold mb-2">
                      Business Hours
                    </p>
                    <p className="text-white/80 text-sm">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-white/80 text-sm">
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                    <p className="text-kevasiya-gold font-semibold mb-2">
                      Dedicated Account Manager
                    </p>
                    <p className="text-white/80 text-sm">
                      Personalized service for enterprise clients
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="border-t border-white/10 py-8"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.div
                className="flex items-center gap-2 text-white/60"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2 }}
              >
                <p className="text-sm">
                  © {new Date().getFullYear()} Kevasiya Corporate Solutions. All
                  rights reserved.
                </p>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 text-white/60 text-sm"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.4 }}
              >
                <span>Trusted by Fortune 500 Companies</span>
                <div className="w-px h-4 bg-white/20"></div>
                <span>Enterprise Grade Solutions</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
