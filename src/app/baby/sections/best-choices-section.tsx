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
      title: "Premium Organic Essentials",
      description:
        "Soft, safe, and sustainable basics for baby's delicate skin",
      image: "/images/organic-essentials.png",
      badge: "Organic",
      features: ["100% Organic Cotton", "Hypoallergenic", "GOTS Certified"],
    },
    {
      title: "Smart Nursery Solutions",
      description: "Technology meets comfort in our modern nursery setup",
      image: "/images/smart-nursery.png",
      badge: "Smart Tech",
      features: ["Sleep Monitoring", "Temperature Control", "App Connected"],
    },
    {
      title: "Luxury Travel System",
      description: "Premium mobility solutions for adventures big and small",
      image: "/images/travel-system.png",
      badge: "Premium",
      features: ["5-Star Safety", "All-Terrain", "Grows with Baby"],
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-[#fdfcfa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3A5A40] mb-6">
            Carefully Curated for Our Little One
          </h2>
          <p className="text-xl text-[#AE8F65] max-w-3xl mx-auto leading-relaxed">
            Every parent&apos;s journey begins with choosing the very best.
            We&apos;ve handpicked these exceptional items that combine safety,
            comfort, and style for our precious bundle of joy.
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
                  Add to Registry
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
