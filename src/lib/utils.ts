import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getApiUrl = () => {
  // If the code is running on the server, use the internal URL.
  // This is used for Server Components and API routes.
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || "http://localhost:5001";
  }
  // If the code is running in the browser, use the public URL.
  return process.env.NEXT_PUBLIC_API_URL || "";
};
