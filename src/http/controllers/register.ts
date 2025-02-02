import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../repositories/prisma-users-repository";
import { RegisterService } from "../../services/register";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../services/err/user-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodyschema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodyschema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(usersRepository);

    await registerService.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err
  }

  return reply.status(201).send();
}
