"use client";

import {
  createTaskSchema,
  type CreateTaskInput,
  type CreateTaskSchema
} from "@taskflow/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, FormField, Input } from "@taskflow/ui";
import { useEffect, useState } from "react";
import { useBoards } from "@/hooks/use-boards";
import { useTasks } from "@/hooks/use-tasks";
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type TaskPriority,
  type TaskStatus
} from "@/types/task";

export default function TasksPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftStatus, setDraftStatus] = useState<TaskStatus>("TODO");
  const [draftPriority, setDraftPriority] = useState<TaskPriority>("LOW");

  function clearEditDraft() {
    setEditingId(null);
    setDraftTitle("");
    setDraftStatus("TODO");
    setDraftPriority("LOW");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues
  } = useForm<CreateTaskInput, unknown, CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      boardId: "",
      title: ""
    }
  });

  const { data: boards, isLoading: isBoardsLoading, error: boardsError } = useBoards();

  const {
    tasks,
    isLoading: isTasksLoading,
    error: tasksError,
    createTask,
    updateTask,
    deleteTask
  } = useTasks({
    onCreateSuccess: () => {
      reset({ boardId: getValues("boardId"), title: "" });
    },
    onUpdateSuccess: clearEditDraft
  });

  useEffect(() => {
    if (!boards?.length) return;
    if (getValues("boardId")) return;
    setValue("boardId", boards[0].id);
  }, [boards, getValues, setValue]);

  const onSubmit: SubmitHandler<CreateTaskSchema> = (data) => {
    createTask.mutate(data);
  };

  const editTitleError = draftTitle.trim() === "" ? "Title is required" : undefined;

  if (isTasksLoading || isBoardsLoading) return <div>Loading...</div>;
  if (tasksError) return <div>Error: {tasksError.message}</div>;
  if (boardsError) return <div>Error: {boardsError.message}</div>;
  if (!boards?.length) return <div>No boards available for your workspace.</div>;

  return (
    <div>
      <form className="mt-4 flex flex-wrap gap-2" onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Board" htmlFor="boardId" error={errors.boardId?.message}>
          <select
            id="boardId"
            className="rounded border border-border bg-background px-2 py-1 text-sm"
            {...register("boardId")}
          >
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Title" htmlFor="title" error={errors.title?.message}>
          <Input id="title" placeholder="New task" {...register("title")} />
        </FormField>
        <Button type="submit" disabled={createTask.isPending}>
          {createTask.isPending ? "Creating..." : "Add"}
        </Button>
      </form>
      {createTask.error && <div className="text-red-500">{createTask.error.message}</div>}
      <h1 className="text-lg font-medium text-text">Tasks</h1>
      <ul className="mt-4 flex flex-col gap-2">
        {tasks?.map((task) =>
          editingId === task.id ? (
            <li key={task.id} className="flex flex-wrap items-end gap-2">
              <FormField label="Title" htmlFor={`edit-title-${task.id}`} error={editTitleError}>
                <Input
                  id={`edit-title-${task.id}`}
                  placeholder="New task"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                />
              </FormField>
              <FormField label="Status" htmlFor={`edit-status-${task.id}`}>
                <select
                  id={`edit-status-${task.id}`}
                  className="rounded border border-border bg-background px-2 py-1 text-sm"
                  value={draftStatus}
                  onChange={(e) => setDraftStatus(e.target.value as TaskStatus)}
                >
                  {TASK_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Priority" htmlFor={`edit-priority-${task.id}`}>
                <select
                  id={`edit-priority-${task.id}`}
                  className="rounded border border-border bg-background px-2 py-1 text-sm"
                  value={draftPriority}
                  onChange={(e) => setDraftPriority(e.target.value as TaskPriority)}
                >
                  {TASK_PRIORITIES.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </FormField>
              <Button
                type="button"
                disabled={updateTask.isPending}
                onClick={() => {
                  if (draftTitle.trim() === "") return;
                  updateTask.mutate({
                    id: task.id,
                    task: {
                      title: draftTitle,
                      status: draftStatus,
                      priority: draftPriority
                    }
                  });
                }}
              >
                Update
              </Button>
              <Button type="button" disabled={updateTask.isPending} onClick={clearEditDraft}>
                Cancel
              </Button>
            </li>
          ) : (
            <li key={task.id} className="flex flex-wrap items-center gap-2">
              <span>
                {task.title} · {task.status} · {task.priority}
              </span>
              <Button
                type="button"
                disabled={deleteTask.isPending}
                onClick={() => deleteTask.mutate(task.id)}
              >
                Delete
              </Button>
              <Button
                type="button"
                disabled={updateTask.isPending}
                onClick={() => {
                  setEditingId(task.id);
                  setDraftTitle(task.title);
                  setDraftStatus(task.status);
                  setDraftPriority(task.priority);
                }}
              >
                Edit
              </Button>
            </li>
          )
        )}
      </ul>
      {deleteTask.error && <div className="text-red-500">{deleteTask.error.message}</div>}
      {updateTask.error && <div className="text-red-500">{updateTask.error.message}</div>}
    </div>
  );
}
