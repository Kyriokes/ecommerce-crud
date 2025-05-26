import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../utils/prisma";

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    console.log("🔐 Login attempt for:", username);

    if (!username || !password) {
        console.log("❌ Missing credentials");
        return res
            .status(400)
            .json({ message: "Username and password are required" });
    }

    try {
        // Find user by username
        const user = await prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                email: true,
                password: true,
                provider: true,
                isAdmin: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            console.log("❌ User not found:", username);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check password (only for CREDENTIALS provider)
        if (user.provider === "CREDENTIALS" && user.password) {
            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!isValidPassword) {
                console.log("❌ Invalid password for:", username);
                return res.status(401).json({ message: "Invalid credentials" });
            }
        } else if (user.provider === "CREDENTIALS" && !user.password) {
            console.log("❌ No password set for credentials user:", username);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate token (in a real app, this would be a proper JWT)
        const token = `fake-jwt-token-${user.id}`;

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        console.log(
            "✅ Login successful for:",
            user.username,
            "Admin:",
            user.isAdmin
        );

        res.json({
            message: "Login successful",
            user: userWithoutPassword,
            token,
        });
    } catch (error) {
        console.error("💥 Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    console.log("📝 Registration attempt for:", username);

    if (!username || !email || !password) {
        console.log("❌ Missing required fields");
        return res
            .status(400)
            .json({ message: "Username, email, and password are required" });
    }

    if (password.length < 6) {
        console.log("❌ Password too short");
        return res
            .status(400)
            .json({ message: "Password must be at least 6 characters long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        console.log("❌ Invalid email format:", email);
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            console.log(
                "❌ User already exists:",
                existingUser.email === email ? "email" : "username"
            );
            return res.status(409).json({
                message:
                    existingUser.email === email
                        ? "Email already exists"
                        : "Username already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                provider: "CREDENTIALS",
            },
            select: {
                id: true,
                username: true,
                email: true,
                provider: true,
                isAdmin: true,
                createdAt: true,
            },
        });

        // Generate token
        const token = `fake-jwt-token-${newUser.id}`;

        console.log("✅ Registration successful for:", newUser.username);

        res.status(201).json({
            message: "Registration successful",
            user: newUser,
            token,
        });
    } catch (error) {
        console.error("💥 Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
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
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("💥 Get current user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
