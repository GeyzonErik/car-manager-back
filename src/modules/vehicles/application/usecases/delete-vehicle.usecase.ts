import { NotFoundError } from "@common/errors/not-found.error";
import { IVehicleRepository } from "../repositories/vehicle.repository";

export interface DeleteVehicleUseCaseInput {
  vehicleId: string;
}

export class DeleteVehicleUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

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
  }
}
