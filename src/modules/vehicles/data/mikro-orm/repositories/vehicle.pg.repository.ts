import {
  FindAllVehiclesInput,
  FindAllVehiclesOutput,
  IVehicleRepository,
  VehicleStatusSummary,
} from "@/vehicles/application/repositories/vehicle.repository";
import { Vehicle } from "@/vehicles/domain/entities/vehicle.entity";
import { EntityManager } from "@mikro-orm/postgresql";
import { VehicleMapper } from "../mappers/vehicle.mapper";
import { VehicleSchema } from "../schemas/vehicle.schema";
import { NotFoundError } from "@common/errors/not-found.error";

export class VehiclePgRepository implements IVehicleRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async create(vehicle: Vehicle): Promise<void> {
    const vehicleSchemas = VehicleMapper.toPersistence(vehicle);
    this.entityManager.persistAndFlush(vehicleSchemas);
  }

  async findAll(data: FindAllVehiclesInput): Promise<FindAllVehiclesOutput> {
    const order = data.sortOrder;

    const where: Record<string, any> = {
      owner: data.ownerId,
      deletedAt: null,
    };

    if (data.active !== undefined) {
      where.active = data.active;
    }

    const [vehiclesSchemas, count] = await Promise.all([
      await this.entityManager.find(VehicleSchema, where, {
        limit: data.limit,
        offset: (data.page - 1) * data.limit,
        orderBy: {
          [data.sortBy]: order,
        },
      }),

      await this.entityManager.count(VehicleSchema, where),
    ]);

    return { vehicles: vehiclesSchemas.map(VehicleMapper.toDomain), count };
  }

  async findById(data: { id: string }): Promise<Vehicle | null> {
    const vehicleSchema = await this.entityManager.findOne(VehicleSchema, {
      id: data.id,
      deletedAt: null,
    });

    if (!vehicleSchema) {
      return null;
    }

    return VehicleMapper.toDomain(vehicleSchema);
  }

  async getStatusSummary(data: {
    ownerId: string;
  }): Promise<VehicleStatusSummary> {
    const [active, inactive, total] = await Promise.all([
      this.entityManager.count(VehicleSchema, {
        owner: data.ownerId,
        active: true,
        deletedAt: null,
      }),
      this.entityManager.count(VehicleSchema, {
        owner: data.ownerId,
        active: false,
        deletedAt: null,
      }),
      this.entityManager.count(VehicleSchema, {
        owner: data.ownerId,
        deletedAt: null,
      }),
    ]);

    return {
      total,
      active,
      inactive,
    };
  }

  async update(vehicle: Vehicle): Promise<void> {
    const vehicleSchema = VehicleMapper.toPersistence(vehicle);

    await this.entityManager.transactional(async (em) => {
      await em.nativeUpdate(
        VehicleSchema,
        { id: vehicle.id },
        {
          ...vehicleSchema,
          owner: vehicleSchema.owner.id,
        }
      );
    });
  }

  async delete(data: { id: string }): Promise<void> {
    await this.entityManager.transactional(async (em) => {
      const vehicleSchema = await em.findOne(VehicleSchema, { id: data.id });

      if (!vehicleSchema) {
        throw new NotFoundError(`Vehicle with id ${data.id} not found`);
      }

      await em.nativeUpdate(
        VehicleSchema,
        { id: data.id },
        { active: false, deletedAt: new Date() }
      );
    });
  }
}
