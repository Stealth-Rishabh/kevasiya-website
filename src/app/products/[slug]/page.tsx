import { notFound } from "next/navigation";
import ProductDetailsClient from "./product-details-client";
import { Product } from "@/types/product"; // Centralized type definition

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`${API_URL}/products?slug=${slug}`, {
      next: { revalidate: 60 }, // Revalidate more frequently
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      return undefined;
    }

    const products = await res.json();
    if (!products || products.length === 0) {
      return undefined;
    }

    const product = products[0];

    // Safely parse JSON fields from the database
    const safeParse = (jsonString: string | string[] | null): string[] => {
      if (Array.isArray(jsonString)) {
        return jsonString;
      }
      if (typeof jsonString === "string") {
        try {
          const parsed = JSON.parse(jsonString);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }
      return [];
    };

    return {
      ...product,
      included_items: safeParse(product.included_items),
      images: safeParse(product.images),
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return undefined;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
