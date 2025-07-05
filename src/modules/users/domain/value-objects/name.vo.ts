import { InvalidNameError } from "../errors/invalid-name.error";

export class Name {
  private readonly _value: string;

  constructor(name: string) {
    const normalize = Name.normalize(name);

    if (normalize.length < 2) {
      throw new InvalidNameError(name);
    }

    this._value = normalize;
  }

  public get value(): string {
    return this._value;
  }

  public static normalize(name: string): string {
    const lowercaseWords = ["da", "de", "do", "das", "dos", "e"];

    return name
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
