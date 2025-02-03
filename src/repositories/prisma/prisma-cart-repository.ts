import { Cart, CartItem } from "@prisma/client";
import { CartRepository } from "../cart-repository";
import { prisma } from "../../lib/prisma";
import { C } from "vitest/dist/chunks/reporters.0x019-V2";

export class PrismaCartRepository implements CartRepository {

  async findCartByOrderId(orderId: string): Promise<Cart | null> {
    const cart = await prisma.cart.findUnique({
      where: { order_id: orderId },
    });
    return cart;
  }

  async findCartById(cartId: number): Promise<Cart | null> {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
    });
    return cart;
  }

  async create(userId: string): Promise<Cart> {
    const cart = await prisma.cart.create({
      data: {
        user: { connect: { id: userId } },
      },
    });

    return cart;
  }
  async findCartItemsByCartId(cartId: number): Promise<CartItem[]> {
    const items = prisma.cartItem.findMany({
      where: { cart_id: cartId },
    });
    return items;
  }
  async findByUserId(userId: string, status: string): Promise<Cart | null> {
    const cart = await prisma.cart.findFirst({
      where: { user_id: userId, status },
    });
    return cart;
  }

  async findItemByCartId(
    cartId: number,
    productId: string
  ): Promise<CartItem | null> {
    const cartItem = await prisma.cartItem.findFirst({
      where: { cart_id: cartId, product_id: productId },
    });
    return cartItem;
  }

  async findItemById(cartItemId: number): Promise<CartItem | null> {
    const cartItem = await prisma.cartItem.findFirst({
      where: { id: cartItemId },
    });
    return cartItem;
  }

  async updateItem(cartItemId: number, newQuantity: number): Promise<CartItem> {
    const cartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: newQuantity },
    });

    return cartItem;
  }

  async addtoCart(
    cartItemId: number,
    productId: string,
    quantity: number,
    price: number
  ): Promise<CartItem> {
    const cartItem = await prisma.cartItem.create({
      data: {
        cart: { connect: { id: cartItemId } },
        product: { connect: { id: productId } },
        quantity,
        price
      },
    });

    return cartItem;
  }

  async deleteCartItem(cartItemId: number): Promise<CartItem | null> {
    const cartItem = await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return cartItem;
  }

  async updatedStatus(
    cartId: number,
    orderId: string,
    status: string
  ): Promise<Cart> {
    const cart = await prisma.cart.update({
      where: { id: cartId },
      data: {
        status: "closed",
        order: { connect: { id: orderId } },
        updated_at: new Date(),
      },
    });
    return cart;
  }

  async updatedItemsCart(cartItemId: number, orderId: string): Promise<void> {
 await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { orderId: orderId },
    })
  }
}
