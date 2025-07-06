import { UserAuthenticatedRequest } from "@/auth/api/types/user-authenticated-request.type";
import { CreateVehicleUseCase } from "@/vehicles/application/usecases/create-vehicle.usecase";
import { CreateVehicleRequest } from "../requests/create-vehicle.request";
import { Request, Response } from "express";
import { CreateVehiclePresenter } from "../presenter/create-vehicle.presenter";
import {
  UpdateVehicleParams,
  UpdateVehicleRequest,
} from "../requests/update-vehicle.request";
import { UpdateVehicleUseCase } from "@/vehicles/application/usecases/update-vehicle.usecase";
import { UpdateVehiclePresenter } from "../presenter/update-vehicle.presenter";
import { DetailVehicleParams } from "../requests/detail-vehicle.request";
import { DetailVehiclePresenter } from "../presenter/detail-vehicle.presenter";
import { DetailVehicleUseCase } from "@/vehicles/application/usecases/detail-vehicle.usecase";
import { ListVehicleUseCase } from "@/vehicles/application/usecases/list-vehicle.usecase";
import { ListVehicleQuery } from "../requests/list-vehicle.request";
import { ListVehiclePresenter } from "../presenter/list-vehicle.presenter";
import { ToggleActiveVehicleUseCase } from "@/vehicles/application/usecases/toggle-vehicle-active.usecase";
import {
  ToggleActiveVehicleParams,
  ToggleActiveVehicleRequest,
} from "../requests/toggle-active-vehicle.request";
import { ToggleActiveVehiclePresenter } from "../presenter/toggle-vehicle.presenter";
import { GetVehicleStatusSummaryUseCase } from "@/vehicles/application/usecases/get-vehicle-status-summary.usecase";
import { GetVehicleStatusSummaryPresenter } from "../presenter/get-vehicle-status-summary.presenter";

export class VehicleController {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly detailVehicleUseCase: DetailVehicleUseCase,
    private readonly listVehicleUseCase: ListVehicleUseCase,
    private readonly getVehicleStatusSummaryUseCase: GetVehicleStatusSummaryUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    private readonly toggleActiveVehicleUseCase: ToggleActiveVehicleUseCase
  ) {}

  async createVehicle(
    req: UserAuthenticatedRequest<unknown, unknown, CreateVehicleRequest>,
    res: Response
  ) {
    try {
      await this.createVehicleUseCase.execute({
        ownerId: req.user.id,
        model: req.body.model,
        plate: req.body.plate,
      });

      return res.status(201).send(CreateVehiclePresenter.toHTTP());
    } catch (err) {
      if (err instanceof Error && err.name === "NotFoundError") {
        return res.status(404).json({ message: err.message });
      }

      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async listVehicles(
    req: UserAuthenticatedRequest<unknown, ListVehicleQuery, unknown>,
    res: Response
  ) {
    try {
      const vehicles = await this.listVehicleUseCase.execute({
        ownerId: req.user.id,
        active: req.query.active,
        page: req.query.page,
        limit: req.query.limit,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder,
      });

      return res.status(200).json(ListVehiclePresenter.toHTTP(vehicles));
    } catch (err) {
      if (err instanceof Error && err.name === "NotFoundError") {
        return res.status(404).json({ message: err.message });
      }

      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async detailVehicle(
    req: Request<DetailVehicleParams, unknown, unknown>,
    res: Response
  ) {
    try {
      const vehicle = await this.detailVehicleUseCase.execute({
        vehicleId: req.params.id,
      });

      return res.status(200).json(DetailVehiclePresenter.toHTTP(vehicle));
    } catch (err) {
      if (err instanceof Error && err.name === "NotFoundError") {
        return res.status(404).json({ message: err.message });
      }

      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getVehicleStatusSummary(
    req: UserAuthenticatedRequest<unknown, unknown, unknown>,
    res: Response
  ) {
    try {
      const summary = await this.getVehicleStatusSummaryUseCase.execute({
        ownerId: req.user.id,
      });

      return res
        .status(200)
        .json(GetVehicleStatusSummaryPresenter.toHTTP(summary));
    } catch (err) {
      if (err instanceof Error && err.name === "NotFoundError") {
        return res.status(404).json({ message: err.message });
      }

      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateVehicle(
    req: Request<UpdateVehicleParams, unknown, UpdateVehicleRequest>,
    res: Response
  ) {
    try {
      await this.updateVehicleUseCase.execute({
        vehicleId: req.params.id,
        model: req.body.model,
        plate: req.body.plate,
      });

      return res.status(201).send(UpdateVehiclePresenter.toHTTP());
    } catch (err) {
      if (err instanceof Error && err.name === "NotFoundError") {
        return res.status(404).json({ message: err.message });
      }

      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async toggleVehicleActive(
    req: UserAuthenticatedRequest<
      ToggleActiveVehicleParams,
      unknown,
      ToggleActiveVehicleRequest
    >,
    res: Response
  ) {
    try {
      await this.toggleActiveVehicleUseCase.execute({
        id: req.params.id,
        active: req.body.active,
      });

      return res
        .status(200)
        .send(ToggleActiveVehiclePresenter.toHTTP(req.body.active));
    } catch (err) {
      if (err instanceof Error && err.name === "NotFoundError") {
        return res.status(404).json({ message: err.message });
      }

      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
