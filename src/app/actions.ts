"use server";

import { revalidateTag } from "next/cache";
import { getApiUrl } from "@/lib/utils";
import { Product } from "@/types/product";

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

    const products: Product[] = await res.json();

    const createAbsoluteUrl = (url: string | null) => {
      if (!url) return "";
      if (url.startsWith("http")) return url;
      return `${apiUrl}${url}`;
    };

    return products.map((p: any) => ({
      ...p,
      thumbnail: createAbsoluteUrl(p.image),
      image: createAbsoluteUrl(p.image),
      images: p.images ? p.images.map(createAbsoluteUrl) : [],
      category: {
        id: p.category_id,
        name: p.category_name,
      },
      subcategory: p.subcategory_id
        ? {
            id: p.subcategory_id,
            name: p.subcategory_name,
          }
        : null,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
