import React, { FC, useState } from "react";
import { Switch } from "antd";
import { PaletteType } from "../../../src";
import CatSwatch from "./categorical";
import DisSwatch from "./discreteScale";
import ConSwatch from "./continuousScale";
import MatSwatch from "./matrix";

import styles from "./index.module.less";

interface SwatchProps {
  title: string;
  darkmode?: boolean;
  colors?: string[];
  colornames?: string[];
  description?: string;
  type: PaletteType;
  locations?: number[];
}

const Swatch: FC<SwatchProps> = (props) => {
  const { type, title, darkmode = true} = props;
  const [dark, toggleDark] = useState(false);

  const content = () => {
    switch (type) {
      case "categorical":
        return <CatSwatch {...props} dark={dark}/>;
  
      case "discrete-scale":
        return <DisSwatch {...props} dark={dark}/>;
  
      case "continuous-scale":
        return <ConSwatch {...props} dark={dark}/>;
  
      case "matrix":
        return <MatSwatch {...props} dark={dark}/>;
  
      default:
        return <p>...</p>;
    }
  }

  return (      
      <div className={styles.swatch}>
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
        {content()}
      </div>
  );
};

export default Swatch;
