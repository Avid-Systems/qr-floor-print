import { useState } from "react";
import { Selection } from "@fluentui/react/lib/DetailsList";

export const useSelection = <T extends { key: string }>() => {
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [selectedRecords, setSelectedRecords] = useState<T[]>([]);
  const [selection] = useState<Selection>(
    new Selection({
      onSelectionChanged: () => {
        const selectedItems = selection.getSelection() as T[];
        setSelectedCount(selectedItems.length);
        setSelectedRecords(selectedItems);
      },
    })
  );
  return { selection, selectedRecords, selectedCount };
};
