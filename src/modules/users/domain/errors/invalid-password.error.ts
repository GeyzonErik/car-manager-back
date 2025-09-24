export class InvalidPasswordError extends Error {
  statusCode: number = 400;

  constructor(
    message = "Invalid password: Password must contain at least 8 characters, including uppercase, lowercase, number, and special character."
  ) {
    super(message);
    this.name = "InvalidPasswordError";
  }
}
