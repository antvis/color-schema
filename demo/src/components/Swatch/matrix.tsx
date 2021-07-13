import React, { FC } from 'react';
import classNames from 'classnames';
import Colors from './colors';
import styles from './index.module.less';

interface MatrixSwatchProps {
  title: string;
  dark?: boolean;
  colors?: string[];
  description?: string;
}

const MatrixSwatch: FC<MatrixSwatchProps> = ({ title, dark = false, colors = [], description = '' }) => {
  const colorStyle: React.CSSProperties = {};

  return (
    <div
      className={classNames({
        [styles.dark]: !!dark,
        [styles.multiple]: true,
        [styles.less]: colors.length < 5,
        [styles.sudoku]: true,
      })}
    >
      <div className={styles.panel}>
        <div className={styles.panelContainer}>
          <Colors
            name={title}
            colorStyle={{
              ...colorStyle,
              maxWidth: undefined,
            }}
            colors={colors}
            description={description}
          />
        </div>
      </div>
    </div>
  );
};

export default MatrixSwatch;
