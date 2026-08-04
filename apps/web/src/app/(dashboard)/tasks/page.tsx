"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTaskSchema,
  UpdateTaskSchema,
  type CreateTaskInput,
  type CreateTaskSchema
} from "@taskflow/shared";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, FormField, Input } from "@taskflow/ui";
import { useState } from "react";

const BOARD_ID = "e0dd4eb4-f55b-465d-a63f-f1ad11713bbe";

type Task = {
  id: string;
  title: string;
};

async function fetchTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to load tasks");
  }

  return data;
}

async function createTask(task: CreateTaskSchema): Promise<Task> {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...task,
      boardId: BOARD_ID
    })
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to create task");
  }

  return data;
}

async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) {
    const data = await response.json().catch(() => {});
    throw new Error(data?.error ?? "Failed to delete task");
  }
}

async function updateTask(args: { id: string; task: UpdateTaskSchema }): Promise<void> {
  const response = await fetch(`/api/tasks/${args.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: args.task.title })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error ?? "Failed to update task");
  }
  return data;
}

export default function TasksPage() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateTaskInput, unknown, CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      boardId: BOARD_ID,
      title: ""
    }
  });

  const {
    mutate: createTaskFn,
    isPending: isCreating,
    error: createTaskError
  } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset({ boardId: BOARD_ID, title: "" });
    }
  });

  const {
    mutate: deleteTaskFn,
    isPending: isDeleting,
    error: deleteTaskError
  } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  const {
    data: tasks,
    isLoading,
    error
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks
  });

  const {
    mutate: updateTaskFn,
    isPending: isUpdating,
    error: updateTaskError
  } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setEditingId(null);
      setDraftTitle("");
    }
  });

  const onSubmit: SubmitHandler<CreateTaskSchema> = (data: CreateTaskSchema) => {
    createTaskFn(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <form className="mt-4 flex gap-2" onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Title" htmlFor="title" error={errors.title?.message}>
          <Input id="title" placeholder="New task" {...register("title")} />
        </FormField>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Add"}
        </Button>
      </form>
      {createTaskError && <div className="text-red-500">{createTaskError.message}</div>}
      <h1 className="text-lg font-medium text-text">Tasks</h1>
      <ul className="mt-4 flex flex-col gap-2">
        {tasks?.map((task) =>
          editingId === task.id ? (
            <li key={task.id}>
              <FormField label="Title" htmlFor="title" error={errors.title?.message}>
                <Input
                  id="title"
                  placeholder="New task"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                />
              </FormField>
              <Button
                type="button"
                disabled={isUpdating}
                onClick={() => updateTaskFn({ id: task.id, task: { title: draftTitle } })}
              >
                Update
              </Button>
              <Button
                type="button"
                disabled={isUpdating}
                onClick={() => {
                  setEditingId(null);
                  setDraftTitle("");
                }}
              >
                Cancel
              </Button>
            </li>
          ) : (
            <li key={task.id}>
              <span>{task.title}</span>
              <Button type="button" disabled={isDeleting} onClick={() => deleteTaskFn(task.id)}>
                Delete
              </Button>
              <Button
                type="button"
                disabled={isUpdating}
                onClick={() => {
                  setEditingId(task.id);
                  setDraftTitle(task.title);
                }}
              >
                Edit
              </Button>
            </li>
          )
        )}
      </ul>
      {deleteTaskError && <div className="text-red-500">{deleteTaskError.message}</div>}
      {updateTaskError && <div className="text-red-500">{updateTaskError.message}</div>}
    </div>
  );
}
