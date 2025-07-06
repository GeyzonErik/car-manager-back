import { VehicleHistory } from "@/vehicles/domain/entities/vehicle-log.entity";

export abstract class IVehicleLogRepository {
  abstract createLog(log: VehicleHistory): Promise<void>;
  abstract listLogs(data: { userId: string }): Promise<VehicleHistory[]>;
}
