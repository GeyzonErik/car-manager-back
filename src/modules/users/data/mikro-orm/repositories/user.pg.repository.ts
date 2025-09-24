import { IUserRepository } from "@/users/application/repositories/user.repository";
import { User } from "@/users/domain/entities/user.entity";
import { EntityManager, t } from "@mikro-orm/postgresql";
import { UserMapper } from "../mappers/user.mapper";
import { UserSchema } from "../schemas/user.schemas";

export class UserPgRepository implements IUserRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async create(user: User): Promise<void> {
    const userSchema = UserMapper.toPersistence(user);
    await this.entityManager.persistAndFlush(userSchema);
  }

  async findById(data: { id: string }): Promise<User | null> {
    const userSchema = await this.entityManager.findOne(UserSchema, {
      id: data.id,
    });

    if (!userSchema) {
      return null;
    }

    return UserMapper.toDomain(userSchema);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userSchema = await this.entityManager.findOne(UserSchema, {
      email: { $ilike: email },
    });

    if (!userSchema) {
      return null;
    }

    return UserMapper.toDomain(userSchema);
  }

  async update(user: User): Promise<void> {
    const userSchema = UserMapper.toPersistence(user);
    await this.entityManager.transactional(async (em) => {
      await em.nativeUpdate(UserSchema, { id: user.id }, userSchema);
    });
  }
}
