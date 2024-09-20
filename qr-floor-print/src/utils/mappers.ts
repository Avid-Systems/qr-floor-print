import { IColumn } from "@fluentui/react/lib/DetailsList";

export const columnsToRecords = <T, R>(
  columns: IColumn[],
  items: T[]
): Array<R> => {
  return items.map((item, index) => {
    const record = { key: index + "_key", ...item } as R;

    columns.forEach((column) => {
      record[column.fieldName as keyof R] = (item as any)[
        column.fieldName + column.data
      ];
    });

    return record;
  });
};
