export class ToggleActiveVehiclePresenter {
  static toHTTP(activate: boolean) {
    return {
      message: `Vehicle successfully ${
        activate ? "activated" : "deactivated"
      } `,
    };
  }
}
