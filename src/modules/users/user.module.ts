import { EntityManager } from "@mikro-orm/postgresql";
import { DetailUserUseCase } from "./application/usecases/detail-user.usecase";
import { UserController } from "./api/controllers/user.controller";
import { IUserRepository } from "./application/repositories/user.repository";
import { UserPgRepository } from "./data/mikro-orm/repositories/user.pg.repository";
import { UpdateUserUseCase } from "./application/usecases/update-user.usecase";

export interface UserModuleDependencies {
  userController: UserController;
}

export const createUserModule = (em: EntityManager): UserModuleDependencies => {
  // Repositories
  const userRepository: IUserRepository = new UserPgRepository(em);

  // UseCases
  const detailUserUseCase = new DetailUserUseCase(userRepository);
  const updateUserUseCase = new UpdateUserUseCase(userRepository);

  // Controllers
  const userController = new UserController(
    detailUserUseCase,
    updateUserUseCase
  );

  return {
    userController,
  };
};
