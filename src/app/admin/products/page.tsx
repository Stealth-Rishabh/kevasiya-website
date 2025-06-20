"use client";

import { useState, useEffect } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  subCategoryId: number;
  image?: string;
  images?: string[] | string; // Can be string from server
  included_items?: string[] | string; // Can be string from server
  packaging?: string;
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
  subCategories,
}: {
  product?: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  subCategories: SubCategory[];
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [subCategoryId, setSubCategoryId] = useState<string | undefined>(
    undefined
  );
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
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(String(product.price));
      setSubCategoryId(String(product.subCategoryId));
      setPackaging(product.packaging || "");
      // Ensure included_items is always an array before joining
      setIncludedItems(
        Array.isArray(product.included_items)
          ? product.included_items.join(", ")
          : ""
      );
      setExistingMainImageUrl(product.image);
      // Ensure images is always an array
      setExistingGalleryImageUrls(
        Array.isArray(product.images) ? product.images : []
      );
    } else {
      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setSubCategoryId(undefined);
      setPackaging("");
      setIncludedItems("");
      setExistingMainImageUrl(undefined);
      setExistingGalleryImageUrls([]);
    }
    setMainImage(null);
    setGalleryImages(null);
  }, [product, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[?']/g, "");
    if (!subCategoryId) {
      alert("Please select a sub-category.");
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
    formData.append("subCategoryId", subCategoryId);
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
    // When updating, we need to inform the backend about existing images
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
      console.error("Failed to save product");
      alert("Failed to save product. Check console for details.");
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
          <Select onValueChange={setSubCategoryId} value={subCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Sub-Category" />
            </SelectTrigger>
            <SelectContent>
              {subCategories.map((sub) => (
                <SelectItem key={sub.id} value={String(sub.id)}>
                  {sub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (res.ok) {
        const data: Product[] = await res.json();
        // Safely parse JSON string fields into arrays
        const parsedProducts = data.map((p) => ({
          ...p,
          included_items:
            typeof p.included_items === "string"
              ? JSON.parse(p.included_items)
              : p.included_items || [],
          images:
            typeof p.images === "string"
              ? JSON.parse(p.images)
              : p.images || [],
        }));
        setProducts(parsedProducts);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/subcategories`);
      if (res.ok) setSubCategories(await res.json());
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSubCategories();
  }, []);

  const handleOpenDialog = (product: Product | null = null) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchProducts(); // Refresh list
    } else {
      console.error("Failed to delete product");
      alert("Failed to delete product.");
    }
  };

  return (
    <>
      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={fetchProducts}
        product={editingProduct}
        subCategories={subCategories}
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
                <TableHead>Sub-Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell>
                    <img
                      src={prod.image || `https://via.placeholder.com/40`}
                      alt={prod.name}
                      className="h-10 w-10 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{prod.name}</TableCell>
                  <TableCell>
                    {typeof prod.price === "number"
                      ? `₹${prod.price}`
                      : prod.price}
                  </TableCell>
                  <TableCell>
                    {subCategories.find((s) => s.id === prod.subCategoryId)
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
