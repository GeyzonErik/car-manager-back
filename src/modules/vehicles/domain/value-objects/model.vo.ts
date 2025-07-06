import { InvalidModelError } from "../errors/invalid-model.error";

export class Model {
  private readonly _value: string;

  constructor(model: string) {
    const normalize = Model.normalize(model);

    if (normalize.length < 2) {
      throw new InvalidModelError();
    }

    this._value = normalize;
  }

  public get value(): string {
    return this._value;
  }

  public static normalize(model: string): string {
    const lowercaseWords = ["da", "de", "do", "das", "dos", "e"];

    return model
      .trim()
      .toLocaleLowerCase()
      .split(" ")
      .map((word, index) => {
        if (index === 0 || !lowercaseWords.includes(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join(" ");
  }
}
