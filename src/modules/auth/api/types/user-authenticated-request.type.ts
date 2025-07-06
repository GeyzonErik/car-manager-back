import { User } from "@/users/domain/entities/user.entity";
import { Request } from "express";

export type UserAuthenticatedRequest<
  TParams = any,
  TQuery = any,
  TBody = any
> = Request<TParams, any, TBody, TQuery> & {
  user: User;
};
