import { apiClient } from "../utils/api";
import type { Product } from "../types";

export const productService = {
    async getAllProducts(): Promise<Product[]> {
        return apiClient.get<Product[]>("/api/products");
    },

    async getProductById(id: number): Promise<Product> {
        return apiClient.get<Product>(`/api/products/${id}`);
    },

    async createProduct(productData: Partial<Product>): Promise<Product> {
        return apiClient.post<Product>("/api/products", productData);
    },

    async updateProduct(
        id: number,
        productData: Partial<Product>
    ): Promise<Product> {
        return apiClient.put<Product>(`/api/products/${id}`, productData);
    },

    async deleteProduct(id: number): Promise<{ message: string }> {
        return apiClient.delete<{ message: string }>(`/api/products/${id}`);
    },
};
