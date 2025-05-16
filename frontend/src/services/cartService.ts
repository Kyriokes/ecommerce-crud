const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getCartbyUserId = async (id: string) => {
    const res = await fetch(`${BASE_URL}/cart/${id}`);
    return res.json();
};

export const addToCart = async (cartData: object) => {
    const res = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartData),
    });
    return res.json();
};

export const updateCartItem = async (id: string, cartData: object) => {
    const res = await fetch(`${BASE_URL}/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartData),
    });
    return res.json();
};

export const deleteCart = async (id: string) => {
    const res = await fetch(`${BASE_URL}/cart/${id}`, { method: "DELETE" });
    return res.json();
};
