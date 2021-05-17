import React, { FC, useState } from "react";
import { Switch } from "antd";
import classNames from "classnames";
import styles from "./index.module.less";

import Colors from "./colors";

interface MatrixSwatchProps {
  title: string;
  darkmode?: boolean;
  colors?: string[];
  colornames?: string[];
  descriptions?: string[];
}

const MatrixSwatch: FC<MatrixSwatchProps> = ({
  title,
  darkmode = true,
  colors = [],
  colornames = [],
  descriptions = [],
}) => {
  const [dark, toggleDark] = useState(false);
  const colorsSwatchArray = [] as string[][];
  const des = descriptions;
  const colorNamesArray = colornames;
  const colorStyle: React.CSSProperties = {};

  colorsSwatchArray.push(colors);

  return (
    <div
      className={classNames(styles.swatch, {
        [styles.dark]: !!dark,
        [styles.multiple]: true,
        [styles.less]: colors.length < 5,
        [styles.sudoku]: true,
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
                maxWidth: undefined,
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

export default MatrixSwatch;
