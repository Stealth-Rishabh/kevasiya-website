"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

export function ProductListSection() {
  const products = [
    {
      name: "Silver Cloche Centerpiece",
      price: "₹3,250.00",
      image: "/images/wedding/products/wedding (1).webp",
      rating: 5,
    },
    // {
    //   name: "Golden Keepsake Box",
    //   price: "₹2,200.00",
    //   image: "/images/wedding/products/wedding (2).webp",
    //   rating: 5,
    // },
    {
      name: "Turquoise Butterfly Box",
      price: "₹2,800.00",
      image: "/images/wedding/products/wedding (3).webp",
      rating: 4,
    },
    // {
    //   name: "Vintage Vanity Trunk",
    //   price: "₹4,500.00",
    //   image: "/images/wedding/products/wedding (4).webp",
    //   rating: 5,
    // },
    {
      name: "Acrylic & Gold Showcase",
      price: "₹3,999.99",
      image: "/images/wedding/products/wedding (5).webp",
      rating: 5,
    },
    {
      name: "Peacock Glassware Set",
      price: "₹5,750.00",
      image: "/images/wedding/products/wedding (6).webp",
      rating: 4,
    },
    {
      name: "Luxe Floral Hamper",
      price: "₹3,000.00",
      image: "/images/wedding/products/wedding (7).webp",
      rating: 5,
    },
    {
      name: "Rose Bloom Gift Basket",
      price: "₹4,500.00",
      image: "/images/wedding/products/wedding (8).webp",
      rating: 4,
    },
  ];

  return (
    <section className="py-10 sm:py-20 px-4 bg-white" id="products">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3A5A40] mb-6">
            Curated Gifts for the Perfect Pair
          </h2>
          <p className="text-xl text-[#AE8F65] max-w-3xl mx-auto leading-relaxed">
            Discover a collection of thoughtful gifts to celebrate their union.
            From home essentials to unforgettable experiences, find the perfect
            present to honor their love story.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              // className="group hover:shadow-xl transition-all duration-300 border-[#e8dcc8] py-0"
              className="group shadow-none transition-all duration-300 border-none py-0"
            >
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-80 object-cover hover:shadow rounded group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    size="sm"
                    className="absolute w-10 h-10 top-2 right-2 bg-white/90 text-[#3A5A40] hover:bg-white rounded-full p-2"
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
                  {/* <span className="text-lg font-bold text-[#AE8F65]">
                    {product.price}
                  </span> */}
                  <Button
                    size="sm"
                    className="bg-[#3A5A40] hover:bg-[#334d38] text-white rounded mt-2 w-full"
                  >
                    Get a Quote
                    <ShoppingCart className="ml-2 w-4 h-4" />
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
