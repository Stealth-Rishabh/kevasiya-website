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
  // Assuming subcategories might not have images, we'll use a default
  image?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL;
};

// Fetches all products for a given subcategory ID
async function getProductsBySubcategoryId(
  subcategoryId: number
): Promise<Product[]> {
  try {
    const res = await fetch(
      `${getApiUrl()}/products?subCategoryId=${subcategoryId}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetches all subcategories for a given category slug
async function getSubcategoriesByCategorySlug(
  categorySlug: string
): Promise<Subcategory[]> {
  try {
    const apiUrl = getApiUrl();
    const catRes = await fetch(`${apiUrl}/categories`, {
      next: { revalidate: 3600 },
    });
    if (!catRes.ok) throw new Error("Failed to fetch categories");
    const categories: Category[] = await catRes.json();
    const category = categories.find((c) => c.slug === categorySlug);
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
  // This function needs to be implemented based on your API's capabilities.
  // For now, we return an empty array.
  // A potential API endpoint could be `${getApiUrl()}/products?categorySlug=${categorySlug}`
  console.log(
    `Fetching products for category: ${categorySlug}. This needs a proper API endpoint.`
  );
  return [];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const subcategories = await getSubcategoriesByCategorySlug(categorySlug);

  let products: Product[] = [];
  // If there are no subcategories, fetch products for the main category.
  if (subcategories.length === 0) {
    products = await getProductsForCategory(categorySlug);
  }

  const categoryName =
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

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
          // Render Subcategories
          <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
            {subcategories.map((sub) => (
              <Link
                key={sub.id}
                // TODO: This href should eventually point to a page for this subcategory's products
                href={`/collections/${categorySlug}/${sub.slug}`}
                className="group block"
              >
                <div className="relative h-[450px] w-full overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    // Using a placeholder image since subcategories might not have one
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
          // Render Products
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
          // Nothing found
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
