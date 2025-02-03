import { Product } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ProductRepository } from "../product-repository";

export class PrismaProductsRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany();
    return products;
  }
  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: { name: { contains: name, mode: "insensitive" } },
    });
    return product;
  }
}
