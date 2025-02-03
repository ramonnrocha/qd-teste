import { FastifyReply, FastifyRequest } from "fastify";
import { GetOrderService } from "../../../services/order/getOrder";
import { PrismaOrderRepository } from "../../../repositories/prisma/prisma-order-repository";
import { z } from "zod";


export async function getOrder(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.string(),
  });

  const { id } = paramsSchema.parse(request.params);

  try {
    const orderRepository = new PrismaOrderRepository();
    const orderService = new GetOrderService(orderRepository);

    const order = await orderService.execute({ orderId: id });

    return reply.status(201).send(order);
  } catch (err) {

    throw err;
  }

}
