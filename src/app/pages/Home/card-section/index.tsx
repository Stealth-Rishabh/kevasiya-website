"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const cardVariants = {
  hidden: (custom: number) => {
    switch (custom) {
      case 0:
        return { opacity: 0, x: -100, y: -100 };
      case 1:
        return { opacity: 0, x: 100, y: -100 };
      case 2:
        return { opacity: 0, scale: 0.95 };
      case 3:
        return { opacity: 0, x: -100, y: 100 };
      case 4:
        return { opacity: 0, x: 100, y: 100 };
      default:
        return { opacity: 0 };
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 50,
      mass: 1,
      duration: 0.8,
      delay: 0.1,
    },
  },
};

function AnimatedCard({
  custom,
  image,
  title,
  description,
  className,
}: {
  custom: number;
  image: string;
  title: string;
  description: string;
  className?: string;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      custom={custom}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      className={`relative group overflow-hidden rounded-xl shadow-lg ${className}`}
    >
      <Image
        src={image}
        alt={title}
        width={500}
        height={500}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-semibold font-serif">{title}</h3>
        <p className="text-gray-200 mt-1">{description}</p>
      </div>
    </motion.div>
  );
}

function MobileCard({
  image,
  title,
  description,
  className,
}: {
  image: string;
  title: string;
  description: string;
  className?: string;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative group overflow-hidden rounded-xl shadow-lg flex-shrink-0 ${className}`}
    >
      <Image
        src={image}
        alt={title}
        width={400}
        height={500}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-xl font-semibold font-serif">{title}</h3>
        <p className="text-gray-200 mt-1 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

const cardData = [
  {
    custom: 0,
    image: "/images/baby/boy/boy (6).jpeg",
    title: "Baby Hampers",
    description: "A beautiful way to announce the arrival of your baby",
    className: "md:col-span-1 ",
    path: "/baby",
  },
  {
    custom: 1,
    image: "/cardImages/cardOne.webp",
    title: "Corporate Gifting",
    description: "A beautiful way to gift your loved ones",
    className: "md:col-span-1 sm:mt-16",
    path: "/corporates",
  },
  {
    custom: 2,
    image: "/images/wedding/products/wedding (1).webp",
    title: "Wedding Gifts",
    description: "A beautiful way to invite your loved ones",
    className: "md:col-span-1",
    path: "/wedding",
  },
  {
    custom: 4,
    image: "/cardImages/cardTwo.webp",
    title: "Festive Occasions",
    description: "A beautiful way to gift your loved ones",
    className: "md:col-span-1 sm:mt-16",
    path: "/festival",
  },
];

// Animation for floating effect - alternating up and down
const getFloatingAnimation = (index: number) => {
  // Alternate between up and down movement
  const direction = index % 2 === 0 ? 1 : -1;

  return {
    y: [0, 15 * direction, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };
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

export default function CardSection() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [maxScrollWidth, setMaxScrollWidth] = useState(0);

  useEffect(() => {
    const calculateWidth = () => {
      if (cardsContainerRef.current) {
        const scrollWidth = cardsContainerRef.current.scrollWidth;
        const parentWidth =
          cardsContainerRef.current.parentElement!.clientWidth;
        setMaxScrollWidth(scrollWidth - parentWidth);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScrollWidth]);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="hidden md:block text-center mb-12">
        <motion.div className="text-center mb-5 md:mb-5">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#3a5a40] mb-4">
            Specially Curated
          </h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-[#5a6d5c] max-w-2xl mx-auto"
          >
            Choose from our carefully curated collection of gifts
          </motion.p>
        </motion.div>

        {/* Animated Divider */}
        <motion.div className="flex justify-center ">
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#AE8F65] to-transparent rounded-full"></div>
        </motion.div>
      </div>

      {/* Desktop Grid - Fixed height and smaller gap */}
      <div className="hidden md:grid grid-cols-4 gap-4 mt-16">
        {cardData.map((card, index) => (
          <Link
            href={card.path}
            key={index}
            className={`cursor-pointer ${card.className}`}
          >
            <motion.div
              animate={getFloatingAnimation(index)}
              style={{ display: "block" }}
            >
              <AnimatedCard {...card} className=" h-[450px]" />
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div ref={scrollTrackRef} className="md:hidden mt-8 relative h-[300vh]">
        <div className="sticky top-20 w-full">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold font-serif text-[#3a5a40] mb-4">
              Specially Curated
            </h2>
            <p className="text-lg text-[#5a6d5c] max-w-2xl mx-auto">
              Choose from our carefully curated collection of gifts
            </p>
            <div className="flex justify-center mt-4">
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#AE8F65] to-transparent rounded-full"></div>
            </div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              ref={cardsContainerRef}
              style={{ x }}
              className="flex gap-4"
            >
              {cardData.map((card, index) => (
                <Link key={index} href={card.path} className="block">
                  <MobileCard
                    image={card.image}
                    title={card.title}
                    description={card.description}
                    className="w-[280px] h-[400px]"
                  />
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
