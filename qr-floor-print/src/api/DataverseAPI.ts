import { config } from "../utils/config";
import { isDev } from "../utils/isDev";

export class DataverseAPIManager {
  private readonly orgUrl: string;
  private readonly token: string;

  constructor() {
    if (isDev()) {
      this.orgUrl = config.orgUrl;
      this.token = config.dataverseToken;
    } else {
      this.orgUrl = "";
      this.token = "";
    }
  }

  public async fetchRecord<R>(
    entityName: string,
    recordId: string
  ): Promise<R> {
    const url = `api/data/v9.2/${entityName}(${recordId})`;
    const response: Response = await fetch(url);

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    const data = (await response.json()) as R;

    return data;
  }

  public async fetchRecords<R>(
    entityName: string,
    filter?: string,
    select?: string
  ): Promise<R> {
    const url = `${this.orgUrl}/api/data/v9.2/${entityName}?${
      filter ? `$filter=${filter}` : ""
    }${select ? `&$select=${select}` : ""}`;

    const headers: { [key: string]: string } = {};

    if (isDev() && this.token) {
      headers.Authorization = "Bearer " + this.token;
    }
    headers["Prefer"] =
      'odata.include-annotations="OData.Community.Display.V1.FormattedValue"';

    const response: Response = await fetch(url, {
      headers,
    });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    const data = (await response.json()) as R;

    return data;
  }
}

const DataverseAPI = new DataverseAPIManager();

export default DataverseAPI;
