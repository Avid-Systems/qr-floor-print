import { useCallback, useEffect, useState } from "react";
import WorkspaceList from "./components/WorkspaceList";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import DataverseAPI from "./api/DataverseAPI";
import { IWorkspace } from "./models/IWorkspace";
import { getDataParamValue } from "./utils/getDataParamValue";
import { MessageBar, MessageBarType } from "@fluentui/react/lib/MessageBar";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";

interface IWorkspaceResponse {
  value: IWorkspace[];
}

const QRFloorPrint = () => {
  initializeIcons();

  const [floorId] = useState<string>(() => getDataParamValue("data"));
  const [workspaces, setWorkspaces] = useState<IWorkspace[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWorkspaces = useCallback(async (floorId: string) => {
    const queryFilter = `_mw_floor_value eq ${floorId} and mw_qrcode_url ne null`;
    const select =
      "mw_workspaceid,mw_name,mw_shortname,mw_usetype,mw_maptag,mw_status,_mw_floor_value,mw_key, mw_qrcode_url,";

    try {
      setLoading(true);
      const data = await DataverseAPI.fetchRecords<IWorkspaceResponse>(
        "mw_workspaces",
        queryFilter,
        select
      );

      setWorkspaces(data.value);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error("Error fetching workspaces");
    }
  }, []);

  useEffect(() => {
    fetchWorkspaces(floorId);
  }, [fetchWorkspaces, floorId]);

  return (
    <div
      className="workspaceListContainer"
      style={{ margin: "20px", padding: "20px", height: "100%" }}
    >
      {workspaces !== null && workspaces.length === 0 ? (
        <NoFoundComponent />
      ) : (
        <WorkspaceList data={workspaces} loading={loading} />
      )}
    </div>
  );
};

const NoFoundComponent = () => (
  <MessageBar
    className={styles.NoFoundComponent}
    messageBarType={MessageBarType.warning}
  >
    No assosiated workspaces found
  </MessageBar>
);

export default QRFloorPrint;

const styles = mergeStyleSets({
  NoFoundComponent: {
    root: {
      height: 100,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      width: "auto",
    },
  },
});
