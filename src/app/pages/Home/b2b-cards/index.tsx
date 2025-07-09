"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { TrendingUp, Users, Clock, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Link from "next/link";

interface TrendingProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: {
    text: string;
    type: "hot" | "top-seller" | "bulk-favorite";
  };
  stats: {
    orders: string;
    rating: number;
    timeframe: string;
  };
  price: string;
  companyExample?: string;
  stockLevel?: number;
  imageBrightness: "light" | "dark";
  primaryColor: string;
}

const trendingProducts: TrendingProduct[] = [
  {
    id: "1",
    title: "Executive Wellness Kit",
    description: "Premium self-care essentials for corporate leaders",
    image: "/images/baby/boy/boy (6).jpeg",
    badge: { text: "Hot", type: "hot" },
    stats: { orders: "1.2k", rating: 4.8, timeframe: "this month" },
    price: "Price on Request",
    companyExample: "Tech Corp",
    stockLevel: 8,
    imageBrightness: "light",
    primaryColor: "#4A674F",
  },
  {
    id: "2",
    title: "Artisan Coffee Collection",
    description: "Curated selection of premium coffee blends",
    image: "/cardImages/cardOne.webp",
    badge: { text: "Top Seller", type: "top-seller" },
    stats: { orders: "2.1k", rating: 4.9, timeframe: "this month" },
    price: "Price on Request",
    companyExample: "StartupXYZ",
    imageBrightness: "dark",
    primaryColor: "#AE8F65",
  },
  {
    id: "3",
    title: "Festive Gourmet Hamper",
    description: "Seasonal delicacies perfect for corporate gifting",
    image: "/images/wedding/products/wedding (1).webp",
    badge: { text: "Bulk Favorite", type: "bulk-favorite" },
    stats: { orders: "850", rating: 4.7, timeframe: "this week" },
    price: "Price on Request",
    companyExample: "Global Inc",
    stockLevel: 15,
    imageBrightness: "light",
    primaryColor: "#4A674F",
  },
  {
    id: "4",
    title: "Tech Accessories Bundle",
    description: "Modern workspace essentials for remote teams",
    image: "/cardImages/cardTwo.webp",
    badge: { text: "Hot", type: "hot" },
    stats: { orders: "950", rating: 4.6, timeframe: "this month" },
    price: "Price on Request",
    companyExample: "Innovation Labs",
    imageBrightness: "dark",
    primaryColor: "#AE8F65",
  },
  {
    id: "5",
    title: "Luxury Desk Set",
    description: "Elegant office accessories for executive gifts",
    image: "/images/baby/boy/boy (6).jpeg",
    badge: { text: "Top Seller", type: "top-seller" },
    stats: { orders: "1.5k", rating: 4.8, timeframe: "this month" },
    price: "Price on Request",
    companyExample: "Enterprise Co",
    imageBrightness: "light",
    primaryColor: "#4A674F",
  },
];

export default function TrendingCarousel() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!api || !isAutoPlaying) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api, isAutoPlaying]);

  // Track carousel state
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Handle dot click
  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const getBadgeColor = (type: string) => {
    const baseClasses = "backdrop-blur-sm border border-white/20";
    switch (type) {
      case "hot":
        return `${baseClasses} bg-[#AE8F65]/90 text-white animate-pulse shadow-lg`;
      case "top-seller":
        return `${baseClasses} bg-[#4A674F]/90 text-white shadow-lg`;
      case "bulk-favorite":
        return `${baseClasses} bg-[#4A674F]/90 text-white shadow-lg`;
      default:
        return `${baseClasses} bg-gray-500/90 text-white shadow-lg`;
    }
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case "hot":
        return <TrendingUp className="w-3 h-3" />;
      case "top-seller":
        return <Star className="w-3 h-3" />;
      case "bulk-favorite":
        return <Users className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getTextColor = (brightness: "light" | "dark") => {
    return brightness === "light" ? "text-gray-900" : "text-white";
  };

  const getOverlayColor = (brightness: "light" | "dark") => {
    return brightness === "light" ? "bg-white/80" : "bg-black/60";
  };

  const getStatsOverlayColor = (brightness: "light" | "dark") => {
    return brightness === "light"
      ? "bg-black/70 text-white"
      : "bg-white/90 text-gray-900";
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
    <section className="py-12 px-4 bg-gradient-to-br from-[#F9F6F0] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div className="text-center mb-5 md:mb-5">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold font-serif text-[#3a5a40] mb-4"
          >
            Trending in B2B Gifting
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-[#5a6d5c] max-w-2xl mx-auto"
          >
            Discover what corporate leaders are choosing. Data-driven selections
            that deliver impact.
          </motion.p>
        </motion.div>

        {/* Animated Divider */}
        <motion.div className="flex justify-center mb-8 sm:mb-16">
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#AE8F65] to-transparent rounded-full"></div>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full   justify-center items-center"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {trendingProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card
                    className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden h-[500px] sm:h-[400px] py-0 ${
                      hoveredCard === product.id
                        ? "ring-2 ring-white shadow-2xl"
                        : ""
                    }`}
                    onMouseEnter={() => setHoveredCard(product.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardContent className="p-0 py-0 h-full relative">
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110 h-full"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                      </div>

                      {/* Top Section - Badges and Stats */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                        <div className="flex flex-col gap-2">
                          <Badge
                            className={`${getBadgeColor(
                              product.badge.type
                            )} flex items-center gap-1 text-xs font-semibold`}
                          >
                            {getBadgeIcon(product.badge.type)}
                            {product.badge.text}
                          </Badge>

                          {product.stockLevel && product.stockLevel <= 10 && (
                            <Badge className="bg-red-500/90 text-white text-xs animate-bounce backdrop-blur-sm border border-white/20 shadow-lg">
                              <Clock className="w-3 h-3 mr-1" />
                              Only {product.stockLevel} left
                            </Badge>
                          )}
                        </div>

                        <Badge
                          className={`${getStatsOverlayColor(
                            product.imageBrightness
                          )} text-xs backdrop-blur-sm shadow-lg`}
                        >
                          {product.stats.orders} orders{" "}
                          {product.stats.timeframe}
                        </Badge>
                      </div>

                      {/* Bottom Section - Content with slide-up animation */}
                      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-">
                        {/* Always visible title section (desktop only) */}
                        <div
                          className={`main-title hidden md:block p-4 pb-2 transition-all duration-500 ease-out ${
                            hoveredCard === product.id
                              ? "transform -translate-y-[220px]"
                              : "transform -translate-y-2"
                          }`}
                        >
                          <div
                            className={`${getOverlayColor(
                              product.imageBrightness
                            )} backdrop-blur-md rounded-t-lg p-3 shadow-xl border border-white/20`}
                          >
                            <h3
                              className={`font-bold text-lg line-clamp-1 ${getTextColor(
                                product.imageBrightness
                              )}`}
                            >
                              {product.title}
                            </h3>
                            <div
                              className={`text-sm font-bold ${getTextColor(
                                product.imageBrightness
                              )} mt-1`}
                            >
                              {product.price}
                            </div>
                          </div>
                        </div>

                        {/* Expandable content section */}
                        <div
                          className={`transition-all duration-500 ease-out md:absolute md:bottom-0 md:left-0 md:right-0 ${
                            hoveredCard === product.id
                              ? "transform-none opacity-100"
                              : "md:transform md:translate-y-full md:opacity-0"
                          }`}
                        >
                          <div className="p-4 pt-0">
                            <div
                              className={`${getOverlayColor(
                                product.imageBrightness
                              )} backdrop-blur-md rounded-lg p-4 shadow-xl border border-white/20`}
                            >
                              {/* Mobile: Always show title */}
                              <div className="md:hidden mb-3">
                                <h3
                                  className={`font-bold text-lg mb-1 line-clamp-1 ${getTextColor(
                                    product.imageBrightness
                                  )}`}
                                >
                                  {product.title}
                                </h3>
                              </div>

                              <div className="mb-3">
                                <p
                                  className={`text-sm line-clamp-2 ${getTextColor(
                                    product.imageBrightness
                                  )} opacity-90`}
                                >
                                  {product.description}
                                </p>
                              </div>

                              {/* Social Proof */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-1">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < Math.floor(product.stats.rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : product.imageBrightness ===
                                              "light"
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span
                                    className={`text-sm ${getTextColor(
                                      product.imageBrightness
                                    )} opacity-90`}
                                  >
                                    {product.stats.rating}
                                  </span>
                                </div>
                                <div
                                  className={`text-xl font-bold ${getTextColor(
                                    product.imageBrightness
                                  )} md:hidden`}
                                >
                                  {product.price}
                                </div>
                              </div>

                              {/* Company Example */}
                              {product.companyExample && (
                                <div className="mb-4">
                                  <Badge
                                    variant="outline"
                                    className={`text-xs border backdrop-blur-sm ${
                                      product.imageBrightness === "light"
                                        ? "text-[#4A674F] border-[#4A674F]/50 bg-[#4A674F]/10"
                                        : "text-[#AE8F65] border-[#AE8F65]/80 bg-[#AE8F65]/20"
                                    }`}
                                  >
                                    Trending with {product.companyExample}
                                  </Badge>
                                </div>
                              )}

                              {/* CTA Button */}
                              <div className="transition-all duration-300">
                                <Button
                                  className="w-full font-semibold shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
                                  size="sm"
                                  style={{
                                    backgroundColor: product.primaryColor,
                                    color: "white",
                                  }}
                                >
                                  Customize & Order
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <CarouselPrevious className="hidden md:flex -left-12 bg-white/90 backdrop-blur-sm shadow-xl border-2 hover:bg-white transition-all duration-300" />
            <CarouselNext className="hidden md:flex -right-12 bg-white/90 backdrop-blur-sm shadow-xl border-2 hover:bg-white transition-all duration-300" />
          </Carousel>

          {/* Animated Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === current
                    ? "w-8 h-3 bg-[#4A674F]"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-8">
          <Link href="/collections">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#4A674F] text-[#4A674F] hover:bg-[#4A674F] hover:text-white bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-105"
            >
              Explore Premium Gifts <TrendingUp className="ml-1 mt-1 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
