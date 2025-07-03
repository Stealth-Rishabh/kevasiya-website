"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom } from "yet-another-react-lightbox/plugins";
import { Product } from "@/types/product";
import { GiftIcon } from "lucide-react";

export default function ProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryImages = useMemo(
    () =>
      product.images && product.images.length > 0
        ? product.images
        : [product.image],
    [product.images, product.image]
  );

  const slides = useMemo(
    () => galleryImages.map((src) => ({ src })),
    [galleryImages]
  );

  const currentImage = galleryImages[activeIndex];

  return (
    <div className="bg-gray-50 text-gray-800 py-24 sm:py-32">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm mb-8">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:underline">
            Collections
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-500">{product.name}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="w-full">
            <div className="relative group">
              <Image
                src={currentImage}
                alt={product.name}
                width={800}
                height={800}
                priority={true}
                className="object-cover w-full h-auto rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out group-hover:scale-105"
                onClick={() => setOpen(true)}
              />
              {/* THIS IS THE FIX: The overlay and icon classes are corrected below */}
            </div>

            {galleryImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-4">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      activeIndex === index
                        ? "border-gray-900"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={150}
                      height={150}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-serif text-gray-900 mb-6">
              {product.name}
            </h1>

            {/* {product.description && (
              <p className="text-lg text-gray-600 mb-6">
                {product.description}
              </p>
            )} */}

            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 tracking-wide border-b pb-2">
                Products Included
              </h3>
              {product.included_items && product.included_items.length > 0 ? (
                <ul className="space-y-3 text-gray-600 mt-4">
                  {product.included_items.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircleIcon className="w-5 h-5 mr-3 text-gray-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 mt-4">
                  This hamper&apos;s contents are customized. Please contact us
                  for details.
                </p>
              )}
            </div>

            <div className="mt-8">
              {product.packaging && (
                <p className="text-md text-gray-700 font-semibold mt-4">
                  Packaging: {product.packaging}
                </p>
              )}
            </div>

            <div className="mt-auto pt-8">
              <p className="text-2xl font-serif text-right text-gray-800 mb-6">
                {typeof product.price === "number"
                  ? `₹${product.price}`
                  : product.price}
              </p>
              <div className="grid grid-cols-1 gap-4">
                <button className="w-full bg-black text-white py-4 rounded-md font-semibold hover:bg-gray-800 transition-colors text-lg flex items-center justify-center">
                  Book Your Gift <GiftIcon className="w-5 h-5 ml-2" />
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={activeIndex}
        on={{ view: ({ index }) => setActiveIndex(index) }}
        plugins={[Zoom]}
      />
    </div>
  );
}
