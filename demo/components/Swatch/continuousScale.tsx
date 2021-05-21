import React, { FC } from "react";
import classNames from "classnames";
import chroma from "chroma-js";
import styles from "./index.module.less";

import Colors from "./colors";

interface ContinuousScaleSwatchProps {
  title: string;
  dark?: boolean;
  colors?: string[];
  locations?: number[];
  description?: string;
}

const ContinuousScaleSwatch: FC<ContinuousScaleSwatchProps> = ({
  title,
  dark = false,
  colors = [],
  description = "",
  locations = [0, 1],
}) => {
  const colorStyle: React.CSSProperties = {};

  const sliceCount = 300;//width Adaptive
  const colorScaleFunc = chroma.scale(colors).domain(locations);
  let colorSclices = new Array(sliceCount).fill(0).map((d, i) => colorScaleFunc(i/sliceCount).hex());
  return (
    <div
      className={classNames({
        [styles.dark]: !!dark,
        [styles.multiple]: true,
        [styles.less]: colors.length < 5,
      })}
    >
      <div className={styles.panel}>
        <div className={styles.panelContainer}>
          <Colors
            name={title}
            colorStyle={{
              ...colorStyle,
              maxWidth: `1px`,
              boxShadow: '0 0 0 0'
            }}
            colors={colorSclices}
            description={description}
            tooltip={(color, i) => (
              <div className={styles.tooltip}>
                <div> 
                  <span>Color: </span>
                  <span className={styles.block} style={{background: color}}></span>
                  <span> {color}</span>
                </div>
                <span>Location: { Math.round(i*100/sliceCount)+"%" }</span>
              </div>)}
          />
        </div>
      </div>
    </div>
  );
};

export default ContinuousScaleSwatch;