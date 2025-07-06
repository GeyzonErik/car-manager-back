import { IVehicleLogRepository } from "../repositories/vehicle-log.repository";

export interface ListVehicleLogUseCaseInput {
  userId: string;
}

export class ListVehicleLogUseCase {
  constructor(private readonly vehicleLogRepository: IVehicleLogRepository) {}

  async execute(data: ListVehicleLogUseCaseInput) {
    const vehicleLogs = await this.vehicleLogRepository.listLogs({
      userId: data.userId,
    });

    return vehicleLogs;
  }
}
