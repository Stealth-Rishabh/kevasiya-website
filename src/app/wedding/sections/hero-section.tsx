"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Gift, Gem } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative h-max sm:h-max flex items-center justify-center overflow-hidden pt-20 pb-10 sm:py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/wedding/banner (2).jpg"
          alt="Beautiful nursery background"
          fill
          className="object-cover object-bottom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b3f2f]/60 via-[#334d38]/40 to-[#3A5A40]/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-[#dcc8a8]/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-[#a3b2a5]/20 rounded-full blur-lg animate-pulse delay-500"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-10">
        <div className="space-y-4">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge className="bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 text-base sm:text-lg px-4 sm:px-8 py-2 sm:py-3 rounded-full shadow-2xl ">
              <Heart className="w-5 h-5 mr-3 text-pink-300" />A new chapter
              begins
            </Badge>
          </div>

          {/* Main Heading */}
          <div className="space-y-5">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
              Celebrating
              <span className="block bg-gradient-to-r from-[#f2ebe0] to-[#dcc8a8] bg-clip-text text-transparent">
                True Love
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-light text-[#f9f6f0]">
                Two Hearts, One Journey
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#f9f6f0]/90 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
              Join us in celebrating a union of love and the beginning of a
              beautiful journey. Find the perfect gift to start their new life
              together, filled with joy and cherished moments.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#products">
            <Button
              size="lg"
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-10 py-6 text-lg rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            >
              <Gem className="w-6 h-6 mr-3" />
              Explore Wedding Gifts
            </Button>
            </a>
            <a href="#book">
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white/50 text-white hover:bg-white hover:text-[#3A5A40] px-10 py-6 text-lg rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
            >
              <Gift className="w-6 h-6 mr-3" />
              Book Your Gift 
            </Button>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 ml-[1px] animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
