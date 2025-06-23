import Link from "next/link";
import Image from "next/image";

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
}

const getApiUrl = () => {
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || "http://localhost:5001/api";
  }
  return "/api";
};

// Fetches all subcategories for a given category slug
async function getSubcategoriesByCategorySlug(
  categorySlug: string
): Promise<Subcategory[]> {
  try {
    const apiUrl = getApiUrl();
    const catRes = await fetch(`${apiUrl}/categories?slug=${categorySlug}`, {
      next: { revalidate: 3600 },
    });
    if (!catRes.ok) throw new Error("Failed to fetch categories");
    const categories: Category[] = await catRes.json();
    const category = categories[0];
    if (!category) return [];

    const subCatRes = await fetch(
      `${apiUrl}/subcategories?categoryId=${category.id}`,
      { next: { revalidate: 3600 } }
    );
    if (!subCatRes.ok) throw new Error("Failed to fetch subcategories");
    return subCatRes.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetches products for a category that has NO subcategories
async function getProductsForCategory(
  categorySlug: string
): Promise<Product[]> {
  try {
    const apiUrl = getApiUrl();
    const catRes = await fetch(`${apiUrl}/categories?slug=${categorySlug}`, {
      next: { revalidate: 3600 },
    });
    if (!catRes.ok) throw new Error("Failed to fetch category");
    const categories: Category[] = await catRes.json();
    const category = categories[0];
    if (!category) return [];

    const prodRes = await fetch(
      `${apiUrl}/products?categoryId=${category.id}`,
      { next: { revalidate: 3600 } }
    );
    if (!prodRes.ok) throw new Error("Failed to fetch products for category");
    return prodRes.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const subcategories = await getSubcategoriesByCategorySlug(categorySlug);

  let products: Product[] = [];
  if (subcategories.length === 0) {
    products = await getProductsForCategory(categorySlug);
  }

  const categoryName =
    categorySlug.charAt(0).toUpperCase() +
    categorySlug.slice(1).replace(/-/g, " ");

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-gray-900 sm:text-5xl">
            {categoryName} Hampers
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Browse our exclusive selection of {categoryName.toLowerCase()} gift
            hampers.
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
                    src={product.image}
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
                    <p className="mt-2 text-sm font-medium text-gray-300">
                      Price on request
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600">
              No products or subcategories found in this category.
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
