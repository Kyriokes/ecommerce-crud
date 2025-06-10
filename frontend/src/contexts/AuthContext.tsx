"use client";

import { createContext,  } from "react";
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
