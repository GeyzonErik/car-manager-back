export class InvalidEmailError extends Error {
  statusCode: number = 400;

  constructor(email: string) {
    super(`Invalid email: ${email}`);
    this.name = "InvalidEmailError";

    Object.setPrototypeOf(this, InvalidEmailError.prototype);
  }
}
