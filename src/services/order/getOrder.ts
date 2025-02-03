import { Order, Product } from "@prisma/client";
import { ProductRepository } from "../../repositories/product-repository";
import { EmptyParamsGetProductError } from "../err/empty-params-get-product-error";
import { OrderRepository } from "../../repositories/order-repository";

interface GetOrderRequest {
  orderId: string;

}

export class GetOrderService {
  constructor(private orderRepository: OrderRepository) { }

  async execute({
    orderId
  }: GetOrderRequest): Promise<Order | null> {
    const order = await this.orderRepository.findById(orderId);

    if (order) {
      return order;
    }
    
    return null;
  }
}
