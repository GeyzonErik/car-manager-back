import { IVehicleLogRepository } from "@/vehicles/application/repositories/vehicle-log.repository";
import { VehicleHistory } from "@/vehicles/domain/entities/vehicle-log.entity";
import { EntityManager } from "@mikro-orm/postgresql";
import { VehicleLogMapper } from "../mappers/vehicle-log.mapper";
import { VehicleLogSchema } from "../schemas/vehicle-log.schema";

export class VehicleLogPgRepository implements IVehicleLogRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async createLog(log: VehicleHistory): Promise<void> {
    const logSchema = VehicleLogMapper.toPersistence(log);
    this.entityManager.persistAndFlush(logSchema);
  }

  async listLogs(data: { userId: string }): Promise<VehicleHistory[]> {
    const logsSchema = await this.entityManager.find(
      VehicleLogSchema,
      { user: { id: data.userId } },
      {
        orderBy: {
          createdAt: "desc",
        },
      }
    );

    return logsSchema.map(VehicleLogMapper.toDomain);
  }
}
