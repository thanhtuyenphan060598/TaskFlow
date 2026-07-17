import type { FastifyInstance } from "fastify";
import { loginSchema, registerSchema } from "@taskflow/shared";
import { authService } from "../services/auth.service.js";

export async function authRoutes(app: FastifyInstance) {
    app.post('/register', async (request, reply) => {
        const data = registerSchema.parse(request.body);
        const user = await authService.register(data);
        return reply.code(201).send(user);
    })

    app.post('/login', async (request, reply) => {
        const data = loginSchema.parse(request.body);
        const user = await authService.login(data);

        const accessToken = app.jwt.sign(
            { userId: user.id },
            { expiresIn: '15m' }
        );

        const refreshToken = app.jwt.sign(
            { userId: user.id },
            { expiresIn: '7d' }
        );

        return reply.code(200).send({
            accessToken,
            refreshToken,
        });
    })
}