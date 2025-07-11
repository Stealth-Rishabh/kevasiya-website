"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Package2, Boxes, MessageSquare } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboardActive = pathname === "/admin";
  const isCategoriesActive = pathname.startsWith("/admin/categories");
  const isProductsActive = pathname.startsWith("/admin/products");
  const isSubmissionsActive = pathname.startsWith("/admin/submissions");

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Kevasiya Inc</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/admin"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  isDashboardActive
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/categories"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  isCategoriesActive
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Boxes className="h-4 w-4" />
                Categories
              </Link>
              <Link
                href="/admin/products"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  isProductsActive
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Package className="h-4 w-4" />
                Products{" "}
              </Link>
              <Link
                href="/admin/submissions"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  isSubmissionsActive
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                Submissions
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {/* We can add a header here if needed in the future */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
        <Toaster />
      </div>
    </div>
  );
}
