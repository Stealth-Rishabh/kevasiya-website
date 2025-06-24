import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

const getApiUrl = () => {
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || "http://localhost:5001/api";
  }
  return process.env.NEXT_PUBLIC_API_URL || "/api";
};

async function getCategoryPageData(categorySlug: string) {
  const apiUrl = getApiUrl();
  let category: Category | null = null;
  let subcategories: Subcategory[] = [];
  let products: Product[] = [];

  try {
    // 1. Fetch the category by slug
    const catRes = await fetch(`${apiUrl}/categories?slug=${categorySlug}`, {
      next: { tags: ["categories"] },
    });
    if (!catRes.ok)
      throw new Error(`Failed to fetch category with slug: ${categorySlug}`);
    const categories: Category[] = await catRes.json();
    if (!categories[0]) {
      notFound();
    }
    category = categories[0];

    // 2. Fetch its subcategories
    const subCatRes = await fetch(
      `${apiUrl}/subcategories?category_id=${category.id}`,
      { next: { tags: ["categories"] } }
    );
    if (!subCatRes.ok)
      throw new Error(
        `Failed to fetch subcategories for category ID: ${category.id}`
      );
    subcategories = await subCatRes.json();

    // 3. If NO subcategories exist, fetch products for this category directly
    if (subcategories.length === 0) {
      const prodRes = await fetch(
        `${apiUrl}/products?category_id=${category.id}`,
        { next: { tags: ["products"] } }
      );
      if (!prodRes.ok)
        throw new Error(
          `Failed to fetch products for category ID: ${category.id}`
        );
      products = await prodRes.json();
    }
  } catch (error) {
    console.error("Error fetching category page data:", error);
    // If anything fails, especially finding the category, treat as not found
    notFound();
  }

  return { category, subcategories, products };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const { category, subcategories, products } = await getCategoryPageData(
    categorySlug
  );

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-gray-900 sm:text-5xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            {category.description ||
              `Browse our exclusive selection of ${category.name.toLowerCase()} gift hampers.`}
          </p>
        </div>

        {subcategories.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            {subcategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/collections/${categorySlug}/${sub.slug}`}
                className="group block"
              >
                <div className="relative h-[450px] w-full overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={sub.image || "/images/placeholder.webp"}
                    alt={sub.name}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black to-transparent opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-serif text-white">
                      {sub.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group block"
              >
                <div className="relative h-[450px] w-full overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={product.image || "/images/placeholder.webp"}
                    alt={product.name}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black to-transparent opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-serif text-white">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600">
              No items found in this collection yet.
            </p>
            <Link
              href="/collections"
              className="mt-4 inline-block text-lg font-medium text-gray-900 hover:text-gray-700"
            >
              &larr; Back to all collections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
