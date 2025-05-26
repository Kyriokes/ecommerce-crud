import type { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma";

interface AuthRequest extends Request {
    userId?: string;
}

export const validateCartOwnership = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const cartItem = await prisma.cart.findUnique({
            where: { id: Number(id) },
        });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        if (cartItem.userId !== Number(userId)) {
            return res
                .status(403)
                .json({ message: "Access denied: Not your cart item" });
        }

        next();
    } catch (error) {
        console.error("Error validating cart ownership:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const validateUserOwnership = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Users can only access/modify their own profile
        if (Number(id) !== Number(userId)) {
            return res
                .status(403)
                .json({
                    message: "Access denied: Can only access your own profile",
                });
        }

        next();
    } catch (error) {
        console.error("Error validating user ownership:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
