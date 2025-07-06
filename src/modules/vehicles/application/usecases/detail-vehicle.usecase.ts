import { Vehicle } from "@/vehicles/domain/entities/vehicle.entity";
import { IVehicleRepository } from "../repositories/vehicle.repository";
import { NotFoundError } from "@common/errors/not-found.error";

export interface DetailVehicleInput {
  vehicleId: string;
}

export class DetailVehicleUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(data: DetailVehicleInput): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findById({
      id: data.vehicleId,
    });

    if (!vehicle) {
      throw new NotFoundError(`Vehicle with id ${data.vehicleId} not found`);
    }

    return vehicle;
  }
}
