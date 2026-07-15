import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
}).strict();
export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
}).strict();
export type LoginSchema = z.infer<typeof loginSchema>;