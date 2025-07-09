import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApiUrl } from "@/lib/utils";
import { Package, Boxes, Library } from "lucide-react";

// Basic types for fetching data. We only need the arrays to get the length.
interface StatItem {
  id: number;
}

async function getStats() {
  const apiUrl = getApiUrl();
  try {
    // Fetch all data in parallel to be efficient.
    const [catRes, subCatRes, prodRes] = await Promise.all([
      fetch(`${apiUrl}/categories`, { next: { revalidate: 60 } }),
      fetch(`${apiUrl}/subcategories`, { next: { revalidate: 60 } }),
      fetch(`${apiUrl}/products`, { next: { revalidate: 60 } }),
    ]);

    // Check if all requests were successful
    if (!catRes.ok || !subCatRes.ok || !prodRes.ok) {
      console.error("Failed to fetch all stats");
      // Log individual statuses for better debugging
      if (!catRes.ok) console.error("Categories fetch failed:", catRes.status);
      if (!subCatRes.ok)
        console.error("Subcategories fetch failed:", subCatRes.status);
      if (!prodRes.ok) console.error("Products fetch failed:", prodRes.status);
      throw new Error("One or more network responses were not ok.");
    }

    const categories: StatItem[] = await catRes.json();
    const subcategories: StatItem[] = await subCatRes.json();
    const products: StatItem[] = await prodRes.json();

    return {
      categoryCount: categories.length,
      subcategoryCount: subcategories.length,
      productCount: products.length,
    };
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    // Return zero counts on error so the page can still render
    return {
      categoryCount: 0,
      subcategoryCount: 0,
      productCount: 0,
    };
  }
}

export default async function AdminPage() {
  const { categoryCount, subcategoryCount, productCount } = await getStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">A quick overview of your store.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sub-Categories
            </CardTitle>
            <Library className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subcategoryCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Use the sidebar navigation to manage your store&apos;s content. You
            can add, edit, and delete products, categories, and sub-categories.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
