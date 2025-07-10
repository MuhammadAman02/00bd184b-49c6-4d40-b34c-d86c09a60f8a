import { FastifyInstance } from 'fastify';
import { getFruitsHandler, getFruitByIdHandler } from '../controllers/fruit.controller';
import { getFruitsSchema, getFruitByIdSchema } from '../schemas/fruit.schema';

export async function fruitRoutes(app: FastifyInstance) {
  app.get('/fruits', {
    schema: getFruitsSchema,
    handler: getFruitsHandler,
  });

  app.get('/fruits/:id', {
    schema: getFruitByIdSchema,
    handler: getFruitByIdHandler,
  });
}