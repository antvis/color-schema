import React, { useState } from 'react';
import Ajv from 'ajv';
import chroma from 'chroma-js';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import colorSchema from '../build/color-schema.json';
import {
  Color,
  ContinuousColor,
  Palette,
  CategoricalPalette as CatP,
  DiscreteScalePalette as DisP,
  ContinuousScalePalette as ConP,
  MatrixPalette as MatP,
  ColorSchema,
 colorToHex } from '../src';
import classic from '../examples/classic.json';
import * as antdColors from '../examples/antd-color';
import antvColor from '../examples/antv-color.json';
import Swatch from './components/Swatch';


const examples: Record<string, any> = {
  'Classic Demo': classic,
  'antd Colors - Productional': antdColors.product,
  'antd Colors - System-level Basic': antdColors.basic,
  'antd Colors - System-level Neutral': antdColors.neutral,
  'AntV Colors': antvColor,
};

const ajv = new Ajv();
const validateSchema = ajv.compile(colorSchema);

const ColorCell = (props: { color: Color }) => {
  const { color } = props;
  const tooltip = Object.keys(color)
    .map((key) => `${key}: ${color[key as keyof Color]}`)
    .join('\n');
  const fill = colorToHex(color);
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
  const colorFunc = (per: number) => {
    const i = Math.floor(per / (1 / len));
    const color = colors[i];
    return colorToHex(color);
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

const colorsHaveLocation = (colors: ContinuousColor[]): boolean => {
  for (const color of colors) {
    if (typeof color.location === 'undefined') {
      return false;
    }
  }
  return true;
};

const ContinuousPalette = (props: { palette: ConP }) => {
  const { palette } = props;
  const { colors } = palette;
  const fwArray = [...Array(100)];
  const haveLocation = colorsHaveLocation(colors);
  let domain = [0, 1];
  if (haveLocation) {
    colors.sort((color1, color2) => (color1.location || 0) - (color2.location || 0));
    domain = colors.map((color) => color.location || 0);
  }
  const colorScaleFunc = chroma.scale(colors.map((color) => colorToHex(color))).domain(domain);

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
    <div className="matrixpalette">
      {palette.colors.map((colors, index1) => (
        <div key={index1} className="matrixPalette-row">
          {colors.map((color, index2) => (
            <ColorCell key={index2} color={color} />
          ))}
        </div>
      ))}
    </div>
  );
};

const ColorPaletteView = (props: { palette: Palette }) => {
  const { palette } = props;
  switch (palette.type) {
    case 'categorical':
      return (
        <Swatch
          title={palette.name}
          type="categorical"
          colors={palette.colors.map((color) => colorToHex(color))}
          colornames={palette.colors.map((color) => color.name || '')}
          description={palette.description}
        />
      );

    case 'discrete-scale':
      return (
        <Swatch
          title={palette.name}
          type="discrete-scale"
          colors={palette.colors.map((color) => colorToHex(color))}
          description={palette.description}
        />
      );

    case 'continuous-scale':
      return (
        <Swatch
          title={palette.name}
          type="continuous-scale"
          colors={palette.colors.map((color) => colorToHex(color))}
          locations={
            palette.colors.every((color) => color.location)
              ? palette.colors.map((color) => color.location as number)
              : undefined
          }
          description={palette.description}
        />
      );

    case 'matrix':
      return (
        <Swatch
          title={palette.name}
          type="matrix"
          colors={palette.colors.reduce((acc, cur) => acc.concat(...cur)).map((c) => colorToHex(c))}
          description={palette.description}
          // colors={matrixToHex(palette).reduce((acc, cur) => acc.concat(...cur), [])}
        />
      );

    default:
      return <></>;
  }
};

export default function App() {
  const [exampleName, setExampleName] = useState(Object.keys(examples)[0]);

  function handleMenuClick(e: { key: any }) {
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
          examples[exampleName].palettes.map((palette: Palette, index: number) => (
            <div key={`${palette.name}`}>
              {index === 0 ? null : <p>------</p>}
              <div className="palette-view">
                <div className="palette-info">
                  {Object.keys(palette)
                    .filter((key) => key !== 'colors')
                    .map((key) => (
                      <p key={key}>
                        <b>{key}</b>
                        {`: ${palette[key as keyof Palette]}`}
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
