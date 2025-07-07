"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Anjali & Rohan",
      role: "Diwali Celebrators",
      content:
        "The Diwali hampers were a huge hit with our family and friends! The quality was amazing, and the presentation was beautiful. It made our celebrations extra special.",
      rating: 5,
      image: "/images/parent1.png",
    },
    {
      name: "Sameer Khan",
      role: "Eid Gifter",
      content:
        "I ordered Eid gifts for my family, and everyone loved them. The delivery was on time, and the products were even better than I expected. Will definitely shop here again!",
      rating: 5,
      image: "/images/parent1.png",
    },
    {
      name: "Priya Sharma",
      role: "Holi Enthusiast",
      content:
        "The Holi gift boxes were so much fun! The organic colors were safe for the kids, and the sweets were delicious. It was the perfect package for a joyful celebration.",
      rating: 5,
      image: "/images/parent3.png",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#fdfcfa] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3A5A40] mb-6">
            Stories from Our Happy Customers
          </h2>
          <p className="text-xl text-[#AE8F65] max-w-3xl mx-auto leading-relaxed">
            Read about the experiences of those who chose our gifts to make their festivals memorable.
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
                    className="w-12 h-12 object-cover rounded-full mr-4"
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
