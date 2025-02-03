import { Product } from "@prisma/client";

export interface ProductRepository {
  findAll() : Promise<Product[]>
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
}


