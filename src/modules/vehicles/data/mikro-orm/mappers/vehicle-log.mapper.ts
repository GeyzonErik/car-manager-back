import { VehicleHistory } from "@/vehicles/domain/entities/vehicle-log.entity";
import { VehicleLogSchema } from "../schemas/vehicle-log.schema";
import { VehicleSchema } from "../schemas/vehicle.schema";
import { UserSchema } from "@/users/data/mikro-orm/schemas/user.schemas";

export class VehicleLogMapper {
  static toDomain(entity: VehicleLogSchema): VehicleHistory {
    const validActions = [
      "CREATED",
      "UPDATED",
      "DELETED",
      "ACTIVATED",
      "DEACTIVATED",
    ] as const;

    return new VehicleHistory({
      id: entity.id,
      vehicleId: entity.vehicle.id,
      userId: entity.user.id,
      action: validActions[entity.action],
      createdAt: entity.createdAt,
      description: entity.description,
    });
  }

  static toPersistence(vehicle: VehicleHistory): VehicleLogSchema {
    const vehicleLogSchema = new VehicleLogSchema();
    vehicleLogSchema.id = vehicle.id;
    vehicleLogSchema.vehicle = { id: vehicle.vehicleId } as VehicleSchema;
    vehicleLogSchema.user = { id: vehicle.userId } as UserSchema;
    vehicleLogSchema.action = vehicle.action.value;
    vehicleLogSchema.description = vehicle.description;
    vehicleLogSchema.createdAt = vehicle.createdAt;

    return vehicleLogSchema;
  }
}
