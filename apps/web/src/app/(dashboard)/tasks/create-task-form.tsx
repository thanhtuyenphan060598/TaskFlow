"use client";

import { useActionState } from "react";
import { Button, FormField, Input } from "@taskflow/ui";
import { createTaskAction, type ActionState } from "./actions";
import type { Board } from "@/types/task";

const initialState: ActionState = {};

type CreateTaskFormProps = {
  boards: Board[];
  defaultBoardId: string;
};

export function CreateTaskForm({ boards, defaultBoardId }: CreateTaskFormProps) {
  const [state, formAction, pending] = useActionState(createTaskAction, initialState);

  return (
    <form action={formAction} className="mt-4 flex flex-wrap gap-2">
      <FormField label="Board" htmlFor="boardId">
        <select
          id="boardId"
          name="boardId"
          defaultValue={defaultBoardId}
          className="rounded border border-border bg-background px-2 py-1 text-sm"
          required
        >
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Title" htmlFor="title" error={state.error}>
        <Input id="title" name="title" placeholder="New task" required />
      </FormField>
      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Add"}
      </Button>
    </form>
  );
}
