import { Router, Request, Response } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController";

export const productRoutes = Router();

productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', getProductById);
productRoutes.post('/', createProduct);
productRoutes.put('/:id', updateProduct);
productRoutes.delete('/:id', deleteProduct);