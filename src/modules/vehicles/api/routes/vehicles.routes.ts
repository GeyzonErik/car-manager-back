import { Router } from "express";
import { VehicleController } from "../controllers/vehicle.controller";
import { AuthGuard } from "@/auth/api/guards/auth.guard";

export const createVehicleRoutes = (
  router: Router,
  controller: VehicleController,
  guard: AuthGuard
): Router => {
  router.post(
    "/vehicles",
    guard.canActivate.bind(guard),
    controller.createVehicle.bind(controller)
  );

  router.get(
    "/vehicles",
    guard.canActivate.bind(guard),
    controller.listVehicles.bind(controller)
  );

  router.get(
    "/vehicles/:id",
    guard.canActivate.bind(guard),
    controller.detailVehicle.bind(controller)
  );

  router.patch(
    "/vehicles/:id",
    guard.canActivate.bind(guard),
    controller.updateVehicle.bind(controller)
  );

  router.patch(
    "/vehicles/:id/toggle-active",
    guard.canActivate.bind(guard),
    controller.toggleVehicleActive.bind(controller)
  );

  return router;
};
