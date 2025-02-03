export class CartItemNotFoundError extends Error {
  constructor() {
    super("Não existe nenhum item com esse id!");
  }
}
