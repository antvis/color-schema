import { Color, ContinuousColor } from "./color";

export type ColorSchemeType = "monochromatic" | "complementary" | "split-complementary" | "achromatic" | "analogous" | "triad" | "tetradic" | "polychromatic" | "customized";

export interface PaletteBaseInfo {
  id?: string;
  name: string;
  semantic: string | null;
  description?: string;
  colorScheme?: ColorSchemeType;
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
  colors: Color[][];
  origin: {
    x: Color[];
    y: Color[];
  };
};

export type Palette = CategoricalPalette | DiscreteScalePalette | ContinuousScalePalette | MatrixPalette;
