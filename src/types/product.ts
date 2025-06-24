export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
  category_id: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  included_items: string[] | null;
  packaging: string | null;
  image: string;
  images: string[] | null;
  thumbnail: string;
  category: Category;
  subcategory: SubCategory | null;
  category_id?: number;
  subcategory_id?: number;
}
