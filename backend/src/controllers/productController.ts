import type { Request, Response } from "express";
import prisma from "../utils/prisma";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const { category, isActive } = req.query;

        const where: any = {};
        if (category) where.category = category;
        if (isActive !== undefined) where.isActive = isActive === "true";

        const products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Error fetching products" });
    }
};

export const getProductById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({ message: "Invalid product ID" });
        return;
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Failed to fetch product" });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, description, price, stock, imageUrl, category } = req.body;

    // ✅ Validaciones mejoradas
    if (!name || price === undefined || stock === undefined) {
        return res.status(400).json({
            message: "Name, price, and stock are required",
        });
    }

    if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({
            message: "Price must be a positive number",
        });
    }

    if (!Number.isInteger(stock) || stock < 0) {
        return res.status(400).json({
            message: "Stock must be a non-negative integer",
        });
    }

    try {
        const newProduct = await prisma.product.create({
            data: {
                name: name.trim(),
                description: description?.trim(),
                price,
                stock,
                imageUrl: imageUrl?.trim(),
                category: category?.trim(),
            },
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Failed to create product" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, stock, imageUrl, category, isActive } =
        req.body;

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    // ✅ Validaciones
    if (price !== undefined && (typeof price !== "number" || price <= 0)) {
        return res.status(400).json({
            message: "Price must be a positive number",
        });
    }

    if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
        return res.status(400).json({
            message: "Stock must be a non-negative integer",
        });
    }

    try {
        const existingProduct = await prisma.product.findUnique({
            where: { id: Number(id) },
        });

        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updateData: any = {};
        if (name !== undefined) updateData.name = name.trim();
        if (description !== undefined)
            updateData.description = description?.trim();
        if (price !== undefined) updateData.price = price;
        if (stock !== undefined) updateData.stock = stock;
        if (imageUrl !== undefined) updateData.imageUrl = imageUrl?.trim();
        if (category !== undefined) updateData.category = category?.trim();
        if (isActive !== undefined) updateData.isActive = isActive;

        const updated = await prisma.product.update({
            where: { id: Number(id) },
            data: updateData,
        });

        res.json(updated);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const existingProduct = await prisma.product.findUnique({
            where: { id: Number(id) },
        });

        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        await prisma.product.delete({
            where: { id: Number(id) },
        });

        res.json({ message: "Product successfully deleted" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Failed to delete product" });
    }
};
