import React from "react";
import { Outlet } from "react-router-dom";
import HeroHead from "../../components/NavBar/HeroHead";
import Sidebar from "../../components/SideBar";

const App = () => (
	<>
		<Sidebar />
		<HeroHead />
		<Outlet />
	</>
);

export default App;
