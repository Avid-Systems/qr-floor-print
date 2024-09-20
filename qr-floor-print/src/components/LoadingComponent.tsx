import { FC, JSX } from "react";
import {
  Shimmer,
  ShimmerElementType,
  ShimmerElementsGroup,
} from "@fluentui/react";

const wrapperStyle = { display: "flex" };

const LoadingMapComponent: FC = (): JSX.Element => {
  return (
    <div>
      <Shimmer
        customElementsGroup={ShimmerElementsElementsBlockOne()}
        width="350"
      />
      <Shimmer
        customElementsGroup={ShimmerElementsElementsBlockTwo()}
        width="550"
      />
      <Shimmer
        customElementsGroup={ShimmerElementsElementsBlockThree()}
        width="90%"
      />
    </div>
  );
};

export default LoadingMapComponent;

const ShimmerElementsElementsBlockOne = (): JSX.Element => {
  return (
    <div style={wrapperStyle}>
      <ShimmerElementsGroup
        shimmerElements={[
          { type: ShimmerElementType.circle, height: 40 },
          { type: ShimmerElementType.gap, width: 10, height: 40 },
        ]}
      />
      <ShimmerElementsGroup
        flexWrap
        shimmerElements={[
          { type: ShimmerElementType.line, width: 400, height: 10 },
          { type: ShimmerElementType.gap, width: 100, height: 20 },
          { type: ShimmerElementType.line, width: 500, height: 10 },
        ]}
      />
    </div>
  );
};

const ShimmerElementsElementsBlockTwo = (): JSX.Element => {
  return (
    <div style={wrapperStyle}>
      <ShimmerElementsGroup
        shimmerElements={[
          { type: ShimmerElementType.circle, height: 40 },
          { type: ShimmerElementType.gap, width: 10, height: 40 },
        ]}
      />
      <ShimmerElementsGroup
        flexWrap
        shimmerElements={[
          { type: ShimmerElementType.line, width: 400, height: 10 },
          { type: ShimmerElementType.gap, width: 100, height: 20 },
          { type: ShimmerElementType.line, width: 500, height: 10 },
        ]}
      />
    </div>
  );
};

const ShimmerElementsElementsBlockThree = (): JSX.Element => {
  return (
    <div style={wrapperStyle}>
      <ShimmerElementsGroup
        width={"90px"}
        shimmerElements={[
          { type: ShimmerElementType.line, height: 80, width: 80 },
          { type: ShimmerElementType.gap, width: 10, height: 80 },
        ]}
      />
      <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        <ShimmerElementsGroup
          shimmerElements={[
            { type: ShimmerElementType.circle, height: 40 },
            { type: ShimmerElementType.gap, width: 10, height: 40 },
          ]}
        />
        <ShimmerElementsGroup
          flexWrap
          width={"calc(100% - 50px)"}
          shimmerElements={[
            { type: ShimmerElementType.line, width: "90%", height: 10 },
            { type: ShimmerElementType.gap, width: "10%", height: 20 },
            { type: ShimmerElementType.line, width: "100%", height: 10 },
          ]}
        />
        <ShimmerElementsGroup
          flexWrap
          width={"100%"}
          shimmerElements={[
            {
              type: ShimmerElementType.line,
              width: "80%",
              height: 10,
              verticalAlign: "bottom",
            },
            { type: ShimmerElementType.gap, width: "20%", height: 20 },
            {
              type: ShimmerElementType.line,
              width: "40%",
              height: 10,
              verticalAlign: "bottom",
            },
            { type: ShimmerElementType.gap, width: "2%", height: 20 },
            {
              type: ShimmerElementType.line,
              width: "58%",
              height: 10,
              verticalAlign: "bottom",
            },
          ]}
        />
      </div>
    </div>
  );
};
