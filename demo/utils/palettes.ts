import chroma from "chroma-js";
import { colorToHex } from "./colors";
import { HexValue6, MatrixPalette } from "../../src";

export function matrixToHex(matrix: MatrixPalette): HexValue6[][] {
  const hexMatrix = [];
  const { x, y } = matrix.colors;

  y.forEach((color1) => {
    const yColors = [];

    x.forEach((color2) => {
      const mixColor = chroma.mix(colorToHex(color1), colorToHex(color2)).hex();
      yColors.push(mixColor);
    });

    hexMatrix.push(yColors);
  });

  return hexMatrix;
}
