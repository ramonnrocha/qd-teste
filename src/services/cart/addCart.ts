import { Cart } from "@prisma/client";
import { CartRepository } from "../../repositories/cart-repository";

interface CartServiceRequest {
  userId: string;
  productId: string;
  quantity: number;
}

interface CartServiceResponse {
  cart: Cart | null
};

export class AddCartService {
  constructor(private cartRepository: CartRepository) {}

  async execute({
    userId,
    productId,
    quantity,
  }: CartServiceRequest): Promise<CartServiceResponse> {
    let cart = await this.cartRepository.findByUserId(userId, "active");

    if (!cart) {
      cart = await this.cartRepository.create(userId);
    }

    let cartItem = await this.cartRepository.findItemByCartId(cart.id, productId);

    if (cartItem) {
      cartItem = await this.cartRepository.updateItem(
        cartItem.cart_id,
        cartItem.quantity + quantity
      );
    } else {
      cartItem = await this.cartRepository.addtoCart(
        cart.id,
        productId,
        quantity
      );
    }

    cart = await this.cartRepository.findByUserId(userId, "active");

    return { cart }
  }
}
