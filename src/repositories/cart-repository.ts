import { Cart, CartItem } from "@prisma/client";

export interface CartRepository {
  create(userId: string): Promise<Cart>;
  findByUserId(userId: String, status: string): Promise<Cart | null>;
  findCartById(cartId: number): Promise<Cart | null>;
  findItemByCartId(cartId: number, productId: string): Promise<CartItem | null>;
  deleteCartItem(cartItemId: number): Promise<CartItem | null>;
  findItemById(cartItemId: number): Promise<CartItem | null>;
  updatedStatus(cartId: number, orderId: string, status: string) : Promise<Cart>
  updatedItemsCart(cartItemId: number, orderId: string) : Promise<void>
  findCartItemsByCartId(cartId: number): Promise<CartItem[]>;
  updateItem(cartItemId: number, newQuantity: number): Promise<CartItem>;
  addtoCart(
    cartId: number,
    productId: string,
    quantity: number
  ): Promise<CartItem>;
}
