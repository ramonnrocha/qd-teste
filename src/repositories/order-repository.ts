import { CartItem, Order } from "@prisma/client";

export interface OrderRepository {
  create(userId: string, cartItemIds: number[], total_price: number): Promise<Order>;
}
