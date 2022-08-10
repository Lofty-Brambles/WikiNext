import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Landing from "./pages/Landing";

const Routing = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route index element={<Landing />} />
			</Route>
		</Routes>
	</BrowserRouter>
);

export default Routing;
