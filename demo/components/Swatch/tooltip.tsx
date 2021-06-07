import React, { FC, ReactNode } from "react";

interface SwatchTooltipProps {
  x: number;
  y: number;
  height?: number;
  width?: number;
  content: ReactNode | (() => ReactNode);
}

const SwatchTooltip: FC<SwatchTooltipProps> = ({ x, y, height = 100, width = 180, content }) => {
  const tooltipWidth = 100;
  const triangleHeight = 8;
  const tooltipDivHeight = height + triangleHeight; // = rectangleHeight + 2 * triangleHeight
  const rectangleHeight = height - triangleHeight;
  const rectangleWidth = width;
  const rectangleBorderRadius = 4;
  const ROOT_2 = 1.414;
  const triangleShadowOriginRectSideLength = ROOT_2 * triangleHeight;
  const triangleShadowOriginRectRotatedOffsetY = 6;

  const tooltipStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: tooltipDivHeight,
    width: tooltipWidth,
    position: "fixed",
    left: x - tooltipWidth / 2,
    top: y - tooltipDivHeight + triangleHeight,
  };

  const rectangleStyles: React.CSSProperties = {
    position: "relative",
    height: rectangleHeight,
    width: rectangleWidth,
    borderRadius: rectangleBorderRadius,
    background: "rgba(255, 255, 255, 1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const rectangleShadowStyles: React.CSSProperties = {
    zIndex: -1,
    position: "absolute",
    height: rectangleHeight,
    width: rectangleWidth,
    borderRadius: rectangleBorderRadius,
    background: "rgba(255, 255, 255, 0)",
    boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.3)",
    WebkitBoxShadow: "1px 2px 8px rgba(0, 0, 0, 0.3)",
  };

  const triangleStyles: React.CSSProperties = {
    height: 0,
    width: 0,
    borderLeft: "8px solid transparent",
    borderRight: "8px solid transparent",
    borderTop: "8px solid #fff",
  };

  const triangleShadowStyles: React.CSSProperties = {
    zIndex: -1,
    position: "absolute",
    height: 20,
    width: 20,
    bottom: triangleShadowOriginRectSideLength + triangleShadowOriginRectRotatedOffsetY,
    background: "rgba(255, 255, 255, 0)",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
    WebkitBoxShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
    transform: "rotate(45deg)",
    WebkitTransform: "rotate(45deg)",
    MozTransition: "rotate(45deg)",
    msTransform: "rotate(45deg)",
  };

  const contentStyles: React.CSSProperties = {
    padding: 10,
    height: "100%",
    width: "100%",
    color: "black",
    fontSize: 16,
    lineHeight: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  return (
    <div className="swatch-tooltip" style={tooltipStyles}>
      <div className="rectangle" style={rectangleStyles}>
        <div className="content" style={contentStyles}>
          {content}
        </div>
      </div>
      <div className="triangle" style={triangleStyles}></div>
      <div className="rectangle-shadow" style={rectangleShadowStyles}></div>
      <div className="triangle-shadow" style={triangleShadowStyles}></div>
    </div>
  );
};

export default SwatchTooltip;
