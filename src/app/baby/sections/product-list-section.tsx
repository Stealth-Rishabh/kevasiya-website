"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { products } from "./productData";

export function ProductListSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category);
    return ["All", ...Array.from(new Set(allCategories))];
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="py-20 px-4 bg-white" id="products">
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

        <div className="flex justify-center mb-12 space-x-2 md:space-x-4">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
                selectedCategory === category
                  ? "bg-[#3A5A40] text-white border-[#3A5A40]"
                  : "bg-white text-[#3A5A40] border-[#3A5A40] hover:bg-[#e8dcc8] hover:text-[#3A5A40]"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-[#e8dcc8] py-0"
            >
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.category}
                    width={200}
                    height={200}
                    className="w-full h-60 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* <h3 className="font-semibold text-[#3A5A40] mb-2">
                  {product.name}
                </h3> */}

                <div className="flex items-center justify-between mb-2">
                  {/* <span className="text-lg font-bold text-[#AE8F65]">
                    {product.price}
                  </span> */}
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
                  <a href="#book">
                    <Button
                      size="sm"
                      className="bg-[#3A5A40] hover:bg-[#334d38] text-white rounded-full cursor-pointer "
                    >
                      Get the Price
                      <ShoppingCart className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
