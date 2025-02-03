import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaOrderRepository } from "../../repositories/prisma/prisma-order-repository";
import { StatsService } from "../../services/stats/stats";

export async function stats(
  request: FastifyRequest,
  reply: FastifyReply
) {
  
  try {
    const orderRepository = new PrismaOrderRepository();
    const statsService = new StatsService(orderRepository);

    const order = await statsService.execute({ userId: request.user.sub });

    return reply.status(201).send(order);
  } catch (err) {

    throw err;
  }

}
