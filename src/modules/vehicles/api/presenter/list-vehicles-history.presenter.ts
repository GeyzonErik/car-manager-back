import { VehicleHistory } from "@/vehicles/domain/entities/vehicle-log.entity";

export class ListVehiclesHistoryPresenter {
  static toHTTP(data: VehicleHistory) {
    return {
      id: data.id,
      description: data.description,
    };
  }
}
