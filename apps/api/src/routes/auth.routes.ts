import type { FastifyInstance } from "fastify";
import { loginSchema, refreshTokenSchema, registerSchema } from "@taskflow/shared";
import { authService } from "../services/auth.service.js";
import { unauthorized } from "../lib/errors.js";

export async function authRoutes(app: FastifyInstance) {
  // Register
  app.post(
    "/register",
    { config: { rateLimit: { max: 5, timeWindow: "1m" } } },
    async (request, reply) => {
      const data = registerSchema.parse(request.body);
      const user = await authService.register(data);
      return reply.code(201).send(user);
    }
  );

  // Login
  app.post(
    "/login",
    { config: { rateLimit: { max: 5, timeWindow: "1m" } } },
    async (request, reply) => {
      const data = loginSchema.parse(request.body);
      const user = await authService.login(data);

      const accessToken = app.jwt.sign({ userId: user.id }, { expiresIn: "15m" });

      const refreshToken = app.jwt.sign({ userId: user.id }, { expiresIn: "7d" });

      return reply.code(200).send({
        accessToken,
        refreshToken
      });
    }
  );

  // Refresh token
  app.post("/refresh", async (request, reply) => {
    const { refreshToken } = refreshTokenSchema.parse(request.body);
    let payload: { userId: string };

    try {
      payload = app.jwt.verify(refreshToken);
    } catch {
      throw unauthorized("Invalid refresh token");
    }

    const accessToken = app.jwt.sign({ userId: payload.userId }, { expiresIn: "15m" });
    return reply.code(200).send({ accessToken });
  });
}
