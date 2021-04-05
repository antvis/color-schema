import { ColorValue } from "./colorValue";

export type Undertone = "warm" | "neutral" | "cool";

export interface ColorBaseInfo {
  name?: string;
  undertone?: Undertone;
  usage?: string;
}

export type Color = ColorBaseInfo & ColorValue;
