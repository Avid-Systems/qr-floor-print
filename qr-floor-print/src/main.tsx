import React from "react";
import ReactDOM from "react-dom";
import QRFloorPrint from "./QRFloorPrint.tsx";

const domNode = document.getElementById("root");
if (domNode) {
  ReactDOM.render(
    <React.StrictMode>
      <QRFloorPrint />
    </React.StrictMode>,
    domNode
  );
}
