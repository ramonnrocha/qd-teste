import { Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/product-repository";
import { EmptyParamsGetProductError } from "../err/empty-params-get-product-error";

interface GetProductRequest {
  productId?: string;
  name?: string;
}

export class GetProductService {
  constructor(private productsRepository: ProductRepository) { }

  async execute({
    productId,
    name,
  }: GetProductRequest): Promise<Product | null> {
    if (!productId && !name) {
      throw new EmptyParamsGetProductError();
    }

    if (productId) {
      return await this.productsRepository.findById(productId);
    }

    if (name) {
      return await this.productsRepository.findByName(name);
    }

    return null;
  }
}
