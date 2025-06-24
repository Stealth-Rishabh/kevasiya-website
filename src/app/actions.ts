"use server";

import { revalidateTag } from "next/cache";
import { getApiUrl } from "@/lib/utils";

export async function revalidateProducts() {
  revalidateTag("products");
}

export async function revalidateCategories() {
  revalidateTag("categories");
}

export async function getProducts() {
  const apiUrl = getApiUrl();
  try {
    const res = await fetch(`${apiUrl}/api/products`, {
      next: { tags: ["products"] },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `Failed to fetch products: ${res.status} ${res.statusText}`,
        errorText
      );
      return [];
    }
    const products = await res.json();

    // Map over products to create absolute URLs for images
    return products.map((product: any) => ({
      ...product,
      thumbnail: product.thumbnail ? `${apiUrl}${product.thumbnail}` : "",
      image: product.image ? `${apiUrl}${product.image}` : "",
      images: product.images
        ? product.images.map((img: string) => `${apiUrl}${img}`)
        : [],
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
