export const getAuthToken = (): string | null => {
    try {
        return localStorage.getItem("authToken");
    } catch (error) {
        console.error("Error getting auth token:", error);
        return null;
    }
};

export const setAuthToken = (token: string): void => {
    try {
        localStorage.setItem("authToken", token);
        console.log("🎫 Token stored successfully");
    } catch (error) {
        console.error("Error setting auth token:", error);
    }
};

export const removeAuthToken = (): void => {
    try {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        console.log("🗑️ Auth data cleared");
    } catch (error) {
        console.error("Error removing auth token:", error);
    }
};

export const getCurrentUser = () => {
    try {
        const userId = localStorage.getItem("userId");
        const userEmail = localStorage.getItem("userEmail");

        if (userId && userEmail) {
            const parsedUserId = Number.parseInt(userId, 10);
            if (isNaN(parsedUserId)) {
                console.error("Invalid user ID in localStorage:", userId);
                return null;
            }

            return {
                id: parsedUserId,
                email: userEmail,
            };
        }

        return null;
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
};

export const setCurrentUser = (user: { id: number; email: string }) => {
    try {
        localStorage.setItem("userId", user.id.toString());
        localStorage.setItem("userEmail", user.email);
        console.log("👤 User data stored");
    } catch (error) {
        console.error("Error setting current user:", error);
    }
};
