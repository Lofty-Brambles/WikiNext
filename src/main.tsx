import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Display from "./pages/Display";

import "./main.css";
import "./md-style.css";
import "@szhsin/react-menu/dist/core.css";
import "@szhsin/react-menu/dist/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					{/* <Route index element={<Landing />} />
				<Route path="/wiki-next" element={<Landing />} /> */}
					<Route path="/wiki/:name" element={<Display />} />
					{/*
				<Route path="" element={<Dashboard />} />
				*/}
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
