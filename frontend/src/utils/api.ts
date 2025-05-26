import type { ApiError } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private getAuthHeaders(): HeadersInit {
        const token = localStorage.getItem("authToken");
        console.log("🎫 Getting auth headers, token present:", !!token);

        return {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        };
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        console.log("📡 API Response:", response.status, response.statusText);

        if (!response.ok) {
            const errorData: ApiError = await response.json().catch(() => ({
                message: "An unexpected error occurred",
            }));
            console.error("💥 API Error:", errorData);
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        return response.json();
    }

    async get<T>(endpoint: string): Promise<T> {
        console.log("📡 GET:", `${this.baseURL}${endpoint}`);
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "GET",
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse<T>(response);
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        console.log(
            "📡 POST:",
            `${this.baseURL}${endpoint}`,
            data ? "with data" : "no data"
        );
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "POST",
            headers: this.getAuthHeaders(),
            body: data ? JSON.stringify(data) : undefined,
        });
        return this.handleResponse<T>(response);
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        console.log("📡 PUT:", `${this.baseURL}${endpoint}`);
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "PUT",
            headers: this.getAuthHeaders(),
            body: data ? JSON.stringify(data) : undefined,
        });
        return this.handleResponse<T>(response);
    }

    async delete<T>(endpoint: string): Promise<T> {
        console.log("📡 DELETE:", `${this.baseURL}${endpoint}`);
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "DELETE",
            headers: this.getAuthHeaders(),
        });
        return this.handleResponse<T>(response);
    }
}

export const apiClient = new ApiClient(BASE_URL);
