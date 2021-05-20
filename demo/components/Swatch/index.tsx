import React, { FC } from "react";

import { PaletteType } from "../../../src";
import CatSwatch from "./categorical";
import DisSwatch from "./discreteScale";
import ConSwatch from "./continuousScale";
import MatSwatch from "./matrix";

interface SwatchProps {
  title: string;
  darkmode?: boolean;
  colors?: string[];
  colornames?: string[];
  grid?: "sudoku";
  descriptions?: string[];
  type: PaletteType;
  locations?: number[];
}

const Swatch: FC<SwatchProps> = (props) => {
  const { type } = props;

  switch (type) {
    case "categorical":
      return <CatSwatch {...props} />;

    case "discrete-scale":
      return <DisSwatch {...props} />;

    case "continuous-scale":
      return <ConSwatch {...props}/>;

    case "matrix":
      return <MatSwatch {...props} />;

    default:
      return <p>...</p>;
  }
};

export default Swatch;
