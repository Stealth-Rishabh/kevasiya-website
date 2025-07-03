import { HeroSection } from "./sections/hero-section";
import { BestChoicesSection } from "./sections/best-choices-section";
import { ProductListSection } from "./sections/product-list-section";
import { TestimonialsSection } from "./sections/testimonials-section";
import { CTASection } from "./sections/cta-section";
import { getApiUrl } from "@/lib/utils";

// --- Data Types ---
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

interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number | string;
  subcategory_name?: string; // from API
  subcategoryName?: string; // for component
  rating?: number;
}

// --- Single, Robust Data Fetching Function ---
async function getBabyPageData() {
  const apiUrl = getApiUrl();
  const categorySlug = "baby-hampers";

  try {
    // 1. Fetch the parent category
    const catRes = await fetch(`${apiUrl}/categories?slug=${categorySlug}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!catRes.ok) throw new Error("Failed to fetch category");
    const categories: Category[] = await catRes.json();
    const category = categories[0];
    if (!category)
      return { category: null, subcategories: [], randomProducts: [] };

    // 2. Fetch all subcategories for the parent
    const subCatRes = await fetch(
      `${apiUrl}/subcategories?category_id=${category.id}`,
      { next: { revalidate: 3600 } }
    );
    if (!subCatRes.ok) throw new Error("Failed to fetch subcategories");
    const subcategories: Subcategory[] = await subCatRes.json();

    // 3. Fetch all products for the parent category in one go
    const prodRes = await fetch(
      `${apiUrl}/products?category_id=${category.id}`,
      { cache: "no-store" } // Products might change more often
    );
    if (!prodRes.ok) throw new Error("Failed to fetch products");
    let products: Product[] = await prodRes.json();

    // 4. Process the products: augment, shuffle, and slice
    const processedProducts = products
      .map((p) => ({
        ...p,
        subcategoryName: p.subcategory_name, // Map snake_case to camelCase
        rating: Math.floor(Math.random() * 2) + 4, // Random rating: 4 or 5
      }))
      .sort(() => Math.random() - 0.5); // Shuffle for randomness

    const randomProducts = processedProducts.slice(0, 12); // Take max 12

    return { category, subcategories, randomProducts };
  } catch (error) {
    console.error("Error fetching baby page data:", error);
    // Return empty state to prevent page crash
    return { category: null, subcategories: [], randomProducts: [] };
  }
}

export default async function BabyAnnouncementPage() {
  const { category, subcategories, randomProducts } = await getBabyPageData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      <HeroSection />
      <BestChoicesSection subcategories={subcategories} category={category} />
      <ProductListSection products={randomProducts} />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
