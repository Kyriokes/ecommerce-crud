import type { ApiError } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        console.log("🌐 [API] ApiClient initialized with baseURL:", baseURL);
    }

    private getAuthHeaders(): HeadersInit {
        const token = localStorage.getItem("authToken");
        console.log("🎫 [API] Getting auth headers, token present:", !!token);
        if (token) {
            console.log(
                "🎫 [API] Token details:",
                `${token.substring(0, 20)}... (${token.length} chars)`
            );
        }

        const headers = {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        };

        console.log("📋 [API] Headers prepared:", Object.keys(headers));
        return headers;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        console.log(
            "📡 [API] Response received:",
            response.status,
            response.statusText
        );
        console.log(
            "📡 [API] Response headers:",
            Object.fromEntries(response.headers.entries())
        );

        if (!response.ok) {
            console.error(
                "💥 [API] Response not OK:",
                response.status,
                response.statusText
            );

            // Check if it's an auth error
            if (response.status === 401) {
                console.error(
                    "🚨 [API] 401 Unauthorized - Token might be invalid"
                );
                const currentToken = localStorage.getItem("authToken");
                console.error(
                    "🔍 [API] Current token in storage:",
                    currentToken
                        ? `Found (${currentToken.length} chars)`
                        : "Not found"
                );
            }

            const errorData: ApiError = await response.json().catch(() => ({
                message: "An unexpected error occurred",
            }));
            console.error("💥 [API] Error data:", errorData);
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        const data: T = await response.json();
        console.log(
            "✅ [API] Response data received:",
            typeof data,
            Array.isArray(data) ? `Array(${data.length})` : "Object"
        );
        return data;
    }

    async get<T>(endpoint: string): Promise<T> {
        console.log("📡 [API] GET request to:", `${this.baseURL}${endpoint}`);
        const headers = this.getAuthHeaders();

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "GET",
            headers,
        });

        return this.handleResponse<T>(response);
    }

    async post<T>(endpoint: string, data?: unknown): Promise<T> {
        console.log("📡 [API] POST request to:", `${this.baseURL}${endpoint}`);
        console.log("📡 [API] POST data:", data ? "Data provided" : "No data");
        const headers = this.getAuthHeaders();

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "POST",
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        return this.handleResponse<T>(response);
    }

    async put<T>(endpoint: string, data?: unknown): Promise<T> {
        console.log("📡 [API] PUT request to:", `${this.baseURL}${endpoint}`);
        console.log("📡 [API] PUT data:", data ? "Data provided" : "No data");
        const headers = this.getAuthHeaders();

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "PUT",
            headers,
            body: data ? JSON.stringify(data) : undefined,
        });

        return this.handleResponse<T>(response);
    }

    async delete<T>(endpoint: string): Promise<T> {
        console.log(
            "📡 [API] DELETE request to:",
            `${this.baseURL}${endpoint}`
        );
        const headers = this.getAuthHeaders();

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "DELETE",
            headers,
        });

        return this.handleResponse<T>(response);
    }
}

export const apiClient = new ApiClient(BASE_URL);
