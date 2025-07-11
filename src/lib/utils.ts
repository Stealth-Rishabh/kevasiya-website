import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getApiUrl = () => {
  // If the code is running on the server, use the internal URL.
  // This is used for Server Components and API routes.
  if (typeof window === "undefined") {
    const internalApiUrl = process.env.INTERNAL_API_URL;
    if (!internalApiUrl) {
      console.warn(
        "INTERNAL_API_URL is not defined. Falling back to http://localhost:5001"
      );
    }
    // Server-side always uses the full base URL, and we append /api
    const serverUrl = `${internalApiUrl || "http://localhost:5001"}/api`;
    console.log("Server-side API URL:", serverUrl);
    return serverUrl;
  }

  // If the code is running in the browser, use the public URL.
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("NEXT_PUBLIC_API_URL from env:", publicApiUrl);

  if (!publicApiUrl) {
    console.warn("NEXT_PUBLIC_API_URL is not defined. Falling back to /api.");
  }

  // If the URL is a full HTTP address (like in local dev), append /api.
  if (publicApiUrl && publicApiUrl.startsWith("http")) {
    const clientUrl = `${publicApiUrl}/api`;
    console.log("Client-side API URL:", clientUrl);
    return clientUrl;
  }

  // Otherwise, assume it's a path like `/api` (for production) and return it as is.
  const fallbackUrl = publicApiUrl || "/api";
  console.log("Fallback API URL:", fallbackUrl);
  return fallbackUrl;
};
