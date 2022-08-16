/* eslint-disable no-nested-ternary */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Landing from "./pages/Landing";
import Display from "./pages/Display";

const Routing = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route index element={<Landing />} />
				<Route path="/wiki-next" element={<Landing />} />
				<Route path="/wiki/:name" element={<Display />} />
				{/*
				<Route path="" element={<Dashboard />} />
				*/}
			</Route>
		</Routes>
	</BrowserRouter>
);

export default Routing;
