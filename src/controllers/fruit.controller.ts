import { FastifyRequest, FastifyReply } from 'fastify';
import { getFruits, getFruitById } from '../services/fruit.service';
import { AppError } from '../utils/AppError';

export async function getFruitsHandler(
  req: FastifyRequest<{ Querystring: { color?: string; limit: number } }>,
  res: FastifyReply
) {
  try {
    const { color, limit } = req.query;
    const fruits = await getFruits(color, limit);
    
    console.log(`Returning ${fruits.length} fruits`);
    res.status(200).send(fruits);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal server error' });
  }
}

export async function getFruitByIdHandler(
  req: FastifyRequest<{ Params: { id: number } }>,
  res: FastifyReply
) {
  try {
    const { id } = req.params;
    const fruit = await getFruitById(id);
    
    console.log(`Returning fruit: ${fruit.name}`);
    res.status(200).send(fruit);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal server error' });
  }
}