import React, { FC, useState } from "react";
import { Switch, message, Tooltip } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./index.module.less";

import { PaletteType } from "../../../src";
import CatSwatch from "./categorical";
import DisSwatch from "./discreteScale";
import MatSwatch from "./matrix";

interface SwatchProps {
  title: string;
  darkmode?: boolean;
  colors?: string[];
  colornames?: string[];
  grid?: "sudoku";
  descriptions?: string[];
  type: PaletteType;
}

const copyToClipboard = (str: string) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

interface ColorsProps {
  colorStyle: React.CSSProperties;
  colors: string[];
  names?: string[];
  name?: string;
  description?: string;
}

const Colors: FC<ColorsProps> = ({ colorStyle = {}, colors = [], names = [], name, description }) => {
  if (colors.length === 0) {
    return null;
  }

  return (
    <div className={styles.colors} style={{ width: colors.length > 10 ? "100%" : "" }}>
      <div className={styles.container}>
        {description ? (
          <div className={styles.name}>
            <span style={{ marginRight: "5px" }}>{name}</span>
            <Tooltip placement="bottom" title={description}>
              <QuestionCircleFilled />
            </Tooltip>
          </div>
        ) : (
          <span className={styles.name}>{name}</span>
        )}

        {colors.map((color: string, i: number) => (
          <div
            className={classNames(styles.color, {
              [styles.first]: i === 0,
              [styles.third]: i === 2,
              [styles.seventh]: i === 6,
              [styles.last]: i === colors.length - 1,
            })}
            style={{
              ...colorStyle,
              backgroundColor: color,
              color,
            }}
            key={i}
            onClick={() => {
              copyToClipboard(color);
              message.success(
                <span>
                  Copied
                  <span style={{ backgroundColor: color }} className={styles.block} />
                  {color}
                </span>
              );
            }}
          >
            <span className={styles.name} style={{ display: colors.length > 10 ? "none" : "" }}>
              {names[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Swatch: FC<SwatchProps> = (props) => {
  const { type } = props;

  switch (type) {
    case "categorical":
      return <CatSwatch {...props} />;

    case "discrete-scale":
      return <DisSwatch {...props} />;

    case "matrix":
      return <MatSwatch {...props} />;

    default:
      return <p>...</p>;
  }
};

export default Swatch;
