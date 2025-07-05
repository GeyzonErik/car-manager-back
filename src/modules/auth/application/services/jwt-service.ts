import * as jwt from "jsonwebtoken";

export class JwtService {
  private readonly secret: string;
  private readonly expiresIn: number;

  constructor() {
    this.secret = process.env.JWT_SECRET!;
    this.expiresIn = +process.env.JWT_EXPIRATION_TIME!;
  }

  sign(payload: Record<string, any>): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  verify(token: string): Record<string, any> {
    try {
      return jwt.verify(token, this.secret) as Record<string, any>;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
