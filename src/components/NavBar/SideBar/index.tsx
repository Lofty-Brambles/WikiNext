import React from "react";
import { Bookmark, Globe, HelpCircle, Home, User } from "react-feather";
import { Link } from "react-router-dom";
import useStore from "../../../store";

const Sidebar = () => {
	const sideBarState: boolean = useStore(state => state.sidebarState);
	return (
		<section
			className={`fixed box-border h-[calc(100%-84px)] lg:w-[20vw] z-10 right-0 lg:flex flex-col motion-safe:animate-open overflow-auto mt-[84px] p-4 shadow bg-gradient-to-l from-gray-200 to-gray-400 font-serif ${
				sideBarState ? "flex w-[300px] flex-col" : "hidden"
			}`}
		>
			{[
				{ path: "/wiki-next", name: "Home", component: <Home /> },
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
				<Link to={e.path} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gradient-to-l hover:from-gray-400 hover:to-gray-600 text-center">
					{e.component}{e.name}
				</Link>
			))}
			<div className="h-10"/>
			<Link to="/wiki-next" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gradient-to-l hover:from-gray-400 hover:to-gray-600 text-center"><Globe />About</Link>
		</section>
	);
};

export default Sidebar;
