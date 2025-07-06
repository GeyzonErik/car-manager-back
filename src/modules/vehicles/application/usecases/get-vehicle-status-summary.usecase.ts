import { IVehicleRepository } from "../repositories/vehicle.repository";

export interface GetVehicleStatusSummaryUseCaseInput {
  ownerId: string;
}

export interface VehicleStatusSummaryUseCaseOutput {
  total: number;
  active: number;
  inactive: number;
}

export class GetVehicleStatusSummaryUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(data: GetVehicleStatusSummaryUseCaseInput) {
    const summary = await this.vehicleRepository.getStatusSummary(data);

    if (!summary) {
      throw new Error("Vehicle status summary not found");
    }

    return summary;
  }
}
