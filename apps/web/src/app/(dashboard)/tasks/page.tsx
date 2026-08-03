"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTaskSchema,
  type CreateTaskInput,
  type CreateTaskSchema
} from "@taskflow/shared";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, FormField, Input } from "@taskflow/ui";

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

export default function TasksPage() {
  const queryClient = useQueryClient();

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

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset({ boardId: BOARD_ID, title: "" });
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

  const onSubmit: SubmitHandler<CreateTaskSchema> = (data: CreateTaskSchema) => {
    mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <form className="mt-4 flex gap-2" onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Title" htmlFor="title" error={errors.title?.message}>
          <Input id="title" placeholder="New task" {...register("title")} />
        </FormField>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Add"}
        </Button>
      </form>
      <h1 className="text-lg font-medium text-text">Tasks</h1>
      <ul className="mt-4 flex flex-col gap-2">
        {tasks?.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
