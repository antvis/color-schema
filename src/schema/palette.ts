import { Color, ContinuousColor } from "./color";

export interface PaletteBaseInfo {
  name: string;
  semantic: string | null;
}

export type PaletteType = "categorical" | "discrete-scale" | "continuous-scale" | "matrix";

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

export type MatrixPalette = PaletteBaseInfo & {
  type: "matrix";
  colors: ContinuousColor[][];
  origin: {
    "x": Color[],
    "y": Color[]
  }
};


export type Palette =
  | CategoricalPalette
  | DiscreteScalePalette
  | ContinuousScalePalette
  | MatrixPalette;
