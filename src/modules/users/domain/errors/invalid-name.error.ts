export class InvalidNameError extends Error {
  statusCode: number;

  constructor(message: string = "Invalid name") {
    super(message);
    this.name = "InvalidNameError";
    this.statusCode = 400;

    Object.setPrototypeOf(this, InvalidNameError.prototype);
  }
}
