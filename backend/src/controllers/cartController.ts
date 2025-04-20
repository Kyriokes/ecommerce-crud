import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getCartByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const cart = await prisma.cart.findMany({
            where: { userId: Number(userId) },
            include: {
                product: true,
            },
        });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cart" });
    }
};

export const addToCart = async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: "Missing fields" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const product = await prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const existingItem = await prisma.cart.findFirst({
            where: { userId, productId },
        });
        if (existingItem) {
            const updatedItem = await prisma.cart.update({
                where: { id: existingItem.id },
                data: {
                    quantity: existingItem.quantity + quantity,
                },
            });
            return res.json(updatedItem);
        } else {
            const newItem = await prisma.cart.create({
                data: { userId, productId, quantity },
            });
            return res.status(201).json(newItem);
        }
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart" });
    }
};

export const updateCartItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
        return res.status(400).json({ message: "Quantity is required" });
    }

    try {
        const updated = await prisma.cart.update({
            where: { id: Number(id) },
            data: { quantity },
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Failed to update cart item" });
    }
};

export const deleteCartItem = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.cart.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Cart item deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting cart item" });
    }
};
