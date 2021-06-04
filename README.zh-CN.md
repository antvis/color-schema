<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

# color-palette-json-schema

一个用于规范语义化的色彩资产或色板的JSON模式。

## 例子

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
          usage: [ "danger", "apple" ]
        },
        {
          space: "hex",
          value: "#00ff00",
          name: "green",
          undertone: [ "neutral" ]
        },
        {
          space: "hex",
          value: "#0000ff",
          name: "blue",
          undertone: [ "cool" ]
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
          { space: "hex", value: "#8B59FF" },
          { space: "hex", value: "#6752FF" },
          { space: "hex", value: "#1444ED" }
        ],
        [ 
          { space: "hex", value: "#B78DFF" },
          { space: "hex", value: "#8881FF" },
          { space: "hex", value: "#1B6BED" }
        ],
        [
          { space: "hex", value: "#D7D1FF" },
          { space: "hex", value: "#A0BFFF" },
          { space: "hex", value: "#209FED" }
        ]
      ],
      origin: {
        x: [ 
          { space: "hex", value: "#E5F4FF" },
          { space: "hex", value: "#ABDFFF" },
          { space: "hex", value: "#22BAED" }
        ],
        y: [
          { space: "hex", value: "#F0DBFF" },
          { space: "hex", value: "#CC94FF" },
          { space: "hex", value: "#AD63FF" }
        ]
      }
    }
  ]
}
```
<div align="center">
  <img src="https://gw.alipayobjects.com/zos/antfincdn/OJkRfCvSxN/palettes.png" width="300" />
</div>

## 安装包
```bash
$ npm install color-schema-test
```

## 使用

> 验证输入的JSON数据是否符合色彩资产的数据结构规范，并可以在开发时使用定义好的类型和接口。

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
import { ColorSchema, Palette, Color } from 'color-schema-test';
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
  space: ColorSpace;
  value: ColorValue;
  id?: string;
  name?: string;
  undertone?: Undertone;
  usage?: string;
}
```

#### ColorSpace
色彩空间
```ts
type ColorSpace = "hex" | "hsl" | "hsv" | "hsi" | "rgb" | "rgba" | "lab" | "lch" | "cmyk";
```

#### Undertone
色调
```ts
type Undertone = "warm" | "neutral" | "cool";
```

## 开发

```bash
npm install
npm run start
```

## 相关链接

* [Ant Design Colors](https://ant.design/docs/spec/colors)
* [AntV Color Design](https://antv.vision/en/docs/specification/language/palette)
