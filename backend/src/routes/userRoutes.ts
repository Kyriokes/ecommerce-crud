import { Router } from "express";
import { authenticateSupabase } from "../middlewares/authenticateSupabase";
import { validateUserOwnership } from "../middlewares/validateOwnership";
import { validateAdmin } from "../middlewares/adminAuth";
import {
    validateUpdateUser,
    validateIdParam,
} from "../middlewares/validateInput";
import { generalLimiter, strictLimiter } from "../middlewares/rateLimiter";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/userController";

export const userRoutes = Router();

// All user routes require authentication
userRoutes.use(authenticateSupabase);

// Admin-only route to get all users
userRoutes.get("/", strictLimiter, validateAdmin, getAllUsers);

// User-specific routes (users can only access their own data)
userRoutes.get(
    "/:id",
    generalLimiter,
    validateIdParam,
    validateUserOwnership,
    getUserById
);
userRoutes.put(
    "/:id",
    strictLimiter,
    validateIdParam,
    validateUpdateUser,
    validateUserOwnership,
    updateUser
);
userRoutes.delete(
    "/:id",
    strictLimiter,
    validateIdParam,
    validateUserOwnership,
    deleteUser
);
