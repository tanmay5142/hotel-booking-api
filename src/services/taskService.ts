import Task, {TaskCategory, TaskStatus} from "../models/Task.js";

export async function createTask(
  userId: string,
  title: string,
  description: string,
  category?: TaskCategory,
) {
  return Task.create({ user: userId, title, description, category });
}

export async function getTasks(userId: string, status?: TaskStatus, category?: TaskCategory) {
  const query: Record<string, unknown> = { user: userId };
  if (status) query.status = status;
  if (category) query.category = category;
  return Task.find(query).sort({ createdAt: -1 });
}

export async function getTaskById(userId: string, taskId: string) {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) throw new Error("Task not found");
  return task;
}

export async function updateTask(
  userId: string,
  taskId: string,
  updates: Partial<{ title: string; description: string; category: TaskCategory; status: TaskStatus }>
) {
  const task = await Task.findOneAndUpdate({ _id: taskId, user: userId }, updates, { new: true });
  if (!task) throw new Error("Task not found");
  return task;
}

export async function deleteTask(userId: string, taskId: string) {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  if (!task) throw new Error("Task not found");
  return task;
}  