"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
}

interface ProductListSectionProps {
  products: Product[];
}

export function ProductListSection({ products }: ProductListSectionProps) {
  if (!products || products.length === 0) {
    return (
      <section className="py-10 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-gray-600">
            Wedding gifts are being prepared. Please check back soon!
          </p>
        </div>
      </section>
    );
  }

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
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block"
            >
              <Card className="group shadow-none transition-all duration-300 border-none py-0">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-80 object-cover hover:shadow rounded group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#3A5A40] hover:bg-[#334d38] text-white rounded mt-2 w-full"
                    asChild
                  >
                    <div>
                      View Details
                      <ShoppingCart className="ml-2 w-4 h-4" />
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
