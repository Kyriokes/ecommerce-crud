export const getAuthToken = (): string | null => {
    try {
        const token = localStorage.getItem("authToken");
        console.log(
            "🔍 [AUTH] Getting token from localStorage:",
            token ? `Token found (${token.length} chars)` : "No token found"
        );
        return token;
    } catch (error) {
        console.error("💥 [AUTH] Error getting auth token:", error);
        return null;
    }
};

export const setAuthToken = (token: string): void => {
    try {
        console.log(
            "💾 [AUTH] Setting token in localStorage:",
            token ? `Token (${token.length} chars)` : "Empty token"
        );
        localStorage.setItem("authToken", token);
        console.log("✅ [AUTH] Token stored successfully");

        // Verify it was stored
        const storedToken = localStorage.getItem("authToken");
        console.log(
            "🔍 [AUTH] Verification - Token in storage:",
            storedToken ? `Found (${storedToken.length} chars)` : "Not found"
        );
    } catch (error) {
        console.error("💥 [AUTH] Error setting auth token:", error);
    }
};

export const removeAuthToken = (): void => {
    try {
        const tokenBefore = localStorage.getItem("authToken");
        console.log(
            "🗑️ [AUTH] Removing token from localStorage. Token before removal:",
            tokenBefore ? `Found (${tokenBefore.length} chars)` : "Not found"
        );

        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");

        const tokenAfter = localStorage.getItem("authToken");
        console.log(
            "🔍 [AUTH] Token after removal:",
            tokenAfter
                ? `Still found (${tokenAfter.length} chars)`
                : "Successfully removed"
        );
        console.log("✅ [AUTH] Auth data cleared");
    } catch (error) {
        console.error("💥 [AUTH] Error removing auth token:", error);
    }
};

export const getCurrentUser = () => {
    try {
        console.log("👤 [AUTH] Getting current user from localStorage");
        const userId = localStorage.getItem("userId");
        const userEmail = localStorage.getItem("userEmail");

        console.log("🔍 [AUTH] UserId in storage:", userId);
        console.log("🔍 [AUTH] UserEmail in storage:", userEmail);

        if (userId && userEmail) {
            const parsedUserId = Number.parseInt(userId, 10);
            if (isNaN(parsedUserId)) {
                console.error(
                    "💥 [AUTH] Invalid user ID in localStorage:",
                    userId
                );
                return null;
            }

            const user = {
                id: parsedUserId,
                email: userEmail,
            };
            console.log("✅ [AUTH] Current user found:", user);
            return user;
        }

        console.log("❌ [AUTH] No current user data found");
        return null;
    } catch (error) {
        console.error("💥 [AUTH] Error getting current user:", error);
        return null;
    }
};

export const setCurrentUser = (user: { id: number; email: string }) => {
    try {
        console.log("👤 [AUTH] Setting current user:", user);
        localStorage.setItem("userId", user.id.toString());
        localStorage.setItem("userEmail", user.email);
        console.log("✅ [AUTH] User data stored");

        // Verify it was stored
        const storedUserId = localStorage.getItem("userId");
        const storedUserEmail = localStorage.getItem("userEmail");
        console.log(
            "🔍 [AUTH] Verification - UserId in storage:",
            storedUserId
        );
        console.log(
            "🔍 [AUTH] Verification - UserEmail in storage:",
            storedUserEmail
        );
    } catch (error) {
        console.error("💥 [AUTH] Error setting current user:", error);
    }
};
