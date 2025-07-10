import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const FruitZod = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  taste: z.string(),
});

const GetFruitsQueryZod = z.object({
  color: z.string().optional(),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

const GetFruitsResponseZod = z.array(FruitZod);

const GetFruitByIdParamsZod = z.object({
  id: z.coerce.number().int().positive(),
});

// Fastify-compatible JSON schemas
export const getFruitsSchema = {
  tags: ["Fruits"],
  querystring: zodToJsonSchema(GetFruitsQueryZod),
  response: {
    200: zodToJsonSchema(GetFruitsResponseZod),
  },
};

export const getFruitByIdSchema = {
  tags: ["Fruits"],
  params: zodToJsonSchema(GetFruitByIdParamsZod),
  response: {
    200: zodToJsonSchema(FruitZod),
    404: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};