import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCartRepository } from "../../../repositories/prisma/prisma-cart-repository";
import { PrismaOrderRepository } from "../../../repositories/prisma/prisma-order-repository";
import { CartClosedError } from "../../../services/err/cart-closed-error";
import { CartEmptyError } from "../../../services/err/cart-empty-error";
import { CreateOrderService } from "../../../services/order/createOrder";

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
    const order = await createOrderService.execute({ userId: request.user.sub }); // Passa o ID do usuário e dados adicionais
    reply.status(201).send(order);
  } catch (err) {
    if (err instanceof CartClosedError) {
      return reply.status(400).send({ message: err.message });
    }

    if (err instanceof CartEmptyError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }
}
