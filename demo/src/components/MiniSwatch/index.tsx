import React from 'react';
import chroma from 'chroma-js';
import {
  Color,
  ContinuousColor,
  CategoricalPalette as CatP,
  DiscreteScalePalette as DisP,
  ContinuousScalePalette as ConP,
  MatrixPalette as MatP,
  colorToHex,
} from '../../../../src';
import './index.module.less';

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

export const CategoricalPalette = (props: { palette: CatP }) => {
  const { palette } = props;
  return (
    <div className="palette">
      {palette.colors.map((color, index) => (
        <ColorCell key={index} color={color} />
      ))}
    </div>
  );
};

export const DiscretePalette = (props: { palette: DisP }) => {
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
  return !colors.some((color) => typeof color.location === 'undefined');
};

export const ContinuousPalette = (props: { palette: ConP }) => {
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

export const MatrixPalette = (props: { palette: MatP }) => {
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
