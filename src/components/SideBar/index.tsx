import React from "react";
import {
	Bookmark,
	Globe,
	HelpCircle,
	Home,
	Settings,
	User,
} from "react-feather";
import { Link } from "react-router-dom";
import useStore from "../../store";
import CustomMenu from "../CustomiseDrop";

const Sidebar = () => {
	const sideBarState: boolean = useStore(state => state.sidebarState);

	const toggleState: boolean = useStore(state => state.customiserDropdown);
	const toggler: () => void = useStore(state => state.toggleCustomiserDrop);

	return (
		<section
			className={`fixed box-border h-[calc(100%-84px)] lg:w-[21vw] z-10 right-0 lg:flex flex-col motion-safe:animate-open overflow-auto mt-[84px] p-4 border-l-2 shadow bg-gradient-to-l from-gray-200 to-gray-400 font-serif 2xl:text-lg ${
				sideBarState ? "flex w-[300px] flex-col" : "hidden"
			}`}
		>
			{[
				{ path: "/", name: "Home", component: <Home /> },
				{
					path: "/random-page",
					name: "Random Page",
					component: <HelpCircle />,
				},
				{
					path: "/user/bookmarks",
					name: "Bookmarks",
					component: <Bookmark />,
				},
				{
					path: "/user/account",
					name: "Account",
					component: <User />,
				},
			].map(e => (
				<Link
					key={e.path}
					to={e.path}
					className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gradient-to-l hover:from-gray-400 hover:to-gray-600 text-center font-semibold"
				>
					{e.component}
					{e.name}
				</Link>
			))}
			<div className="h-10" />
			<button
				type="button"
				onClick={toggler}
				className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gradient-to-l hover:from-gray-400 hover:to-gray-600 text-center font-semibold ${
					toggleState
						? "bg-gradient-to-l from-gray-500 to-gray-700 rounded-b-none"
						: ""
				}`}
			>
				<Settings />
				Customise
			</button>
			{toggleState && <CustomMenu />}
			<Link
				to="/wiki/next"
				className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gradient-to-l hover:from-gray-400 hover:to-gray-600 text-center font-semibold"
			>
				<Globe />
				About
			</Link>
		</section>
	);
};

export default Sidebar;
