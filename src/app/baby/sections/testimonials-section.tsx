"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah & Michael",
      role: "New Parents",
      content:
        "The organic essentials were absolutely perfect for our little Emma. The quality exceeded our expectations, and knowing everything was safe and natural gave us such peace of mind during those precious first months.",
      rating: 5,
      image: "/images/parent1.png",
    },
    {
      name: "Jennifer Chen",
      role: "Mom of Two",
      content:
        "I wish I had discovered these products with my first baby! The smart nursery solutions made nighttime so much easier. The sleep monitoring gave me confidence and better rest knowing my baby was safe.",
      rating: 5,
      image: "/images/parent2.png",
    },
    {
      name: "David & Lisa",
      role: "Expecting Parents",
      content:
        "As first-time parents, we were overwhelmed by choices. This curated selection took the guesswork out of preparing for our baby. Every item has been thoughtfully chosen and beautifully made.",
      rating: 5,
      image: "/images/parent3.png",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#fdfcfa] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3A5A40] mb-6">
            Stories from Fellow Parents&apos; Hearts
          </h2>
          <p className="text-xl text-[#AE8F65] max-w-3xl mx-auto leading-relaxed">
            The most beautiful moments are shared. Here are the experiences and
            wisdom from parents who&apos;ve walked this incredible journey
            before us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 py-0"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[#AE8F65] mb-6 leading-relaxed italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-[#3A5A40]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[#b8956a]">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
