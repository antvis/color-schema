import React, { FC } from 'react';
import classNames from 'classnames';
import Colors from './colors';
import styles from './index.module.less';

interface DiscreteScaleSwatchProps {
  title: string;
  dark?: boolean;
  colors?: string[];
  description?: string;
}

const DiscreteScaleSwatch: FC<DiscreteScaleSwatchProps> = ({
  title,
  dark = false,
  colors = [],
  description = '',
}: DiscreteScaleSwatchProps) => {
  const colorStyle: React.CSSProperties = {};

  return (
    <div
      className={classNames({
        [styles.dark]: !!dark,
        [styles.multiple]: true,
        [styles.less]: false,
      })}
    >
      <div className={styles.panel}>
        <div className={styles.panelContainer}>
          <Colors
            name={title}
            colorStyle={{
              ...colorStyle,
            }}
            colors={colors}
            description={description}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscreteScaleSwatch;
