import { Color, ContinuousColor } from './color';

export type ColorSchemeType =
  | 'monochromatic'
  | 'complementary'
  | 'split-complementary'
  | 'achromatic'
  | 'analogous'
  | 'triadic'
  | 'tetradic'
  | 'polychromatic'
  | 'customized';

export interface PaletteBaseInfo {
  id?: string;
  name: string;
  semantic: string | null;
  description?: string;
  colorScheme?: ColorSchemeType;
  usage?: string[];
}

export type PaletteType = 'categorical' | 'discrete-scale' | 'continuous-scale' | 'matrix';

export type CategoricalPalette = PaletteBaseInfo & {
  type: 'categorical';
  colors: Color[];
};

export type DiscreteScalePalette = PaletteBaseInfo & {
  type: 'discrete-scale';
  colors: Color[];
};

export type ContinuousScalePalette = PaletteBaseInfo & {
  type: 'continuous-scale';
  colors: ContinuousColor[];
};

export type MatrixPalette = PaletteBaseInfo & {
  type: 'matrix';
  colors: Color[][];
  origin: {
    x: Color[];
    y: Color[];
  };
};

export function isCategoricalPalette(palette: Palette): palette is CategoricalPalette {
  if (palette.type === 'categorical') return true;
  return false;
}

export function isDiscreteScalePalette(palette: Palette): palette is DiscreteScalePalette {
  if (palette.type === 'discrete-scale') return true;
  return false;
}

export function isContinuousPalette(palette: Palette): palette is ContinuousScalePalette {
  if (palette.type === 'continuous-scale') return true;
  return false;
}

export function isMatrixPalette(palette: Palette): palette is MatrixPalette {
  if (palette.type === 'matrix') return true;
  return false;
}

export type Palette = CategoricalPalette | DiscreteScalePalette | ContinuousScalePalette | MatrixPalette;
