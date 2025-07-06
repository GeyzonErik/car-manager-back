import { VehicleStatusSummaryUseCaseOutput } from "@/vehicles/application/usecases/get-vehicle-status-summary.usecase";

export class GetVehicleStatusSummaryPresenter {
  static toHTTP(data: VehicleStatusSummaryUseCaseOutput) {
    return {
      total: data.total,
      active: data.active,
      inactive: data.inactive,
    };
  }
}
