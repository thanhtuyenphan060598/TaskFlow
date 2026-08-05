import { getBoards, getTasks } from "@/lib/api/tasks";
import { CreateTaskForm } from "./create-task-form";
import { TaskRow } from "./task-row";

export default async function TasksPage() {
  const [tasks, boards] = await Promise.all([getTasks(), getBoards()]);

  if (!boards.length) {
    return <div>No boards available for your workspace.</div>;
  }

  return (
    <div>
      <CreateTaskForm boards={boards} defaultBoardId={boards[0].id} />
      <h1 className="mt-6 text-lg font-medium text-text">Tasks</h1>
      <ul className="mt-4 flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
