export class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string = "Bad Request") {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
