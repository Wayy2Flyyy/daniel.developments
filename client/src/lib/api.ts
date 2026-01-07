import { Product, Order } from "@shared/schema";

// Allow configuring API base for deployments (e.g., Vercel static front-end)
const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`);
  if (!response.ok) {
    throw new Error("Product not found");
  }
  return response.json();
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products/category/${encodeURIComponent(category)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products by category");
  }
  return response.json();
}

export async function createOrder(orderData: {
  email: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}): Promise<Order> {
  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create order");
  }
  
  return response.json();
}
