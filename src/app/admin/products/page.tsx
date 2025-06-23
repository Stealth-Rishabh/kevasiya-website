"use client";

import { useState, useEffect, useCallback } from "react";
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

function getImageUrl(path?: string) {
  if (!path) return "/placeholder.svg";
  if (path.startsWith("http")) return path;
  const cleanedPath = path.startsWith("/") ? path.substring(1) : path;
  return `${API_URL}/${cleanedPath}`;
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
  const [isFetchingSubcategories, setIsFetchingSubcategories] = useState(false);

  const fetchSubCategories = useCallback(async (selectedCategoryId: string) => {
    if (!selectedCategoryId) {
      setAvailableSubCategories([]);
      return;
    }
    setIsFetchingSubcategories(true);
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
    } finally {
      setIsFetchingSubcategories(false);
    }
  }, []);

  useEffect(() => {
    const initializeForm = async () => {
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

        const currentCategoryId = String(product.category_id);
        setCategoryId(currentCategoryId);

        await fetchSubCategories(currentCategoryId);

        const currentSubCategoryId = product.subcategory_id;
        if (currentSubCategoryId) {
          setSubCategoryId(String(currentSubCategoryId));
        } else {
          setSubCategoryId(undefined);
        }

        setExistingMainImageUrl(product.image);
        setExistingGalleryImageUrls(
          Array.isArray(product.images) ? product.images : []
        );
      } else {
        // Reset form for new product
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
    };

    if (open) {
      initializeForm();
    }
  }, [product, open, fetchSubCategories]);

  const handleCategoryChange = (selectedCategoryId: string) => {
    setCategoryId(selectedCategoryId);
    setSubCategoryId(undefined); // Reset subcategory when category changes
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
      !isNaN(Number(price)) ||
      price.trim().toLowerCase() === "price on request";
    if (!isPriceValid || price.trim() === "") {
      alert("Price must be a number or the exact text 'Price on Request'.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("price", price);

    formData.append("category_id", categoryId);
    if (subCategoryId) {
      formData.append("subcategory_id", subCategoryId);
    }

    formData.append("packaging", packaging);
    formData.append(
      "included_items",
      JSON.stringify(includedItems.split(",").map((s) => s.trim()))
    );

    if (mainImage) {
      formData.append("image", mainImage);
    } else if (product?.id && existingMainImageUrl) {
      // For updates, if no new image is selected, send back the existing path
      formData.append("image", existingMainImageUrl);
    }

    if (galleryImages) {
      Array.from(galleryImages).forEach((file) => {
        formData.append("images", file);
      });
    }
    if (product?.id && !galleryImages && existingGalleryImageUrls.length > 0) {
      // For updates, send back existing gallery if no new ones are added
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
      alert(
        `Failed to save product. Error: ${errorData.message || "Unknown error"}`
      );
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
              placeholder="e.g., 29.99 or 'Price on Request'"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category" className="text-right">
              Category
            </label>
            <Select value={categoryId} onValueChange={handleCategoryChange}>
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
          {isFetchingSubcategories ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-start-2 col-span-3">
                Loading subcategories...
              </div>
            </div>
          ) : (
            availableSubCategories.length > 0 && (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="subcategory" className="text-right">
                  Sub Category
                </label>
                <Select value={subCategoryId} onValueChange={setSubCategoryId}>
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
            )
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="packaging" className="text-right">
              Packaging
            </label>
            <Input
              id="packaging"
              value={packaging}
              onChange={(e) => setPackaging(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="includedItems" className="text-right">
              Included Items
            </label>
            <Input
              id="includedItems"
              value={includedItems}
              onChange={(e) => setIncludedItems(e.target.value)}
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
              onChange={(e) => setMainImage(e.target.files?.[0] || null)}
              className="col-span-3"
            />
          </div>
          {existingMainImageUrl && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-start-2 col-span-3">
                <Image
                  src={getImageUrl(existingMainImageUrl)}
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
              multiple
              onChange={(e) => setGalleryImages(e.target.files)}
              className="col-span-3"
            />
          </div>
          {existingGalleryImageUrls.length > 0 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-start-2 col-span-3 flex gap-2 flex-wrap">
                {existingGalleryImageUrls.map((url, index) => (
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleSave = () => {
    fetchProducts(); // Refetch products after saving
  };

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
        fetchProducts();
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
              {products.map((product) => (
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
                  <TableCell className="font-medium">{product.name}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ProductDialog
        product={selectedProduct}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        categories={categories}
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
