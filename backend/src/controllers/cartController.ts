import type { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getCartByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (isNaN(Number(userId))) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const cart = await prisma.cart.findMany({
            where: { userId: Number(userId) },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        stock: true,
                        imageUrl: true,
                        isActive: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        res.json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
};

export const addToCart = async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
        return res
            .status(400)
            .json({ message: "UserId, productId, and quantity are required" });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res
            .status(400)
            .json({ message: "Quantity must be a positive integer" });
    }

    try {
        // ✅ Verificar que el usuario existe
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Verificar que el producto existe y está activo
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (!product.isActive) {
            return res
                .status(400)
                .json({ message: "Product is not available" });
        }

        // ✅ Verificar stock disponible
        if (product.stock < quantity) {
            return res.status(400).json({
                message: `Insufficient stock. Available: ${product.stock}`,
            });
        }

        const existingItem = await prisma.cart.findFirst({
            where: { userId, productId },
        });

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;

            // ✅ Verificar stock total
            if (product.stock < newQuantity) {
                return res.status(400).json({
                    message: `Insufficient stock. Available: ${product.stock}, Current in cart: ${existingItem.quantity}`,
                });
            }

            const updatedItem = await prisma.cart.update({
                where: { id: existingItem.id },
                data: { quantity: newQuantity },
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            imageUrl: true,
                        },
                    },
                },
            });
            return res.json(updatedItem);
        } else {
            const newItem = await prisma.cart.create({
                data: { userId, productId, quantity },
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            imageUrl: true,
                        },
                    },
                },
            });
            return res.status(201).json(newItem);
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Error adding to cart" });
    }
};

export const updateCartItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid cart item ID" });
    }

    if (
        quantity === undefined ||
        !Number.isInteger(quantity) ||
        quantity <= 0
    ) {
        return res
            .status(400)
            .json({ message: "Quantity must be a positive integer" });
    }

    try {
        const cartItem = await prisma.cart.findUnique({
            where: { id: Number(id) },
            include: { product: true },
        });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // ✅ Verificar stock disponible
        if (cartItem.product.stock < quantity) {
            return res.status(400).json({
                message: `Insufficient stock. Available: ${cartItem.product.stock}`,
            });
        }

        const updated = await prisma.cart.update({
            where: { id: Number(id) },
            data: { quantity },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        imageUrl: true,
                    },
                },
            },
        });

        res.json(updated);
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ message: "Failed to update cart item" });
    }
};

export const deleteCartItem = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid cart item ID" });
    }

    try {
        const cartItem = await prisma.cart.findUnique({
            where: { id: Number(id) },
        });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        await prisma.cart.delete({
            where: { id: Number(id) },
        });

        res.json({ message: "Cart item deleted successfully" });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ message: "Error deleting cart item" });
    }
};
