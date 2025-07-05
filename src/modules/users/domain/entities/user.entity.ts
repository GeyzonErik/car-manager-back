import { Email } from "../value-objects/email.vo";
import { Name } from "../value-objects/name.vo";
import { Password } from "../value-objects/password.vo";

export class User {
  public readonly id: string;
  private _name: Name;
  private _email: Email;
  private _password: Password;
  public readonly createdAt: Date;
  private _updatedAt: Date;

  constructor(data: UserData) {
    this.id = data.id ?? crypto.randomUUID();
    this._name = new Name(data.name);
    this._email = new Email(data.email);
    this.createdAt = data.createdAt ?? new Date();
    this._updatedAt = data.updatedAt ?? new Date();
  }

  public get name(): string {
    return this._name.value;
  }

  public get email(): string {
    return this._email.value;
  }

  public get password(): string {
    return this._password.value;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public withPassword(password: string): User {
    if (!Password.isValid(password)) {
      throw new Error("Invalid password format");
    }
    this._password = new Password(password);
    this.touch();
    return this;
  }

  public withHashedPassword(hashedPassword: string): User {
    this._password = Password.fromHashed(hashedPassword);
    return this;
  }

  public isEmailEqual(email: string): boolean {
    return this._email.value === email;
  }

  public isValidPassword(password: string): boolean {
    return this._password.compare(password);
  }

  public changeName(name: string): void {
    if (!name || name.trim() === "") {
      throw new Error("Name cannot be empty");
    }
    this._name = new Name(name);
    this.touch();
  }

  private touch(): void {
    this._updatedAt = new Date();
  }
}

export interface UserData {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}
