"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MoreHorizontal, Trash2, Edit, X as XIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { revalidateProducts } from "@/app/actions";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// --- Helper to get full image URL ---
function getImageUrl(path?: string) {
  if (!path) return "/placeholder.svg";
  if (path.startsWith("http") || path.startsWith("/uploads")) return path;
  return `${API_URL}/${path.replace(/^\//, "")}`;
}

// --- Type Definitions ---
interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string;
  category_id: number;
  subcategory_id?: number;
  image?: string;
  images?: string[];
  included_items?: string[];
  packaging?: string;
  category_name?: string;
  subcategory_name?: string;
}
interface Category {
  id: number;
  name: string;
}
interface SubCategory {
  id: number;
  name: string;
  category_id: number;
}

// =================================================================
// --- Product Dialog Component (Corrected and Final Version) ---
// =================================================================
function ProductDialog({
  open,
  onOpenChange,
  onSave,
  product,
  categories,
  allSubCategories,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  product?: Product | null;
  categories: Category[];
  allSubCategories: SubCategory[];
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    subCategoryId: "",
    packaging: "",
    included_items: "",
  });

  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);

  const [existingMainImage, setExistingMainImage] = useState<string | null>(
    null
  );
  const [existingGalleryImages, setExistingGalleryImages] = useState<string[]>(
    []
  );
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  const availableSubCategories = useMemo(() => {
    if (!formData.categoryId) return [];
    return allSubCategories.filter(
      (sc) => String(sc.category_id) === formData.categoryId
    );
  }, [formData.categoryId, allSubCategories]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: String(product.price),
        categoryId: String(product.category_id),
        subCategoryId: product.subcategory_id
          ? String(product.subcategory_id)
          : "",
        packaging: product.packaging || "",
        included_items: Array.isArray(product.included_items)
          ? product.included_items.join(", ")
          : "",
      });
      setExistingMainImage(product.image || null);

      const galleryImagesData = product.images;
      if (Array.isArray(galleryImagesData)) {
        setExistingGalleryImages(galleryImagesData);
      } else {
        setExistingGalleryImages([]);
      }
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        subCategoryId: "",
        packaging: "",
        included_items: "",
      });
      setExistingMainImage(null);
      setExistingGalleryImages([]);
    }
    setMainImageFile(null);
    setGalleryImageFiles([]);
    setImagesToRemove([]);
  }, [product, open]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange =
    (name: "categoryId" | "subCategoryId") => (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "categoryId" && { subCategoryId: "" }),
      }));
    };

  const handleRemoveExistingImage = (imageUrl: string) => {
    if (imageUrl === existingMainImage) {
      setExistingMainImage(null);
    } else {
      setExistingGalleryImages((prev) =>
        prev.filter((url) => url !== imageUrl)
      );
    }
    setImagesToRemove((prev) => [...prev, imageUrl]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) {
      alert("Please select a category.");
      return;
    }
    if (availableSubCategories.length > 0 && !formData.subCategoryId) {
      alert("This category has sub-categories. Please select one.");
      return;
    }

    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("description", formData.description);
    submissionData.append("price", formData.price);
    submissionData.append("packaging", formData.packaging);
    submissionData.append("category_id", formData.categoryId);

    if (formData.subCategoryId)
      submissionData.append("subcategory_id", formData.subCategoryId);

    submissionData.append(
      "included_items",
      JSON.stringify(
        formData.included_items
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      )
    );

    if (mainImageFile) submissionData.append("image", mainImageFile);
    galleryImageFiles.forEach((file) => submissionData.append("images", file));

    if (existingMainImage)
      submissionData.append("existing_images", existingMainImage);
    existingGalleryImages.forEach((url) =>
      submissionData.append("existing_images", url)
    );

    if (imagesToRemove.length > 0)
      submissionData.append("images_to_remove", JSON.stringify(imagesToRemove));

    const url = product
      ? `${API_URL}/products/${product.id}`
      : `${API_URL}/products`;
    const method = product ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: submissionData });
      if (!res.ok) throw new Error(await res.text());
      await revalidateProducts();
      onSave();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Failed to save product. Check the console for details.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <Input
            name="price"
            placeholder="e.g., 29.99 or 'Price on Request'"
            value={formData.price}
            onChange={handleInputChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              value={formData.categoryId}
              onValueChange={handleSelectChange("categoryId")}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={formData.subCategoryId}
              onValueChange={handleSelectChange("subCategoryId")}
              disabled={availableSubCategories.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a sub-category" />
              </SelectTrigger>
              <SelectContent>
                {availableSubCategories.map((sc) => (
                  <SelectItem key={sc.id} value={String(sc.id)}>
                    {sc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            name="packaging"
            placeholder="Packaging"
            value={formData.packaging}
            onChange={handleInputChange}
          />
          <Input
            name="included_items"
            placeholder="Included Items (comma-separated)"
            value={formData.included_items}
            onChange={handleInputChange}
          />

          <div>
            <label className="font-medium">Main Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setMainImageFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>
          <div>
            <label className="font-medium">Gallery Images</label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setGalleryImageFiles(Array.from(e.target.files || []))
              }
            />
          </div>

          {(existingMainImage || existingGalleryImages.length > 0) && (
            <div>
              <h4 className="font-medium mb-2">Current Images</h4>
              <div className="flex flex-wrap gap-2">
                {existingMainImage && (
                  <div className="relative w-24 h-24 border rounded">
                    <Image
                      src={getImageUrl(existingMainImage)}
                      alt="Main"
                      layout="fill"
                      objectFit="cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveExistingImage(existingMainImage)
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5"
                    >
                      <XIcon size={14} />
                    </button>
                  </div>
                )}
                {existingGalleryImages.map((url) => (
                  <div key={url} className="relative w-24 h-24 border rounded">
                    <Image
                      src={getImageUrl(url)}
                      alt="Gallery"
                      layout="fill"
                      objectFit="cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(url)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5"
                    >
                      <XIcon size={14} />
                    </button>
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
            <Button type="submit">
              {product ? "Save Changes" : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// =================================================================
// --- Main Products Page Component ---
// =================================================================
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allSubCategories, setAllSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [prodRes, catRes, subCatRes] = await Promise.all([
        fetch(`${API_URL}/products`),
        fetch(`${API_URL}/categories`),
        fetch(`${API_URL}/subcategories`),
      ]);
      if (!prodRes.ok || !catRes.ok || !subCatRes.ok)
        throw new Error("Failed to fetch initial data");

      setProducts(await prodRes.json());
      setCategories(await catRes.json());
      setAllSubCategories(await subCatRes.json());
    } catch (error) {
      console.error("Fetch data error:", error);
      alert("Failed to load data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenDialog = (product: Product | null = null) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    fetchData(); // Refetch all data after a save
  };

  const handleDelete = async (productId: number) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    )
      return;
    try {
      const res = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(await res.text());
      await revalidateProducts();
      fetchData();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" onClick={() => handleOpenDialog()}>
            Add Product
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Sub-Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={getImageUrl(product.image)}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.category_name}</TableCell>
                    <TableCell>{product.subcategory_name || "N/A"}</TableCell>
                    <TableCell>
                      {typeof product.price === "number"
                        ? `₹${product.price}`
                        : product.price}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onSelect={() => handleOpenDialog(product)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => handleDelete(product.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        product={selectedProduct}
        categories={categories}
        allSubCategories={allSubCategories}
      />
    </main>
  );
}
