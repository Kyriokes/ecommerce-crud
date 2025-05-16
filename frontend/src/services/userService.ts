const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getAllusers = async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json();
};

export const getUserById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/users/${id}`);
    return res.json();
};

export const createUser = async (userData: object) => {
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const updateUser = async (id: string, userData: object) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const deleteUser = async (id: string) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
    });
    return res.json();
};
