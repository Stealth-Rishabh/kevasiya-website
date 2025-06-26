"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApiUrl } from "@/lib/utils";
import { Product, Category, SubCategory } from "@/types/product";
import { revalidateProducts } from "@/app/actions";

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

// --- Reusable Dialog for Add/Edit Product ---
function ProductDialog({
  product,
  open,
  onOpenChange,
  onSave,
  categories,
  subCategories,
}: {
  product?: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  categories: Category[];
  subCategories: SubCategory[];
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [packaging, setPackaging] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [subCategoryId, setSubCategoryId] = useState<string | undefined>(
    undefined
  );
  const [includedItems, setIncludedItems] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  const filteredSubcategories = subCategories.filter(
    (sub) => sub.category_id.toString() === categoryId
  );

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || "");
      setPrice(product.price);
      setPackaging(product.packaging || "");
      setCategoryId(product.category.id.toString());
      setSubCategoryId(product.subcategory?.id.toString());
      setIncludedItems((product.included_items || []).join("\n"));
      const allImages = [product.image, ...(product.images || [])].filter(
        Boolean
      ) as string[];
      setExistingImages(allImages);
    } else {
      setName("");
      setDescription("");
      setPrice("Price on Request");
      setPackaging("");
      setCategoryId(undefined);
      setSubCategoryId(undefined);
      setIncludedItems("");
      setExistingImages([]);
    }
    setImageFile(null);
    setGalleryFiles(null);
    setImagesToRemove([]);
  }, [product, open]);

  const handleImageRemove = (url: string) => {
    setImagesToRemove((prev) => [...prev, url]);
    setExistingImages((prev) => prev.filter((img) => img !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("packaging", packaging);
    if (categoryId) formData.append("category_id", categoryId);
    if (subCategoryId) formData.append("subcategory_id", subCategoryId);

    const items = includedItems
      .split("\n")
      .filter((line) => line.trim() !== "");
    formData.append("included_items", JSON.stringify(items));

    if (imageFile) formData.append("image", imageFile);
    if (galleryFiles) {
      Array.from(galleryFiles).forEach((file) => {
        formData.append("images", file);
      });
    }

    if (product) {
      existingImages.forEach((img) => formData.append("existing_images", img));
      imagesToRemove.forEach((img) => formData.append("images_to_remove", img));
    }

    const apiUrl = getApiUrl();
    const url = product
      ? `${apiUrl}/api/products/${product.id}`
      : `${apiUrl}/api/products`;
    const method = product ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: formData });
      if (res.ok) {
        await revalidateProducts();
        onSave();
      } else {
        const error = await res.json();
        console.error("Failed to save product:", error);
        alert(`Error: ${error.details || error.error}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Input
            placeholder="Packaging Info"
            value={packaging}
            onChange={(e) => setPackaging(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select onValueChange={setCategoryId} value={categoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={setSubCategoryId}
              value={subCategoryId}
              disabled={!categoryId || filteredSubcategories.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Subcategory (Optional)" />
              </SelectTrigger>
              <SelectContent>
                {filteredSubcategories.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id.toString()}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea
            placeholder="Included Items (one per line)"
            value={includedItems}
            onChange={(e) => setIncludedItems(e.target.value)}
            rows={4}
          />

          <div>
            <label className="text-sm font-medium">Main Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Gallery Images</label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setGalleryFiles(e.target.files)}
            />
          </div>

          {existingImages.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Current Images</h4>
              <div className="flex flex-wrap gap-2">
                {existingImages.map((url) => (
                  <div key={url} className="relative">
                    <Image
                      src={url}
                      alt="Existing"
                      width={80}
                      height={80}
                      className="rounded object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => handleImageRemove(url)}
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// --- Main Page Component ---
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<{
    categoryId?: string;
    subcategoryId?: string;
    name?: string;
  }>({});

  const filteredSubcategoriesForFilter = subCategories.filter(
    (sub) => sub.category_id.toString() === filters.categoryId
  );

  const fetchData = useCallback(async () => {
    try {
      const apiUrl = getApiUrl();
      const queryParams = new URLSearchParams();
      if (filters.categoryId)
        queryParams.append("category_id", filters.categoryId);
      if (filters.subcategoryId)
        queryParams.append("subcategory_id", filters.subcategoryId);
      if (filters.name) queryParams.append("name", filters.name);

      const [prodRes, catRes, subCatRes] = await Promise.all([
        fetch(`${apiUrl}/api/products?${queryParams.toString()}`),
        fetch(`${apiUrl}/api/categories`),
        fetch(`${apiUrl}/api/subcategories`),
      ]);
      const productsData: ApiProduct[] = await prodRes.json();

      const slugify = (text: string) =>
        text.toString().toLowerCase().replace(/\s+/g, "-");
      const mappedProducts = productsData.map((p: ApiProduct) => {
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
            slug: slugify(p.category_name || ""),
          },
          subcategory: subcategory,
          category_id: p.category_id,
          subcategory_id: p.subcategory_id ?? undefined,
        };
      });

      setProducts(mappedProducts);
      setCategories(await catRes.json());
      setSubCategories(await subCatRes.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = () => {
    fetchData();
    setDialogOpen(false);
    setEditingProduct(null);
  };

  const handleFilterChange = (
    type: "categoryId" | "subcategoryId" | "name",
    value: string
  ) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [type]: value };
      if (type === "categoryId") {
        delete newFilters.subcategoryId; // Reset subcategory when category changes
      }
      return newFilters;
    });
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const handleDelete = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await revalidateProducts();
        fetchData();
      } else {
        const err = await res.json();
        alert(`Error: ${err.details || err.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <>
      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        product={editingProduct}
        categories={categories}
        subCategories={subCategories}
      />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-muted-foreground">
              Manage your products and view their sales performance.
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingProduct(null);
              setDialogOpen(true);
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-4">
            <Input
              placeholder="Search by product name..."
              value={filters.name || ""}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              className="w-full sm:w-auto"
            />
            <Select
              onValueChange={(value) => handleFilterChange("categoryId", value)}
              value={filters.categoryId}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) =>
                handleFilterChange("subcategoryId", value)
              }
              value={filters.subcategoryId}
              disabled={
                !filters.categoryId ||
                filteredSubcategoriesForFilter.length === 0
              }
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by Subcategory" />
              </SelectTrigger>
              <SelectContent>
                {filteredSubcategoriesForFilter.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id.toString()}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleResetFilters} variant="outline">
              Reset Filters
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    Image
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      {product.thumbnail && (
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      )}
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category?.name || "N/A"}</TableCell>
                    <TableCell>{product.subcategory?.name || "N/A"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingProduct(product);
                              setDialogOpen(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{products.length}</strong> of{" "}
              <strong>{products.length}</strong> products
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
