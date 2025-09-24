import { InvalidPasswordError } from "../errors/invalid-password.error";
import * as bcrypt from "bcryptjs";

export class Password {
  private readonly _value: string;

  constructor(value: string) {
    if (!Password.isValid(value)) {
      throw new InvalidPasswordError();
    }
    this._value = bcrypt.hashSync(value, 10);
  }

  public get value(): string {
    return this._value;
  }

  public compare(plainPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, this._value);
  }

  public static isValid(password: string): boolean {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }

  public static fromHashed(hashed: string): Password {
    const instance = Object.create(Password.prototype);
    instance._value = hashed;
    return instance;
  }
}
