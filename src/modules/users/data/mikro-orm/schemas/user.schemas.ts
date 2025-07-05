import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "users" })
export class UserSchema {
  @PrimaryKey({ name: "id", type: "uuid", nullable: false })
  id!: string;

  @Property({ name: "name", type: "string", nullable: false, length: 255 })
  name!: string;

  @Property({
    name: "email",
    type: "string",
    nullable: false,
    unique: true,
    length: 255,
  })
  email!: string;

  @Property({ name: "password", type: "string", nullable: false, length: 255 })
  password!: string;

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
}
