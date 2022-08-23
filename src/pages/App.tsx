import React from "react";
import { Outlet } from "react-router-dom";
import HeroHead from "../components/base_components/HeroHead";
import Sidebar from "../components/sidebar_components/SideBar";

const App = () => (
	<>
		<Sidebar />
		<HeroHead />
		<Outlet />
	</>
);

export default App;
