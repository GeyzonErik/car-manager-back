import { UserAuthenticatedRequest } from "@/auth/api/types/user-authenticated-request.type";
import { ListVehicleLogUseCase } from "@/vehicles/application/usecases/list-vehicle-log.usecase";
import { Response } from "express";
import { ListVehiclesHistoryPresenter } from "../presenter/list-vehicles-history.presenter";

export class VehicleHistoryController {
  constructor(private readonly listVehicleLogUseCase: ListVehicleLogUseCase) {}

  async listVehicleLogs(req: UserAuthenticatedRequest, res: Response) {
    try {
      const logs = await this.listVehicleLogUseCase.execute({
        userId: req.user.id,
      });

      res.status(200).json(logs.map(ListVehiclesHistoryPresenter.toHTTP));
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }
}
