"use client";

import dynamic from "next/dynamic";
import Hero from "./hero";
import Image from "next/image";

const CardSection = dynamic(() => import("./card-section"));
const ClientsSlider = dynamic(() =>
  import("./clientslider").then((mod) => mod.ClientsSlider)
);
const SpecialOccasions = dynamic(() => import("./special-occasions"));
const WhyKevasiya = dynamic(() => import("./why-kevasiya"));
const TrendingCarousel = dynamic(() => import("./b2b-cards"));
const OurProcessStepper = dynamic(() => import("./how-we-work"));

const icons = [
  { src: "/images/home/logos/logo (1).png", alt: "logo 1" },
  { src: "/images/home/logos/logo (2).png", alt: "logo 2" },
  { src: "/images/home/logos/logo (3).png", alt: "logo 3" },
  { src: "/images/home/logos/logo (4).png", alt: "logo 4" },
  { src: "/images/home/logos/logo (5).png", alt: "logo 5" },
  { src: "/images/home/logos/logo (6).png", alt: "logo 6" },
  { src: "/images/home/logos/logo (7).png", alt: "logo 7" },
  { src: "/images/home/logos/logo (8).png", alt: "logo 8" },
  { src: "/images/home/logos/logo (9).png", alt: "logo 9" },
  { src: "/images/home/logos/logo (10).png", alt: "logo 10" },
];

export default function Home() {
  return (
    <div>
      <Hero />
      <CardSection />
      <TrendingCarousel />
      <ClientsSlider icons={icons} />
      <OurProcessStepper />
      <SpecialOccasions />
      <WhyKevasiya />

      {/* WhatsApp CTA Button */}
      <a
        href="https://wa.me/919310010810?text=Hello!%20I%27m%20interested%20in%20your%20services.%20Can%20you%20help%20me%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 animate-bounce"
        aria-label="Contact us on WhatsApp"
      >
        <Image
          src="/images/whatsappIcon.png"
          alt="WhatsApp"
          width={48}
          height={48}
          className="w-16 h-16"
        />
      </a>
    </div>
  );
}
