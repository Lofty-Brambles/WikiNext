import Hamburger from "hamburger-react";
import React from "react";
import { Link } from "react-router-dom";
import useStore from "../../../store";

const HeroHead = () => {
	const sideBarState: boolean = useStore(state => state.sidebarState);
	const sidebarToggle = useStore(state => state.toggleSidebarState);
	return (
		<header className="box-border w-screen p-4 flex justify-between items-center flex-wrap gap-4 lg:justify-evenly bg-gradient-to-b from-slate-900 to-slate-700 border-b-4 border-b-white border-double">
			<Link to="/">
				<img src="/logo.png" alt="logo" className="h-12" />
			</Link>
			<div className="h-4 w-[100%] sm:w-[50vw] order-last sm:order-none justify-self-center">p</div>
			<div className="z-30 lg:hidden">
				<Hamburger
					size={40}
					color="#fff"
					distance="md"
					easing="ease-in"
					rounded
					label="Show a sidebar"
					toggled={sideBarState}
					toggle={
						sidebarToggle as React.Dispatch<
							React.SetStateAction<boolean>
						>
					}
				/>
			</div>
		</header>
	);
};

export default HeroHead;
