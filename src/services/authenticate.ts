import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsError } from "./err/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

type AuthenticateServiceResponse = void;

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}
  
  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    
    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }


  }
}
