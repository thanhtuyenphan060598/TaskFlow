import Fastify from 'fastify';
import { ZodError } from 'zod';
import { AppError } from './lib/errors.js';
import { taskRoutes } from './routes/task.routes.js';

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
    if(error instanceof ZodError) {
        return reply.code(400).send({
            error: "ValidationError",
            details: error.issues
        })
    }

    if(error instanceof AppError) {
        return reply.code(error.statusCode).send({ error: error.message})
    }

    app.log.error(error);
    return reply.code(500).send({ error: "Internal Server Error"});
})

app.get("/health", async ()=>{
    return { status: "ok" };
});

app.register(taskRoutes, { prefix: "/api/v1"});

const PORT = 3001;

const start = async () => {
    try {
        await app.listen({ port: PORT });
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

start();