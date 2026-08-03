import { z } from "zod";

export const taskStatusSchema = z.enum(["TODO", "IN_PROGRESS", "DONE"]);
export const taskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const createTaskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    boardId: z.uuid("boardId must be a valid UUID"),
    description: z.string().optional(),
    dueDate: z.coerce.date().nullable().optional(),
    status: taskStatusSchema.optional(),
    priority: taskPrioritySchema.optional()
  }).strict();
/** Output after Zod parse (e.g. dueDate → Date). Use for API / mutation payloads. */
export type CreateTaskSchema = z.output<typeof createTaskSchema>;
/** Form / JSON input before coerce (dueDate is unknown). Needed for RHF + zodResolver. */
export type CreateTaskInput = z.input<typeof createTaskSchema>;

export const taskIdParamSchema = z.object({ id: z.uuid("Invalid task id") }).strict();
export type TaskIdParamSchema = z.infer<typeof taskIdParamSchema>;

export const updateTaskSchema = createTaskSchema.omit({ boardId: true }).partial().strict();
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
