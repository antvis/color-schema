import React, { useState } from "react";
import chroma from "chroma-js";
import { Button, Dropdown, Menu, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  Color,
  Palette,
  CategoricalPalette as CatP,
  DiscreteScalePalette as DisP,
  ContinuousScalePalette as ConP,
  ColorSpace,
} from "../src";
import classic from "../examples/classic.json";
import antdColor from "../examples/antd-color.json";
import antvColor from "../examples/antv-color.json";

const examples = {
  "Classic Demo": classic,
  "Ant Design Colors": antdColor,
  "AntV Colors": antvColor,
};

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

const ContinuousPalette = (props: { palette: ConP }) => {
  const { palette } = props;
  const { colors } = palette;
  const fwArray = [...Array(100)];
  const colorScaleFunc = chroma.scale(colors.map((color) => toHex(color.space, color.value)));

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

const ColorPaletteView = (props: { palette: Palette }) => {
  const { palette } = props;
  switch (palette.type) {
    case "categorical":
      return <CategoricalPalette palette={palette as CatP} />;

    case "discrete-scale":
      return <DiscretePalette palette={palette as DisP} />;

    case "continuous-scale":
      return <ContinuousPalette palette={palette as ConP} />;

    default:
      return;
  }
};

export default function App() {
  const [exampleName, setExampleName] = useState(Object.keys(examples)[0]);

  let example = examples[exampleName];

  function handleMenuClick(e) {
    const { key } = e;
    setExampleName(key);
    example = examples[exampleName];
    console.log(example);
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
        {example.palettes.map((palette, index) => (
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
        ))}
      </div>
    </>
  );
}
