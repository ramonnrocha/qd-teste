import { Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/product-repository";

export class ProductsService {
    constructor(private productsRepository: ProductRepository) { }
    async execute(): Promise<Product[]> {
        return await this.productsRepository.findAll();
    }
}
