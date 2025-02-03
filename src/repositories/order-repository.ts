import { CartItem, Order } from "@prisma/client";

export interface OrderRepository {
  create(userId: string, cartItemIds: number[], total_price: number): Promise<Order>;
  findAll(userId: string): Promise<Order[]>
  finishOrder(orderId: string, status: string): Promise<Order>;
  findById(orderId: string): Promise<Order | null>;
}
