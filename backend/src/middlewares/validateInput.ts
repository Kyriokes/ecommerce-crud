import { body, param, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation failed",
            errors: errors.array(),
        });
    }
    next();
};

// Product validations
export const validateCreateProduct = [
    body("name")
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Name is required and must be between 1-100 characters"),
    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description must be less than 500 characters"),
    body("price")
        .isFloat({ min: 0.01 })
        .withMessage("Price must be a positive number"),
    body("stock")
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),
    body("category")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("Category must be less than 50 characters"),
    body("imageUrl")
        .optional()
        .isURL()
        .withMessage("Image URL must be a valid URL"),
    handleValidationErrors,
];

export const validateUpdateProduct = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage("Name must be between 1-100 characters"),
    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description must be less than 500 characters"),
    body("price")
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage("Price must be a positive number"),
    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),
    body("category")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("Category must be less than 50 characters"),
    body("imageUrl")
        .optional()
        .isURL()
        .withMessage("Image URL must be a valid URL"),
    body("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be a boolean"),
    handleValidationErrors,
];

// User validations
export const validateCreateUser = [
    body("username")
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage("Username must be between 3-30 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            "Username can only contain letters, numbers, and underscores"
        ),
    body("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Must be a valid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage(
            "Password must contain at least one lowercase letter, one uppercase letter, and one number"
        ),
    handleValidationErrors,
];

export const validateUpdateUser = [
    body("username")
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage("Username must be between 3-30 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
            "Username can only contain letters, numbers, and underscores"
        ),
    body("email")
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage("Must be a valid email address"),
    body("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage(
            "Password must contain at least one lowercase letter, one uppercase letter, and one number"
        ),
    handleValidationErrors,
];

// Cart validations
export const validateAddToCart = [
    body("productId")
        .isInt({ min: 1 })
        .withMessage("Product ID must be a positive integer"),
    body("quantity")
        .isInt({ min: 1, max: 100 })
        .withMessage("Quantity must be between 1 and 100"),
    handleValidationErrors,
];

export const validateUpdateCartItem = [
    body("quantity")
        .isInt({ min: 1, max: 100 })
        .withMessage("Quantity must be between 1 and 100"),
    handleValidationErrors,
];

// Param validations
export const validateIdParam = [
    param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
    handleValidationErrors,
];
