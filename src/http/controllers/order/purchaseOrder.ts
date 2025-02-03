import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaOrderRepository } from "../../../repositories/prisma/prisma-order-repository";
import { z } from "zod";
import { PurchaseOrderService } from "../../../services/order/purchaseOrder";
import { PrismaCartRepository } from "../../../repositories/prisma/prisma-cart-repository";
import { CartClosedError } from "../../../services/err/cart-closed-error";
import { CartEmptyError } from "../../../services/err/cart-empty-error";


export async function purchaseOrder(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.string(),
  });

  const { id } = paramsSchema.parse(request.params);

  try {
    const orderRepository = new PrismaOrderRepository();
    const cartRepository = new PrismaCartRepository();

    const orderService = new PurchaseOrderService(cartRepository, orderRepository);

    const order = await orderService.execute({ orderId: id });

    return reply.status(201).send(order);
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
