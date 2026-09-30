import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService.js";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerUser(name, email, password);
    res.status(201).json({ id: user.id, name: user.name, email: user.email, token });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ id: user.id, name: user.name, email: user.email, token });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}  