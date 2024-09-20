import {
  CommandBarButton,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Stack,
  Sticky,
  StickyPositionType,
  TextField,
  TooltipHost,
  mergeStyles,
  Separator,
  ScrollablePane,
  ScrollbarVisibility,
  MessageBar,
  MessageBarType,
} from "@fluentui/react";
import QRCode from "qrcode";
import React, { useState, memo, FC, JSX, useEffect } from "react";
import { IWorkspaceList } from "../types";
import { columnsToRecords } from "../utils/mappers";
import { IWorkspace } from "../models/IWorkspace";
import { useSelection } from "../hooks/useSelect";
import { ITextFieldStyles } from "@fluentui/react/lib-commonjs/TextField";
import LoadingMapComponent from "./LoadingComponent";
import { columns, printIcon } from "../common/constants";

interface WorkspaceListComponentProps {
  data: IWorkspace[] | null;
  loading: boolean;
}

const WorkspaceListComponent: FC<WorkspaceListComponentProps> = ({
  data,
  loading,
}): JSX.Element => {
  const [items, setItems] = useState<IWorkspaceList[]>([]);
  const { selection, selectedRecords } = useSelection<IWorkspaceList>();

  const onPrint = (isFloor: boolean) => {
    const printWindow = window.open("", "_blank");
    const toItemsPrint = isFloor ? items : selectedRecords;

    if (printWindow) {
      printWindow.document.write(
        `<html><head><title>${toItemsPrint[0]._mw_floor_value}</title>`
      );

      printWindow.document.write(
        '<link rel="stylesheet" href="./mw_QRFloorPrint.css" type="text/css" />'
      );
      printWindow.document.write("</head><body>");

      printWindow.document.write('<div class="printTemplateContainer">');

      toItemsPrint.forEach((workspace, index) => {
        const template = `
          <div class="printTemplateCard">
            <img class="printTemplateLogo" src="./mw_workspaceLogoIcon.svg" alt="Workspace Logo"></img>
            <h3 class="printTemplateLogo">Company office</h3>
            <div class="printTemplateCardContainer">
              <h5 class="floorName">${workspace._mw_floor_value}</h5>
              <hr class="vertical-line" />
              <h5 class="wsName">${workspace.mw_name}</h5>
            </div>
            <canvas id="qrCodeCanvas${index}"></canvas>
            <h5 class="wsKey">${workspace.mw_key}</h5>
          </div>
        `;
        printWindow.document.write(template);

        const canvas = printWindow.document.getElementById(
          `qrCodeCanvas${index}`
        );
        QRCode.toCanvas(canvas, workspace.mw_qrcode_url, { width: 150 });
      });

      // Close container for the cards
      printWindow.document.write("</div>");

      printWindow.document.write("</body></html>");

      setTimeout(() => {
        printWindow.document.close();
        printWindow.print();
      }, 700);
    }
  };

  const onFilter = (
    _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string | undefined
  ): void => {
    setItems((prevItems) => ({
      ...prevItems,
      items: text
        ? prevItems.filter((i) => i.mw_name.toLowerCase().indexOf(text) > -1)
        : prevItems,
    }));
  };

  //const onRowSelect = (currentSelected: any) => {};

  useEffect(() => {
    if (!data) return;
    const mappedItems = columnsToRecords<IWorkspace, IWorkspaceList>(
      columns,
      data
    );
    setItems(mappedItems);
  }, [data]);

  // useEffect(() => {
  //   //console.log(selectedRecords);
  // }, [selectedRecords]);

  return (
    <>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <CommandBarButton
          iconProps={printIcon}
          text="Print for selection"
          onClick={() => onPrint(false)}
          disabled={selectedRecords.length === 0}
        />
        <CommandBarButton
          iconProps={printIcon}
          text="Print for the floor"
          onClick={() => onPrint(true)}
          disabled={selectedRecords.length > 0}
        />
      </Stack>
      <Separator />
      <TextField
        className={exampleChildClass}
        label="Filter by name:"
        onChange={onFilter}
        styles={textFieldStyles}
      />
      <MessageBar messageBarType={MessageBarType.info}>
        <strong>Note:</strong> Only workspaces with QR code URLs assigned are
        displayed
      </MessageBar>
      <div
        className="scrollablePaneContainer"
        style={{ height: "86%", position: "relative" }}
      >
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          {loading ? (
            <LoadingMapComponent />
          ) : (
            <DetailsList
              items={items}
              columns={columns}
              setKey="wsList"
              layoutMode={DetailsListLayoutMode.justified}
              selection={selection}
              selectionPreservedOnEmptyClick={true}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="select row"
              onItemInvoked={() => {}}
              onRenderDetailsHeader={onRenderDetailsHeader}
              selectionMode={SelectionMode.multiple}
            />
          )}
        </ScrollablePane>
      </div>
    </>
  );
};

const onRenderDetailsHeader = (
  props: any,
  defaultRender: any
): React.JSX.Element => {
  return (
    <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
      {defaultRender({
        ...props,
        onRenderColumnHeaderTooltip: (tooltipHostProps: any): any => (
          <TooltipHost {...tooltipHostProps} />
        ),
      })}
    </Sticky>
  );
};
// const onRenderItemColumn = (
//   item: any,
//   _: number | undefined,
//   column: IColumn | undefined
// ) => {
//   const fieldContent = item[column!.fieldName as keyof any] as string;

//   if (column!.key === "mw_status" && fieldContent) {
//     switch (fieldContent.toLowerCase()) {
//       case "hoteling":
//         return (
//           <StatusComponent statusName={fieldContent} color={StatusColor.Gray} />
//         );

//       case "assigned":
//         return (
//           <StatusComponent statusName={fieldContent} color={StatusColor.Red} />
//         );

//       case "vacant":
//         return (
//           <StatusComponent
//             statusName={fieldContent}
//             color={StatusColor.Green}
//           />
//         );

//       case "unassigned":
//         return (
//           <StatusComponent
//             statusName={fieldContent}
//             color={StatusColor.Green}
//           />
//         );

//       default:
//         return (
//           <StatusComponent statusName={fieldContent} color={StatusColor.Gray} />
//         );
//     }
//   } else {
//     return <span>{fieldContent}</span>;
//   }
// };

WorkspaceListComponent.displayName = "WorkspaceList";
const WorkspaceList = memo(WorkspaceListComponent);

export default WorkspaceList;

const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: "600px" },
};

const exampleChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px",
});
