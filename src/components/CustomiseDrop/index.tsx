/* eslint-disable no-unused-vars */
import React, { ReactElement } from "react";
import { FileText, Icon, Type } from "react-feather";
import useStore from "../../store";

type PropsToggleBtn = {
	prop: boolean;
	toggleFunction: () => void;
	param: string;
	name: string;
};

const ToggleBtn = ({ toggleFunction, param, name, prop }: PropsToggleBtn) => (
	<li className="flex justify-center items-center gap-2">
		<span>{param}</span>
		<label htmlFor="font">
			<input
				type="checkbox"
				className="absolute peer appearance-none rounded-md w-12 h-[1.875rem] opacity-0 z-10 cursor-pointer"
				name={name}
				onClick={toggleFunction}
				checked={prop}
			/>
			<span className="relative w-12 h-[1.875rem] flex items-center flex-shrink-0 bg-gray-200 border-2 border-gray-700 rounded-full duration-300 ease-in-out peer-checked:bg-emerald-500 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5 group-hover:after:translate-x-1" />
		</label>
	</li>
);

type PropsThreeBtn = {
	prop: "sm" | "md" | "lg";
	toggleFunction: (val: "sm" | "md" | "lg") => void;
	IconP: Icon;
	name: string;
};

const ThreeBtn = ({ prop, toggleFunction, IconP, name }: PropsThreeBtn) => (
	<li className="flex justify-center rounded-xl">
		<button
			type="button"
			className={`w-12 h-12 flex justify-center items-center rounded-l-lg border-2 border-gray-800 ${
				prop === "sm" ? "bg-slate-500" : ""
			}`}
			aria-label={name}
			onClick={() => {
				toggleFunction("sm");
			}}
		>
			<IconP size={24} />
		</button>
		<button
			type="button"
			className={`w-12 h-12 flex justify-center items-center border-y-2 border-slate-800 ${
				prop === "md" ? "bg-slate-500" : ""
			}`}
			aria-label={name}
			onClick={() => {
				toggleFunction("md");
			}}
		>
			<IconP size={30} />
		</button>
		<button
			type="button"
			className={`w-12 h-12 flex justify-center items-center rounded-r-lg border-2 border-gray-800 ${
				prop === "lg" ? "bg-slate-500" : ""
			}`}
			aria-label={name}
			onClick={() => {
				toggleFunction("lg");
			}}
		>
			<IconP size={36} />
		</button>
	</li>
);

const CustomMenu = () => {
	const font = useStore(state => state.customFormDtls.sans);
	const toggleFont = useStore(state => state.toggleFont);
	const darkMode = useStore(state => state.customFormDtls.darkMode);
	const toggleDarkMode = useStore(state => state.toggleDarkMode);
	const justify = useStore(state => state.customFormDtls.justify);
	const toggleJustify = useStore(state => state.toggleJustify);

	const sideSpace = useStore(
		state => state.customFormDtls.sideSpace
	);
	const toggleSideSpace = useStore(
		state => state.toggleSideSpace
	);

	return (
		<ul className="flex flex-col px-4 py-2 mb-2 gap-2 rounded-b-lg border-2 border-gray-700">
			<ThreeBtn
				prop={sideSpace}
				toggleFunction={toggleSideSpace}
				IconP={FileText}
				name="Side Spacing"
			/>
			<ToggleBtn
				prop={font}
				toggleFunction={toggleFont}
				param="Sans font?"
				name="Sans or serif fonts"
			/>
			<ToggleBtn
				prop={darkMode}
				toggleFunction={toggleDarkMode}
				param="Darkmode?"
				name="Light mode/Dark mode"
			/>
			<ToggleBtn
				prop={justify}
				toggleFunction={toggleJustify}
				param="Justify?"
				name="Justify content?"
			/>
		</ul>
	);
};

export default CustomMenu;
