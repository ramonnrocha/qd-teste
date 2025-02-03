import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { InvalidCredentialsError } from "../../services/err/invalid-credentials-error";
import { AuthenticateService } from "../../services/user/authenticate";
export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, password } = authenticateBodySchema.parse(request.body);
  try {
    const usersRepository = new PrismaUsersRepository();
    const authenticateService = new AuthenticateService(usersRepository);
    const { user } = await authenticateService.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );
    return reply.status(200).send({ token });
    
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }
}
