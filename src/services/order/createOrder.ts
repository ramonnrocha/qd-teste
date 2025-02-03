import { Order } from "@prisma/client";
import { CartRepository } from "../../repositories/cart-repository";
import { CartClosedError } from "../err/cart-closed-error";
import { CartEmptyError } from "../err/cart-empty-error";
import { OrderRepository } from "../../repositories/order-repository";

interface CreateOrderServiceRequest {
  userId: string;
}

interface CreateOrderServiceResponse {
  order: Order | null;
}

export class CreateOrderService {
  constructor(
    private cartRepository: CartRepository,
    private orderRepository: OrderRepository
  ) { }

  async execute({
    userId,
  }: CreateOrderServiceRequest): Promise<CreateOrderServiceResponse> {
    let cart = await this.cartRepository.findByUserId(userId, "active");

    if (!cart) {
      throw new CartClosedError();
    }

    const cartItems = await this.cartRepository.findCartItemsByCartId(cart.id);

    if (cartItems.length === 0) {
      throw new CartEmptyError();
    }

    const total_price = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const cartItemIds = cartItems.map((item) => item.id);

    const order = await this.orderRepository.create(
      userId,
      cartItemIds,
      total_price
    );

    return { order }
  }
}
