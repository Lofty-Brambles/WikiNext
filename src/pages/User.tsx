import React from "react";
import { useNavigate } from "react-router-dom";
import Details from "../components/user-components/Details";
import LoginButtons from "../components/input-components/Button";
import store from "../store";
import Image from "../assets/Monaco-display.png";
import TabbedInfo from "../components/user-components/TabbedInfo";

// eslint-disable-next-line arrow-body-style
const User = () => {
	const navigate = useNavigate();

	const [user, looks] = store(state => [state.user, state.looks]);

	return user === undefined ? (
		<div
			className={`box-border w-full h-[calc(100%-84px)] lg:w-[calc(80vw-12px)] flex justify-center items-center gap-4 overflow-y-scroll ${
				looks.darkMode ? "bg-gray-600" : "bg-zinc-200"
			}`}
		>
			<img
				src={Image}
				alt="wiki-next logo"
				className="h-[544px] hidden mdx:block"
			/>
			<div
				className={`p-8 my-auto mdx:mr-8 flex flex-col items-center gap-3 w-[300px] sm:w-[357px] border-2 border-neutral-400 rounded-sm ${
					looks.darkMode ? "bg-slate-900 text-white" : "bg-slate-100"
				}`}
			>
				<p className="text-center">
					🟥 You aren&apos;t actually logged in! Log in to access
					multiple features!
				</p>
				<LoginButtons
					name="Log in"
					clickAction={() => {
						navigate("/sign-in", { replace: true });
					}}
					disabled={false}
					colors={{
						main: "bg-blue-700",
						hover: "hover:bg-blue-600",
					}}
				/>
			</div>
		</div>
	) : (
		<div
			className={`box-border w-full h-[calc(100%-84px)] lg:w-[calc(80vw-12px)] py-10 flex justify-start items-center flex-col gap-8 overflow-y-scroll ${
				looks.darkMode ? "bg-[#0d1117] text-white" : "bg-slate-100"
			} ${looks.sans ? "sans" : "font-serif"} ${
				// eslint-disable-next-line no-nested-ternary
				looks.sideSpace === "sm"
					? "px-10"
					: // eslint-disable-next-line no-nested-ternary
					looks.sideSpace === "md"
					? "px-20"
					: looks.sideSpace === "lg"
					? "px-[7.5rem]"
					: ""
			}`}
		>
			<Details />
			<TabbedInfo />
		</div>
	);
};

export default User;
