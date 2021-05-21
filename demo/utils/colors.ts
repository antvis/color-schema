import { Color, HexValue6 } from "../../src";

export function colorToHex(color: Color): HexValue6 {
  const { space, value } = color;

  if (space === "hex") return value as HexValue6;

  // TODO

  return "";
}
