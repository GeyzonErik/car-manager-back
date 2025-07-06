import { NotFoundError } from "@common/errors/not-found.error";
import { IVehicleLogRepository } from "../repositories/vehicle-log.repository";
import { IVehicleRepository } from "../repositories/vehicle.repository";
import { VehicleHistory } from "@/vehicles/domain/entities/vehicle-log.entity";
import { IUserRepository } from "@/users/application/repositories/user.repository";

export interface ToggleActiveVehicleUseCaseInput {
  id: string;
  active: boolean;
}

export class ToggleActiveVehicleUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly vehicleRepository: IVehicleRepository,
    private readonly vehicleLogRepository: IVehicleLogRepository
  ) {}

  async execute(data: ToggleActiveVehicleUseCaseInput) {
    const vehicle = await this.vehicleRepository.findById({
      id: data.id,
    });

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    if (data.active) {
      vehicle.activate();
    }

    if (!data.active) {
      vehicle.deactivate();
    }

    await this.vehicleRepository.update(vehicle);

    const user = await this.userRepository.findById({
      id: vehicle.ownerId,
    });

    const vehicleLog = new VehicleHistory({
      vehicleId: vehicle.id,
      userId: vehicle.ownerId,
      action: data.active ? "ACTIVATED" : "DEACTIVATED",
      description: `Vehicle ${vehicle.model} with plate ${
        vehicle.plate
      } has been ${data.active ? "activated" : "deactivated"} by ${user?.name}`,
      createdAt: new Date(),
    });

    await this.vehicleLogRepository.createLog(vehicleLog);
  }
}
