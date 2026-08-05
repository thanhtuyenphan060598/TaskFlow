import "server-only";

import type { CreateTaskSchema, UpdateTaskSchema } from "@taskflow/shared";
import type { Board, Task } from "@/types/task";
import { apiFetch } from "./server";

export function getTasks(): Promise<Task[]> {
  return apiFetch<Task[]>("/tasks");
}

export function getBoards(): Promise<Board[]> {
  return apiFetch<Board[]>("/boards");
}

export function createTask(task: CreateTaskSchema): Promise<Task> {
  return apiFetch<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(task)
  });
}

export function updateTask(id: string, task: UpdateTaskSchema): Promise<Task> {
  return apiFetch<Task>(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(task)
  });
}

export function deleteTask(id: string): Promise<void> {
  return apiFetch<void>(`/tasks/${id}`, { method: "DELETE" });
}
