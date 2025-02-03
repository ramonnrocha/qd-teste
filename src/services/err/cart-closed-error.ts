export class CartClosedError extends Error {
  constructor() {
    super("O carrinho desse item está fechado, ou não existe carrinho aberto!");
  }
}
