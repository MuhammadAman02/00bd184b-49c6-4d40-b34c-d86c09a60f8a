import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fruitRoutes } from "./routes/fruit.route";

export async function createApp() {
  const app = Fastify({
    logger: {
      level: "info",
    },
  });

  await app.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Fruits API",
        description: "A simple API for managing fruits",
        version: "1.0.0",
      },
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
    },
    staticCSP: true,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  app.setErrorHandler(async (error, request, reply) => {
    console.error("Global error handler:", error);

    if (error.validation) {
      return reply.status(400).send({
        error: "Validation failed",
        details: error.validation,
      });
    }

    return reply.status(500).send({
      error: "Internal Server Error",
    });
  });

  app.get("/api/health", {
    schema: {
      tags: ["Health"],
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "string" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: async () => {
      return { status: "OK", message: "Fruits API is running" };
    },
  });

  await app.register(fruitRoutes, { prefix: "/api" });

  return app;
}