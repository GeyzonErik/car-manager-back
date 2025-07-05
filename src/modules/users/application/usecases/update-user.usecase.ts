import { NotFoundError } from "@common/errors/not-found.error";
import { IUserRepository } from "../repositories/user.repository";

export interface UpdateUserUseCaseInput {
  id: string;
  name?: string;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: UpdateUserUseCaseInput): Promise<void> {
    const user = await this.userRepository.findById({ id: data.id });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (data.name) {
      user.changeName(data.name);
    }

    await this.userRepository.update(user);
  }
}
