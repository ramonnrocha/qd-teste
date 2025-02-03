export class EmptyParamsGetProductError extends Error {
  constructor() {
    super("Não é possível buscar produtos sem ID ou Nome");
  }
}
