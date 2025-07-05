import { User } from "@/users/domain/entities/user.entity";

export abstract class IUserRepository {
  abstract create(user: User): Promise<void>;
  abstract findById(data: { id: string }): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract update(user: User): Promise<void>;
}
