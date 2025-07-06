import { VehicleHistory } from "@/vehicles/domain/entities/vehicle-log.entity";
import { VehicleLogSchema } from "../schemas/vehicle-log.schema";
import { VehicleSchema } from "../schemas/vehicle.schema";
import { UserSchema } from "@/users/data/mikro-orm/schemas/user.schemas";

const validActions = [
  "CREATED",
  "UPDATED",
  "DELETED",
  "ACTIVATED",
  "DEACTIVATED",
] as const;

type ValidAction = (typeof validActions)[number];

function isValidAction(value: string): value is ValidAction {
  return validActions.includes(value as ValidAction);
}

export class VehicleLogMapper {
  static toDomain(entity: VehicleLogSchema): VehicleHistory {
    if (!isValidAction(entity.action)) {
      throw new Error(`Invalid action: ${entity.action}`);
    }

    return new VehicleHistory({
      id: entity.id,
      vehicleId: entity.vehicle.id,
      userId: entity.user.id,
      action: entity.action,
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
