import CollectionsGrid from "./CollectionsGrid";
import { getApiUrl } from "@/lib/utils";

interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

async function getCollections(): Promise<Collection[]> {
  try {
    const apiUrl = getApiUrl();

    const res = await fetch(`${apiUrl}/categories`, {
      // next: { tags: ["categories"] },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch collections: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-serif">
            Our Collections
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Discover our curated selection of luxury hampers, thoughtfully
            designed for every occasion.
          </p>
        </div>

        <CollectionsGrid collections={collections} />
      </div>
    </div>
  );
}
