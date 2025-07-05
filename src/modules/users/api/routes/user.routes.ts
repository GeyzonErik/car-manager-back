import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthGuard } from "@/auth/api/guards/auth.guard";

export const createUserRoutes = (
  router: Router,
  controller: UserController,
  guard: AuthGuard
): Router => {
  router.get(
    "/users/:id",
    guard.canActivate.bind(guard),
    controller.detailUser.bind(controller)
  );
  router.patch(
    "/users/:id",
    guard.canActivate.bind(guard),
    controller.updateUser.bind(controller)
  );

  return router;
};
