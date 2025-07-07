import { NotFoundError } from "@common/errors/not-found.error";
import { IVehicleRepository } from "../repositories/vehicle.repository";
import { IVehicleLogRepository } from "../repositories/vehicle-log.repository";
import { VehicleHistory } from "@/vehicles/domain/entities/vehicle-log.entity";
import { IUserRepository } from "@/users/application/repositories/user.repository";

export interface DeleteVehicleUseCaseInput {
  vehicleId: string;
}

export class DeleteVehicleUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly vehicleRepository: IVehicleRepository,
    private readonly vehicleLogRepository: IVehicleLogRepository
  ) {}

  async execute(data: DeleteVehicleUseCaseInput): Promise<void> {
    const vehicle = await this.vehicleRepository.findById({
      id: data.vehicleId,
    });

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    await this.vehicleRepository.delete({
      id: data.vehicleId,
    });

    const user = await this.userRepository.findById({
      id: vehicle.ownerId,
    });

    const vehicleLog = new VehicleHistory({
      userId: vehicle.ownerId,
      vehicleId: vehicle.id,
      action: "DELETED",
      description: `Vehicle ${vehicle.model} with plate ${vehicle.plate} was deleted by ${user?.name}`,
      createdAt: new Date(),
    });

    await this.vehicleLogRepository.createLog(vehicleLog);
  }
}
