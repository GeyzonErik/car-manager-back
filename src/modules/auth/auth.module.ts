import { EntityManager } from "@mikro-orm/postgresql";
import { AuthController } from "./api/controllers/auth.controller";
import { RegisterUserUseCase } from "@/users/application/usecases/register-user.usecase";
import { IUserRepository } from "@/users/application/repositories/user.repository";
import { UserPgRepository } from "@/users/data/mikro-orm/repositories/user.pg.repository";
import { LoginUseCase } from "./application/usecases/login.usecase";
import { JwtService } from "./application/services/jwt-service";
import { AuthGuard } from "./api/guards/auth.guard";

export interface AuthModuleDependencies {
  authController: AuthController;
  authGuard: AuthGuard;
}

export const createAuthModule = (em: EntityManager): AuthModuleDependencies => {
  // Repositories
  const userRepository: IUserRepository = new UserPgRepository(em);

  // Services
  const jwtService = new JwtService();

  // UseCases
  const registerUserUseCase = new RegisterUserUseCase(userRepository);
  const loginUseCase = new LoginUseCase(userRepository, jwtService);

  // Controllers
  const authController = new AuthController(registerUserUseCase, loginUseCase);

  // Guards
  const authGuard = new AuthGuard(userRepository, jwtService);

  return {
    authController,
    authGuard,
  };
};
