<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

<h1 align="center">
<b>@antv/color-schema</b>
</h1>

<div align="center">
一个用于规范语义化的色彩资产或色板的JSON模式。
</div>

## ✨ Features
* **验证**: 验证输入的JSON数据是否符合色彩资产的数据结构规范。
* **开发**: 在开发时使用定义好的类型和接口.

## 📖 例子

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

## 📦 安装包
```bash
$ npm install @antv/color-schema
```

## 🔨 使用

### 验证 
通过[Ajv](https://github.com/ajv-validator/ajv) (JSON模式验证器) 验证：

```js
import Ajv from "ajv";
import colorSchema from "build/color-schema.json";

const ajv = new Ajv();
const validate = ajv.compile(colorSchema);
const valid = validate(data);
```

### Types & Interfaces

一些相关类型和接口的描述：

```js
import { ColorSchema, Palette, Color } from '@antv/color-schema';
```

#### ColorSchema
颜色模式（Color Schema）是一组色板构成的色彩资产包。
```ts
interface ColorSchema {
  brandName: string;
  palettes: Palette[];
}
```

#### Palette
色板（Palette）包含了一组颜色。
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
根据不同的数据类型和使用场景，有四种不同的[类型](https://antv.vision/en/docs/specification/language/palette#6-%E5%A4%A7%E8%89%B2%E6%9D%BF%E7%B1%BB%E5%9E%8B)的色板。
```ts
type PaletteType = "categorical" | "discrete-scale" | "continuous-scale" | "matrix";
```

#### ColorSchemeType
配色方案（[Color scheme](https://en.wikipedia.org/wiki/Color_scheme)）是指通过色轮搭配色彩的逻辑。例如单色方案或补色方案等。
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
颜色
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
色彩空间
```ts
type ColorModel = "hsl" | "hsv" | "hsi" | "rgb" | "rgba" | "lab" | "lch" | "cmyk";
```

#### Undertone
色调
```ts
type Undertone = "warm" | "neutral" | "cool";
```

## 💻 开发

```bash
npm install
npm run start
```

## 🔗 相关链接

* [Ant Design Colors](https://ant.design/docs/spec/colors)
* [AntV Color Design](https://antv.vision/en/docs/specification/language/palette)

## License

MIT