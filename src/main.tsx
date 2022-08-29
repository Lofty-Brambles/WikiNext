import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Display from "./pages/Display";

import "./main.css";
import "./md-style.css";
import "@szhsin/react-menu/dist/core.css";
import "@szhsin/react-menu/dist/index.css";
import SignInScreen from "./pages/SignInScreen";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/wiki/:name" element={<Display />} />
					<Route path="/sign-in" element={<SignInScreen type="sign-in" />} />
				{/*
					<Route path="/wiki/wiki-next" element={<Landing />} />
					<Route path="/sign-up" element={<SignUpModal />} />
					
					<Route path="/reset-password" element={<ResetPasswordModal />} />
				*/}
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
