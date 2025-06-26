"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { revalidateCategories } from "@/app/actions";
import { getApiUrl } from "@/lib/utils";

// --- Type Definitions ---
interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  category_id: number;
  image?: string;
}

// --- Category Dialog ---
function CategoryDialog({
  category,
  open,
  onOpenChange,
  onSave,
}: {
  category?: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setExistingImageUrl(category.image);
    } else {
      setName("");
      setDescription("");
      setExistingImageUrl(undefined);
    }
    setImageFile(null);
  }, [category, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);
    else if (existingImageUrl) formData.append("image", existingImageUrl);

    const apiUrl = getApiUrl();
    const url = category
      ? `${apiUrl}/api/categories/${category.id}`
      : `${apiUrl}/api/categories`;
    const method = category ? "PUT" : "POST";
    const res = await fetch(url, { method, body: formData });

    if (res.ok) {
      await revalidateCategories();
      onSave();
    } else console.error("Failed to save category");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Input
            placeholder="Name"
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
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          {existingImageUrl && !imageFile && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image
                src={existingImageUrl}
                alt="Current Image"
                width={40}
                height={40}
                className="rounded"
              />
              <span>{existingImageUrl.split("/").pop()}</span>
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

// --- SubCategory Dialog ---
function SubCategoryDialog({
  subcategory,
  open,
  onOpenChange,
  onSave,
  categories,
  parentCategoryId,
}: {
  subcategory?: SubCategory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  categories: Category[];
  parentCategoryId?: number; // Used for "Add" to pre-select category
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>(
    undefined
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(parentCategoryId?.toString());

  useEffect(() => {
    if (subcategory) {
      setName(subcategory.name);
      setDescription(subcategory.description);
      setSelectedCategoryId(subcategory.category_id.toString());
      setExistingImageUrl(subcategory.image);
    } else {
      // For a new subcategory
      setName("");
      setDescription("");
      setSelectedCategoryId(parentCategoryId?.toString());
      setExistingImageUrl(undefined);
    }
    setImageFile(null);
  }, [subcategory, open, parentCategoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategoryId) {
      alert("Please select a parent category.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category_id", selectedCategoryId);
    if (imageFile) formData.append("image", imageFile);
    else if (existingImageUrl) formData.append("image", existingImageUrl);

    const apiUrl = getApiUrl();
    const url = subcategory
      ? `${apiUrl}/api/subcategories/${subcategory.id}`
      : `${apiUrl}/api/subcategories`;
    const method = subcategory ? "PUT" : "POST";
    const res = await fetch(url, { method, body: formData });

    if (res.ok) {
      await revalidateCategories();
      onSave();
    } else {
      console.error("Failed to save subcategory");
      alert("Failed to save subcategory.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {subcategory ? "Edit Sub-Category" : "Add New Sub-Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Select
            onValueChange={setSelectedCategoryId}
            value={selectedCategoryId}
            required
            disabled={!!subcategory} // Disable if editing, as parent shouldn't change
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Parent Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Sub-Category Name"
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
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          {existingImageUrl && !imageFile && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image
                src={existingImageUrl}
                alt="Current Image"
                width={40}
                height={40}
                className="rounded"
              />
              <span>{existingImageUrl.split("/").pop()}</span>
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
export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubCategoryDialogOpen, setSubCategoryDialogOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] =
    useState<SubCategory | null>(null);
  // Track which category we're adding a subcategory to
  const [parentCategoryForNewSub, setParentCategoryForNewSub] = useState<
    number | undefined
  >(undefined);

  const fetchData = useCallback(async () => {
    try {
      const apiUrl = getApiUrl();
      const [catRes, subCatRes] = await Promise.all([
        fetch(`${apiUrl}/api/categories`),
        fetch(`${apiUrl}/api/subcategories`),
      ]);
      setCategories(await catRes.json());
      setSubCategories(await subCatRes.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = () => {
    fetchData();
    setCategoryDialogOpen(false);
    setEditingCategory(null);
    setSubCategoryDialogOpen(false);
    setEditingSubCategory(null);
  };

  const handleDelete = async (type: "category" | "subcategory", id: number) => {
    const entity = type === "category" ? "categories" : "subcategories";
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/${entity}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await revalidateCategories();
        fetchData();
      } else {
        const err = await res.json();
        console.error("Delete failed:", err);
        alert(`Error deleting: ${err.error || "Item may be in use."}`);
      }
    } catch (error) {
      console.error("An error occurred during deletion:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <>
      <CategoryDialog
        open={isCategoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        onSave={handleSave}
        category={editingCategory}
      />
      <SubCategoryDialog
        open={isSubCategoryDialogOpen}
        onOpenChange={setSubCategoryDialogOpen}
        onSave={handleSave}
        subcategory={editingSubCategory}
        categories={categories}
        parentCategoryId={
          editingSubCategory?.category_id || parentCategoryForNewSub
        }
      />

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Categories & Sub-Categories</h1>
            <p className="text-muted-foreground">
              Manage your store&apos;s structure.
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingCategory(null);
              setCategoryDialogOpen(true);
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Category
          </Button>
        </div>

        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingSubCategory(null);
                      setParentCategoryForNewSub(category.id); // Set parent for new sub
                      setSubCategoryDialogOpen(true);
                    }}
                  >
                    Add Sub-Category
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingCategory(category);
                          setCategoryDialogOpen(true);
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete("category", category.id)}
                        className="text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2">Sub-Categories</h4>
              <div className="space-y-2">
                {subCategories
                  .filter((sub) => sub.category_id === category.id)
                  .map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100"
                    >
                      <span>{sub.name}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingSubCategory(sub);
                              setSubCategoryDialogOpen(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete("subcategory", sub.id)}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
