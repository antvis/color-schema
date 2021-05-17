import React, { FC, useState } from "react";
import { Switch } from "antd";
import classNames from "classnames";
import styles from "./index.module.less";

import Colors from "./colors";

interface CategoricalSwatchProps {
  title: string;
  darkmode?: boolean;
  colors?: string[];
  colornames?: string[];
  descriptions?: string[];
}

const CategoricalSwatch: FC<CategoricalSwatchProps> = ({
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

  if (colors.length < 5) {
    colorStyle.width = `calc(${100 / colors.length}% - 150px)`;
    colorStyle.minWidth = 120;
    colorStyle.marginLeft = 12;
    colorStyle.marginRight = 12;
    colorStyle.fontSize = 16;
  } else if (colors.length > 10) {
    colorStyle.width = 25;
    colorStyle.height = 25;
    colorStyle.marginLeft = 4;
    colorStyle.marginRight = 4;
  }

  return (
    <div
      className={classNames(styles.swatch, {
        [styles.dark]: !!dark,
        [styles.multiple]: colors.includes("|"),
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
          <Colors names={colorNamesArray} colorStyle={colorStyle} colors={colors} />
        </div>
      </div>
    </div>
  );
};

export default CategoricalSwatch;
