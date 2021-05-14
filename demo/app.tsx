import React, { useState } from "react";
import Ajv from "ajv";
import colorSchema from "../build/color-schema.json";
import chroma from "chroma-js";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  Color,
  ContinuousColor,
  Palette,
  CategoricalPalette as CatP,
  DiscreteScalePalette as DisP,
  ContinuousScalePalette as ConP,
  MatrixPalette as MatP,
  ColorSpace,
} from "../src";
import classic from "../examples/classic.json";
import * as antdColors from "../examples/antd-color";
import antvColor from "../examples/antv-color.json";

const examples = {
  "Classic Demo": classic,
  "antd Colors - Productional": antdColors.product,
  "antd Colors - System-level Basic": antdColors.basic,
  "antd Colors - System-level Neutral": antdColors.neutral,
  "AntV Colors": antvColor,
};

const ajv = new Ajv();
const validateSchema = ajv.compile(colorSchema);

const toHex = (space: ColorSpace, value: any): string => {
  switch (space) {
    case "hex":
      return value as string;

    // TODO
    default:
      return;
  }
};

const ColorCell = (props: { color: Color }) => {
  const { color } = props;
  const tooltip = Object.keys(color)
    .map((key) => `${key}: ${color[key]}`)
    .join("\n");
  const fill = toHex(color.space, color.value);
  return (
    <div className="color-cell">
      <svg>
        <rect width="20" height="20" rx="4" ry="4" fill={fill}>
          <title>{tooltip}</title>
        </rect>
      </svg>
    </div>
  );
};

const CategoricalPalette = (props: { palette: CatP }) => {
  const { palette } = props;
  return (
    <div className="palette">
      {palette.colors.map((color, index) => (
        <ColorCell key={index} color={color} />
      ))}
    </div>
  );
};

const DiscretePalette = (props: { palette: DisP }) => {
  const { palette } = props;
  const { colors } = palette;
  const len = colors.length;
  const fwArray = [...Array(100)];
  const colorFunc = (per) => {
    const i = Math.floor(per / (1 / len));
    const color = colors[i];
    return toHex(color.space, color.value);
  };

  return (
    <div className="palette">
      <div className="gradient">
        {fwArray.map((_, index) => {
          return (
            <span className="grad-step" key={index} style={{ backgroundColor: `${colorFunc(index / 100)}` }}></span>
          );
        })}
      </div>
    </div>
  );
};

const colorsHaveLocation = (colors: ContinuousColor[]): boolean=> {
  for(let color of colors){
    if(typeof color.location === "undefined"){
      return false;
    }
  }
  return true;
}

const ContinuousPalette = (props: { palette: ConP }) => {
  const { palette } = props;
  const { colors } = palette;
  const fwArray = [...Array(100)];
  const haveLocation = colorsHaveLocation(colors);
  let domain = [0, 1];
  if(haveLocation){
    colors.sort((color1, color2) => color1.location - color2.location);
    domain = colors.map((color) => color.location);
  }
  const colorScaleFunc = chroma.scale(colors.map((color) => toHex(color.space, color.value)))
                          .domain(domain);

  return (
    <div className="palette">
      <div className="gradient">
        {fwArray.map((_, index) => {
          return (
            <span
              className="grad-step"
              key={index}
              style={{
                backgroundColor: `${colorScaleFunc(index / 100).hex()}`,
              }}
            ></span>
          );
        })}
      </div>
    </div>
  );
};

const MatrixPalette = (props: { palette: MatP }) => {
  const { palette } = props;
  return (
    <div className="palette">
      {palette.colors[0].map((color1, index1) => (
        palette.colors[1].map((color2, index2) => (
          console.log(chroma.mix(toHex(color1.space, color1.value), toHex(color2.space, color2.value)).hex())
        ))
      ))}
    </div>
  );
};

const ColorPaletteView = (props: { palette: Palette }) => {
  const { palette } = props;
  switch (palette.type) {
    case "categorical":
      return <CategoricalPalette palette={palette as CatP} />;

    case "discrete-scale":
      return <DiscretePalette palette={palette as DisP} />;

    case "continuous-scale":
      return <ContinuousPalette palette={palette as ConP} />;

    case "matrix":
      return <MatrixPalette palette={palette as MatP} />;

    default:
      return;
  }
};

export default function App() {
  const [exampleName, setExampleName] = useState(Object.keys(examples)[0]);

  function handleMenuClick(e) {
    const { key } = e;
    setExampleName(key);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {Object.keys(examples).map((exampleName) => (
        <Menu.Item key={exampleName}>{exampleName}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <div className="header" style={{ margin: 20, padding: 10 }}>
        <Dropdown overlay={menu}>
          <Button>
            Examples <DownOutlined />
          </Button>
        </Dropdown>
        {exampleName}
      </div>
      <div className="palette-assets">
        {validateSchema(examples[exampleName]) ? (
          examples[exampleName].palettes.map((palette, index) => (
            <div key={`p_${index}`}>
              {index === 0 ? null : <p>------</p>}
              <div className="palette-view">
                <div className="palette-info">
                  {Object.keys(palette)
                    .filter((key) => key !== "colors")
                    .map((key) => (
                      <p key={key}>
                        <b>{key}</b>
                        {`: ${palette[key]}`}
                      </p>
                    ))}
                </div>
                <ColorPaletteView palette={palette as Palette} />
              </div>
            </div>
          ))
        ) : (
          <div>invalid colors</div>
        )}
      </div>
    </>
  );
}
