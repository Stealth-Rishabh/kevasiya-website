"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// This interface must match the one in page.tsx
interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface CollectionsGridProps {
  collections: Collection[];
}

export default function CollectionsGrid({ collections }: CollectionsGridProps) {
  return (
    <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
      {collections.map((collection, index) => (

        
        <motion.div
          key={collection.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative overflow-hidden"
        >
          <Link href={`/collections/${collection.slug}`}>
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 h-full">
            <Image
              src={collection.image || "/images/placeholder.svg"}
              alt={collection.name}
              width={400}
              height={500}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
              priority={index < 4} // Prioritize loading for the first few images
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent rounded-lg" />
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-2xl font-serif font-bold text-white">
              
                <span aria-hidden="true" className="absolute inset-0" />
                {collection.name}
              
            </h3>
            <p className="mt-1 text-sm text-gray-200">
              {collection.description}
            </p>
          </div>
          </Link>
        </motion.div>

      ))}
    </div>
  );
}
