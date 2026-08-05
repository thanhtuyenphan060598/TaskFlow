import type { JWT } from "@fastify/jwt";
import type { FastifyInstance } from "fastify";
import { loginSchema, refreshTokenSchema, registerSchema } from "@taskflow/shared";
import { authService } from "../services/auth.service.js";
import { unauthorized } from "../lib/errors.js";

/** Dual namespace → app.jwt.access / app.jwt.refresh */
function jwt(app: FastifyInstance) {
  return app.jwt as unknown as { access: JWT; refresh: JWT };
}

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/register",
    { config: { rateLimit: { max: 5, timeWindow: "1m" } } },
    async (request, reply) => {
      const data = registerSchema.parse(request.body);
      const user = await authService.register(data);
      return reply.code(201).send(user);
    }
  );

  app.post(
    "/login",
    { config: { rateLimit: { max: 5, timeWindow: "1m" } } },
    async (request, reply) => {
      const data = loginSchema.parse(request.body);
      const user = await authService.login(data);

      const accessToken = jwt(app).access.sign(
        { userId: user.id },
        { expiresIn: "15m" }
      );
      const refreshToken = jwt(app).refresh.sign(
        { userId: user.id },
        { expiresIn: "7d" }
      );

      return reply.code(200).send({ accessToken, refreshToken });
    }
  );

  app.post("/refresh", async (request, reply) => {
    const { refreshToken } = refreshTokenSchema.parse(request.body);
    let payload: { userId: string };

    try {
      payload = jwt(app).refresh.verify(refreshToken);
    } catch {
      throw unauthorized("Invalid refresh token");
    }

    const accessToken = jwt(app).access.sign(
      { userId: payload.userId },
      { expiresIn: "15m" }
    );
    return reply.code(200).send({ accessToken });
  });
}
