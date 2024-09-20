import { IColumn, IIconProps } from "@fluentui/react";

export const columns: IColumn[] = [
  {
    name: "Name",
    key: "mw_name",
    fieldName: "mw_name",
    minWidth: 200,
    data: "",
  },
  {
    name: "Floor",
    key: "mw_floor",
    fieldName: "_mw_floor_value",
    minWidth: 200,
    data: "@OData.Community.Display.V1.FormattedValue",
  },
  // {
  //   name: "Status",
  //   key: "mw_status",
  //   fieldName: "mw_status",
  //   minWidth: 300,
  //   data: "@OData.Community.Display.V1.FormattedValue",
  // },
];

export const printIcon: IIconProps = { iconName: "Print" };
export const downloadIcon: IIconProps = { iconName: "CloudDownload" };
