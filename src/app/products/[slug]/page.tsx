import { notFound } from "next/navigation";
import ProductDetailsClient from "./product-details-client";
import { Product } from "@/types/product";
import { getApiUrl } from "@/lib/utils";

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
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`${getApiUrl()}/products?slug=${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      return undefined;
    }

    const products: ApiProduct[] = await res.json();
    if (!products || products.length === 0) {
      return undefined;
    }

    const p = products[0];
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
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return undefined;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
