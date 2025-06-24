"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Jessica & Tom",
      role: "Newlyweds",
      content:
        "The gift registry was a lifesaver! It made it so easy for our friends and family to get us something we truly loved. Starting our new life has been so much smoother thanks to the wonderful gifts we received.",
      rating: 5,
      image: "/images/parent1.png",
    },
    {
      name: "Emily Carter",
      role: "Maid of Honor",
      content:
        "I wanted to get the perfect, meaningful gift. The curated collections gave me so many beautiful ideas. I found a personalized gift that the couple will cherish forever. Highly recommend!",
      rating: 5,
      image: "/images/parent1.png",
    },
    {
      name: "David & Michael",
      role: "Happy Couple",
      content:
        "We were blown away by the generosity of our loved ones and the quality of the gifts. The whole process was seamless, from creating the registry to receiving the gifts. It added a special touch to our wedding experience.",
      rating: 5,
      image: "/images/parent3.png",
    },
  ];

  return (
    <section className="sm:py-20 py-10 px-4 bg-gradient-to-b from-[#fdfcfa] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3A5A40] mb-6">
            Words from Happy Couples & Guests
          </h2>
          <p className="text-xl text-[#AE8F65] max-w-3xl mx-auto leading-relaxed">
            Love stories are meant to be shared. Here&apos;s what others are
            saying about our curated wedding gift experience.
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
                  {`"${testimonial.content}"`}
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
