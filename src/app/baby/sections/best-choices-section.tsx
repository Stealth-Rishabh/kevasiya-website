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
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface BestChoicesSectionProps {
  subcategories: Subcategory[];
  category: Category | null;
}

const subcategoryDetails = [
  {
    title: "Baby Announcement",
    description:
      "Celebrate your special news with elegant hampers and beautiful showcases.",
    options: ["Announcement Hampers", "Baby Keepsakes", "Custom Gifts"],
    button: "Explore Gifts",
  },
  {
    title: "Baby Showers",
    description:
      "Delight loved ones with themed hampers, showcases, and custom baby shower gifts.",
    options: ["Shower Hampers", "Decor Showcases", "Custom Shower Gifts"],
    button: "Explore Gifts",
  },
  {
    title: "Birthday",
    description:
      "Make birthdays extra special with curated hampers and celebratory showcases.",
    options: ["Birthday Hampers", "Party Showcases", "Custom Birthday Gifts"],
    button: "Explore Gifts",
  },
  {
    title: "Mundan",
    description:
      "Mark the traditional Mundan ceremony with thoughtful hampers and showcases.",
    options: ["Mundan Hampers", "Ceremony Showcases", "Custom Mundan Gifts"],
    button: "Explore Gifts",
  },
];

export function BestChoicesSection({
  subcategories,
  category,
}: BestChoicesSectionProps) {
  if (!category) {
    return null; // Don't render the section if the category data is not available
  }

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

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {subcategories.map((item) => {
            const details = subcategoryDetails.find(
              (d) => d.title === item.name
            );

            return (
              <Card
                key={item.id}
                className="subcategory-card group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm py-0 flex flex-col"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-[#3A5A40] text-white">
                      {item.name}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex flex-col flex-grow">
                  <CardTitle className="text-xl font-bold text-[#3A5A40] mb-3">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-[#AE8F65] mb-4 text-base flex-grow">
                    {details ? details.description : item.description}
                  </CardDescription>

                  {details && (
                    <ul className="space-y-2 mb-6">
                      {details.options.map((option, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-[#AE8F65]"
                        >
                          <Star className="w-4 h-4 mr-2 text-[#5c7360]" />
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={`/collections/${category.slug}/${item.slug}`}
                    className="mt-auto"
                  >
                    <Button className="w-full bg-[#AE8F65] hover:bg-[#967a58] text-white rounded-full">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {details ? details.button : "Explore Gifts"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
