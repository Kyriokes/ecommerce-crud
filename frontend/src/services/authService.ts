import { apiClient } from "../utils/api";
import { getAuthToken } from "../utils/auth";
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
        console.log("📝 [AUTH_SERVICE] Registering user:", data.username);
        const response = await apiClient.post<AuthResponse>(
            "/api/auth/register",
            data
        );

        // Cache the user by token
        const cacheKey = `token-${response.token}`;
        userCache.set(cacheKey, { user: response.user, timestamp: Date.now() });
        console.log("💾 [AUTH_SERVICE] User cached after registration");

        return response.user;
    },

    async login(
        credentials: LoginCredentials
    ): Promise<{ user: User; token: string }> {
        console.log(
            "🔐 [AUTH_SERVICE] Attempting login for:",
            credentials.username
        );

        const response = await apiClient.post<AuthResponse>(
            "/api/auth/login",
            credentials
        );

        console.log(
            "✅ [AUTH_SERVICE] Login successful for:",
            response.user.username,
            "Admin:",
            response.user.isAdmin
        );

        // Cache the user by token
        const cacheKey = `token-${response.token}`;
        userCache.set(cacheKey, { user: response.user, timestamp: Date.now() });
        console.log("💾 [AUTH_SERVICE] User cached after login");

        return { user: response.user, token: response.token };
    },

    async getCurrentUser(): Promise<User> {
        const token = getAuthToken();
        if (!token) {
            console.error(
                "💥 [AUTH_SERVICE] No token found for getCurrentUser"
            );
            throw new Error("No token found");
        }

        console.log("👤 [AUTH_SERVICE] Fetching current user with token");

        // Check cache first using token
        const cacheKey = `token-${token}`;
        const cached = userCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            console.log("📦 [AUTH_SERVICE] Using cached user data");
            return cached.user;
        }

        console.log("🌐 [AUTH_SERVICE] Cache miss, fetching from API");

        try {
            // Use the /me endpoint which uses the token to identify the user
            const user = await apiClient.get<User>("/api/auth/me");

            // Update cache
            userCache.set(cacheKey, { user, timestamp: Date.now() });
            console.log("💾 [AUTH_SERVICE] User data cached after API fetch");

            return user;
        } catch (error) {
            console.error(
                "💥 [AUTH_SERVICE] Error fetching current user:",
                error
            );
            // Clear cache on error
            userCache.delete(cacheKey);
            console.log("🧹 [AUTH_SERVICE] Cleared cache due to error");
            throw error;
        }
    },

    async updateProfile(
        userId: number,
        data: UpdateProfileData
    ): Promise<User> {
        console.log("📝 [AUTH_SERVICE] Updating profile for user:", userId);
        const user = await apiClient.put<User>(`/api/users/${userId}`, data);

        // Update cache - clear all entries since user data changed
        console.log(
            "🧹 [AUTH_SERVICE] Clearing all cache after profile update"
        );
        userCache.clear();

        return user;
    },

    clearCache() {
        console.log("🧹 [AUTH_SERVICE] Clearing all cache");
        userCache.clear();
    },
};
