"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaBirthdayCake,
  FaHeart,
  FaHome,
  FaBaby,
  FaGift,
} from "react-icons/fa";

interface Occasion {
  id: string;
  name: string;
  href: string;
  icon?: React.ElementType;
  description?: string;
  color?: string;
}

const occasionsData: Occasion[] = [
  {
    id: "birthdays",
    name: "Birthdays",
    href: "/occasions/birthdays",
    icon: FaBirthdayCake,
    description: "Find the perfect gift to celebrate another year",
    color: "bg-[#FFD6E0]",
  },
  {
    id: "anniversary",
    name: "Anniversary",
    href: "/occasions/anniversary",
    icon: FaHeart,
    description: "Mark your special milestone with a thoughtful present",
    color: "bg-[#FFE8D6]",
  },
  {
    id: "house-warming",
    name: "House Warming",
    href: "/occasions/house-warming",
    icon: FaHome,
    description: "Welcome them to their new home with a lovely gift",
    color: "bg-[#E2F0CB]",
  },
  {
    id: "baby-shower",
    name: "Baby Shower",
    href: "/occasions/baby-shower",
    icon: FaBaby,
    description: "Celebrate the new arrival with adorable presents",
    color: "bg-[#D0E3FF]",
  },
  {
    id: "special-gifts",
    name: "Special Gifts",
    href: "/occasions/special-gifts",
    icon: FaGift,
    description: "Unique presents for those extraordinary moments",
    color: "bg-[#F5D0FE]",
  },
];

const AnimatedCard = ({
  occasion,
  index,
}: {
  occasion: Occasion;
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "-50px 0px",
  });

  const variants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 60,
        delay: index * 0.2,
      },
    },
  };

  const IconComponent = occasion.icon;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="flex justify-center" // Ensures proper centering on mobile
    >
      <Link
        href={occasion.href}
        className="group rounded-2xl h-[220px] w-full  md:max-w-[250px] shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden transform hover:-translate-y-2 flex flex-col items-center justify-center md:p-6 text-center border border-gray-100 bg-white"
      >
        <div
          className={`${occasion.color} rounded-full p-4 mb-4 transition-all duration-300 group-hover:scale-110`}
        >
          {IconComponent && (
            <IconComponent className="w-8 h-8 text-[#3a5a40]" />
          )}
        </div>
        <h3 className="text-xl font-semibold font-serif text-[#3a5a40] group-hover:text-[#AE8F65] transition-colors duration-300 mb-2">
          {occasion.name}
        </h3>
        <p className="text-sm text-gray-600">{occasion.description}</p>
      </Link>
    </motion.div>
  );
};

const itemVariants: Variants = {
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
const SpecialOccasions: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Heading */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-5 md:mb-5"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#3a5a40] mb-4">
            Special Occasions
          </h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-[#5a6d5c] max-w-2xl mx-auto"
          >
            Making every celebration memorable with the perfect gift.
          </motion.p>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-12 md:mb-16"
        >
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#AE8F65] to-transparent rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:px-4 sm:px-0">
          {occasionsData.map((occasion, index) => (
            <AnimatedCard key={occasion.id} occasion={occasion} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOccasions;
