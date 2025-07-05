import { JwtService } from "@/auth/application/services/jwt-service";
import { IUserRepository } from "@/users/application/repositories/user.repository";
import { NextFunction, Request, Response } from "express";

export class AuthGuard {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: JwtService
  ) {}

  async canActivate(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const payload = this.tokenService.verify(token) as { sub: string };

      const user = await this.userRepository.findById({ id: payload.sub });

      if (!user) {
        return res.status(401).json({ message: "Invalid User" });
      }

      (req as any).user = user;

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
}
