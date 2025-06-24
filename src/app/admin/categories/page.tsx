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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

// --- Reusable Dialog Components ---
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
      ? `${apiUrl}/categories/${category.id}`
      : `${apiUrl}/categories`;
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
// NOTE: A similar dialog for SubCategory would be needed for full functionality.

// --- Main Page Component ---
export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const apiUrl = getApiUrl();
      const [catRes, subCatRes] = await Promise.all([
        fetch(`${apiUrl}/categories`),
        fetch(`${apiUrl}/subcategories`),
      ]);

      const rawCategories = await catRes.json();
      const rawSubCategories = await subCatRes.json();

      const createAbsoluteUrl = (url: string | undefined | null) => {
        if (!url) return "";
        if (url.startsWith("http")) return url;
        return `${apiUrl}${url}`;
      };

      setCategories(
        rawCategories.map((cat: Category) => ({
          ...cat,
          image: createAbsoluteUrl(cat.image),
        }))
      );
      setSubCategories(
        rawSubCategories.map((sub: SubCategory) => ({
          ...sub,
          image: createAbsoluteUrl(sub.image),
        }))
      );
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
  };

  return (
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
                {/* Add Sub-Category button would go here */}
                <Button variant="outline" size="sm">
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
                    <DropdownMenuItem className="text-red-600">
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
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                  >
                    <p>{sub.name}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              {subCategories.filter((sub) => sub.category_id === category.id)
                .length === 0 && (
                <p className="text-sm text-muted-foreground p-2">
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
        onOpenChange={setCategoryDialogOpen}
        onSave={handleSave}
      />
    </div>
  );
}
