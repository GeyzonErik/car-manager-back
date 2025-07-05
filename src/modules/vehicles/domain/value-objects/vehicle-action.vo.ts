import { InvalidVehicleActionError } from "../errors/invalid-vehicle-action.error";

export class VehicleAction {
  private static readonly VALID_ACTIONS = [
    "CREATED",
    "UPDATED",
    "DELETED",
    "ACTIVATED",
    "DEACTIVATED",
  ] as const;

  private readonly _value: string;

  constructor(value: string) {
    if (!VehicleAction.VALID_ACTIONS.includes(value as any)) {
      throw new InvalidVehicleActionError(`Invalid vehicle action: ${value}`);
    }
    this._value = value;
  }

  public get value(): string {
    return this._value;
  }

  public static created(): VehicleAction {
    return new VehicleAction("CREATED");
  }

  public static updated(): VehicleAction {
    return new VehicleAction("UPDATED");
  }

  public static deleted(): VehicleAction {
    return new VehicleAction("DELETED");
  }

  public static activated(): VehicleAction {
    return new VehicleAction("ACTIVATED");
  }

  public static deactivated(): VehicleAction {
    return new VehicleAction("DEACTIVATED");
  }
}
