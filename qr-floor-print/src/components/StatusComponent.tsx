import { FC, JSX } from "react";
import { Stack } from "@fluentui/react";
import { DynamicStyles, StatusColor } from "../types";

interface IStatusComponentProps {
  statusName?: string;
  color?: StatusColor;
}

const StatusComponent: FC<IStatusComponentProps> = ({
  statusName,
  color,
}): JSX.Element => (
  <Stack
    data-selection-disabled={true}
    horizontal
    verticalAlign={"center"}
    tokens={{ childrenGap: 10 }}
  >
    <span
      className="statusIndicator"
      style={
        statusComponentStyles({
          backgroundColor: color ? color : StatusColor.Gray,
        }).statusIndicator
      }
    />
    <span
      className="statusName"
      style={statusComponentStyles().statusName as React.CSSProperties}
    >
      {statusName ? statusName : "N/A"}
    </span>
  </Stack>
);

const statusComponentStyles = (dynamicStyles?: DynamicStyles) => ({
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 50,
    padding: 2,
    ...dynamicStyles,
  },
  statusName: {
    padding: 2,
    overflowX: "hidden",
    ...dynamicStyles,
  },
});

export default StatusComponent;
