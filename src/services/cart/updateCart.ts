import { CartItem } from "@prisma/client";
import { CartRepository } from "../../repositories/cart-repository";
import { CartClosedError } from "../err/cart-closed-error";
import { CartItemNotFoundError } from "../err/cart-item-not-found-error";

interface UpdateCartServiceRequest {
  cartItemId: number;
  quantity: number;
}

interface UpdateCartServiceResponse {
  updatedCartItem: CartItem | null;
}

export class UpdateCartService {
  constructor(private cartRepository: CartRepository) {}
  async execute({
    cartItemId,
    quantity,
  }: UpdateCartServiceRequest): Promise<UpdateCartServiceResponse> {
    console.log(cartItemId)
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

    const updatedCartItem = await this.cartRepository.updateItem(
      cartItemId,
      quantity
    );

    return { updatedCartItem };
  }
}
