"use client";

import { useState, useEffect } from "react";
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
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number | string;
  subCategoryId?: number;
  categoryId: number;
  image?: string;
  images?: string[] | string;
  included_items?: string[] | string;
  packaging?: string;
}

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
}

function ProductDialog({
  product,
  open,
  onOpenChange,
  onSave,
  categories,
}: {
  product?: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  categories: Category[];
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [subCategoryId, setSubCategoryId] = useState<string | undefined>(
    undefined
  );
  const [availableSubCategories, setAvailableSubCategories] = useState<
    SubCategory[]
  >([]);
  const [packaging, setPackaging] = useState("");
  const [includedItems, setIncludedItems] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);

  const [existingMainImageUrl, setExistingMainImageUrl] = useState<
    string | undefined
  >(undefined);
  const [existingGalleryImageUrls, setExistingGalleryImageUrls] = useState<
    string[]
  >([]);

  useEffect(() => {
    const setFormForProduct = async (prod: Product) => {
      setCategoryId(String(prod.categoryId));
      await fetchSubCategories(String(prod.categoryId));
      if (prod.subCategoryId) {
        setSubCategoryId(String(prod.subCategoryId));
      }
      setExistingMainImageUrl(prod.image);
      setExistingGalleryImageUrls(
        Array.isArray(prod.images) ? prod.images : []
      );
      setFormForProduct(prod);
    };

    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(String(product.price));
      setPackaging(product.packaging || "");
      setIncludedItems(
        Array.isArray(product.included_items)
          ? product.included_items.join(", ")
          : ""
      );
      setFormForProduct(product);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setCategoryId(undefined);
      setSubCategoryId(undefined);
      setAvailableSubCategories([]);
      setPackaging("");
      setIncludedItems("");
      setExistingMainImageUrl(undefined);
      setExistingGalleryImageUrls([]);
    }
    setMainImage(null);
    setGalleryImages(null);
  }, [product, open]);

  const fetchSubCategories = async (selectedCategoryId: string) => {
    if (!selectedCategoryId) {
      setAvailableSubCategories([]);
      return;
    }
    try {
      const res = await fetch(
        `${API_URL}/subcategories?categoryId=${selectedCategoryId}`
      );
      if (res.ok) {
        const data = await res.json();
        setAvailableSubCategories(data);
      } else {
        setAvailableSubCategories([]);
      }
    } catch (error) {
      console.error("Failed to fetch sub-categories:", error);
      setAvailableSubCategories([]);
    }
  };

  const handleCategoryChange = (selectedCategoryId: string) => {
    setCategoryId(selectedCategoryId);
    setSubCategoryId(undefined);
    fetchSubCategories(selectedCategoryId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[?']/g, "");
    if (!categoryId) {
      alert("Please select a category.");
      return;
    }
    if (availableSubCategories.length > 0 && !subCategoryId) {
      alert("This category has sub-categories. Please select one.");
      return;
    }

    const isPriceValid =
      !isNaN(Number(price)) || price.trim() === "Price on Request";
    if (!isPriceValid || price.trim() === "") {
      alert("Price must be a number or the exact text 'Price on Request'.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("price", price);

    formData.append("categoryId", categoryId);
    if (subCategoryId) {
      formData.append("subCategoryId", subCategoryId);
    }

    formData.append("packaging", packaging);
    formData.append(
      "included_items",
      JSON.stringify(includedItems.split(",").map((s) => s.trim()))
    );

    if (mainImage) {
      formData.append("image", mainImage);
    } else if (existingMainImageUrl) {
      formData.append("image", existingMainImageUrl);
    }

    if (galleryImages) {
      Array.from(galleryImages).forEach((file) => {
        formData.append("images", file);
      });
    }
    if (!galleryImages && existingGalleryImageUrls.length > 0) {
      formData.append("images", JSON.stringify(existingGalleryImageUrls));
    }

    const url = product
      ? `${API_URL}/products/${product.id}`
      : `${API_URL}/products`;
    const method = product ? "PUT" : "POST";

    const res = await fetch(url, { method, body: formData });

    if (res.ok) {
      onSave();
      onOpenChange(false);
    } else {
      const errorData = await res.json();
      console.error("Failed to save product:", errorData);
      alert(`Failed to save product. Error: ${errorData.message}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "Make changes to the existing product."
              : "Provide details for the new product."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4"
        >
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Select onValueChange={handleCategoryChange} value={categoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {availableSubCategories.length > 0 && (
            <Select onValueChange={setSubCategoryId} value={subCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Sub-Category" />
              </SelectTrigger>
              <SelectContent>
                {availableSubCategories.map((sub) => (
                  <SelectItem key={sub.id} value={String(sub.id)}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Price (e.g., 499 or 'Price on Request')"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Input
            placeholder="Packaging (e.g., Gift Box)"
            value={packaging}
            onChange={(e) => setPackaging(e.target.value)}
          />
          <Textarea
            placeholder="Included Items (comma-separated)"
            value={includedItems}
            onChange={(e) => setIncludedItems(e.target.value)}
          />

          <div>
            <label className="text-sm font-medium">Main Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && setMainImage(e.target.files[0])
              }
            />
            {existingMainImageUrl && !mainImage && (
              <div className="text-sm text-muted-foreground mt-1">
                Current:{" "}
                <a
                  href={existingMainImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {existingMainImageUrl.split("/").pop()}
                </a>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Gallery Images</label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                e.target.files && setGalleryImages(e.target.files)
              }
            />
            {existingGalleryImageUrls.length > 0 && (
              <div className="text-sm text-muted-foreground mt-1">
                Keeps existing gallery images unless new ones are added.
              </div>
            )}
          </div>

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchAllSubCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchAllSubCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/subcategories`);
      if (res.ok) {
        const data = await res.json();
        setSubCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch all sub-categories:", error);
    }
  };

  const handleOpenDialog = (product: Product | null = null) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchProducts();
    } else {
      console.error("Failed to delete product");
      alert("Failed to delete product.");
    }
  };

  return (
    <>
      <ProductDialog
        product={selectedProduct}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={fetchProducts}
        categories={categories}
      />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Manage Products</CardTitle>
              <CardDescription>Add, edit, or delete products.</CardDescription>
            </div>
            <Button onClick={() => handleOpenDialog()}>Add Product</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category / Path</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell>
                    <Image
                      alt={prod.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={prod.image || "/placeholder.svg"}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{prod.name}</TableCell>
                  <TableCell>
                    {typeof prod.price === "number"
                      ? `₹${prod.price}`
                      : prod.price}
                  </TableCell>
                  <TableCell>
                    {prod.subCategoryId
                      ? subCategories.find((s) => s.id === prod.subCategoryId)
                          ?.name
                      : categories.find((c) => c.id === prod.categoryId)
                          ?.name || "N/A"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleOpenDialog(prod)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(prod.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
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
      </Card>
    </>
  );
}
