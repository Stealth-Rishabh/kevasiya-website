"use client"; // Required for Framer Motion hooks

import dynamic from "next/dynamic";
import Hero from "./sections/hero/Hero";
import Image from "next/image";

const GiftCategories = dynamic(
  () => import("./sections/giftcategories/GiftCategories")
);
const GiftOcassion = dynamic(
  () => import("./sections/giftOcassion/GiftOcassion")
);
const SeasonalGift = dynamic(
  () => import("./sections/seasonalGift/SeasonalGift")
);
const Services = dynamic(() => import("./sections/servicesPage/Services"));
const Form = dynamic(() => import("./sections/form/Form"));
const FAQ = dynamic(() => import("./sections/faq/FAQ"));

export default function Home() {
  return (
    <section className="overflow-hidden">
      {/* <Header /> */}
      <Hero />
      <GiftCategories />
      <GiftOcassion />
      <SeasonalGift />
      <Services />
      {/* <WhyCorporate /> */}
      <Form />
      <FAQ />

      {/* WhatsApp CTA Button */}
      <a
        href="https://wa.me/919220229789?text=Hello!%20I%27m%20interested%20in%20your%20corporate%20gifting%20services.%20Can%20you%20help%20me%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 transition-all duration-300 hover:scale-110 animate-bounce"
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
    </section>
  );
}
