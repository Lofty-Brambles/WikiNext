import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Display from "./pages/Display";
import SignInScreen from "./pages/SignInScreen";
import User from "./pages/User";

import Edits from "./components/user-components/Edits";
import Bookmarks from "./components/user-components/Bookmarks";

import "./main.css";
import "./md-style.css";
import "@szhsin/react-menu/dist/core.css";
import "@szhsin/react-menu/dist/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/wiki/:name" element={<Display />} />
					<Route
						path="/sign-in"
						element={<SignInScreen type="sign-in" />}
					/>
					<Route
						path="/sign-up"
						element={<SignInScreen type="sign-up" />}
					/>
					<Route
						path="/forgot-password"
						element={<SignInScreen type="forgot-password" />}
					/>
					<Route path="/user" element={<User />}>
						<Route path="/user/edits" element={<Edits />} />
						<Route path="/user/bookmarks" element={<Bookmarks />} />
					</Route>
					{/*
					<Route path="/wiki/wiki-next" element={<Landing />} />
					<Route path="/user" element={<UserPages />} >
				*/}
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
