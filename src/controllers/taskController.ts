import { Response } from "express";
import { AuthRequest } from "../middleware/auth.js";
import { 
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/taskService.js";
import { TaskCategory, TaskStatus } from "../models/Task.js";

export async function create(req: AuthRequest, res: Response) {
  try {
    const { title, description, category } = req.body;
    const task = await createTask(req.userId as string, title, description, category);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
}

export async function list(req: AuthRequest, res: Response) {
  try {
    const { status, category } = req.query;
    const tasks = await getTasks(
    req.userId as string,
    status as TaskStatus,
    category as TaskCategory,
  );
  res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
}

export async function getOne(req: AuthRequest, res: Response) {
  try {
    const task = await getTaskById(req.userId as string, req.params.id as string);
    res.json(task);
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const task = await updateTask(req.userId as string, req.params.id as string, req.body);
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    await deleteTask(req.userId as string, req.params.id as string);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
}