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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// --- Interfaces matching the database ---
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
  categoryId: number;
  image?: string; // Image is optional for subcategories
}

// --- Reusable Dialog Components ---

// Dialog for Adding / Editing a Category
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
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setExistingImageUrl(category.image);
      setImage(null);
    } else {
      setName("");
      setDescription("");
      setExistingImageUrl(undefined);
      setImage(null);
    }
  }, [category, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[?']/g, "");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    } else if (existingImageUrl) {
      formData.append("image", existingImageUrl);
    }

    const url = category
      ? `${API_URL}/categories/${category.id}`
      : `${API_URL}/categories`;
    const method = category ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: formData, // No 'Content-Type' header needed; browser sets it for FormData
    });

    if (res.ok) {
      onSave();
      onOpenChange(false);
    } else {
      console.error("Failed to save category");
      // You can add a user-facing error message here
    }
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
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
          {existingImageUrl && !image && (
            <div className="text-sm text-muted-foreground">
              Current image:{" "}
              <a
                href={existingImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {existingImageUrl}
              </a>
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

// Dialog for Adding / Editing a SubCategory
function SubCategoryDialog({
  subcategory,
  selectedCategoryId,
  open,
  onOpenChange,
  onSave,
}: {
  subcategory?: SubCategory | null;
  selectedCategoryId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (subcategory) {
      setName(subcategory.name);
      setDescription(subcategory.description);
      setExistingImageUrl(subcategory.image);
      setImage(null);
    } else {
      setName("");
      setDescription("");
      setExistingImageUrl(undefined);
      setImage(null);
    }
  }, [subcategory, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[?']/g, "");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("categoryId", String(selectedCategoryId));
    if (image) {
      formData.append("image", image);
    } else if (existingImageUrl) {
      formData.append("image", existingImageUrl);
    }

    const url = subcategory
      ? `${API_URL}/subcategories/${subcategory.id}`
      : `${API_URL}/subcategories`;
    const method = subcategory ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: formData,
    });

    if (res.ok) {
      onSave();
      onOpenChange(false);
    } else {
      console.error("Failed to save subcategory");
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
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
          {existingImageUrl && !image && (
            <div className="text-sm text-muted-foreground">
              Current image:{" "}
              <a
                href={existingImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {existingImageUrl}
              </a>
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

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  name: string;
}

// Reusable component for Delete confirmation
function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  name,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            <strong>{name}</strong> category and all its related sub-categories
            and products.
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

// --- Main Page Component ---
export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  // Dialog states
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubCategoryDialogOpen, setIsSubCategoryDialogOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] =
    useState<SubCategory | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: "categories" | "subcategories";
    id: number;
    name: string;
  } | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (res.ok) setCategories(await res.json());
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchSubCategories = async (categoryId: number) => {
    try {
      const res = await fetch(
        `${API_URL}/subcategories?categoryId=${categoryId}`
      );
      if (res.ok) setSubCategories(await res.json());
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories(selectedCategory.id);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const handleOpenCategoryDialog = (category: Category | null = null) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const handleOpenSubCategoryDialog = (
    subcategory: SubCategory | null = null
  ) => {
    setEditingSubCategory(subcategory);
    setIsSubCategoryDialogOpen(true);
  };

  const handleOpenDeleteDialog = (
    type: "categories" | "subcategories",
    item: Category | SubCategory
  ) => {
    setItemToDelete({ type, id: item.id, name: item.name });
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    const { type, id } = itemToDelete;

    const res = await fetch(`${API_URL}/${type}/${id}`, { method: "DELETE" });

    if (res.ok) {
      if (type === "categories") {
        fetchCategories();
        setSelectedCategory(null);
      } else if (selectedCategory) {
        fetchSubCategories(selectedCategory.id);
      }
    } else {
      console.error("Failed to delete item");
    }

    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return (
    <>
      <CategoryDialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        onSave={fetchCategories}
        category={editingCategory}
      />
      {selectedCategory && (
        <SubCategoryDialog
          open={isSubCategoryDialogOpen}
          onOpenChange={setIsSubCategoryDialogOpen}
          onSave={() => fetchSubCategories(selectedCategory.id)}
          subcategory={editingSubCategory}
          selectedCategoryId={selectedCategory.id}
        />
      )}
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        name={itemToDelete?.name || ""}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Categories</CardTitle>
            <CardDescription>Add, edit, or select a category.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleOpenCategoryDialog()} className="mb-4">
              Add Category
            </Button>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    selectedCategory?.id === cat.id ? "bg-muted" : ""
                  }`}
                >
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedCategory(cat)}
                    className="flex-grow justify-start"
                  >
                    {cat.name}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleOpenCategoryDialog(cat)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleOpenDeleteDialog("categories", cat)
                        }
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

        <Card>
          <CardHeader>
            <CardTitle>Manage Sub-Categories</CardTitle>
            <CardDescription>
              {selectedCategory
                ? `For ${selectedCategory.name}`
                : "Select a category first"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedCategory && (
              <Button
                onClick={() => handleOpenSubCategoryDialog()}
                className="mb-4"
              >
                Add Sub-Category
              </Button>
            )}
            <div className="flex flex-col gap-2">
              {subCategories.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-2 border rounded-lg"
                >
                  <span>{sub.name}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleOpenSubCategoryDialog(sub)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleOpenDeleteDialog("subcategories", sub)
                        }
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
      </div>
    </>
  );
}
