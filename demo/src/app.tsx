import React, { useState } from 'react';
import Ajv from 'ajv';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import colorSchema from '../../build/color-schema.json';
import { Palette, colorToHex } from '../../src';
import classic from '../../examples/classic.json';
import * as antdColors from '../../examples/antd-color';
import antvColor from '../../examples/antv-color.json';
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
