"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

export function ProductListSection() {
  const products = [
    {
      name: "Organic Cotton Onesies",
      price: "$24.99",
      image: "/images/onesies.png",
      rating: 5,
    },
    {
      name: "Bamboo Swaddle Blankets",
      price: "$39.99",
      image: "/images/swaddle-blankets.png",
      rating: 5,
    },
    {
      name: "Natural Wood Mobile",
      price: "$89.99",
      image: "/images/wooden-mobile.png",
      rating: 4,
    },
    {
      name: "Soft Plush Teddy Bear",
      price: "$29.99",
      image: "/images/teddy-bear.png",
      rating: 5,
    },
    {
      name: "Convertible Crib",
      price: "$299.99",
      image: "/images/convertible-crib.png",
      rating: 5,
    },
    {
      name: "Baby Monitor System",
      price: "$149.99",
      image: "/images/baby-monitor.png",
      rating: 4,
    },
    {
      name: "Nursing Pillow",
      price: "$49.99",
      image: "/images/nursing-pillow.png",
      rating: 5,
    },
    {
      name: "Diaper Bag Backpack",
      price: "$79.99",
      image: "/images/diaper-bag.png",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3A5A40] mb-6">
            Everything Our Little Star Will Need
          </h2>
          <p className="text-xl text-[#AE8F65] max-w-3xl mx-auto leading-relaxed">
            From the first gentle touch to countless precious moments,
            we&apos;ve thoughtfully selected each item to create a world of
            comfort, joy, and endless possibilities.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-[#e8dcc8] py-0"
            >
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    size="sm"
                    className="absolute top-2 right-2 bg-white/90 text-[#3A5A40] hover:bg-white rounded-full p-2"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <h3 className="font-semibold text-[#3A5A40] mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#AE8F65]">
                    {product.price}
                  </span>
                  <Button
                    size="sm"
                    className="bg-[#3A5A40] hover:bg-[#334d38] text-white rounded-full"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
