import { Vehicle } from "@/vehicles/domain/entities/vehicle.entity";
import { IVehicleRepository } from "../repositories/vehicle.repository";

export interface ListAllVehiclesUseCaseInput {
  ownerId: string;
  active?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ListAllVehiclesUseCaseOutput {
  data: Vehicle[];
  page: number;
  limit: number;
  total: number;
}

export class ListVehicleUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(
    data: ListAllVehiclesUseCaseInput
  ): Promise<ListAllVehiclesUseCaseOutput> {
    const page = data.page ?? 1;
    const limit = data.limit ?? 10;
    const sortBy = data.sortBy ?? "model";
    const order = data.sortOrder ?? "asc";

    const { vehicles, count } = await this.vehicleRepository.findAll({
      ownerId: data.ownerId,
      active: data.active,
      page,
      limit,
      sortBy,
      sortOrder: order,
    });

    return {
      data: vehicles,
      total: count,
      page,
      limit,
    };
  }
}
