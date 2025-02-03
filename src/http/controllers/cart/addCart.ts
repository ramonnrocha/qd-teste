import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCartRepository } from "../../../repositories/prisma/prisma-cart-repository";
import { AddCartService } from "../../../services/cart/addCart";

export async function addCart(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
  });

  const { productId, quantity } = bodySchema.parse(request.body);

  try {
    const cartRepository = new PrismaCartRepository();
    const cartService = new AddCartService(cartRepository);

    const cart = await cartService.execute({
      userId: request.user.sub,
      productId,
      quantity,
    });
    return reply.status(200).send(cart);
  } catch (err) {
    throw err;
  }
}
