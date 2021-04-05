export type ColorSpace = "hex" | "rgb" | "rgba" | "lab" | "cmyk";

export type HexChar =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f";
export type HexValue3 = string; // `${"#" | "" | "0x"}${HexChar}${HexChar}${HexChar}`;
export type HexValue6 = string; // Expression produces a union type that is too complex to represent
export type HexValue4 = string; // Expression produces a union type that is too complex to represent
export type HexValue8 = string; // Expression produces a union type that is too complex to represent
export type HexValue = HexValue3 | HexValue4 | HexValue6 | HexValue8;
export interface HexColor {
  space: "hex";
  value: HexValue;
}

export interface RGBValue {
  r: number;
  g: number;
  b: number;
}
export function isRGBValue(value: any): value is RGBValue {
  return (
    Object.keys(value).sort().join(",") === "b,g,r" &&
    value.r >= 0 &&
    value.r <= 256 &&
    value.g >= 0 &&
    value.g <= 256 &&
    value.b >= 0 &&
    value.b <= 256
  );
}
export interface RGBColor {
  space: "rgb";
  value: RGBValue;
}

export type ColorValue = HexColor | RGBColor;
