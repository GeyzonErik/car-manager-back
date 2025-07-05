import { User } from "@/users/domain/entities/user.entity";

export class DetailUserPresenter {
  static toHTTP(data: User) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    };
  }
}
