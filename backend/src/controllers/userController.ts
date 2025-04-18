import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }  catch (error) {
        res.status(500).json({error:"Error fetching users"})
    }
};

export const getUserById = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {id: Number(id)},
        });
        if (!user) {
            res.status(404).json({ message: "user not found"});
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user"});
    }
};


export const deleteUser = async (req:Request, res: Response)=> {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where:{ id:Number(id) },
        });
        res.json({ message: "User successfully deleted"});
    } catch (error) {
        res.status(500).json({ message: "Failed to delete User" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if((!username || !email || !password)){
        return res.status(400).json({message:"All fields are required"});
    }

    try {
        const newUser = await prisma.user.create({
            data: { username, email, password },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: "Failed to create user"});
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const { username, email, password } = req.body;
    try {
        const updated = await prisma.user.update({
            where: {id: Number(id)},
            data: { username, email, password },
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user"})
    }
}