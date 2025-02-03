import { CartItem } from "@prisma/client";
import { CartRepository } from "../../repositories/cart-repository";
import { CartClosedError } from "../err/cart-closed-error";
import { CartItemNotFoundError } from "../err/cart-item-not-found-error";

interface DeleteItemCartServiceRequest {
  cartItemId: number;
}

type DeleteItemCartServiceResponse = void;

export class DeleteItemCartService {
  constructor(private cartRepository: CartRepository) {}
  async execute({
    cartItemId,
  }: DeleteItemCartServiceRequest): Promise<DeleteItemCartServiceResponse> {
    const cartItem = await this.cartRepository.findItemById(cartItemId);

    if (!cartItem) {
      throw new CartItemNotFoundError();
    }

    const cart = await this.cartRepository.findCartById(cartItem.cart_id);

    if (!cart) {
      throw new CartItemNotFoundError();
    }

    if (cart.status !== "active") {
      throw new CartClosedError();
    }

    await this.cartRepository.deleteCartItem(cartItemId);
  }
}
