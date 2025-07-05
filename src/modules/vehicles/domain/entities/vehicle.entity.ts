export class Vehicle {
  public readonly id: string;
  public readonly ownerId: string;
  private _model: string;
  private _plate: string;
  private _active: boolean;
  public readonly createdAt: Date;
  private _updatedAt: Date;

  constructor(data: VehicleData) {
    this.id = data.id ?? crypto.randomUUID();
    this.ownerId = data.ownerId;
    this._model = data.model;
    this._plate = data.plate;
    this._active = data.active ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this._updatedAt = data.updatedAt ?? new Date();
  }

  public get model(): string {
    return this._model;
  }

  public get plate(): string {
    return this._plate;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public isActive(): boolean {
    return this._active;
  }

  public changeModel(model: string): void {
    if (!model || model.trim() === "") {
      throw new Error("Model cannot be empty");
    }
    this._model = model;
    this.touch();
  }

  public changePlate(plate: string): void {
    if (!plate || plate.trim() === "") {
      throw new Error("Plate cannot be empty");
    }
    this._plate = plate;
    this.touch();
  }

  public deactivate(): void {
    this._active = false;
    this.touch();
  }

  private touch(): void {
    this._updatedAt = new Date();
  }
}

export interface VehicleData {
  id?: string;
  ownerId: string;
  model: string;
  plate: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
