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
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
