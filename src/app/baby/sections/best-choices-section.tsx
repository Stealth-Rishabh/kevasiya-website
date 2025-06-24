"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

export function BestChoicesSection() {
  const choices = [
    {
      title: "Gifts for Baby Boys",
      description:
        "Delight him with our curated gift hampers, toy-filled showcases, and custom options present.",
      image: "/images/baby/boy/boy (1).jpeg",
      badge: "For Boys",
      features: ["Boyish Hampers", "Toy-filled Showcases", "Custom Hampers"],
    },
    {
      title: "Gifts for Baby Girls",
      description:
        "Find charming hampers, beautiful showcases, and personalized gifts to celebrate her.",
      image: "/images/baby/girl/girl (1).jpeg",
      badge: "For Girls",
      features: ["Girly Hampers", "Elegant Showcases", "Custom Hampers"],
    },
    {
      title: "Circus Themed Gifts",
      description:
        "Bring on the fun with playful circus hampers, toyish showcases, and custom-themed gifts.",
      image: "/images/baby/circus/circus (1).jpeg",
      badge: "Circus Fun",
      features: ["Themed Hampers", "Toyish Showcases", "Custom Circus Gifts"],
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-[#fdfcfa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3A5A40] mb-6">
            Gifts for Every Little One
          </h2>
          <p className="text-xl text-[#AE8F65] max-w-3xl mx-auto leading-relaxed">
            Explore our delightful collection of gifts for boys, girls, and fun
            circus-themed presents. Perfect for any occasion and sure to bring a
            smile.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {choices.map((item, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm py-0"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#3A5A40] text-white">
                    {item.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-bold text-[#3A5A40] mb-3">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-[#AE8F65] mb-4 text-base">
                  {item.description}
                </CardDescription>
                <ul className="space-y-2 mb-6">
                  {item.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-[#AE8F65]"
                    >
                      <Star className="w-4 h-4 mr-2 text-[#5c7360]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-[#AE8F65] hover:bg-[#967a58] text-white rounded-full">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Book Your Gift
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
