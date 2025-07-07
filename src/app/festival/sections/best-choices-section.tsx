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
    title: "Diwali",
    description:
      "Light up your celebrations with dazzling hampers and beautiful gifts.",
    options: ["Luxury Hampers", "Decorative Lights", "Sweet Boxes"],
    button: "Explore Diwali Gifts",
  },
  {
    title: "Holi",
    description:
      "Share the joy of colors with vibrant hampers and festive essentials.",
    options: ["Organic Colors", "Sweets & Snacks", "Water Guns"],
    button: "Explore Holi Gifts",
  },
  {
    title: "Christmas",
    description:
      "Spread the holiday cheer with festive hampers and delightful presents.",
    options: ["Christmas Hampers", "Decorations", "Plum Cakes"],
    button: "Explore Christmas Gifts",
  },
  {
    title: "Eid",
    description:
      "Celebrate Eid with elegant hampers and thoughtful gifts for your loved ones.",
    options: ["Eidi Hampers", "Prayer Mats", "Attar & Perfumes"],
    button: "Explore Eid Gifts",
  },
  {
    title: "Teej",
    description:
      "Celebrate the monsoon festival with traditional gifts and festive essentials.",
    options: ["Mehendi Kits", "Bangles", "Sweets"],
    button: "Explore Teej Gifts",
  },
  {
    title: "Ganesh Chaturthi",
    description:
      "Welcome Lord Ganesha with beautiful decorations and auspicious offerings.",
    options: ["Ganesh Idols", "Decoration Items", "Modak & Sweets"],
    button: "Explore Ganesh Chaturthi Gifts",
  },
  {
    title: "Lohri",
    description:
      "Celebrate the harvest festival with warm gifts and traditional treats.",
    options: ["Dry Fruits", "Sweets", "Decorative Items"],
    button: "Explore Lohri Gifts",
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
            Gifts for Every Festival
          </h2>
          <p className="text-xl text-[#AE8F65] max-w-3xl mx-auto leading-relaxed">
            Explore our curated collections for every celebration. Find the perfect gift to make each festival special and memorable.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols- gap-8">
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
