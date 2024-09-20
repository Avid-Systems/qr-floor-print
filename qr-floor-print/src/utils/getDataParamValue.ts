export const getDataParamValue = (paramName: string): string => {
  let params: string[] = [];
  if (location.search !== "") {
    params = location.search.substring(1).split("&");
    for (let i = 0; i < params.length; i++) {
      const vals = params[i].replace(/\+/g, " ").split("=");
      //look for the parameter named 'data'

      if (vals[0].toLowerCase() === paramName) {
        const id = decodeURIComponent(vals[1]).replace(/[{}]/g, "");
        return id;
      }
    }
  }
  return "9ef5d1a7-adca-ee11-9079-000d3a599ac0";
};
