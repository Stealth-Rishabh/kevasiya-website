"use client"; // Required for Framer Motion hooks

import dynamic from "next/dynamic";
import Hero from "./sections/hero/Hero";

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
    </section>
  );
}
