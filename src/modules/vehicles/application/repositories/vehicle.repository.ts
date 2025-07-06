import { Vehicle } from "@/vehicles/domain/entities/vehicle.entity";

export abstract class IVehicleRepository {
  abstract create(vehicle: Vehicle): Promise<void>;
  abstract findAll(data: FindAllVehiclesInput): Promise<FindAllVehiclesOutput>;
  abstract findById(data: { id: string }): Promise<Vehicle | null>;
  abstract update(vehicle: Vehicle): Promise<void>;
  abstract delete(data: { id: string }): Promise<void>;
}

export interface FindAllVehiclesInput {
  ownerId: string;
  active?: boolean;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface FindAllVehiclesOutput {
  vehicles: Vehicle[];
  count: number;
}
