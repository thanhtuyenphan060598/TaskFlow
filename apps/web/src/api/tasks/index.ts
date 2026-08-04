import type { CreateTaskSchema, UpdateTaskSchema } from "@taskflow/shared";
import { request } from "../http";
import type { Task } from "@/types/task";

export async function fetchTasks(): Promise<Task[]> {
  return request<Task[]>("/api/tasks", { method: "GET" });
}

export async function createTask(task: CreateTaskSchema): Promise<Task> {
  return request<Task>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(task)
  });
}

export async function updateTask(args: {
  id: string;
  task: UpdateTaskSchema;
}): Promise<Task> {
  return request<Task>(`/api/tasks/${args.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: args.task.title,
      status: args.task.status,
      priority: args.task.priority
    })
  });
}

export async function deleteTask(id: string): Promise<void> {
  await request<void>(`/api/tasks/${id}`, { method: "DELETE" });
}
