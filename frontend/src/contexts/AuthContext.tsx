"use client";

import type React from "react";
import { createContext, useState, useEffect, useCallback } from "react";
import {
    setCurrentUser,
    removeAuthToken,
    setAuthToken,
    getAuthToken,
} from "../utils/auth";
import { authService } from "../services/authService";
import type { User, UpdateProfileData } from "../types";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (
        username: string,
        password: string
    ) => Promise<{ success: boolean; error?: string }>;
    register: (
        username: string,
        email: string,
        password: string
    ) => Promise<{ success: boolean; error?: string }>;
    updateProfile: (
        data: UpdateProfileData
    ) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);

    console.log("🔄 [AUTH_CONTEXT] Rendering AuthProvider:", {
        hasUser: !!user,
        loading,
        initialized,
    });

    // Initialize auth only once
    useEffect(() => {
        if (initialized) {
            console.log("⏭️ [AUTH_CONTEXT] Already initialized, skipping");
            return;
        }

        console.log("🔐 [AUTH_CONTEXT] Starting initialization...");

        const initAuth = async () => {
            try {
                const token = getAuthToken();
                console.log(
                    "🎫 [AUTH_CONTEXT] Token check:",
                    token ? "Found" : "Not found"
                );

                if (token) {
                    console.log("👤 [AUTH_CONTEXT] Fetching user data...");
                    try {
                        const userData = await authService.getCurrentUser();
                        console.log(
                            "✅ [AUTH_CONTEXT] User data fetched:",
                            userData.username
                        );
                        setUser(userData);
                    } catch (error) {
                        console.error(
                            "💥 [AUTH_CONTEXT] Error fetching user:",
                            error
                        );
                        removeAuthToken();
                        setUser(null);
                    }
                } else {
                    console.log(
                        "❌ [AUTH_CONTEXT] No token, setting user to null"
                    );
                    setUser(null);
                }
            } catch (error) {
                console.error("💥 [AUTH_CONTEXT] Initialization error:", error);
                setUser(null);
            } finally {
                console.log("🏁 [AUTH_CONTEXT] Initialization complete");
                setLoading(false);
                setInitialized(true);
            }
        };

        initAuth();
    }, [initialized]);

    const login = useCallback(async (username: string, password: string) => {
        console.log("🔐 [AUTH_CONTEXT] Login attempt for:", username);
        try {
            const { user: loggedUser, token } = await authService.login({
                username,
                password,
            });

            setAuthToken(token);
            setCurrentUser({ id: loggedUser.id, email: loggedUser.email });
            setUser(loggedUser);

            console.log("✅ [AUTH_CONTEXT] Login successful");
            return { success: true };
        } catch (error) {
            console.error("💥 [AUTH_CONTEXT] Login failed:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Login failed",
            };
        }
    }, []);

    const register = useCallback(
        async (username: string, email: string, password: string) => {
            console.log("📝 [AUTH_CONTEXT] Register attempt for:", username);
            try {
                await authService.register({
                    username,
                    email,
                    password,
                });

                // Auto-login after registration
                const loginResult = await login(username, password);
                return loginResult;
            } catch (error) {
                console.error("💥 [AUTH_CONTEXT] Registration failed:", error);
                return {
                    success: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Registration failed",
                };
            }
        },
        [login]
    );

    const updateProfile = useCallback(
        async (data: UpdateProfileData) => {
            if (!user) {
                return { success: false, error: "No user logged in" };
            }

            console.log(
                "📝 [AUTH_CONTEXT] Updating profile for:",
                user.username
            );
            try {
                const updatedUser = await authService.updateProfile(
                    user.id,
                    data
                );
                setUser(updatedUser);
                console.log("✅ [AUTH_CONTEXT] Profile updated successfully");
                return { success: true };
            } catch (error) {
                console.error(
                    "💥 [AUTH_CONTEXT] Profile update failed:",
                    error
                );
                return {
                    success: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Profile update failed",
                };
            }
        },
        [user]
    );

    const logout = useCallback(() => {
        console.log("🚪 [AUTH_CONTEXT] Logout initiated");
        removeAuthToken();
        authService.clearCache();
        setUser(null);
        console.log("✅ [AUTH_CONTEXT] Logout completed");
    }, []);

    const value = {
        user,
        loading,
        login,
        register,
        updateProfile,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
