export interface Product {
  id: string;
  name: string;
  category: "Baby" | "Wedding" | "Corporates" | "Occasions";
  subcategory: string;
  images: string[];
  includedProducts: string[];
  packagingDetails?: string;
  boxDimensions?: string;
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data.products as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    // In a real-world scenario, you might want to handle this more gracefully.
    // For now, we'll return an empty array to prevent the app from crashing.
    return [];
  }
}

export const products = await getProducts();
