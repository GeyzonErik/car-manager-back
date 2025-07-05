export class ConflictError extends Error {
  statusCode = 409;

  constructor(message: string) {
    super(message);
    this.name = "ConflictError";

    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
