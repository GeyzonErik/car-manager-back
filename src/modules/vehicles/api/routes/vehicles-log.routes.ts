import { Router } from "express";
import { VehicleController } from "../controllers/vehicle.controller";
import { AuthGuard } from "@/auth/api/guards/auth.guard";
import { VehicleHistoryController } from "../controllers/vehicle-history.controller";

export const createVehicleHistoryRoutes = (
  router: Router,
  controller: VehicleHistoryController,
  guard: AuthGuard
): Router => {
  router.get(
    "/vehicles-history",
    guard.canActivate.bind(guard),
    controller.listVehicleLogs.bind(controller)
  );

  return router;
};
