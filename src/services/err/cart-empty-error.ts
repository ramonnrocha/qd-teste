export class CartEmptyError extends Error {
  constructor() {
    super("Não existem produtos no carrinho!");
  }
}
