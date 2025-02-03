import { FastifyReply, FastifyRequest } from "fastify";
import { EmptyParamsGetProductError } from "../../services/err/empty-params-get-product-error";
import { PrismaProductsRepository } from "../../repositories/prisma/prisma-product-repository";
import { GetProductService } from "../../services/product/getProduct";
import { ProductsService } from "../../services/product/products";

export async function getProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { productId, name } = request.query as {
    productId?: string;
    name?: string;
  };

  let products;

  try {
    const productsRepository = new PrismaProductsRepository();
    const getProductService = new GetProductService(productsRepository);
    const productsService = new ProductsService(productsRepository);

    if (productId || name) {

      products = await getProductService.execute({ productId, name });
    } else {
      products = await productsService.execute();
    }

  } catch (err) {
    if (err instanceof EmptyParamsGetProductError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(200).send(products);
}
