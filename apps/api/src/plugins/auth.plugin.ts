import fp from "fastify-plugin";
import { authenticate } from "../hooks/authenticate.js";

export const authPlugin = fp(async (app) => {
    app.decorate("authenticate", authenticate);
})