import { Router } from "express";
import { authenticateSupabase } from "../middlewares/authenticateSupabase";
import { validateCartOwnership } from "../middlewares/validateOwnership";
import {
    validateAddToCart,
    validateUpdateCartItem,
    validateIdParam,
} from "../middlewares/validateInput";
import { strictLimiter } from "../middlewares/rateLimiter";
import {
    getCartByUserId,
    addToCart,
    updateCartItem,
    deleteCartItem,
} from "../controllers/cartController";
import type { Request, Response, NextFunction } from "express";

export const cartRoutes = Router();

// Apply rate limiting to all cart routes
cartRoutes.use(strictLimiter);

// All cart routes require authentication
cartRoutes.use(authenticateSupabase);

// Middleware to add userId to params for GET route
const addUserIdToParams = (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.params.userId = req.userId;
    next();
};

// Middleware to add userId to body for POST route
const addUserIdToBody = (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.body.userId = Number(req.userId);
    next();
};

// Routes
cartRoutes.get("/", addUserIdToParams, getCartByUserId);
cartRoutes.post("/", validateAddToCart, addUserIdToBody, addToCart);
cartRoutes.put(
    "/:id",
    validateIdParam,
    validateUpdateCartItem,
    validateCartOwnership,
    updateCartItem
);
cartRoutes.delete(
    "/:id",
    validateIdParam,
    validateCartOwnership,
    deleteCartItem
);
