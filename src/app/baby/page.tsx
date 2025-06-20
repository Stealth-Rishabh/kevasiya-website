"use client";

import { HeroSection } from "./sections/hero-section";
import { BestChoicesSection } from "./sections/best-choices-section";
import { ProductListSection } from "./sections/product-list-section";
import { TestimonialsSection } from "./sections/testimonials-section";
import { CTASection } from "./sections/cta-section";

export default function BabyAnnouncementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      <HeroSection />
      <BestChoicesSection />
      <ProductListSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
