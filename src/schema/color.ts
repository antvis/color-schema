import chroma, { Color as ChromaColor } from 'chroma-js';
import { ColorValue } from './colorValue';

export type Undertone = 'warm' | 'neutral' | 'cool';

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

const isChromaColor = (color: any): color is ChromaColor => {
  if (chroma.valid(color)) {
    return true;
  }
  return false;
};

export function colorToHex(color: Color): string {
  const { value } = color;

  if (isChromaColor(value)) {
    return chroma(value).hex();
  }

  return '';
}
