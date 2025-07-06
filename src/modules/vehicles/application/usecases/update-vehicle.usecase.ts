import { NotFoundError } from "@common/errors/not-found.error";
import { IVehicleRepository } from "../repositories/vehicle.repository";
import { IVehicleLogRepository } from "../repositories/vehicle-log.repository";
import { VehicleHistory } from "@/vehicles/domain/entities/vehicle-log.entity";
import { IUserRepository } from "@/users/application/repositories/user.repository";

export interface UpdateVehicleInput {
  vehicleId: string;
  model?: string;
  plate?: string;
}

export class UpdateVehicleUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly vehicleRepository: IVehicleRepository,
    private readonly vehicleLogRepository: IVehicleLogRepository
  ) {}

  async execute(data: UpdateVehicleInput): Promise<void> {
    const vehicle = await this.vehicleRepository.findById({
      id: data.vehicleId,
    });

    const oldModel = vehicle?.model;
    const oldPlate = vehicle?.plate;

    if (!vehicle) {
      throw new NotFoundError(`Vehicle with id ${data.vehicleId} not found`);
    }

    if (data.model) {
      vehicle.changeModel(data.model);
    }

    if (data.plate) {
      vehicle.changePlate(data.plate);
    }

    const newModel = data.model ?? vehicle.model;
    const newPlate = data.plate?.toUpperCase() ?? vehicle.plate;

    await this.vehicleRepository.update(vehicle);

    const user = await this.userRepository.findById({
      id: vehicle.ownerId,
    });

    const vehicleLog = new VehicleHistory({
      userId: vehicle.ownerId,
      vehicleId: vehicle.id,
      action: "UPDATED",
      createdAt: vehicle.updatedAt,
      description: `Vehicle ${oldModel} with plate ${oldPlate} was updated to model: ${newModel} and plate: ${newPlate} by ${user?.name}`,
    });

    await this.vehicleLogRepository.createLog(vehicleLog);
  }
}
