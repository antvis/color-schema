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
          hex: "#ff0000",
          rgb: [255, 0, 0],
          name: "red",
          nameCN: "红",
          undertone: "warm",
          usage: "danger",
        },
        {
          hex: "#00ff00",
          rgb: [0, 255, 0],
          name: "green",
          nameCN: "绿",
          undertone: "neutral",
        },
        {
          hex: "#0000ff",
          rgb: [0, 0, 255],
          name: "blue",
          nameCN: "蓝",
          undertone: "cool",
        },
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
