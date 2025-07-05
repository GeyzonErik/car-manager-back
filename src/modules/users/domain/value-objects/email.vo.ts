import { InvalidEmailError } from "../errors/invalid-email.error";

export class Email {
  private readonly _value: string;

  constructor(email: string) {
    if (!Email.isValid(email)) {
      throw new InvalidEmailError(email);
    }
    this._value = email.toLocaleLowerCase().trim();
  }

  public get value(): string {
    return this._value;
  }

  public static isValid(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
