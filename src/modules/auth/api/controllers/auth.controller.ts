import { RegisterUserUseCase } from "@/users/application/usecases/register-user.usecase";
import e, { Request, Response } from "express";
import { RegisterUserRequest } from "../requests/register-user.request";
import { LoginUseCase } from "@/auth/application/usecases/login.usecase";
import { LoginRequest } from "../requests/login.request";
import { RegisterUserPresenter } from "../presenters/register-user.presenter";

export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase
  ) {}

  async register(
    req: Request<{}, unknown, RegisterUserRequest>,
    res: Response
  ) {
    try {
      await this.registerUserUseCase.execute(req.body);

      res.status(201).send(RegisterUserPresenter.toHTTP());
    } catch (err) {
      if (err instanceof Error && err.name === "ConflictError") {
        return res.status(409).json({ message: err.message });
      }

      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req: Request<{}, unknown, LoginRequest>, res: Response) {
    try {
      const { user, token } = await this.loginUseCase.execute({
        email: req.body.email,
        password: req.body.password,
      });

      res
        .cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: parseInt(process.env.JWT_EXPIRATION_TIME || "3600") * 1000,
        })
        .status(200)
        .json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
    } catch (err) {
      if (err instanceof Error && err.name === "UnauthorizedError") {
        return res.status(401).json({ message: err.message });
      }

      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res
        .clearCookie("auth_token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
        })
        .status(200)
        .json({ message: "Successfully logged out" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
