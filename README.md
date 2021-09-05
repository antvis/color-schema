<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

<h1 align="center">
<b>@antv/color-schema</b>
</h1>

<div align="center">
A JSON schema used to regulate semantic color assets or palettes.
</div>

## ✨ Features
* **Validate**: Validate data with JSON schema.
* **Develop**: Develop with types and interfaces.

## 📖 Example

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
          model: "rgb",
          value: { r: 255, g: 0, b: 0 },
          name: "red",
          undertone: "warm",
          usage: [ "danger", "apple" ]
        },
        {
          model: "rgb",
          value: { r: 0, g: 255, b: 0 },
          name: "green",
          undertone: "neutral"
        },
        {
          model: "rgb",
          value: { r: 0, g: 0, b: 255 },
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
        { model: "rgb", value: { r: 255, g: 235, b: 176} },
        { model: "rgb", value: { r: 255, g: 223, b: 128} },
        { model: "rgb", value: { r: 250, g: 202, b: 62 },
        { model: "rgb", value: { r: 230, g: 184, b: 1 },
        { model: "rgb", value: { r: 181, g: 172, b: 35} },
        { model: "rgb", value: { r: 106, g: 154, b: 72} },
        { model: "rgb", value: { r: 32, g: 135, b: 107} },
        { model: "rgb", value: { r: 6, g: 116, b: 107} },
        { model: "rgb", value: { r: 4, g: 78, b: 72} }
      ],
      "usage": ["visualization"]
    },
    {
      name: "scale3",
      semantic: "passional",
      type: "continuous-scale",
      colors: [
        { model: "rgb", value: {r: 255, g: 247, b: 236}, location: 0 },
        { model: "rgb", value: {r: 252, g: 141, b: 89}, location: 0.2 },
        { model: "rgb", value: {r: 127, g: 0, b: 0}, location: 1 }
      ]
    },
    {
      name: "Matrix",
      semantic: "mysterious",
      type: "matrix",
      colors: [
        [
          { model: "rgb", value: { r: 139, g: 89, b: 255 } },
          { model: "rgb", value: { r: 103, g: 82, b: 255 } },
          { model: "rgb", value: { r: 20, g: 68, b: 237 } }
        ],
        [ 
          { model: "rgb", value: { r: 183, g: 141, b: 255 } },
          { model: "rgb", value: { r: 136, g: 129, b: 255 } },
          { model: "rgb", value: { r: 27, g: 107, b: 237 } }
        ],
        [
          { model: "rgb", value: { r: 215, g: 209, b: 255 } },
          { model: "rgb", value: { r: 160, g: 191, b: 255 } },
          { model: "rgb", value: { r: 32, g: 159, b: 237 } }
        ]
      ],
      origin: {
        x: [ 
          { model: "rgb", value: { r: 215, g: 209, b: 255 } },
          { model: "rgb", value: { r: 160, g: 191, b: 255 } },
          { model: "rgb", value: { r: 32, g: 159, b: 237 } }
        ],
        y: [
          { model: "rgb", value: { r: 215, g: 209, b: 255 } },
          { model: "rgb", value: { r: 183, g: 141, b: 255 } },
          { model: "rgb", value: { r: 139, g: 89, b: 255 } }
        ]
      }
    }
  ]
}
```
<div align="center">
  <img src="https://gw.alipayobjects.com/zos/antfincdn/OJkRfCvSxN/palettes.png" width="300" />
</div>

## 📦 Installation
```bash
$ npm install @antv/color-schema
```

## 🔨 Usage

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
import { ColorSchema, Palette, Color } from '@antv/color-schema';
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
  usage?: string[];
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
  model: ColorModel;
  value: ColorValue;
  id?: string;
  name?: string;
  undertone?: Undertone;
  usage?: string[];
}
```

#### ColorModel
```ts
type ColorModel = "hsl" | "hsv" | "hsi" | "rgb" | "rgba" | "lab" | "lch" | "cmyk";
```

#### Undertone
```ts
type Undertone = "warm" | "neutral" | "cool";
```

## 💻 Dev

```bash
npm install
npm run start
```

## 🔗 Reference

* [Ant Design Colors](https://ant.design/docs/spec/colors)
* [AntV Color Design](https://antv.vision/en/docs/specification/language/palette)

## License

MIT
