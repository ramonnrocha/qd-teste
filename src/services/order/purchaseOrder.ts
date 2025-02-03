import { Order } from "@prisma/client";
import { CartRepository } from "../../repositories/cart-repository";
import { CartClosedError } from "../err/cart-closed-error";
import { CartEmptyError } from "../err/cart-empty-error";
import { OrderRepository } from "../../repositories/order-repository";

interface PurchaseOrderServiceRequest {
  orderId: string;
}

interface PurchaseOrderServiceResponse {
  order: Order | null;
}

export class PurchaseOrderService {
  constructor(
    private cartRepository: CartRepository,
    private orderRepository: OrderRepository
  ) { }

  async execute({
    orderId,
  }: PurchaseOrderServiceRequest): Promise<PurchaseOrderServiceResponse> {
    let cart = await this.cartRepository.findCartByOrderId(orderId);

    if (!cart) {
      throw new CartClosedError();
    }

    const cartItems = await this.cartRepository.findCartItemsByCartId(cart.id);

    if (cartItems.length === 0) {
      throw new CartEmptyError();
    }

    const order = await this.orderRepository.finishOrder(
      orderId,
      "paid"
    );

    if (order) {
      cart = await this.cartRepository.updatedStatus(
        cart.id,
        order.id,
        "closed"
      );

      await Promise.all(
        cartItems.map(async (item) =>
          this.cartRepository.updatedItemsCart(item.id, order.id)
        )
      );
    }

    return { order }
  }
}
