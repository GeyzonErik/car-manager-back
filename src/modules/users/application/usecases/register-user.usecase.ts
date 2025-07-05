import { User } from "@/users/domain/entities/user.entity";
import { IUserRepository } from "../repositories/user.repository";
import { ConflictError } from "@common/errors/conflict.error";

export interface RegisterUserUseCaseInput {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: RegisterUserUseCaseInput): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("User with this email already exists");
    }

    const user = new User({
      name: data.name,
      email: data.email,
    }).withPassword(data.password);

    await this.userRepository.create(user);
  }
}
