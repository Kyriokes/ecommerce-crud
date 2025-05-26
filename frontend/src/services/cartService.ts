import { apiClient } from "../utils/api";
import type { CartItem } from "../types";

export interface AddToCartData {
    productId: number;
    quantity: number;
}

export const cartService = {
    async getCart(): Promise<CartItem[]> {
        console.log("🛒 Fetching cart");
        return apiClient.get<CartItem[]>("/api/cart");
    },

    async addToCart(data: AddToCartData): Promise<CartItem> {
        console.log("➕ Adding to cart:", data);
        return apiClient.post<CartItem>("/api/cart", data);
    },

    async updateCartItem(id: number, quantity: number): Promise<CartItem> {
        console.log("📝 Updating cart item:", id, "quantity:", quantity);
        return apiClient.put<CartItem>(`/api/cart/${id}`, { quantity });
    },

    async removeFromCart(id: number): Promise<{ message: string }> {
        console.log("🗑️ Removing from cart:", id);
        return apiClient.delete<{ message: string }>(`/api/cart/${id}`);
    },
};
