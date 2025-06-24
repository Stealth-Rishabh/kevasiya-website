"use client";

import { useState, useEffect, useCallback } from "react";
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
import { revalidateCategories, revalidateProducts } from "@/app/actions";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

function getImageUrl(path?: string) {
  if (!path) return "/placeholder.svg";
  const baseUrl =
    path.startsWith("http") || path.startsWith("/uploads")
      ? path
      : `${API_URL}/${path.replace(/^\//, "")}`;
  return `${baseUrl}?v=${new Date().getTime()}`;
}

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
    } else {
      setName("");
      setDescription("");
      setExistingImageUrl(undefined);
    }
    setImage(null);
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
    const res = await fetch(url, { method, body: formData });
    if (res.ok) {
      await revalidateCategories();
      await revalidateProducts();
      onSave();
      onOpenChange(false);
    } else {
      console.error("Failed to save category");
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image
                src={getImageUrl(existingImageUrl)}
                alt="Current Image"
                width={40}
                height={40}
                className="rounded"
              />
              <span>Current: {existingImageUrl.split("/").pop()}</span>
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
    } else {
      setName("");
      setDescription("");
      setExistingImageUrl(undefined);
    }
    setImage(null);
  }, [subcategory, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[?']/g, "");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("category_id", String(selectedCategoryId));
    if (image) {
      formData.append("image", image);
    } else if (existingImageUrl) {
      formData.append("image", existingImageUrl);
    }
    const url = subcategory
      ? `${API_URL}/subcategories/${subcategory.id}`
      : `${API_URL}/subcategories`;
    const method = subcategory ? "PUT" : "POST";
    const res = await fetch(url, { method, body: formData });
    if (res.ok) {
      await revalidateCategories();
      await revalidateProducts();
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image
                src={getImageUrl(existingImageUrl)}
                alt="Current Image"
                width={40}
                height={40}
                className="rounded"
              />
              <span>Current: {existingImageUrl.split("/").pop()}</span>
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
            This action cannot be undone. This will permanently delete the item:{" "}
            <strong>{name}</strong>.
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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategoriesMap, setSubCategoriesMap] = useState<
    Map<number, SubCategory[]>
  >(new Map());
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSubCategoryDialogOpen, setIsSubCategoryDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategoryForSub, setSelectedCategoryForSub] =
    useState<Category | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubCategory, setEditingSubCategory] =
    useState<SubCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "categories" | "subcategories";
    id: number;
    name: string;
  } | null>(null);

  const fetchSubCategories = useCallback(async (categoryId: number) => {
    try {
      const res = await fetch(
        `${API_URL}/subcategories?category_id=${categoryId}`
      );
      if (res.ok) {
        const subs: SubCategory[] = await res.json();
        setSubCategoriesMap((prevMap) =>
          new Map(prevMap).set(categoryId, subs)
        );
      } else {
        setSubCategoriesMap((prevMap) => new Map(prevMap).set(categoryId, []));
      }
    } catch (error) {
      console.error(`Failed to fetch subcategories for ${categoryId}:`, error);
      setSubCategoriesMap((prevMap) => new Map(prevMap).set(categoryId, []));
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (res.ok) {
        const cats: Category[] = await res.json();
        setCategories(cats);
        cats.forEach((cat) => fetchSubCategories(cat.id));
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, [fetchSubCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleOpenCategoryDialog = (category: Category | null = null) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const handleOpenSubCategoryDialog = (
    subcategory: SubCategory | null,
    categoryId: number
  ) => {
    setSelectedCategoryForSub({ id: categoryId } as Category);
    setEditingSubCategory(subcategory);
    setIsSubCategoryDialogOpen(true);
  };

  const handleOpenDeleteDialog = (
    type: "categories" | "subcategories",
    item: Category | SubCategory
  ) => {
    setDeleteTarget({ type, id: item.id, name: item.name });
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    const { type, id } = deleteTarget;
    try {
      const res = await fetch(`${API_URL}/${type}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Failed to delete ${type}`);
      await revalidateCategories();
      await revalidateProducts();
      fetchCategories();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Failed to delete ${type}.`);
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSave = () => {
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Categories & Sub-Categories</h1>
          <p className="text-muted-foreground">
            Manage your store&apos;s structure.
          </p>
        </div>
        <Button onClick={() => handleOpenCategoryDialog()}>
          Add New Category
        </Button>
      </div>

      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenSubCategoryDialog(null, category.id)}
                >
                  Add Sub-Category
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
                      onClick={() => handleOpenCategoryDialog(category)}
                    >
                      Edit Category
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() =>
                        handleOpenDeleteDialog("categories", category)
                      }
                    >
                      Delete Category
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h4 className="text-md font-semibold mb-2">Sub-Categories</h4>
            <div className="border rounded-md p-4 space-y-3">
              {(subCategoriesMap.get(category.id) || []).length > 0 ? (
                (subCategoriesMap.get(category.id) || []).map((sub) => (
                  <div
                    key={sub.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={getImageUrl(sub.image)}
                        alt={sub.name}
                        width={32}
                        height={32}
                        className="rounded-md object-cover"
                      />
                      <span className="font-medium">{sub.name}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            handleOpenSubCategoryDialog(sub, category.id)
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() =>
                            handleOpenDeleteDialog("subcategories", sub)
                          }
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No sub-categories yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <CategoryDialog
        category={editingCategory}
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        onSave={handleSave}
      />

      {selectedCategoryForSub && (
        <SubCategoryDialog
          subcategory={editingSubCategory}
          selectedCategoryId={selectedCategoryForSub.id}
          open={isSubCategoryDialogOpen}
          onOpenChange={setIsSubCategoryDialogOpen}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <DeleteDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          name={deleteTarget.name}
        />
      )}
    </div>
  );
}
