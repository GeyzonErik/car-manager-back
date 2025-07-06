import { UserSchema } from "@/users/data/mikro-orm/schemas/user.schemas";
import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "vehicles" })
export class VehicleSchema {
  @PrimaryKey({ name: "id", type: "uuid", nullable: false })
  id!: string;

  @ManyToOne(() => UserSchema, { joinColumn: "owner_id", nullable: false })
  owner!: UserSchema;

  @Property({ name: "model", type: "varchar", nullable: false, length: 255 })
  model!: string;

  @Property({ name: "plate", type: "varchar", nullable: false, length: 20 })
  plate!: string;

  @Property({
    name: "active",
    type: "boolean",
    nullable: false,
    default: true,
  })
  active: boolean = true;

  @Property({
    name: "created_at",
    type: "timestamp",
    nullable: false,
    onCreate: () => new Date(),
  })
  createdAt: Date = new Date();

  @Property({
    name: "updated_at",
    type: "timestamp",
    nullable: false,
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();

  @Property({
    name: "deleted_at",
    type: "timestamp",
    nullable: true,
  })
  deletedAt?: Date | null;
}
