import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { VehicleSchema } from "./vehicle.schema";
import { UserSchema } from "@/users/data/mikro-orm/schemas/user.schemas";

@Entity({ tableName: "vehicle_logs" })
export class VehicleLogSchema {
  @PrimaryKey({ name: "id", type: "uuid", nullable: false })
  id!: string;

  @ManyToOne(() => VehicleSchema, { fieldName: "vehicle_id", nullable: false })
  vehicle!: VehicleSchema;

  @ManyToOne(() => UserSchema, { fieldName: "user_id", nullable: false })
  user!: UserSchema;

  @Property({ name: "action", type: "varchar", nullable: false, length: 50 })
  action!: string;

  @Property({ name: "description", type: "text", nullable: false })
  description!: string;

  @Property({
    name: "created_at",
    type: "timestamp",
    nullable: false,
    onCreate: () => new Date(),
  })
  createdAt: Date = new Date();
}
