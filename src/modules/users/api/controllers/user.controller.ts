import { DetailUserUseCase } from "@/users/application/usecases/detail-user.usecase";
import { Response } from "express";
import { DetailUserPresenter } from "../presenters/detail-user.presenter";
import { UpdateUserUseCase } from "@/users/application/usecases/update-user.usecase";
import { UpdateUserBody } from "../requests/update-user.request";
import { UpdateUserPresenter } from "../presenters/update-user.presenter";
import { UserAuthenticatedRequest } from "@/auth/api/types/user-authenticated-request.type";

export class UserController {
  constructor(
    private readonly detailUserUseCase: DetailUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  async detailUser(req: UserAuthenticatedRequest, res: Response) {
    try {
      const user = await this.detailUserUseCase.execute({
        id: req.user.id,
      });

      res.status(200).json(DetailUserPresenter.toHTTP(user));
    } catch (err) {
      if (err instanceof Error && err.name === "NotFoundError") {
        return res.status(404).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(
    req: UserAuthenticatedRequest<unknown, unknown, UpdateUserBody>,
    res: Response
  ) {
    try {
      await this.updateUserUseCase.execute({
        id: req.user.id,
        name: req.body.name,
      });

      res.status(200).send(UpdateUserPresenter.toHTTP());
    } catch (err) {
      if (err instanceof Error && err.name === "NotFoundError") {
        return res.status(404).json({ message: err.message });
      }

      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
