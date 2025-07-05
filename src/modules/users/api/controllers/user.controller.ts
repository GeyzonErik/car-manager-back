import { DetailUserUseCase } from "@/users/application/usecases/detail-user.usecase";
import { Request, Response } from "express";
import { DetailUserPresenter } from "../presenters/detail-user.presenter";
import { UpdateUserUseCase } from "@/users/application/usecases/update-user.usecase";
import { DetailUserParams } from "../requests/detail-user.request";
import {
  UpdateUserBody,
  UpdateUserParams,
} from "../requests/update-user.request";
import { UpdateUserPresenter } from "../presenters/update-user.presenter";

export class UserController {
  constructor(
    private readonly detailUserUseCase: DetailUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  async detailUser(
    req: Request<DetailUserParams, unknown, unknown>,
    res: Response
  ) {
    try {
      const user = await this.detailUserUseCase.execute({
        id: req.params.id,
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
    req: Request<UpdateUserParams, unknown, UpdateUserBody>,
    res: Response
  ) {
    try {
      await this.updateUserUseCase.execute({
        id: req.params.id,
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
