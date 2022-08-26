import React from "react";
import { Icon } from "react-feather";

type PropsThreeBtn = {
	prop: "sm" | "md" | "lg";
	// eslint-disable-next-line no-unused-vars
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

export default ThreeBtn;
