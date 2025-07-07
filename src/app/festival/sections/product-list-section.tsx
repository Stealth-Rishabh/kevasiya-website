"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number | string;
  subcategoryName?: string;
  rating?: number;
  description?: string;
}

interface ProductListSectionProps {
  products: Product[];
}

export function ProductListSection({ products }: ProductListSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDescription, setSelectedDescription] = useState("All");

  useEffect(() => {
    setSelectedDescription("All");
  }, [selectedCategory]);

  const categories = useMemo(() => {
    if (!products) return [];
    const allSubcategoryNames = products
      .map((p) => p.subcategoryName)
      .filter((name): name is string => !!name);
    return ["All", ...Array.from(new Set(allSubcategoryNames))];
  }, [products]);

  const descriptionFilters = useMemo(() => {
    if (selectedCategory !== "Diwali" || !products) {
      // Example: Filter within a specific festival
      return [];
    }
    const descriptions = products
      .filter(
        (p) =>
          p.subcategoryName === "Diwali" &&
          p.description &&
          p.description.trim() !== ""
      )
      .map((p) => p.description);

    if (descriptions.length === 0) return [];

    return ["All", ...Array.from(new Set(descriptions as string[]))];
  }, [selectedCategory, products]);

  const filteredProducts = useMemo(() => {
    let items = products;

    if (selectedCategory !== "All") {
      items = items.filter((p) => p.subcategoryName === selectedCategory);
    }

    if (selectedCategory === "Diwali" && selectedDescription !== "All") {
      items = items.filter((p) => p.description === selectedDescription);
    }

    return items;
  }, [selectedCategory, selectedDescription, products]);

  if (!products || products.length === 0) {
    return (
      <section className="py-20 px-4 bg-white" id="products">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-gray-600">
            Our festive products are being prepared. Please check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-white" id="products">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3A5A40] mb-6">
            Gifts for Every Joyous Occasion
          </h2>
          <p className="text-xl text-[#AE8F65] max-w-3xl mx-auto leading-relaxed">
            From vibrant Diwali hampers to elegant Eid gifts, we&apos;ve
            selected each item to bring joy and light to your celebrations.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 border ${
                selectedCategory === category
                  ? "bg-[#3A5A40] text-white border-[#3A5A40]"
                  : "bg-white text-[#3A5A40] border-[#3A5A40] hover:bg-gray-100"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {descriptionFilters.length > 0 && (
          <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12 border-t pt-8">
            <h3 className="w-full text-center text-lg font-semibold text-[#AE8F65] mb-4">
              Filter by Type
            </h3>
            {descriptionFilters.map((desc) => (
              <Button
                key={desc}
                onClick={() => setSelectedDescription(desc)}
                className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 border ${
                  selectedDescription === desc
                    ? "bg-[#5c7360] text-white border-[#5c7360]"
                    : "bg-white text-[#5c7360] border-[#5c7360] hover:bg-gray-100"
                }`}
              >
                {desc}
              </Button>
            ))}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block"
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-[#e8dcc8] py-0 h-full flex flex-col">
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="relative mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-60 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            product.rating && i < product.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#3A5A40] hover:bg-[#334d38] text-white rounded-full cursor-pointer"
                      asChild
                    >
                      <div>
                        View Details
                        <ShoppingCart className="ml-2 w-4 h-4" />
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
