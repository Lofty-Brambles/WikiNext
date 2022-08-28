import Hamburger from "hamburger-react";
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import store from "../../store";

const HeroHead = () => {
	const [burger, tBurger] = store(state => [state.burger, state.setBurger]);

	return (
		<header className="box-border w-screen p-4 flex justify-between items-center flex-wrap gap-4 lg:justify-evenly bg-gradient-to-b from-slate-900 to-slate-700 border-b-4 border-b-white border-double">
			<Link to="/">
				<img src="/logo.png" alt="logo" className="h-12" />
			</Link>
			<SearchBar />
			<div className="z-30 lg:hidden">
				<Hamburger
					size={40}
					color="#fff"
					distance="md"
					easing="ease-in"
					rounded
					label="Show a sidebar"
					toggled={burger}
					toggle={
						tBurger as React.Dispatch<React.SetStateAction<boolean>>
					}
				/>
			</div>
		</header>
	);
};

export default HeroHead;
