"use client";

import { useActionState, useState } from "react";
import { Button, FormField, Input } from "@taskflow/ui";
import {
  deleteTaskAction,
  updateTaskAction,
  type ActionState
} from "./actions";
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
  type TaskPriority,
  type TaskStatus
} from "@/types/task";

const initialState: ActionState = {};

type TaskRowProps = {
  task: Task;
};

export function TaskRow({ task }: TaskRowProps) {
  const [editing, setEditing] = useState(false);
  const [updateState, updateAction, updatePending] = useActionState(
    updateTaskAction,
    initialState
  );
  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteTaskAction,
    initialState
  );

  if (editing) {
    return (
      <li className="flex flex-col gap-2">
        <form action={updateAction} className="flex flex-wrap items-end gap-2">
          <input type="hidden" name="id" value={task.id} />
          <FormField label="Title" htmlFor={`edit-title-${task.id}`}>
            <Input
              id={`edit-title-${task.id}`}
              name="title"
              defaultValue={task.title}
              required
            />
          </FormField>
          <FormField label="Status" htmlFor={`edit-status-${task.id}`}>
            <select
              id={`edit-status-${task.id}`}
              name="status"
              defaultValue={task.status}
              className="rounded border border-border bg-background px-2 py-1 text-sm"
            >
              {TASK_STATUSES.map((status: TaskStatus) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Priority" htmlFor={`edit-priority-${task.id}`}>
            <select
              id={`edit-priority-${task.id}`}
              name="priority"
              defaultValue={task.priority}
              className="rounded border border-border bg-background px-2 py-1 text-sm"
            >
              {TASK_PRIORITIES.map((priority: TaskPriority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </FormField>
          <Button type="submit" disabled={updatePending}>
            Update
          </Button>
          <Button type="button" disabled={updatePending} onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </form>
        {updateState.error ? (
          <div className="text-red-500">{updateState.error}</div>
        ) : null}
      </li>
    );
  }

  return (
    <li className="flex flex-wrap items-center gap-2">
      <span>
        {task.title} · {task.status} · {task.priority}
      </span>
      <form action={deleteAction}>
        <input type="hidden" name="id" value={task.id} />
        <Button type="submit" disabled={deletePending}>
          Delete
        </Button>
      </form>
      <Button type="button" disabled={deletePending} onClick={() => setEditing(true)}>
        Edit
      </Button>
      {deleteState.error ? (
        <div className="text-red-500">{deleteState.error}</div>
      ) : null}
    </li>
  );
}
