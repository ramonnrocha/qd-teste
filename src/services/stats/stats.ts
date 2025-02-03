
import { Order } from "@prisma/client";
import { OrderRepository } from "../../repositories/order-repository";
import { CartRepository } from "../../repositories/cart-repository";

interface StatsServiceRequest {
  userId: string;
}

interface StatsServiceResponse {
  stats: {
    orderCount: number;
    totalOrderValue: number;
    averageTicket: number;
  };
}

export class StatsService {
  constructor(
    private orderRepository: OrderRepository,
  ) { }

  async execute({
    userId,
  }: StatsServiceRequest): Promise<StatsServiceResponse> {
    const orders = await this.orderRepository.findAll(userId);


    const orderCount = orders.length;
    const totalOrderValue = orders.reduce((sum, order) => sum + order.total_price, 0);
    const averageTicket = orderCount > 0 ? totalOrderValue / orderCount : 0;


    return {
      stats: {
        orderCount,
        totalOrderValue,
        averageTicket,
      },
    };
  }

}
