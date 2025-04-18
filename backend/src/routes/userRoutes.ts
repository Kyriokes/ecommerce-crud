import { Router, Request, Response } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController";

export const userRoutes = Router();

userRoutes.get('/',getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/',createUser);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);