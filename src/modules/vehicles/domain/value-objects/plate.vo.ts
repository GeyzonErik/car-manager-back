import { BadRequestError } from "@common/errors/bad-request.error";

export class Plate {
  private readonly _value: string;

  constructor(value: string) {
    const normalizedPlate = Plate.normalize(value);

    if (!Plate.isValid(normalizedPlate)) {
      throw new BadRequestError("Invalid plate format");
    }
    this._value = normalizedPlate;
  }

  public get value(): string {
    return this._value;
  }

  public static normalize(name: string): string {
    return name.trim().toUpperCase();
  }

  public static isValid(plate: string): boolean {
    // Padrão da placa Mercosul (desde 2018): 3 letras, 1 número, 1 letra, 2 números. Ex: "ABC1D23"
    const mercosulPattern = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

    // Padrão antigo: 3 letras seguidas de 4 números. Ex: "ABC1234"
    const antigoPattern = /^[A-Z]{3}[0-9]{4}$/;

    return mercosulPattern.test(plate) || antigoPattern.test(plate);
  }
}
