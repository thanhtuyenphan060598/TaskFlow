"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/tasks", { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          setTasks(data);
        } else {
          setError(new Error(data.error ?? "Failed to load tasks"));
        }
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err : new Error("Failed to load tasks"));
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  if (loading) return <div>Loading...</div>;
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
