import fastify from "fastify";
import { register } from "./http/controllers/register";
import { appRoutes } from "./http/routes";
import { error } from "console";
import { ZodError } from "zod";
import { env } from "./env";
import { addProductsDB } from "./utils/addProductsDB";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

addProductsDB();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})


app.register(appRoutes);


app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Erro na Validação.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // Deveria usar uma plataforma de log ex: datadog
  }

  return reply.status(500).send({ message: "Internal Server Error" });
});
