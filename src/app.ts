import "module-alias/register";
import * as express from "express";
import * as cors from "cors";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./config/mikro-orm.config";
import { createUserModule } from "@/users/user.module";
import { createUserRoutes } from "@/users/api/routes/user.routes";
import { createAuthModule } from "@/auth/auth.module";
import { createAuthRoutes } from "@/auth/api/routes/auth.routes";
import { clearRoutes, logRoutes, wrapRouter } from "@common/loggers/log-routes";
import * as cookieParser from "cookie-parser";
import { createVehicleModule } from "@/vehicles/vehicle.module";
import { createVehicleRoutes } from "@/vehicles/api/routes/vehicles.routes";
import { createVehicleHistoryRoutes } from "@/vehicles/api/routes/vehicles-log.routes";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em.fork();

  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  clearRoutes();

  app.get("/", (req, res) => {
    res.send("API is running. Go to /api/v1");
  });

  const apiRouter = wrapRouter(express.Router(), "/api/v1");

  const { authController, authGuard } = createAuthModule(em);
  const authRouter = createAuthRoutes(apiRouter, authController);
  app.use(authRouter);

  const { userController } = createUserModule(em);
  const userRouter = createUserRoutes(apiRouter, userController, authGuard);
  app.use(userRouter);

  const { vehicleController, vehicleHistoryController } =
    createVehicleModule(em);
  const vehicleRouter = createVehicleRoutes(
    apiRouter,
    vehicleController,
    authGuard
  );
  app.use(vehicleRouter);
  const vehicleHistoryRouter = createVehicleHistoryRoutes(
    apiRouter,
    vehicleHistoryController,
    authGuard
  );
  app.use(vehicleHistoryRouter);

  app.use("/api/v1", apiRouter);

  const port = process.env.APP_PORT;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    logRoutes(app);
  });
};

main().catch((err) => {
  console.error("Error starting the application:", err);
  process.exit(1);
});
