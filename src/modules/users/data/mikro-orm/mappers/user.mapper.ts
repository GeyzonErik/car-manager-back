import { User } from "@/users/domain/entities/user.entity";
import { UserSchema } from "../schemas/user.schemas";

export class UserMapper {
  static toDomain(entity: UserSchema): User {
    return new User({
      id: entity.id,
      email: entity.email,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }).withHashedPassword(entity.password);
  }

  static toPersistence(user: User): UserSchema {
    const userSchema = new UserSchema();
    userSchema.id = user.id;
    userSchema.email = user.email;
    userSchema.name = user.name;
    userSchema.password = user.password;
    userSchema.createdAt = user.createdAt;
    userSchema.updatedAt = user.updatedAt;

    return userSchema;
  }
}
