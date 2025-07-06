import { Vehicle } from "@/vehicles/domain/entities/vehicle.entity";
import { IVehicleRepository } from "../repositories/vehicle.repository";
import { VehicleHistory } from "@/vehicles/domain/entities/vehicle-log.entity";
import { IVehicleLogRepository } from "../repositories/vehicle-log.repository";
import { IUserRepository } from "@/users/application/repositories/user.repository";

export interface CreateVehicleInput {
  ownerId: string;
  model: string;
  plate: string;
}

export class CreateVehicleUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly vehicleRepository: IVehicleRepository,
    private readonly vehicleLogRepository: IVehicleLogRepository
  ) {}

  async execute(data: CreateVehicleInput): Promise<void> {
    const vehicle = new Vehicle({
      ownerId: data.ownerId,
      model: data.model,
      plate: data.plate,
    });

    await this.vehicleRepository.create(vehicle);

    const user = await this.userRepository.findById({ id: vehicle.ownerId });

    const createdVehicleLog = new VehicleHistory({
      userId: vehicle.ownerId,
      vehicleId: vehicle.id,
      action: "CREATED",
      createdAt: vehicle.createdAt,
      description: `Vehicle ${vehicle.model} with plate ${vehicle.plate} was created by ${user?.name}.`,
    });

    await this.vehicleLogRepository.createLog(createdVehicleLog);
  }
}
