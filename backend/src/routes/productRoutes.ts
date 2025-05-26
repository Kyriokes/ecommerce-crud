import { Router } from "express";
import { authenticateSupabase } from "../middlewares/authenticateSupabase";
import { validateAdmin } from "../middlewares/adminAuth";
import {
    validateCreateProduct,
    validateUpdateProduct,
    validateIdParam,
} from "../middlewares/validateInput";
import { generalLimiter, strictLimiter } from "../middlewares/rateLimiter";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController";

export const productRoutes = Router();

// Public routes (with general rate limiting)
productRoutes.get("/", generalLimiter, getAllProducts);
productRoutes.get("/:id", generalLimiter, validateIdParam, getProductById);

// Protected routes (require authentication and admin privileges)
productRoutes.use(strictLimiter);
productRoutes.use(authenticateSupabase);
productRoutes.use(validateAdmin);

productRoutes.post("/", validateCreateProduct, createProduct);
productRoutes.put(
    "/:id",
    validateIdParam,
    validateUpdateProduct,
    updateProduct
);
productRoutes.delete("/:id", validateIdParam, deleteProduct);
