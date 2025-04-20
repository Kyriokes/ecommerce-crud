import { Router } from "express";
import { getCartByUserId, addToCart, updateCartItem, deleteCartItem } from "../controllers/cartController"

export const cartRoutes = Router();

cartRoutes.get("/:userId", getCartByUserId);
cartRoutes.post("/", addToCart);
cartRoutes.put("/:id", updateCartItem);
cartRoutes.delete("/:id", deleteCartItem);