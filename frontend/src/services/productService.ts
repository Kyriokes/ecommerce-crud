const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getAllProducts = async () => {
    const res = await fetch(`${BASE_URL}/products`);
    return res.json();
};

export const getProductById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    return res.json();
};

export const createProduct = async (productData: object) => {
    const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    });
    return res.json();
};

export const updateProduct = async (id: string, productData: object) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    });
    return res.json();
};

export const deleteProduct = async (id: string) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
    });
    return res.json();
};
