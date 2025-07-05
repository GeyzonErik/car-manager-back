export class InvalidPasswordError extends Error {
  statusCode: number = 400;

  constructor(password: string) {
    super(
      `Invalid password: "${password}". Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.`
    );
    this.name = "InvalidPasswordError";

    Object.setPrototypeOf(this, InvalidPasswordError.prototype);
  }
}
