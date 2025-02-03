import { FastifyReply, FastifyRequest } from "fastify";
import { EmptyParamsGetProductError } from "../../services/err/empty-params-get-product-error";
import { PrismaProductsRepository } from "../../repositories/prisma/prisma-product-repository";
import { GetProductService } from "../../services/product/getProduct";

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { productId, name } = request.query as {
    productId?: string;
    name?: string;
  };

  let product;

  try {
    const productsRepository = new PrismaProductsRepository();
    const getProductService = new GetProductService(productsRepository);

    product = await getProductService.execute({ productId, name });
  } catch (err) {
    if (err instanceof EmptyParamsGetProductError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send(product);
}
