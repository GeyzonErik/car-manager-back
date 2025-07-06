export class InvalidModelError extends Error {
  statusCode: number;

  constructor(message: string = "Invalid model") {
    super(message);
    this.name = "InvalidModelError";
    this.statusCode = 400;

    Object.setPrototypeOf(this, InvalidModelError.prototype);
  }
}
