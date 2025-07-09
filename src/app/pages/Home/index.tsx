"use client";

import dynamic from "next/dynamic";
import Hero from "./hero";

const CardSection = dynamic(() => import("./card-section"));
const ClientsSlider = dynamic(() =>
  import("./clientslider").then((mod) => mod.ClientsSlider)
);
const SpecialOccasions = dynamic(() => import("./special-occasions"));
const WhyKevasiya = dynamic(() => import("./why-kevasiya"));
const TrendingCarousel = dynamic(() => import("./b2b-cards"));

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
      <SpecialOccasions />
      <WhyKevasiya />
    </div>
  );
}
