import { IUserRepository } from "@/users/application/repositories/user.repository";
import { User } from "@/users/domain/entities/user.entity";
import { NotFoundError } from "@common/errors/not-found.error";
import { JwtService } from "../services/jwt-service";
import { UnauthorizedError } from "@common/errors/unauthorized-error";

export interface LoginUseCaseInput {
  email: string;
  password: string;
}

export interface LoginUseCaseOutput {
  user: User;
  token: string;
}

export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: JwtService
  ) {}

  async execute(data: LoginUseCaseInput): Promise<LoginUseCaseOutput> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user || !user.isValidPassword(data.password)) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = this.tokenService.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      user,
      token,
    };
  }
}
