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

// --- Reusable Dialog for Category ---
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

// --- Main Page Component ---
export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const apiUrl = getApiUrl();
      const [catRes, subCatRes] = await Promise.all([
        fetch(`${apiUrl}/api/categories`),
        fetch(`${apiUrl}/api/subcategories`),
      ]);
      const catData = await catRes.json();
      const subCatData = await subCatRes.json();
      setCategories(catData);
      setSubCategories(subCatData);
      // If a category was selected, refresh its data too
      if (selectedCategory) {
        setSelectedCategory(
          catData.find((c: Category) => c.id === selectedCategory.id) || null
        );
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = () => {
    fetchData();
    setCategoryDialogOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <Button
              size="sm"
              onClick={() => {
                setEditingCategory(null);
                setCategoryDialogOpen(true);
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </CardHeader>
          <CardContent>
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`p-2 rounded-md cursor-pointer hover:bg-muted ${
                  selectedCategory?.id === cat.id ? "bg-muted" : ""
                }`}
              >
                {cat.name}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        {selectedCategory && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedCategory.name}</CardTitle>
                  <CardDescription>
                    {selectedCategory.description}
                  </CardDescription>
                </div>
                {selectedCategory.image && (
                  <Image
                    src={selectedCategory.image}
                    alt={selectedCategory.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingCategory(selectedCategory);
                        setCategoryDialogOpen(true);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-bold mb-2">Sub-categories</h3>
              {subCategories
                .filter((sub) => sub.category_id === selectedCategory.id)
                .map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center gap-3">
                      {sub.image && (
                        <Image
                          src={sub.image}
                          alt={sub.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                      )}
                      <span>{sub.name}</span>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        )}
      </div>
      <CategoryDialog
        category={editingCategory}
        open={isCategoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        onSave={handleSave}
      />
    </div>
  );
}
