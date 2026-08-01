"use client";

import { useQuery } from "@tanstack/react-query";

type Task = {
  id: string;
  title: string;
};

async function fetchTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to load tasks");
  }
  return data;
}

export default function TasksPage() {
  const {
    data: tasks = [],
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
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
