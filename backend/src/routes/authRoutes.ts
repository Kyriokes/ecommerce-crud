import { Router } from "express";
import { authenticateSupabase } from "../middlewares/authenticateSupabase";
import { validateCreateUser } from "../middlewares/validateInput";
import { authLimiter } from "../middlewares/rateLimiter";
import { login, register, getCurrentUser } from "../controllers/authController";
import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validateInput";

export const authRoutes = Router();

// Validation for login
const validateLogin = [
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationErrors,
];

// Public routes with rate limiting
authRoutes.post("/login", authLimiter, validateLogin, login);
authRoutes.post("/register", authLimiter, validateCreateUser, register);

// Protected route
authRoutes.get("/me", authenticateSupabase, getCurrentUser);
