import { userRepository } from "../repositories/user.repository.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import { conflict, unauthorized } from "../lib/errors.js";
import type { LoginSchema, RegisterSchema } from "@taskflow/shared";

type SafeUser = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export const authService = {
  async register(data: RegisterSchema): Promise<SafeUser> {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw conflict("User already exists");
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  },

  async login(data: LoginSchema): Promise<SafeUser> {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      throw unauthorized("Invalid email or password");
    }

    const isPasswordValid = await verifyPassword(data.password, user.password);

    if (!isPasswordValid) {
      throw unauthorized("Invalid email or password");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  },
};
