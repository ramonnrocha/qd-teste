import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { getProducts } from "./controllers/getProducts";
import { verifyJwt } from "./middlewares/verify-jwt";
import { updateCart } from "./controllers/cart/updateCart";
import { addCart } from "./controllers/cart/addCart";
import { deleteCartItem } from "./controllers/cart/deleteCartItem";
import { createOrder } from "./controllers/order/createOrder";
import { getOrder } from "./controllers/order/getOrder";
import { purchaseOrder } from "./controllers/order/purchaseOrder";
import { stats } from "./controllers/stats";

export async function appRoutes(app: FastifyInstance) {
  // Registro e Autenticação
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Produtos
  app.get("/products", { onRequest: [verifyJwt] }, getProducts);


  // Carinho
  app.post("/cart/items", { onRequest: [verifyJwt] }, addCart);
  app.put("/cart/items/:id", { onRequest: [verifyJwt] }, updateCart);
  app.delete("/cart/items/:id", { onRequest: [verifyJwt] }, deleteCartItem);

  // Compras
  app.post("/orders", { onRequest: [verifyJwt] }, createOrder);
  app.get("/orders/:id", { onRequest: [verifyJwt] }, getOrder);
  app.post("/purchase/:id", { onRequest: [verifyJwt] }, purchaseOrder);

  // Estatisticas
  app.get("/stats", { onRequest: [verifyJwt] }, stats);
}
