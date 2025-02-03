import { Order } from "@prisma/client";
import { OrderRepository } from "../order-repository";
import { prisma } from "../../lib/prisma";

export class PrismaOrderRepository implements OrderRepository {

  async create(userId: string, cartItemIds: number[], total_price: number): Promise<Order> {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error("User does not exist");
    }

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

  async findById(orderId: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    return order
  }

  async findAll(userId: string): Promise<Order[]> {
    const order = await prisma.order.findMany({
      where: { user_id: userId },
    });
    return order
  }

  async finishOrder(
    orderId: string,
    status: string
  ): Promise<Order> {
    const cart = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
      },
    });
    return cart;
  }
}