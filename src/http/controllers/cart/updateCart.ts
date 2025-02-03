import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCartRepository } from "../../../repositories/prisma/prisma-cart-repository";
import { UpdateCartService } from "../../../services/cart/updateCart";
import { CartClosedError } from "../../../services/err/cart-closed-error";
import { CartItemNotFoundError } from "../../../services/err/cart-item-not-found-error";

export async function updateCart(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    quantity: z.number().int().positive(),
  });

  const { quantity } = bodySchema.parse(request.body);

  const paramsSchema = z.object({
    id: z.string().transform(Number),
  });

  const { id } = paramsSchema.parse(request.params);

  try {
    const cartRepository = new PrismaCartRepository();
    const cartService = new UpdateCartService(cartRepository);

    const cart = await cartService.execute({
      cartItemId: id,
      quantity,
    });
    return reply.status(204).send(cart);
  } catch (err) {
    if (err instanceof CartClosedError) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof CartItemNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
