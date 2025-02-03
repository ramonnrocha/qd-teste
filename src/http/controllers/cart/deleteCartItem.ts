import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaCartRepository } from "../../../repositories/prisma/prisma-cart-repository";
import { UpdateCartService } from "../../../services/cart/updateCart";
import { CartClosedError } from "../../../services/err/cart-closed-error";
import { CartItemNotFoundError } from "../../../services/err/cart-item-not-found-error";
import { DeleteItemCartService } from "../../../services/cart/deleteItemCart";

export async function deleteCartItem(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.string().transform(Number),
  });

  const { id } = paramsSchema.parse(request.params);

  try {
    const cartRepository = new PrismaCartRepository();
    const deleteCartItem = new DeleteItemCartService(cartRepository);

    const cart = await deleteCartItem.execute({
      cartItemId: id,
    });
    return reply.status(204).send();
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
