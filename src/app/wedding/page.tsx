import { HeroSection } from "./sections/hero-section";
import { BestChoicesSection } from "./sections/best-choices-section";
import { ProductListSection } from "./sections/product-list-section";
import { TestimonialsSection } from "./sections/testimonials-section";
import { CTASection } from "./sections/cta-section";
import { getApiUrl } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number | string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

async function getWeddingProducts(): Promise<Product[]> {
  const apiUrl = getApiUrl();
  const categorySlug = "wedding";

  try {
    const catRes = await fetch(`${apiUrl}/categories?slug=${categorySlug}`, {
      next: { revalidate: 3600 },
    });
    if (!catRes.ok) throw new Error("Failed to fetch wedding category");
    const categories: Category[] = await catRes.json();
    const category = categories[0];
    if (!category) return [];

    const prodRes = await fetch(
      `${apiUrl}/products?category_id=${category.id}`,
      { next: { revalidate: 60 } }
    );
    if (!prodRes.ok) throw new Error("Failed to fetch wedding products");

    const products: Product[] = await prodRes.json();
    return products;
  } catch (error) {
    console.error("Error fetching wedding products:", error);
    return [];
  }
}

export default async function WeddingPage() {
  const products = await getWeddingProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-white">
      <HeroSection />
      <ProductListSection products={products} />
      <BestChoicesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
