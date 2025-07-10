"use client";

import type React from "react";

import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaShoppingBag } from "react-icons/fa";
import Lenis from "lenis";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Occasion {
  id: string;
  name: string;
  href: string;
  // icon?: React.ElementType;
  description?: string;
  image: string;
  iconImage: string;
}

const occasionsData: Occasion[] = [
  {
    id: "birthdays",
    name: "BIRTHDAYS",
    href: "/collections/baby-hampers/birthday",
    // icon: FaBirthdayCake,
    iconImage: "/images/home/occasions/cake.png",
    description:
      "Find the perfect gift to celebrate another year of joy and memories",
    image: "/images/baby/boy/boy (2).jpeg",
  },
  {
    id: "anniversary",
    name: "ANNIVERSARY",
    href: "/collections",
    // icon: FaHeart,
    iconImage: "/images/home/occasions/heart.png",
    description:
      "Mark your special milestone with a thoughtful and meaningful present",
    image: "/images/categories/categories (2).webp",
  },
  {
    id: "house-warming",
    name: "HOUSE WARMING",
    href: "/collections",
    // icon: FaHome,
    iconImage: "/images/home/occasions/home.png",
    description:
      "Welcome them to their new home with a lovely and practical gift",
    image: "/images/categories/categories (3).webp",
  },
  {
    id: "baby-shower",
    name: "BABY CELEBRATION",
    href: "/collections/baby-hampers",
    // icon: FaBaby,
    iconImage: "/images/home/occasions/baby.png",
    description:
      "Celebrate the new arrival with adorable and cherished presents",
    image: "/images/baby/girl/girl (17).jpeg",
  },
  {
    id: "special-gifts",
    name: "FESTIVAL",
    href: "/collections",
    // icon: FaGift,
    iconImage: "/images/home/occasions/festival.png",
    description:
      "Unique presents for those extraordinary and unforgettable moments",
    image: "/images/categories/categories (5).webp",
  },
];

const colors = {
  primary: "#AE8F65", // Warm beige/gold
  secondary: "#4A674F", // Muted green
  background: "#FEFEFE", // Pure white
  backgroundSecondary: "#F8F9FA", // Off white
  textPrimary: "#2D2D2D", // Dark gray for readability
  textSecondary: "#5A5A5A", // Medium gray
  textOnColor: "#FFFFFF", // White for colored backgrounds
};

const OccasionCard = ({
  occasion,
  index,
  scrollYProgress,
  total,
}: {
  occasion: Occasion;
  index: number;
  scrollYProgress: MotionValue<number>;
  total: number;
}) => {
  // const IconComponent = occasion.icon;

  const start = index / total;
  const end = (index + 1) / total;
  const itemProgress = useTransform(scrollYProgress, [start, end], [0, 0.3]);
  const titleX = useTransform(itemProgress, [0, 0.7], ["100%", "-350%"]);
  const iconScale = useTransform(itemProgress, [0, 1], [0.6, 1.1]);
  const descriptionOpacity = useTransform(itemProgress, [1, 1, 1], [0, 1, 1]);
  // const descriptionX = useTransform(itemProgress, [0, 1], ["100%", "0%"])
  const cardScale = useTransform(itemProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.li
      style={{
        scale: cardScale,
      }}
      className="h-screen w-screen flex flex-col justify-center items-center overflow-hidden relative"
    >
      <Image
        src={occasion.image}
        alt={occasion.name}
        fill
        className="absolute inset-0 z-0 object-cover filter blur-sm"
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 z-1 bg-black/30" />

      <div className="group text-center p-4 relative z-10 w-[120vw] flex flex-col items-center">
        <motion.div
          style={{ scale: iconScale }}
          className="mb-6 md:mb-8 transition-transform duration-300 group-hover:scale-110"
        >
          {/* {IconComponent && (
            <IconComponent
              className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto"
              style={{ color: colors.textOnColor, x: titleX }}
            />
          )} */}
          <motion.div
            style={{ x: titleX }}
            animate={{
              y: ["-3%", "3%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Image
              src={occasion.iconImage}
              alt={`${occasion.name} icon`}
              width={128}
              height={128}
              className="w-48 h-48 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto"
            />
          </motion.div>
        </motion.div>

        <div className="relative overflow- mb-4 md:mb-6 font-sans">
          <motion.h3
            style={{
              x: titleX,
              color: colors.textOnColor,
            }}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-[160px] h-max font-extrabold drop-shadow-lg"
          >
            {occasion.name}
          </motion.h3>
        </div>

        <motion.p
          style={{
            opacity: descriptionOpacity,
            color: colors.textOnColor,
            // x: descriptionX,
          }}
          className="text-base md:text-lg lg:text-2xl max-w-sm md:max-w-md mx-auto leading-relaxed drop-shadow-md mb-8"
        >
          {occasion.description}
        </motion.p>
        <motion.div
          style={{
            opacity: descriptionOpacity,
          }}
        >
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-white text-white group/button hover:bg-white hover:text-slate-900 transition-all duration-300 ease-in-out transform hover:scale-105  mt-5 animate-bounce rounded-[2px] border-2 text-2xl px-8 py-6"
            asChild
          >
            <Link href={occasion.href}>
              Shop Now
              <FaShoppingBag className="ml-2 h-5 w-5 mt-0.5 transition-transform duration-300 group-hover/button:translate-x-1 group-hover/" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.li>
  );
};

const MobileOccasionCard = ({ occasion }: { occasion: Occasion }) => {
  // const IconComponent = occasion.icon;
  return (
    <div className="relative h-[60vh] w-full overflow-hidden flex flex-col justify-center items-center text-center p-4 my-4 rounded-lg">
      <Image
        src={occasion.image}
        alt={occasion.name}
        fill
        className="absolute inset-0 z-0 object-cover filter blur-sm"
      />
      <div className="absolute inset-0 z-1 bg-black/30" />
      <div className="relative z-10 flex flex-col items-center text-white">
        {/* {IconComponent && <IconComponent className="w-16 h-16 mb-4" />} */}
        <motion.div
          animate={{ y: ["-3%", "3%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <Image
            src={occasion.iconImage}
            alt={`${occasion.name} icon`}
            width={192}
            height={192}
            className="w-48 h-48 mb-4"
          />
        </motion.div>
        <h3 className="text-3xl font-extrabold mb-2">{occasion.name}</h3>
        <p className="max-w-xs text-lg mb-6">{occasion.description}</p>
        <Button
          variant="outline"
          size="lg"
          className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
          asChild
        >
          <Link href={occasion.href}>
            Shop Now <FaArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

const SpecialOccasions: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // Tailwind's 'md' breakpoint
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // This progress tracker starts when the top of the container hits the top of the viewport.
  // It will control the horizontal scrolling of the whole set of cards.
  const { scrollYProgress: containerXScrollProgress } = useScroll({
    target: isDesktop ? scrollContainerRef : undefined,
    offset: ["start start", "end end"],
  });

  // This progress tracker starts when the top of the container hits the center of the viewport.
  // It will be passed to each card to control its internal text animation.
  const { scrollYProgress: cardAnimationProgress } = useScroll({
    target: isDesktop ? scrollContainerRef : undefined,
    offset: ["start center", "end center"],
  });

  useEffect(() => {
    if (!isDesktop) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isDesktop]);

  // Use the containerXScrollProgress for the horizontal movement of the <ul>
  const x = useTransform(
    containerXScrollProgress,
    [0, 1],
    ["0vw", `-${100 * (occasionsData.length - 1)}vw`]
  );

  return (
    <section
      className="py-12 md:py-16 lg:py-24"
      style={{ backgroundColor: colors.background }}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif mb-4 md:mb-6"
            style={{ color: colors.secondary }}
          >
            Special Occasions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg lg:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: colors.textSecondary }}
          >
            Making every celebration memorable with the perfect gift for your
            loved ones.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mt-6 md:mt-8"
          >
            <div
              className="h-1 w-24 md:w-32 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${colors.primary} 50%, transparent 100%)`,
              }}
            />
          </motion.div>
        </div>
      </div>

      {isDesktop ? (
        <div
          ref={scrollContainerRef}
          className="relative"
          style={{ height: `${occasionsData.length * 100}vh` }}
        >
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <motion.ul style={{ x }} className="flex">
              {occasionsData.map((occasion, index) => (
                <OccasionCard
                  key={occasion.id}
                  occasion={occasion}
                  index={index}
                  // Pass the cardAnimationProgress to the card
                  scrollYProgress={cardAnimationProgress}
                  total={occasionsData.length}
                />
              ))}
            </motion.ul>
          </div>
        </div>
      ) : (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul>
            {occasionsData.map((occasion) => (
              <li key={occasion.id}>
                <MobileOccasionCard occasion={occasion} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default SpecialOccasions;
