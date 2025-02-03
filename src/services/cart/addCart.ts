import { Cart, CartItem } from "@prisma/client";
import { CartRepository } from "../../repositories/cart-repository";
import { ProductRepository } from "../../repositories/product-repository";

interface CartServiceRequest {
  userId: string;
  productId: string;
  quantity: number;
}

interface CartServiceResponse {
  cartItem: CartItem | null
};

export class AddCartService {
  constructor(private cartRepository: CartRepository, private productRepository: ProductRepository) { }

  async execute({
    userId,
    productId,
    quantity,
  }: CartServiceRequest): Promise<CartServiceResponse> {

    let cart = await this.cartRepository.findByUserId(userId, "active");

    if (!cart) {
      cart = await this.cartRepository.create(userId);
    }

    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new Error()
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
        quantity,
        product.price
      );
    }

    cart = await this.cartRepository.findByUserId(userId, "active");

    return { cartItem }
  }
}
