import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export const createAuthRoutes = (
  router: Router,
  controller: AuthController
): Router => {
  router.post("/auth/register", controller.register.bind(controller));
  router.post("/auth/login", controller.login.bind(controller));
  router.post("/auth/logout", controller.logout.bind(controller));

  return router;
};
