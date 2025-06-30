"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { name: "Categories", href: "/collections" },
    { name: "Baby", href: "/baby" },
    // { name: "Baby", href: "/collections/baby" },
    // { name: "Wedding", href: "/collections/wedding" },
    { name: "Wedding", href: "/wedding" },
    // { name: "Occasions", href: "/collections/occasions" },
    { name: "Corporates", href: "/corporates" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const menuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, ease: "easeOut" },
    }),
  };

  return (
    <>
      <div className="absolute top-0 inset-x-0 z-50 ">
        {/* Premium Top Bar */}
        <div className="bg-gray-600 text-white text-center py-2 text-xs font-light tracking-wider">
          <p>Free Shipping in Delhi NCR • Limited Time Offer</p>
        </div>
        {/* Elegant Navbar */}
        <header className="relative h-16 mx-auto">
          <nav className="max-w-screen-xl mx-auto px-4 flex items-center justify-between w-full h-full text-gray-200">
            {/* Left Section */}
            <div className="flex items-center gap-6">
              <div className="lg:hidden">
                <button
                  aria-label="Open menu"
                  className="text-gray-200 hover:text-[#AE8F65] transition-colors duration-300"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
              </div>

              {/* Logo Link */}
              <Link
                href="/"
                className="flex items-center"
                data-testid="nav-store-link"
              >
                <Image
                  src="/logo_white.png"
                  alt="Kevasiya"
                  width={200}
                  height={200}
                />
              </Link>
            </div>

            {/* Right Section (Desktop) */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative font-medium text-gray-200 font-serif hover:text-[#AE8F65] transition-colors duration-300 group"
                >
                  <span>
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-700 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        </header>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="fixed inset-0 bg-gray-900 bg-opacity-95 backdrop-blur-sm z-[100] p-8"
          >
            <div className="flex justify-end mb-8">
              <button
                aria-label="Close menu"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center justify-center h-full -mt-16">
              <nav>
                <ul className="flex flex-col items-center gap-8">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-3xl font-serif text-gray-300 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
