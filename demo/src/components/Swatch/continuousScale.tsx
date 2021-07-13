import React, { FC } from 'react';
import classNames from 'classnames';
import chroma from 'chroma-js';
import Colors from './colors';
import styles from './index.module.less';

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
  description = '',
  locations = [0, 1],
}) => {
  const colorStyle: React.CSSProperties = {};

  const sliceCount = 300; // width Adaptive
  const colorScaleFunc = chroma.scale(colors).domain(locations);
  const colorSclices = new Array(sliceCount).fill(0).map((d, i) => colorScaleFunc(i / sliceCount).hex());
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
              maxWidth: '1px',
              boxShadow: '0 0 0 0',
            }}
            colors={colorSclices}
            description={description}
            tooltip={(color, i) => (
              <div className={styles.continuousTooltip}>
                <div className={styles.info}>
                  <div className={styles.property}>Color: </div>
                  <div className={styles.value}>
                    <span className={styles.block} style={{ background: color }}></span>
                    <span> {color}</span>
                  </div>
                </div>
                <div className={styles.info}>
                  <div className={styles.property}>Location:</div>
                  <div className={styles.value}>{`${Math.round((i * 100) / sliceCount)}%`}</div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ContinuousScaleSwatch;
