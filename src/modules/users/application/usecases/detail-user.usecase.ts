import { User } from "@/users/domain/entities/user.entity";
import { IUserRepository } from "../repositories/user.repository";
import { NotFoundError } from "@common/errors/not-found.error";

export interface DetailUserUseCaseInput {
  id: string;
}

export class DetailUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: DetailUserUseCaseInput): Promise<User> {
    const user = await this.userRepository.findById(data);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}
