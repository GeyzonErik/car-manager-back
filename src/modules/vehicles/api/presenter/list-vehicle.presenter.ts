import {
  ListAllVehiclesUseCaseOutput,
  ListVehicleUseCase,
} from "@/vehicles/application/usecases/list-vehicle.usecase";

export class ListVehiclePresenter {
  static toHTTP(data: ListAllVehiclesUseCaseOutput) {
    return {
      data: data.data.map((vehicle) => ({
        id: vehicle.id,
        model: vehicle.model,
        plate: vehicle.plate,
        active: vehicle.isActive(),
      })),
      page: data.page,
      limit: data.limit,
      total: data.total,
    };
  }
}
