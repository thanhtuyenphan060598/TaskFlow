import Fastify from "fastify";
import { errorHandler } from "./lib/error-handler.js";
import { taskRoutes } from "./routes/task.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import { healthRoutes } from "./routes/health.routes.js";
import fastifyJwt from "@fastify/jwt";
import { env } from "./config/env.js";
import { authPlugin } from "./plugins/auth.plugin.js";

const PREFIX = "/api/v1";

export function buildApp() {
    const app = Fastify({ logger: true })

    app.register(fastifyJwt , { secret: env.JWT_SECRET })
    app.register(authPlugin);

    app.setErrorHandler(errorHandler);

    app.register(healthRoutes, { prefix: `${PREFIX}/health` });
    app.register(taskRoutes, { prefix: `${PREFIX}/tasks` });
    app.register(authRoutes, { prefix: `${PREFIX}/auth` });

    return app;
}