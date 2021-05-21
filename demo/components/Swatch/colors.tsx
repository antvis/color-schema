import React, { FC } from "react";
import { message, Tooltip } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./index.module.less";

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
  tooltip?: (color:string, index:number)=>{};
}

const Colors: FC<ColorsProps> = ({ colorStyle = {}, colors = [], names = [], name, description, tooltip }) => {
  if (colors.length === 0) {
    return null;
  }

  const Color = (color, i) => (
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
    >
      <span className={styles.name} style={{ display: colors.length > 10 ? "none" : "" }}>
        {names[i]}
      </span>
    </div>
  )
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
          <React.Fragment key={i}>
            {
              tooltip ? (
                <Tooltip placement="top" title={tooltip(color, i)}>
                  {Color(color, i)}
                </Tooltip>
              ): Color(color, i)
            }
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Colors;
