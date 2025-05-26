import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../utils/prisma";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        console.log("📋 Fetching all users");
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                provider: true,
                isAdmin: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        console.log(`✅ Found ${users.length} users`);
        res.json(users);
    } catch (error) {
        console.error("💥 Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
};

export const getUserById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    console.log("👤 Fetching user by ID:", id);

    if (isNaN(Number(id))) {
        console.log("❌ Invalid user ID:", id);
        res.status(400).json({ message: "Invalid user ID" });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                username: true,
                email: true,
                provider: true,
                isAdmin: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            console.log("❌ User not found:", id);
            res.status(404).json({ message: "User not found" });
            return;
        }

        console.log("✅ User found:", user.username);
        res.json(user);
    } catch (error) {
        console.error("💥 Error fetching user:", error);
        res.status(500).json({ message: "Failed to fetch user" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("🗑️ Deleting user:", id);

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!user) {
            console.log("❌ User not found for deletion:", id);
            return res.status(404).json({ message: "User not found" });
        }

        await prisma.user.delete({
            where: { id: Number(id) },
        });

        console.log("✅ User deleted successfully:", user.username);
        res.json({ message: "User successfully deleted" });
    } catch (error) {
        console.error("💥 Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    console.log("📝 Updating user:", id, { username, email });

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!existingUser) {
            console.log("❌ User not found for update:", id);
            return res.status(404).json({ message: "User not found" });
        }

        const updateData: any = {};

        if (username) updateData.username = username;
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res
                    .status(400)
                    .json({ message: "Invalid email format" });
            }
            updateData.email = email;
        }

        // Hash new password if provided
        if (password) {
            if (password.length < 6) {
                return res
                    .status(400)
                    .json({
                        message: "Password must be at least 6 characters long",
                    });
            }
            updateData.password = await bcrypt.hash(password, 12);
        }

        const updated = await prisma.user.update({
            where: { id: Number(id) },
            data: updateData,
            select: {
                id: true,
                username: true,
                email: true,
                provider: true,
                isAdmin: true,
                updatedAt: true,
            },
        });

        console.log("✅ User updated successfully:", updated.username);
        res.json(updated);
    } catch (error) {
        console.error("💥 Error updating user:", error);
        res.status(500).json({ message: "Failed to update user" });
    }
};
