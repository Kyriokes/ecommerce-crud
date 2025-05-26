export interface User {
    id: number;
    username: string;
    email: string;
    provider: "CREDENTIALS" | "GOOGLE";
    isAdmin: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    imageUrl?: string;
    category?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    product: Product;
}

export interface ApiError {
    message: string;
    errors?: Array<{
        field: string;
        message: string;
    }>;
}

export interface UpdateProfileData {
    username: string;
    email: string;
    password?: string;
}
