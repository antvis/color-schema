# color-palette-json-schema

A JSON schema used to regulate semantic color assets or palettes.

## Example

```js
{
  brandName: "antd",
  palettes: [
    {
      name: "trinity",
      semantic: "three",
      type: "categorical",
      colors: [
        {
          space: "hex",
          value: "#ff0000",
          name: "red",
          undertone: "warm",
          usage: "danger"
        },
        {
          space: "hex",
          value: "#00ff00",
          name: "green",
          undertone: "neutral"
        },
        {
          space: "hex",
          value: "#0000ff",
          name: "blue",
          undertone: "cool"
        }
      ]
    },
    {
      name: "Leaf Yellow",
      semantic: "tranquil",
      type: "discrete-scale",
      description: "Colors of leaves in different seasons.",
      colors: [
        { space: "hex", value: "#FFEBB0" },
        { space: "hex", value: "#FFDF80" },
        { space: "hex", value: "#FACA3E" },
        { space: "hex", value: "#E6B80B" },
        { space: "hex", value: "#B5AC23" },
        { space: "hex", value: "#6A9A48" },
        { space: "hex", value: "#20876B" },
        { space: "hex", value: "#06746B" },
        { space: "hex", value: "#044E48" }
      ]
    },
    {
      name: "scale3",
      semantic: "passional",
      type: "continuous-scale",
      colors: [
        { space: "hex", value: "#fff7ec", location: 0 },
        { space: "hex", value: "#fc8d59", location: 0.2 },
        { space: "hex", value: "#7f0000", location: 1 }
      ]
    },
    {
      name: "Matrix",
      semantic: "mysterious",
      type: "matrix",
      colors: [
        [
          {
            space: "hex",
            value: "#8B59FF"
          },
          {
            space: "hex",
            value: "#6752FF"
          },
          {
            space: "hex",
            value: "#1444ED"
          }
        ],
        [
          {
            space: "hex",
            value: "#B78DFF"
          },
          {
            space: "hex",
            value: "#8881FF"
          },
          {
            space: "hex",
            value: "#1B6BED"
          }
        ],
        [
          {
            space: "hex",
            value: "#D7D1FF"
          },
          {
            space: "hex",
            value: "#A0BFFF"
          },
          {
            space: "hex",
            value: "#209FED"
          }
        ]
      ],
      origin: {
        x: [
          {
            space: "hex",
            value: "#D7D1FF"
          },
          {
            space: "hex",
            value: "#A0BFFF"
          },
          {
            space: "hex",
            value: "#209FED"
          }
        ],
        y: [
          {
            space: "hex",
            value: "#D7D1FF"
          },
          {
            space: "hex",
            value: "#B78DFF"
          },
          {
            space: "hex",
            value: "#8B59FF"
          }
        ]
      }
    }
  ]
}
```
<div align="center">
  <img src="https://gw.alipayobjects.com/zos/antfincdn/OJkRfCvSxN/palettes.png" width="300" />
</div>

## Installation
```bash
$ npm install color-schema-test
```

## Usage

> Validate data with JSON schema, and develop with types and interfaces.

### Validate 
Validate by [Ajv](https://github.com/ajv-validator/ajv) (JSON schema validator):

```js
import Ajv from "ajv";
import colorSchema from "build/color-schema.json";

const ajv = new Ajv();
const validate = ajv.compile(colorSchema);
const valid = validate(data);
```

### Types & Interfaces

Some types and interfaces:

```js
import { ColorSchema, Palette, Color } from 'color-schema-test';
```

#### ColorSchema
Color Schema is a color assets package consisting of a collection of palettes.
```ts
interface ColorSchema {
  brandName: string;
  palettes: Palette[];
}
```

#### Palette
Color palette is a collection of colors.
```ts
interface Palette {
  id?: string;
  name: string;
  type: PaletteType;
  semantic: string | null;
  description?: string;
  colorScheme?: ColorSchemeType;
  colors: Color[] | ContinuousColor[] | colors: Color[][];
  origin?: {
    x: Color[];
    y: Color[];
  };
}
```

#### PaletteType
According to different data types and usage scenarios, four different [types](https://antv.vision/en/docs/specification/language/palette#6-%E5%A4%A7%E8%89%B2%E6%9D%BF%E7%B1%BB%E5%9E%8B) of color plates are provided.
```ts
type PaletteType = "categorical" | "discrete-scale" | "continuous-scale" | "matrix";
```

#### ColorSchemeType
[Color scheme](https://en.wikipedia.org/wiki/Color_scheme) is described in terms of logical combinations of colors on a color wheel. Different types of schemes, like monochromatic or complementary, are used.
```ts
type ColorSchemeType = 
  | "monochromatic"
  | "complementary"
  | "split-complementary"
  | "achromatic"
  | "analogous"
  | "triadic"
  | "tetradic"
  | "polychromatic"
  | "customized";
```

#### Color
```ts
interface Color {
  space: ColorSpace;
  value: ColorValue;
  id?: string;
  name?: string;
  undertone?: Undertone;
  usage?: string;
}
```

#### ColorSpace
```ts
type ColorSpace = "hex" | "rgb" | "rgba" | "lab" | "cmyk";
```

#### Undertone
```ts
type Undertone = "warm" | "neutral" | "cool";
```

## Dev

```bash
npm install
npm run start
```

## Reference

* [Ant Design Colors](https://ant.design/docs/spec/colors)
* [AntV Color Design](https://antv.vision/en/docs/specification/language/palette)
