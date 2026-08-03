"use client";

import { useQuery } from "@tanstack/react-query";
import { createTaskSchema, type CreateTaskSchema } from "@taskflow/shared";
import { useMutation } from "@tanstack/react-query";

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

async function createTask(task: CreateTaskSchema): Promise<CreateTaskSchema> {
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
  const {
    data: tasks,
    isLoading,
    error
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-lg font-medium text-text">Tasks</h1>
      <ul className="mt-4 flex flex-col gap-2">
        {tasks?.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
