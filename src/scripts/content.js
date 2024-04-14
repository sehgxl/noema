import React from "react";
import ReactDOM from "react-dom";
import App from "../pages/Content/content";
<script
  src="https://kit.fontawesome.com/59b8e73c11.js"
  crossorigin="anonymous"
></script>
const newDiv = document.createElement("div");
newDiv.setAttribute("id", "content-app-root");
document.body.appendChild(newDiv);
ReactDOM.render(<App />, newDiv);

