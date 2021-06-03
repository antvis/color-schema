import React, { FC, useRef, useState } from "react";
import { message, Tooltip } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./index.module.less";
import SwatchTooltip from "./tooltip";

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
  tooltip?: (color: string, index: number) => {};
}

const Colors: FC<ColorsProps> = ({ colorStyle = {}, colors = [], names = [], name, description, tooltip }) => {
  if (colors.length === 0) {
    return null;
  }

  const [tooltipDisplay, setTooltipDisplay] = useState(false);
  const [hoveredColorX, setHoveredColorX] = useState<number>();
  const [hoveredColorY, setHoveredColorY] = useState<number>();
  const [hoveredColor, setHoveredColor] = useState<string>();
  const [hoveredColorIndex, setHoveredColorIndex] = useState<number>();

  const Color = (color: string, i: number) => {
    const colorBlock = useRef(null);

    return (
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
        ref={colorBlock}
        onMouseEnter={() => {
          const { x, y } = colorBlock.current.getBoundingClientRect();
          setHoveredColorX(x);
          setHoveredColorY(y);
          setHoveredColor(color);
          setHoveredColorIndex(i);
        }}
      >
        <span className={styles.name} style={{ display: colors.length > 10 ? "none" : "" }}>
          {names[i]}
        </span>
      </div>
    );
  };

  return (
    <div className={styles.colors} style={{ width: colors.length > 10 ? "100%" : "" }}>
      <div
        className={styles.container}
        onMouseEnter={() => {
          if (tooltip) {
            setTooltipDisplay(true);
          }
        }}
        onMouseLeave={() => {
          if (tooltip) {
            setTooltipDisplay(false);
          }
        }}
      >
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

        {tooltipDisplay ? (
          <SwatchTooltip x={hoveredColorX} y={hoveredColorY} content={tooltip(hoveredColor, hoveredColorIndex)} />
        ) : null}

        {colors.map((color: string, i: number) => (
          <React.Fragment key={i}>{Color(color, i)}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Colors;
