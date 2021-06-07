export type ColorSpace = "hex" | "hsl" | "hsv" | "hsi" | "rgb" | "rgba" | "lab" | "lch" | "cmyk";

/**
 * @pattern ^(#|0x)?[0-9a-fA-F]{3}$
 */
export type HexValue3 = string;
/**
 * @pattern ^(#|0x)?[0-9a-fA-F]{6}$
 */
export type HexValue6 = string;
/**
 * @pattern ^(#|0x)?[0-9a-fA-F]{4}$
 */
export type HexValue4 = string;
/**
 * @pattern ^(#|0x)?[0-9a-fA-F]{8}$
 */
export type HexValue8 = string;
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
