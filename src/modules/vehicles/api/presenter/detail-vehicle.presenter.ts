export class DetailVehiclePresenter {
  static toHTTP(vehicle: any): any {
    return {
      id: vehicle.id,
      model: vehicle.model,
      plate: vehicle.plate,
    };
  }
}
