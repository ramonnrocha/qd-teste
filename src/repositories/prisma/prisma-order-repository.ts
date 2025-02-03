import { Order } from "@prisma/client";
import { OrderRepository } from "../order-repository";
import { prisma } from "../../lib/prisma";

export class PrismaOrderRepository implements OrderRepository {
  async create(userId: string, cartItemIds: number[], total_price: number): Promise<Order> { // Alterado para receber IDs
    return prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        items: { 
          connect: cartItemIds.map(cartItemId => ({ id: cartItemId })),
        },
        total_price,
      },
    });
  }
}