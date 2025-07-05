export class InvalidVehicleActionError extends Error {
  statusCode: number = 400;

  constructor(action: string) {
    super(`Invalid vehicle action: ${action}`);
    this.name = "InvalidVehicleActionError";

    Object.setPrototypeOf(this, InvalidVehicleActionError.prototype);
  }
}
