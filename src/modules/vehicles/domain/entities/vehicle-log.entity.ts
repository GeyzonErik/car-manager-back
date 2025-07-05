import { VehicleAction } from "../value-objects/vehicle-action.vo";

export class VehicleHistory {
  public readonly id: string;
  public readonly vehicleId: string;
  public readonly userId: string;
  private readonly _action: VehicleAction;
  private readonly _description: string;
  public readonly createdAt: Date;

  constructor(data: VehicleHistoryData) {
    this.id = data.id ?? crypto.randomUUID();
    this.vehicleId = data.vehicleId;
    this.userId = data.userId;
    this._action = new VehicleAction(data.action);
    this._description = data.description;
    this.createdAt = data.createdAt ?? new Date();
  }

  public get action(): VehicleAction {
    return this._action;
  }

  public get description(): string {
    return this._description;
  }
}

export interface VehicleHistoryData {
  id?: string;
  vehicleId: string;
  userId: string;
  action: string;
  description: string;
  createdAt: Date;
}
