import type { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma";

interface AuthRequest extends Request {
    userId?: string;
}

export const validateAdmin = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.userId;

        console.log("🔐 Admin validation - User ID:", userId);

        if (!userId) {
            console.log("❌ Admin validation failed - No user ID");
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
            select: {
                id: true,
                username: true,
                email: true,
                isAdmin: true,
            },
        });

        console.log("👤 User found for admin validation:", user);

        if (!user) {
            console.log("❌ Admin validation failed - User not found");
            return res.status(401).json({ message: "User not found" });
        }

        if (!user.isAdmin) {
            console.log(
                "❌ Admin validation failed - User is not admin:",
                user.username
            );
            return res.status(403).json({ message: "Admin access required" });
        }

        console.log("✅ Admin validation successful for:", user.username);
        next();
    } catch (error) {
        console.error("💥 Error validating admin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
