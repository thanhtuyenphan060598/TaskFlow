"use server";

import {
  createTaskSchema,
  taskIdParamSchema,
  updateTaskSchema
} from "@taskflow/shared";
import { revalidatePath } from "next/cache";
import { createTask, deleteTask, updateTask } from "@/lib/api/tasks";

export type ActionState = {
  error?: string;
  ok?: boolean;
};

export async function createTaskAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = createTaskSchema.safeParse({
    title: formData.get("title"),
    boardId: formData.get("boardId")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await createTask(parsed.data);
    revalidatePath("/tasks");
    return { ok: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to create task"
    };
  }
}

export async function updateTaskAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const idParsed = taskIdParamSchema.safeParse({ id: formData.get("id") });
  if (!idParsed.success) {
    return { error: idParsed.error.issues[0]?.message ?? "Invalid task id" };
  }

  const parsed = updateTaskSchema.safeParse({
    title: formData.get("title") || undefined,
    status: formData.get("status") || undefined,
    priority: formData.get("priority") || undefined
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await updateTask(idParsed.data.id, parsed.data);
    revalidatePath("/tasks");
    return { ok: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to update task"
    };
  }
}

export async function deleteTaskAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const idParsed = taskIdParamSchema.safeParse({ id: formData.get("id") });
  if (!idParsed.success) {
    return { error: idParsed.error.issues[0]?.message ?? "Invalid task id" };
  }

  try {
    await deleteTask(idParsed.data.id);
    revalidatePath("/tasks");
    return { ok: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to delete task"
    };
  }
}
