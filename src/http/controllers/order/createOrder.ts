import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateOrderService } from "../../../services/order/createOrderService";
import { PrismaCartRepository } from "../../../repositories/prisma/prisma-cart-repository";
import { PrismaOrderRepository } from "../../../repositories/prisma/prisma-order-repository";

export async function createOrder(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const cartRepository = new PrismaCartRepository();
    const orderRepository = new PrismaOrderRepository();
    const createOrderService = new CreateOrderService(
      cartRepository,
      orderRepository
    );
    const order = await createOrderService.execute({userId: request.user.sub}); // Passa o ID do usuário e dados adicionais
    reply.status(201).send(order);
  } catch (err) {
    throw err;
  }
}
