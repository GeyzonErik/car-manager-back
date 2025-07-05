import { Vehicle } from "@/vehicles/domain/entities/vehicle.entity";
import { VehicleSchema } from "../schemas/vehicle.schema";
import { UserSchema } from "@/users/data/mikro-orm/schemas/user.schemas";

export class VehicleMapper {
  static toDomain(entity: VehicleSchema): Vehicle {
    return new Vehicle({
      id: entity.id,
      ownerId: entity.owner.id,
      model: entity.model,
      plate: entity.plate,
      active: entity.active,
    });
  }

  static toPersistence(vehicle: Vehicle): VehicleSchema {
    const vehicleSchema = new VehicleSchema();
    vehicleSchema.id = vehicle.id;
    vehicleSchema.owner = { id: vehicle.ownerId } as UserSchema;

    vehicleSchema.model = vehicle.model;
    vehicleSchema.plate = vehicle.plate;
    vehicleSchema.active = vehicle.isActive();
    vehicleSchema.createdAt = vehicle.createdAt;
    vehicleSchema.updatedAt = vehicle.updatedAt;

    return vehicleSchema;
  }
}
