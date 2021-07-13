import React, { FC } from 'react';
import classNames from 'classnames';
import Colors from './colors';
import styles from './index.module.less';

interface CategoricalSwatchProps {
  dark?: boolean;
  colors?: string[];
  colornames?: string[];
  description?: string;
}

const CategoricalSwatch: FC<CategoricalSwatchProps> = ({
  dark = false,
  colors = [],
  colornames = [],
  description = '',
}: CategoricalSwatchProps) => {
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
      className={classNames({
        [styles.dark]: !!dark,
        [styles.multiple]: colors.includes('|'),
        [styles.less]: colors.length < 5,
      })}
    >
      <div className={styles.panel}>
        <div className={styles.panelContainer}>
          <Colors names={colornames} colorStyle={colorStyle} colors={colors} description={description} />
        </div>
      </div>
    </div>
  );
};

export default CategoricalSwatch;
