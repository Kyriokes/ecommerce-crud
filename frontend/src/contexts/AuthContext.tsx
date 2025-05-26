"use client";

import type React from "react";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react";
import { setCurrentUser, removeAuthToken, setAuthToken } from "../utils/auth";
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Global flag to prevent multiple initializations
let isInitializing = false;
let isInitialized = false;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const mountedRef = useRef(true);

    useEffect(() => {
        // Prevent multiple initializations
        if (isInitializing || isInitialized) {
            setLoading(false);
            return;
        }

        const initAuth = async () => {
            isInitializing = true;
            console.log("🔐 Initializing auth context...");

            try {
                const token = localStorage.getItem("authToken");

                if (token) {
                    console.log("🎫 Found stored token");
                    try {
                        const freshUser = await authService.getCurrentUser();
                        if (mountedRef.current) {
                            console.log(
                                "✅ Auth context initialized with user:",
                                freshUser.username
                            );
                            setUser(freshUser);
                        }
                    } catch (error) {
                        console.error("💥 Error fetching user data:", error);
                        removeAuthToken();
                        if (mountedRef.current) {
                            setUser(null);
                        }
                    }
                } else {
                    console.log("❌ No stored token found");
                    if (mountedRef.current) {
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error("💥 Auth initialization error:", error);
                if (mountedRef.current) {
                    setUser(null);
                }
            } finally {
                if (mountedRef.current) {
                    setLoading(false);
                }
                isInitialized = true;
                isInitializing = false;
            }
        };

        initAuth();

        return () => {
            mountedRef.current = false;
        };
    }, []);

    const login = useCallback(async (username: string, password: string) => {
        console.log("🔐 Login attempt for:", username);
        try {
            const { user: loggedUser, token } = await authService.login({
                username,
                password,
            });

            setAuthToken(token);
            setCurrentUser({ id: loggedUser.id, email: loggedUser.email });
            setUser(loggedUser);
            console.log("✅ Login successful, user state updated");

            return { success: true };
        } catch (error) {
            console.error("💥 Login failed:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "Login failed",
            };
        }
    }, []);

    const register = useCallback(
        async (username: string, email: string, password: string) => {
            console.log("📝 Register attempt for:", username);
            try {
                await authService.register({
                    username,
                    email,
                    password,
                });

                // Auto-login after registration
                const loginResult = await login(username, password);
                if (loginResult.success) {
                    console.log("✅ Registration and auto-login successful");
                    return { success: true };
                } else {
                    return {
                        success: false,
                        error: "Registration successful but auto-login failed",
                    };
                }
            } catch (error) {
                console.error("💥 Registration failed:", error);
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
            if (!user) return { success: false, error: "No user logged in" };

            console.log("📝 Updating profile for:", user.username);
            try {
                const updatedUser = await authService.updateProfile(
                    user.id,
                    data
                );
                setUser(updatedUser);
                console.log("✅ Profile updated successfully");
                return { success: true };
            } catch (error) {
                console.error("💥 Profile update failed:", error);
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
        console.log("🚪 Logging out");
        removeAuthToken();
        authService.clearCache();
        setUser(null);

        // Reset global flags for re-initialization if needed
        isInitialized = false;
        isInitializing = false;

        console.log("✅ Logout completed, user state cleared");
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
