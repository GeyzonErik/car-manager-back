import { UserSchema } from "../modules/users/data/mikro-orm/schemas/user.schemas";
import { VehicleSchema } from "../modules/vehicles/data/mikro-orm/schemas/vehicle.schema";
import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),

  driver: PostgreSqlDriver,
  driverOptions: {
    connection: {
      ssl: process.env.DB_SSL === "true",
    },
  },
  entities: [UserSchema, VehicleSchema],
  entitiesTs: ["./src/**/schemas/*.ts"],
});
