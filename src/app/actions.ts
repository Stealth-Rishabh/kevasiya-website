"use server";

import { revalidateTag } from "next/cache";
import { getApiUrl } from "@/lib/utils";

// This represents the structure of the product data coming directly from the API
interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  included_items: string[] | null;
  packaging: string | null;
  image: string;
  images: string[] | null;
  category_id: number;
  category_name: string;
  subcategory_id: number | null;
  subcategory_name: string | null;
}

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text

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

    const apiProducts: ApiProduct[] = await res.json();

    return apiProducts.map((p) => {
      const subcategory =
        p.subcategory_id && p.subcategory_name
          ? {
              id: p.subcategory_id,
              name: p.subcategory_name,
              slug: slugify(p.subcategory_name),
              category_id: p.category_id,
            }
          : null;

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        included_items: p.included_items,
        packaging: p.packaging,
        image: p.image,
        images: p.images,
        thumbnail: p.image,
        category: {
          id: p.category_id,
          name: p.category_name,
          slug: slugify(p.category_name),
        },
        subcategory: subcategory,
        category_id: p.category_id,
        subcategory_id: p.subcategory_id ?? undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
