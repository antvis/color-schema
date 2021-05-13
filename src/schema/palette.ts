import { Color, ContinuousColor } from "./color";

export interface PaletteBaseInfo {
  name: string;
  semantic: string | null;
}

export type PaletteType = "categorical" | "discrete-scale" | "continuous-scale";

export type CategoricalPalette = PaletteBaseInfo & {
  type: "categorical";
  colors: Color[];
};

export type DiscreteScalePalette = PaletteBaseInfo & {
  type: "discrete-scale";
  colors: Color[];
};

export type ContinuousScalePalette = PaletteBaseInfo & {
  type: "continuous-scale";
  colors: ContinuousColor[];
};

export type Palette =
  | CategoricalPalette
  | DiscreteScalePalette
  | ContinuousScalePalette;
