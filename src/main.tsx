import React from "react";
import ReactDOM from "react-dom/client";
import Routing from "./Routing";
import "./main.css";
import "./md-style.css";
import "@szhsin/react-menu/dist/core.css";
import "@szhsin/react-menu/dist/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Routing />
	</React.StrictMode>
);
