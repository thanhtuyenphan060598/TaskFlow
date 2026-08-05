import type { FastifyJwtNamespace } from "@fastify/jwt";
import type { FastifyReply, FastifyRequest } from "fastify";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      userId: string;
    };
    user: { userId: string; iat: number; exp: number };
  }
}

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "access" }>,
      FastifyJwtNamespace<{ namespace: "refresh" }> {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    accessJwtVerify: FastifyRequest["jwtVerify"];
  }
}
