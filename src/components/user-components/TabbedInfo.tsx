import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import store from "../../store";

const TabbedList = () => {
	const looks = store(state => state.looks);
	return (
		<ul role="tablist" className="flex w-full">
			<li role="presentation">
				<NavLink
					to="/user/edits"
					role="tab"
					tabIndex={0}
					className={`block mr-[5px] px-5 py-[15px] bg-slate-500 border-x border-t font-bold ${
						looks.darkMode ? "border-white" : "border-black"
					}`}
				>
					Edits
				</NavLink>
			</li>
			<li role="presentation">
				<NavLink
					to="/user/bookmarks"
					role="tab"
					tabIndex={0}
					className={`block mr-[5px] px-5 py-[15px] bg-slate-500 border-x border-t font-bold ${
						looks.darkMode ? "border-white" : "border-black"
					}`}
				>
					Bookmarks
				</NavLink>
			</li>
		</ul>
	);
};

// eslint-disable-next-line arrow-body-style
const TabbedInfo = () => {
	return (
		<>
			<TabbedList />
			<div className="w-full -my-[33px]">
				<Outlet />
			</div>
		</>
	);
};

export default TabbedInfo;
