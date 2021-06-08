export type ColorSpace = "hsl" | "hsv" | "hsi" | "rgb" | "rgba" | "lab" | "lch" | "cmyk";

export interface HSLValue {
  /**
   * @minimum 0
   * @maximum 360
   */
  h: number;
  /**
   * @minimum 0
   * @maximum 1
   */
  s: number;
  /**
   * @minimum 0
   * @maximum 1
   */
  l: number;
}

type range = [number, number];
export const HSLValueRange: Record<keyof HSLValue, range> = {
  h: [0, 360],
  s: [0, 1],
  l: [0, 1],
}

export interface HSLColor {
  space: "hsl";
  value: HSLValue;
}

export interface HSVValue {
  /**
   * @minimum 0
   * @maximum 360
   */
  h: number;
  /**
   * @minimum 0
   * @maximum 1
   */
  s: number;
  /**
   * @minimum 0
   * @maximum 1
   */
  v: number;
}

export const HSVValueRange: Record<keyof HSVValue, range> = {
  h: [0, 360],
  s: [0, 1],
  v: [0, 1],
}

export interface HSVColor {
  space: "hsv";
  value: HSVValue;
}

export interface HSIValue {
  /**
   * @minimum 0
   * @maximum 360
   */
  h: number;
  /**
   * @minimum 0
   * @maximum 1
   */
  s: number;
  /**
   * @minimum 0
   * @maximum 1
   */
  i: number;
}

export const HSIValueRange: Record<keyof HSIValue, range> = {
  h: [0, 360],
  s: [0, 1],
  i: [0, 1],
}

export interface HSIColor {
  space: "hsi";
  value: HSIValue;
}

export interface RGBValue {
  /**
   * @minimum 0
   * @maximum 255
   */
  r: number;
  /**
   * @minimum 0
   * @maximum 255
   */
  g: number;
  /**
   * @minimum 0
   * @maximum 255
   */
  b: number;
}

export const RGBValueRange: Record<keyof RGBValue, range> = {
  r: [0, 255],
  g: [0, 255],
  b: [0, 255],
}

export interface RGBColor {
  space: "rgb";
  value: RGBValue;
}

export interface RGBAValue {
  /**
   * @minimum 0
   * @maximum 255
   */
  r: number;
  /**
   * @minimum 0
   * @maximum 255
   */
  g: number;
  /**
   * @minimum 0
   * @maximum 255
   */
  b: number;
  /**
   * @minimum 0
   * @maximum 1
   */
  a: number;
}

export const RGBAValueRange: Record<keyof RGBAValue, range> = {
  r: [0, 255],
  g: [0, 255],
  b: [0, 255],
  a: [0, 1]
}

export interface RGBAColor {
  space: "rgba";
  value: RGBAValue;
}

export interface LABValue {
  /**
   * @minimum 0
   * @maximum 100
   */
  l: number;
  /**
   * @minimum -86.185
   * @maximum 98.254
   */
  a: number;
  /**
   * @minimum -107.863
   * @maximum 94.482
   */
  b: number;
}

export const LABRange: Record<keyof LABValue, range> = {
  l: [0, 100],
  a: [-86.185, 98.254],
  b: [-107.863, 94.482],
}

export interface LABColor {
  space: "lab";
  value: LABValue;
}

export interface LCHValue {
  /**
   * @minimum 0
   * @maximum 100
   */
  l: number;
  /**
   * @minimum 0
   * @maximum 100
   */
  c: number;
  /**
   * @minimum 0
   * @maximum 360
   */
  h: number;
}

export const LCHRange: Record<keyof LCHValue, range> = {
  l: [0, 100],
  c: [0, 100],
  h: [0, 360],
}

export interface LCHColor {
  space: "lch";
  value: LCHValue;
}

export interface CMYKValue {
  /**
   * @minimum 0
   * @maximum 1
   */
  c: number;
  /**
   * @minimum 0
   * @maximum 1
   */
  m: number;
  /**
   * @minimum 0
   * @maximum 1
   */
  y: number;
  /**
   * @minimum 0
   * @maximum 1
   */
  k: number;
}

export const CMYKRange: Record<keyof CMYKValue, range> = {
  c: [0, 1],
  m: [0, 1],
  y: [0, 1],
  k: [0, 1],
}

export interface CMYKColor {
  space: "cmyk";
  value: CMYKValue;
}

interface ColorSpaceInfo {
  [key: string]: range;
}

export const ColorSpaceRange: Record<ColorSpace, ColorSpaceInfo> = {
  lab: LABRange,
  lch: LCHRange,
  rgb: RGBValueRange,
  rgba: RGBAValueRange,
  hsl: HSLValueRange,
  hsv: HSVValueRange,
  hsi: HSIValueRange,
  cmyk: CMYKRange
};

export function isColorValue(colorValue: ColorValue): colorValue is ColorValue {
  const { space, value } = colorValue;
  const colorSpaceRange = ColorSpaceRange[space];
  
  return (
    Object.keys(value).sort().join(",") === Object.keys(colorSpaceRange).sort().join(",") && 
    Object.entries(value).every(([key, v]) => v >= colorSpaceRange[key][0] && v <= colorSpaceRange[key][1])
  )
}

export type ColorValue = HSLColor | HSVColor | HSIColor | RGBColor | RGBAColor | LABColor | LCHColor | CMYKColor;
