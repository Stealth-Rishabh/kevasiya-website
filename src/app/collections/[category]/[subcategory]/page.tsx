import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Define the types for our data
interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number | string;
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  category_id: number;
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

// Fetches a single subcategory by its slug and its parent category's slug
async function getSubcategoryInfo(
  categorySlug: string,
  subcategorySlug: string
): Promise<Subcategory | undefined> {
  try {
    const apiUrl = getApiUrl();
    const catRes = await fetch(`${apiUrl}/categories?slug=${categorySlug}`);
    if (!catRes.ok) return undefined;
    const categories: Category[] = await catRes.json();
    const parentCategory = categories[0];
    if (!parentCategory) return undefined;

    const subCatRes = await fetch(
      `${apiUrl}/subcategories?categoryId=${parentCategory.id}`
    );
    if (!subCatRes.ok) return undefined;
    const subcategories: Subcategory[] = await subCatRes.json();
    return subcategories.find((sc) => sc.slug === subcategorySlug);
  } catch (error) {
    console.error("Error fetching subcategory info:", error);
    return undefined;
  }
}

// Fetches all products for a given subcategory ID
async function getProductsBySubcategoryId(
  subcategoryId: number
): Promise<Product[]> {
  try {
    const res = await fetch(
      `${getApiUrl()}/products?subCategoryId=${subcategoryId}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;

  const subcategory = await getSubcategoryInfo(categorySlug, subcategorySlug);

  if (!subcategory) {
    notFound(); // If the subcategory doesn't exist, show a 404 page
  }

  const products = await getProductsBySubcategoryId(subcategory.id);

  const subcategoryName = subcategory.name;

  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-gray-900 sm:text-5xl">
            {subcategoryName}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Discover our curated selection for {subcategoryName.toLowerCase()}.
          </p>
        </div>

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
                  <p className="mt-2 text-sm font-medium text-gray-300">
                    {typeof product.price === "number"
                      ? `₹${product.price}`
                      : product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600">
              There are no products in this collection yet.
            </p>
            <Link
              href={`/collections/${categorySlug}`}
              className="mt-4 inline-block text-lg font-medium text-gray-900 hover:text-gray-700"
            >
              &larr; Back to all {categorySlug.replace(/-/g, " ")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// This function helps Next.js know which subcategory pages to generate at build time.
export async function generateStaticParams() {
  try {
    const apiUrl = process.env.INTERNAL_API_URL || "http://localhost:5001/api";
    const subCatRes = await fetch(`${apiUrl}/subcategories`);
    const subcategories: Subcategory[] = await subCatRes.json();

    const catRes = await fetch(`${apiUrl}/categories`);
    const categories: Category[] = await catRes.json();

    const categoryMap = new Map(categories.map((c) => [c.id, c.slug]));

    return subcategories
      .map((sub) => ({
        category: categoryMap.get(sub.category_id) || "",
        subcategory: sub.slug,
      }))
      .filter((params) => params.category); // Filter out any with no parent
  } catch (error) {
    console.error("Could not generate static params for subcategories:", error);
    return [];
  }
}
