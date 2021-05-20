import React, { FC, useState } from "react";
import { Switch } from "antd";
import classNames from "classnames";
import chroma from "chroma-js";
import styles from "./index.module.less";

import Colors from "./colors";

interface ContinuousScaleSwatchProps {
  title: string;
  darkmode?: boolean;
  colors?: string[];
  colornames?: string[];
  descriptions?: string[];
  locations?: number[];
}

const ContinuousScaleSwatch: FC<ContinuousScaleSwatchProps> = ({
  title,
  darkmode = true,
  colors = [],
  colornames = [],
  descriptions = [],
  locations = [0, 1],
}) => {
  const [dark, toggleDark] = useState(false);
  const colorsSwatchArray = [] as string[][];
  const des = descriptions;
  const colorNamesArray = colornames;
  const colorStyle: React.CSSProperties = {};
  const sliceCount = 100;
  const colorScaleFunc = chroma.scale(colors).domain(locations);
  let colorSclices = new Array(sliceCount).fill(0).map((d, i) => colorScaleFunc(i/sliceCount).hex());
  colorsSwatchArray.push(colorSclices);

  return (
    <div
      className={classNames(styles.swatch, {
        [styles.dark]: !!dark,
        [styles.multiple]: true,
        [styles.less]: colors.length < 5,
      })}
    >
      {/* title bar: title text + dark mode switch */}
      {(title || darkmode) && (
        <div className={styles.heading}>
          <h4>{title}</h4>
          {darkmode && (
            <div>
              <span className={styles.darkmode}>Dark Mode</span>
              <Switch checked={dark} size="small" onChange={(checked) => toggleDark(checked)} />
            </div>
          )}
        </div>
      )}
      <div className={styles.panel}>
        <div className={styles.panelContainer}>
          {colorsSwatchArray.map((swatch, i) => (
            <Colors
              key={i}
              name={colorNamesArray[i]}
              colorStyle={{
                ...colorStyle,
                maxWidth: `${100 / swatch.length}%`,
              }}
              colors={swatch}
              description={des[i]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContinuousScaleSwatch;
