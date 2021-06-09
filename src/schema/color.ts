import { ColorValue } from "./colorValue";
import chroma from "chroma-js";

export type Undertone = "warm" | "neutral" | "cool";

export interface ColorBaseInfo {
  id?: string;
  name?: string;
  undertone?: Undertone;
  usage?: string[];
}

export type Color = ColorBaseInfo & ColorValue;

export type ContinuousColor = Color & {
  /**
   * @minimum 0
   * @maximum 1
   */
  location?: number;
};

function isVaildKey(key: string, object: object): key is keyof typeof object {
  return key in object;
}

export function colorToHex(color: Color): string {
  const { space, value } = color;

  if (chroma.valid(value)) {
    const dimension = space.split("");
    const values = dimension.map((d) => (isVaildKey(d, value) ? value[d] : 0));
    return chroma(...(values as []), space).hex();
  }

  return "";
}
