import * as colorPaleteSchema from "../color-palette-schema.json";
import { matchersWithOptions } from "jest-json-schema";
expect.extend(
  matchersWithOptions({
    schemas: [colorPaleteSchema],
  })
);

const colorAssets = {
  brandName: "antd",
  palettes: [
    {
      name: "trinity",
      semantic: null,
      type: "categorical",
      colors: [
        {
          space: "hex",
          value: "#ff0000",
          name: "red",
          undertone: "warm",
          usage: "danger",
        },
        {
          space: "hex",
          value: "#00ff00",
          name: "green",
          undertone: "neutral",
        },
        {
          space: "hex",
          value: "#0000ff",
          name: "blue",
          undertone: "cool",
        },
      ],
    },
    {
      name: "scale1",
      semantic: "passionate",
      type: "discrete-scale",
      colors: [
        { space: "hex", value: "#fff7ec" },
        { space: "hex", value: "#fdd49e" },
        { space: "hex", value: "#fc8d59" },
        { space: "hex", value: "#d7301f" },
        { space: "hex", value: "#7f0000" },
      ],
    },
    {
      name: "scale2",
      semantic: "silent",
      type: "discrete-scale",
      colors: [
        { space: "hex", value: "#00f7ec" },
        { space: "hex", value: "#00d49e" },
        { space: "hex", value: "#008d59" },
        { space: "hex", value: "#00301f" },
        { space: "hex", value: "#000000" },
      ],
    },
    {
      name: "scale3",
      semantic: "passionate",
      type: "continuous-scale",
      colors: [
        { space: "hex", value: "#fff7ec" },
        { space: "hex", value: "#fc8d59" },
        { space: "hex", value: "#7f0000" },
      ],
    },
  ],
};

describe("test", () => {
  test("schema is valid", () => {
    expect(colorPaleteSchema).toBeValidSchema();
  });

  it("hi", () => {
    expect(colorAssets).toMatchSchema(colorPaleteSchema);
  });
});
