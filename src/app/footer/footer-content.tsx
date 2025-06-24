"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart,
  FiAward,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { AnimatedParticles } from "./animated-particles";

export function FooterContent() {
  const [isMounted, setIsMounted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const socialLinks = [
    {
      icon: FiInstagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      icon: FiFacebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: FiTwitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: FiYoutube,
      href: "#",
      label: "YouTube",
      color: "hover:text-red-500",
    },
  ];

  const trustBadges = [
    { icon: FiShield, text: "Secure Payment" },
    { icon: FiTruck, text: "Free Shipping" },
    { icon: FiAward, text: "Premium Quality" },
    { icon: BiLeaf, text: "Eco-Friendly" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#3a5a40] via-[#2d453e] to-[#1e2f1c]">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-kevasiya-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-kevasiya-gold/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-kevasiya-gold/5 rounded-full blur-3xl"></div>

        {/* Animated Particles */}
        {isMounted && <AnimatedParticles />}
      </div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10"
      >
        {/* Newsletter Section */}
        {/* <motion.div
          variants={itemVariants}
          className="border-b border-white/10 py-16"
        >
          <div className="container mx-auto px-4 max-w-8xl">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-8"
              >
                <h3 className="text-4xl md:text-5xl font-serif text-white mb-4">
                  Stay In <span className="text-kevasiya-gold">Touch</span>
                </h3>
                <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                  Be the first to discover our latest collections, exclusive
                  offers, and artisan stories
                </p>
              </motion.div>

              <motion.form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="relative flex-1">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-kevasiya-gold focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="px-8 py-4 bg-kevasiya-gold text-white font-semibold rounded-lg hover:bg-kevasiya-gold/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiSend className="w-5 h-5" />
                  Subscribe
                </motion.button>
              </motion.form>
            </div>
          </div>
        </motion.div> */}

        {/* Main Footer Content */}
        <motion.div variants={itemVariants} className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row lg:justify-around gap-12 text-white/80">
              {/* Brand Section */}
              <motion.div variants={itemVariants} className="max-w-xs">
                <Link href="/" className="inline-block mb-6 group">
                  <h2 className="text-4xl font-serif text-white group-hover:text-kevasiya-gold transition-colors duration-300">
                    KEVASIYA
                  </h2>
                  <div className="w-full h-0.5 bg-kevasiya-gold mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Link>

                <p className="mb-8 leading-relaxed">
                  Crafting excellence through tradition and innovation. Each
                  piece tells a story of artisanal mastery and timeless
                  elegance.
                </p>

                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 hover:text-kevasiya-gold transition-colors duration-300">
                    <FiMapPin className="w-5 h-5 flex-shrink-0" />
                    <span>52, North Ave, Punjabi Bagh, Delhi, 110026</span>
                  </div>
                  <div className="flex items-center gap-3 hover:text-kevasiya-gold transition-colors duration-300">
                    <FiPhone className="w-5 h-5 flex-shrink-0" />
                    <a href="tel:09310010810">093100 10810</a>
                  </div>
                  <div className="flex items-center gap-3 hover:text-kevasiya-gold transition-colors duration-300">
                    <FiMail className="w-5 h-5 flex-shrink-0" />
                    <a href="mailto:contact@kevasiya.com">
                      contact@kevasiya.com
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className={`p-3 bg-white/10 backdrop-blur-sm rounded-lg ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110`}
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Categories */}
              <motion.div variants={itemVariants}>
                <h4 className="text-xl font-semibold text-white mb-6 relative">
                  Categories
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-kevasiya-gold"></div>
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: "Baby", href: "/baby" },
                    { name: "Wedding", href: "/collections/wedding" },
                    { name: "Corporates", href: "/corporates" },
                    // { name: "Occasions", href: "/collections/occasions" },
                    // { name: "Festive", href: "/collections/festive" },
                    // { name: "Home Decor", href: "/collections/home-decor" },
                  ].map((category) => (
                    <li key={category.name}>
                      <Link
                        href={category.href}
                        className="hover:text-kevasiya-gold transition-all duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-kevasiya-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Collections */}
              <motion.div variants={itemVariants}>
                <h4 className="text-xl font-semibold text-white mb-6 relative">
                  Collections
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-kevasiya-gold"></div>
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: "All Gifts", href: "/collections/all" },
                    // {
                    //   name: "Bestsellers",
                    //   href: "/collections/bestsellers",
                    // },
                    // { name: "New Arrivals", href: "/collections/new-arrivals" },
                    // { name: "Gift Boxes", href: "/collections/gift-boxes" },
                    // { name: "Personalized", href: "/collections/personalized" },
                    // {
                    //   name: "Under ₹1000",
                    //   href: "/collections/under-1000",
                    // },
                  ].map((collection) => (
                    <li key={collection.name}>
                      <Link
                        href={collection.href}
                        className="hover:text-kevasiya-gold transition-all duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-kevasiya-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {collection.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={itemVariants}>
                <h4 className="text-xl font-semibold text-white mb-6 relative">
                  Quick Links
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-kevasiya-gold"></div>
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: "About Us", href: "/about" },
                    { name: "Our Story", href: "/story" },
                    { name: "Blog", href: "/blog" },
                    { name: "Contact Us", href: "/contact" },
                    { name: "FAQs", href: "/faq" },
                    { name: "Privacy Policy", href: "/privacy-policy" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="hover:text-kevasiya-gold transition-all duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 bg-kevasiya-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Trust Badges */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <div className="grid grid-cols-2 gap-3">
                  {trustBadges.map((badge, index) => (
                    <motion.div
                      key={badge.text}
                      className="flex flex-col items-center p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-kevasiya-gold/50 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <badge.icon className="w-6 h-6 text-kevasiya-gold mb-2" />
                      <span className="text-xs text-center">{badge.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="bg-black/20 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-6 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center text-white/60">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.2 }}
              >
                <span>
                  © {new Date().getFullYear()} Kevasiya. All rights reserved.
                </span>
                <FiHeart className="w-4 h-4 text-kevasiya-gold animate-pulse" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
