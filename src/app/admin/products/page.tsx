"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DialogDescription,
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

function getImageUrl(path?: string) {
  if (!path) return "/placeholder.svg";
  if (path.startsWith("http") || path.startsWith("/uploads")) return path;
  // This logic might need adjustment if API_URL is a full URL in production
  return `${API_URL}/${path.replace(/^\//, "")}`;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number | string;
  subcategory_id?: number; // from DB
  category_id: number; // from DB
  image?: string;
  images?: string[] | string;
  included_items?: string[] | string;
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

function ProductDialog({
  product,
  open,
  onOpenChange,
  onSave,
  categories,
  allSubCategories,
}: {
  product?: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
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

  // Memoized list of available sub-categories based on the selected category
  const availableSubCategories = useMemo(() => {
    if (!formData.categoryId) return [];
    return allSubCategories.filter(
      (sc) => String(sc.category_id) === formData.categoryId
    );
  }, [formData.categoryId, allSubCategories]);

  // Effect to populate form when editing a product
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

      // --- THIS IS THE FIX ---
      // It now safely handles cases where product.images might not be an array
      const galleryImagesData = product.images;
      if (Array.isArray(galleryImagesData)) {
        setExistingGalleryImages(galleryImagesData);
      } else {
        setExistingGalleryImages([]);
      }
      // --- END OF FIX ---
    } else {
      // Reset form for new product
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
    // Reset file inputs and removal list on open/close or product change
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
        // Reset sub-category if category changes
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

    // Only append subcategory if one is selected
    if (formData.subCategoryId) {
      submissionData.append("subcategory_id", formData.subCategoryId);
    }

    submissionData.append(
      "included_items",
      JSON.stringify(
        formData.included_items
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      )
    );

    // Append new image files
    if (mainImageFile) submissionData.append("image", mainImageFile);
    galleryImageFiles.forEach((file) => submissionData.append("images", file));

    // Append existing image URLs that are being kept
    if (existingMainImage)
      submissionData.append("existing_images", existingMainImage);
    existingGalleryImages.forEach((url) =>
      submissionData.append("existing_images", url)
    );

    // Append images to remove
    if (imagesToRemove.length > 0) {
      submissionData.append("images_to_remove", JSON.stringify(imagesToRemove));
    }

    const url = product
      ? `${API_URL}/products/${product.id}`
      : `${API_URL}/products`;
    const method = product ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: submissionData });
      if (!res.ok) throw new Error(await res.text());
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
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Description
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="price" className="text-right">
              Price
            </label>
            <Input
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="e.g., 29.99 or 'Price on Request'"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category" className="text-right">
              Category
            </label>
            <Select
              value={formData.categoryId}
              onValueChange={handleSelectChange("categoryId")}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {availableSubCategories.length > 0 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="subcategory" className="text-right">
                Sub Category
              </label>
              <Select
                value={formData.subCategoryId}
                onValueChange={handleSelectChange("subCategoryId")}
                disabled={availableSubCategories.length === 0}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a sub-category" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubCategories.map((subCat) => (
                    <SelectItem key={subCat.id} value={String(subCat.id)}>
                      {subCat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="packaging" className="text-right">
              Packaging
            </label>
            <Input
              id="packaging"
              value={formData.packaging}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="includedItems" className="text-right">
              Included Items
            </label>
            <Input
              id="includedItems"
              value={formData.included_items}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="item1, item2, item3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="mainImage" className="text-right">
              Main Image
            </label>
            <Input
              id="mainImage"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setMainImageFile(e.target.files ? e.target.files[0] : null)
              }
              className="col-span-3"
            />
          </div>
          {existingMainImage && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-start-2 col-span-3">
                <Image
                  src={getImageUrl(existingMainImage)}
                  alt="Existing main image"
                  width={80}
                  height={80}
                  className="rounded-md"
                />
              </div>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="galleryImages" className="text-right">
              Gallery Images
            </label>
            <Input
              id="galleryImages"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setGalleryImageFiles(Array.from(e.target.files || []))
              }
              className="col-span-3"
            />
          </div>
          {existingGalleryImages.length > 0 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-start-2 col-span-3 flex gap-2 flex-wrap">
                {existingGalleryImages.map((url, index) => (
                  <Image
                    key={index}
                    src={getImageUrl(url)}
                    alt={`Existing gallery image ${index + 1}`}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit">
              {product ? "Save Changes" : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  productName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  productName: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            product &quot;{productName}&quot;.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allSubCategories, setAllSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

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

      const productsData = await prodRes.json();
      const categoriesData = await catRes.json();
      const subCategoriesData = await subCatRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
      setAllSubCategories(subCategoriesData);
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

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      const res = await fetch(`${API_URL}/products/${productToDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchData();
        setIsDeleteDialogOpen(false);
        setProductToDelete(null);
      } else {
        alert("Failed to delete product.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </div>
            <Button onClick={() => handleOpenDialog()}>Add New Product</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category / Path</TableHead>
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
                    <TableCell>
                      {typeof product.price === "number"
                        ? `$${product.price.toFixed(2)}`
                        : product.price}
                    </TableCell>
                    <TableCell>
                      {product.category_name}
                      {product.subcategory_name
                        ? ` / ${product.subcategory_name}`
                        : ""}
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
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleOpenDialog(product)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(product)}
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
        product={selectedProduct}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={fetchData}
        categories={categories}
        allSubCategories={allSubCategories}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        productName={productToDelete?.name || ""}
      />
    </>
  );
}
