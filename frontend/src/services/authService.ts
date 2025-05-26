import { apiClient } from "../utils/api";
import type { User, UpdateProfileData } from "../types";

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    user: User;
    token: string;
}

// Cache para evitar múltiples requests del mismo usuario
const userCache = new Map<string, { user: User; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const authService = {
    async register(data: RegisterData): Promise<User> {
        console.log("📝 Registering user:", data.username);
        const response = await apiClient.post<AuthResponse>(
            "/api/auth/register",
            data
        );

        // Cache the user by token (since we don't have userId yet)
        const cacheKey = `token-${response.token}`;
        userCache.set(cacheKey, { user: response.user, timestamp: Date.now() });

        return response.user;
    },

    async login(
        credentials: LoginCredentials
    ): Promise<{ user: User; token: string }> {
        console.log("🔐 Attempting login for:", credentials.username);

        const response = await apiClient.post<AuthResponse>(
            "/api/auth/login",
            credentials
        );

        console.log(
            "✅ Login successful for:",
            response.user.username,
            "Admin:",
            response.user.isAdmin
        );

        // Cache the user by token
        const cacheKey = `token-${response.token}`;
        userCache.set(cacheKey, { user: response.user, timestamp: Date.now() });

        return { user: response.user, token: response.token };
    },

    async getCurrentUser(): Promise<User> {
        const token = localStorage.getItem("authToken");
        if (!token) {
            throw new Error("No token found");
        }

        console.log("👤 Fetching current user with token");

        // Check cache first using token
        const cacheKey = `token-${token}`;
        const cached = userCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            console.log("📦 Using cached user data");
            return cached.user;
        }

        // Use the /me endpoint which uses the token to identify the user
        const user = await apiClient.get<User>("/api/auth/me");

        // Update cache
        userCache.set(cacheKey, { user, timestamp: Date.now() });

        return user;
    },

    async updateProfile(
        userId: number,
        data: UpdateProfileData
    ): Promise<User> {
        console.log("📝 Updating profile for user:", userId);
        const user = await apiClient.put<User>(`/api/users/${userId}`, data);

        // Update cache - clear all entries since user data changed
        userCache.clear();

        return user;
    },

    clearCache() {
        userCache.clear();
    },
};
