import { Request, Response } from 'express';
import prisma from "../utils/prisma";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
};

export const getProductById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });
        if (!product) {
            res.status(404).json({ message: "product not found" });
            return;
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch product" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Product successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, description, price, stock } = req.body;

    if (( !name || !description || !price || !stock)) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newProduct = await prisma.product.create({
            data: { name, description, price, stock },
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Failed to create product" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    try {
        const updated = await prisma.product.update({
            where: { id: Number(id) },
            data: { name, description, price, stock },
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Failed to update product" });
    }
};
